const webpackConf = require('./webpack.dev.config');

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

    webpack: {
      mode: 'development',
      module: webpackConf.module,
      plugins: webpackConf.plugins,
      resolve: webpackConf.resolve,
      devtool: 'inline-source-map',
    },
  });
};
