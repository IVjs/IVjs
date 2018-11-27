'use strict';
const path = require('path');
const regularSettings = require('./webpack.config');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function usesLoader(rule, loaderName) {
  if (rule.loader && rule.loader === loaderName) return true;
  if (rule.use) {
    for (let i = 0; i < rule.use.length; i++) {
      const loader = rule.use[i];
      if (loader === loaderName) return true;
      if (loader.loader && loader.loader === loaderName) return true;
    }
  }
  return false;
}

function noTypeChecking(rule) {
  if (usesLoader(rule, 'ts-loader')) {
    rule.use[0].options.transpileOnly = true;
  }
  return rule;
}

regularSettings.module.rules = regularSettings.module.rules.map(noTypeChecking);

module.exports = {
  ...regularSettings,
  
  mode: 'development',

  plugins: [
    ...regularSettings.plugins,
    new ForkTsCheckerWebpackPlugin(),
  ],

  stats: {
    // suppress "export not found" warnings about re-exported types
    warningsFilter: /export .* was not found in/
  },

  devServer: {
    contentBase: [path.join(__dirname, 'docs'), path.join(__dirname, 'docs', 'demos')],
    publicPath: '/assets/',
    clientLogLevel: 'warning',
    watchContentBase: true,
  },
};
