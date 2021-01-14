const fs = require('fs')

var args = process.argv.slice(2);

// TODO: use file patterns

try {
  // TODO: improve
  const coverage = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const coverage1 = JSON.parse(fs.readFileSync(args[1], 'utf8'));
  coverage.source_files = coverage.source_files.concat(coverage1.source_files);
  fs.writeFileSync("coveralls.json", JSON.stringify(coverage)); 
} catch (err) {
  console.error(err)
}
