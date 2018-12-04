const webpackConf = require('./webpack.karma.config');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['test.ts'],
    preprocessors: {
      'test.ts': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],

    client: {
      clearContext: false,
    },

    webpack: webpackConf,
  });
};
