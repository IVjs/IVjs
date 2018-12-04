module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['test.ts'],
    preprocessors: {
      'test.ts': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],

    client: {
      clearContext: false,
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                },
              },
            ],
            exclude: '/node_modules/',
          },
        ],
      },
      resolve: {
        extensions: ['.ts'],
      },
    },
  });
};
