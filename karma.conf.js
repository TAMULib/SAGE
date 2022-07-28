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

      "node_modules/jquery/dist/jquery.js",
      "node_modules/bootstrap/dist/js/bootstrap.js",

      "node_modules/sockjs-client/dist/sockjs.js",
      "node_modules/stompjs/lib/stomp.js",

      "node_modules/angular/angular.js",

      "node_modules/angular-sanitize/angular-sanitize.js",
      "node_modules/angular-route/angular-route.js",
      "node_modules/angular-loader/angular-loader.js",
      "node_modules/angular-messages/angular-messages.js",
      "node_modules/angular-mocks/angular-mocks.js",

      "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",

      "node_modules/ng-csv/build/ng-csv.js",

      "node_modules/ng-table/bundles/ng-table.js",

      "node_modules/ng-file-upload/dist/ng-file-upload-shim.js",
      "node_modules/ng-file-upload/dist/ng-file-upload.js",

      'node_modules/openseadragon/build/openseadragon/openseadragon.js',
      'node_modules/ng-openseadragon/build/angular-openseadragon.js',

      "node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js",

      "node_modules/@wvr/core/app/config/coreConfig.js",

      "node_modules/@wvr/core/app/components/**/*.js",

      "node_modules/@wvr/core/app/core.js",

      "node_modules/@wvr/core/app/**/*.js",

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

      // "src/main/webapp/tests/unit/**/*.js"
      'src/main/webapp/tests/unit/repos/**/*.js',
      'src/main/webapp/tests/unit/models/**/*.js',
      'src/main/webapp/tests/unit/components/**/*.js',
      'src/main/webapp/tests/unit/filters/**/*.js',
      'src/main/webapp/tests/unit/directives/**/*.js',
      // 'src/main/webapp/tests/unit/controllers/**/*.js',

      // 'src/main/webapp/tests/unit/controllers/appLoginControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/discoveryContextControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/managementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/singleResultControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/usersControllerTest.js',

      // 'src/main/webapp/tests/unit/controllers/management/discoveryViewManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/internalMetadataManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/jobManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/operatorManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/readerManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/sourceManagementControllerTest.js',
      // 'src/main/webapp/tests/unit/controllers/management/writerManagementControllerTest.js'

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
