'use strict';
const path = require('path');

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // Alternatively you can pass it via CLI: --mode production/--mode development
  entry: {
    iv: ['scripts/lib/index.ts', 'styles/base.scss'],
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'scripts/[name].[hash].js',
    // library: 'IV',
    libraryTarget: 'window'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
    ],
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'public/index.html',
    //   chunksSortMode: 'dependency',
    //   inject: 'head',
    // }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    })
    // new CopyWebpackPlugin([{ from: 'public' }]),
  ],

  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.ts', '.js', 'scss'],
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
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

  devtool: 'source-map',
};
