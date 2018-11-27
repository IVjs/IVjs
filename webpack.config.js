'use strict';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', // Alternatively you can pass it via CLI: --mode production/--mode development
  
  context: __dirname,
  devtool: 'source-map',
  entry: './src/entry.ts',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'iv.js',
    libraryTarget: 'umd'
  },

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
            },
          },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({
      filename: 'css/iv.css',
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },

  devServer: {
    contentBase: [path.join(__dirname, 'docs'), path.join(__dirname, 'docs', 'demos')],
    publicPath: '/assets/',
    clientLogLevel: 'info',
    watchContentBase: true,
  },
};
