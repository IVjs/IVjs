'use strict';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const regularSettings = require('./webpack.config');

function replacePluginInstance(plugin, pluginClass, ...newArgs) {
  if (plugin instanceof pluginClass) {
    return new pluginClass(...newArgs);
  }
  return plugin;
}

module.exports = {
  ...regularSettings,

  output: {
    ...regularSettings.output,
    path: path.join(process.cwd(), 'docs/assets'),
  },

  plugins: regularSettings.plugins.map(plugin => {
    return replacePluginInstance(
      plugin,
      CleanWebpackPlugin,
      ['docs/assets'], {exclude: ['.keep']}
    )
  }),

};
