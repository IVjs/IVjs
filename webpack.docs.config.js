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

  entry: {
    ...regularSettings.entry,

    // for old incoming connections to the lib that expect a file named engine.
    engine: regularSettings.entry.iv,
  },

  output: {
    ...regularSettings.output,
    path: path.join(process.cwd(), 'docs/core'),
  },

  plugins: regularSettings.plugins.map(plugin => {
    return replacePluginInstance(
      plugin,
      CleanWebpackPlugin,
      ['docs/core'], {exclude: ['.keep']}
    )
  }),

};
