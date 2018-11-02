'use strict';
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production', // Alternatively you can pass it via CLI: --mode production/--mode development

  entry: {
    iv: 'scripts/lib/index.ts',
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'scripts/[name].[hash].js',
    libraryTarget: 'umd'
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
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
  ],

  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.ts', '.js', '.scss'],
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
