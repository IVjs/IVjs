'use strict';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const regularSettings = require('./webpack.config');

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
    filename: '[name].js',
  },

  // Completely overwriting plugins here
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
  ]

};
