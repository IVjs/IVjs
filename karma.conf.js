const tsconf = require('./tsconfig.json');
const webpackConf = require('./webpack.config');
delete webpackConf.entry;
delete webpackConf.output;

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    exclude: ['src/test-support/setup-env.ts'],
    files: ['src/**/*.test.ts', 'src/karma-support/*'],
    preprocessors: {
      'src/karma-support/*': ['webpack', 'sourcemap'],
      'src/**/*.test.ts': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],

    client: {
      clearContext: false,
    },

    webpack: webpackConf,
  });
};
