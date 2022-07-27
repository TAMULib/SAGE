module.exports = function (config) {
  config.set({

    preprocessors: {
      'src/main/webapp/app/**/*.js': 'coverage',
      'src/main/webapp/app/views/**/*.html': ['ng-html2js']
    },

    reporters: ['progress', 'coverage'],

    basePath: './',

    files: [
      'dist/appConfig.js',

      "src/main/webapp/app/config/apiMapping.js",

      "src/main/webapp/app/node_modules/jquery/dist/jquery.js",
      "src/main/webapp/app/node_modules/bootstrap/dist/js/bootstrap.js",

      "src/main/webapp/app/node_modules/sockjs-client/dist/sockjs.js",
      "src/main/webapp/app/node_modules/stompjs/lib/stomp.js",

      "src/main/webapp/app/node_modules/angular/angular.js",

      "src/main/webapp/app/node_modules/angular-sanitize/angular-sanitize.js",
      "src/main/webapp/app/node_modules/angular-route/angular-route.js",
      "src/main/webapp/app/node_modules/angular-loader/angular-loader.js",
      "src/main/webapp/app/node_modules/angular-messages/angular-messages.js",
      "src/main/webapp/app/node_modules/angular-mocks/angular-mocks.js",

      "src/main/webapp/app/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",

      "src/main/webapp/app/node_modules/ng-csv/build/ng-csv.js",

      "src/main/webapp/app/node_modules/ng-table/bundles/ng-table.js",

      "src/main/webapp/app/node_modules/ng-file-upload/dist/ng-file-upload-shim.js",
      "src/main/webapp/app/node_modules/ng-file-upload/dist/ng-file-upload.js",

      "src/main/webapp/app/node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js",

      "src/main/webapp/app/node_modules/@wvr/core/app/config/coreConfig.js",

      "src/main/webapp/app/node_modules/@wvr/core/app/components/**/*.js",

      "src/main/webapp/app/node_modules/@wvr/core/app/core.js",

      "src/main/webapp/app/node_modules/@wvr/core/app/**/*.js",

      "src/main/webapp/tests/testSetup.js",

      "src/main/webapp/app/app.js",

      "src/main/webapp/app/components/**/*.js",

      "src/main/webapp/app/config/runTime.js",

      "src/main/webapp/app/controllers/**/*.js",

      "src/main/webapp/app/directives/**/*.js",

      "src/main/webapp/app/filters/**/*.js",

      "src/main/webapp/app/model/**/*.js",

      "src/main/webapp/app/repo/**/*.js",

      "src/main/webapp/app/services/**/*.js",

      "src/main/webapp/app/views/**/*.html",

      "src/main/webapp/tests/core/**/*.js",

      "src/main/webapp/tests/mock/**/*.js",

      "src/main/webapp/tests/unit/**/*.js"
    ],

    autoWatch: true,

    frameworks: ["jasmine"],

    browsers: ["Firefox", "Chrome", "ChromeHeadless", "ChromeHeadlessNoSandbox"],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },

    plugins: [
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-junit-reporter",
      "karma-ng-html2js-preprocessor"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: "src/main/webapp/app/",
      moduleName: "templates"
    },

    coverageReporter: {
      type: "lcov",
      dir: "coverage/",
      subdir: '.'
    }

  });
};
