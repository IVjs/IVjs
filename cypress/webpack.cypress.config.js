module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  context: __dirname,

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
    ],
  },
};
