'use strict';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',

  context: __dirname,
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.prod.json',
              transpileOnly: true,
            },
          },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/iv.css',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
};
