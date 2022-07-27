#!/usr/bin/env node

const https = require('https');
const fs = require('fs-extra');
const glob = require("glob");

const ghPagesPath = `src/main/resources/gh-pages`;
const lighthousePath = `src/main/resources/gh-pages/audit`;
const lighthouseAssetsPath = `${lighthousePath}/assets`;
const lighthouseCiPath = './.lighthouseci';

const createScoreList = report => {
  const lhrScoreList = [];
  Object.keys(report.categories).forEach(key => {
    var category = report.categories[key];
    lhrScoreList.push({'id': key, 'title': category.title, 'score': (category.score*100)});
  });
  return lhrScoreList;
}

const createReport = htmlReportPath => {
  fs.ensureDir(lighthousePath);
  fs.copySync( htmlReportPath , `./${lighthousePath}/index.html`);
}

const createBadges = resultList => {
  fs.ensureDirSync(lighthouseAssetsPath);
  resultList.forEach(r => {
    const badgeColor = (r.score >= 0 && r.score <= 49) ? 'red' :
      (r.score >= 50 && r.score <= 89) ? 'important' :
      'success' ;
    https.get(`https://img.shields.io/badge/${r.title}-${r.score}-${badgeColor}`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        fs.writeFileSync(`./${lighthouseAssetsPath}/${r.id}.svg`, data );
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  });
}

const logScoreList = scoreList => {
  console.log('Finished generating report');
  console.log('Results:');
  scoreList.forEach(s => {
    console.info(s.title, s.score);
  });
}

const createGhPagesDir = () => {
  const targetPath = 'target';
  const ghPagesPath = `src/main/resources/gh-pages`;
  const targetGhPagesPath = `${targetPath}/gh-pages`;
  fs.ensureDir(ghPagesPath);
  fs.ensureDir(targetPath);

  fs.copy(`${targetPath}/generated-docs/`, `${targetGhPagesPath}/api-docs/`, err => {
    if (err) return console.error(' \n Unable to copy generated-docs  to : ',`${targetGhPagesPath}/api-docs/` , '\n', err);
    console.log(`Copied generated-docs to ${targetGhPagesPath}/api-docs/ !`);
  });

  fs.copy(`./${ghPagesPath}/index.html`, `${targetGhPagesPath}/index.html`, err => {
    if (err) return console.error(' \n Unable to copy src index file  to : ',`${targetGhPagesPath}/index.html` , '\n', err);
    console.log(`Copied index file to ${targetGhPagesPath}/index.html !`);
  });

  fs.copy(`./${ghPagesPath}/audit/`, `${targetGhPagesPath}/audit/`, err => {
    if (err) return console.error(' \n Unable to copy src audit  to : ',`${targetGhPagesPath}/audit/` , '\n', err);
    console.log(`Copied audit to ${targetGhPagesPath}/audit/ !`);
  });
};

if(fs.existsSync(lighthouseCiPath)) {
  fs.ensureDir(`${lighthousePath}`);
  const htmlReportPath = glob.sync(`${lighthouseCiPath}/lhr-*.html`, {})[0];
  const jsonReportPath = glob.sync(`${lighthouseCiPath}/lhr-*.json`, {})[0];
  const jsonReportRaw = fs.readFileSync(jsonReportPath);
  const jsonReport = JSON.parse(jsonReportRaw);
  const scoreList = createScoreList(jsonReport);
  createReport(htmlReportPath);
  createBadges(scoreList);
  logScoreList(scoreList);
  createGhPagesDir();

} else {
  console.warn(`${lighthouseCiPath} does not exist. Please run 'npm run test:audit'`);
}



