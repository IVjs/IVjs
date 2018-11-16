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
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
      },
      {
        test: /\.s?(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
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
    extensions: ['.ts', '.js', '.scss'],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    clientLogLevel: 'info',
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },
};
