module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    exclude: ['src/test-support/**/*'],
    files: [
      'src/karma-support/*.ts',
      'src/lib/**/!(*.spec).ts', // *.tsx for React Jsx
    ],
    preprocessors: {
      'src/**/*.ts': 'karma-typescript', // *.tsx for React Jsx
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['Chrome'],

    karmaTypescriptConfig: {
      compilerOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: 'commonjs',
        lib: ['es2015', 'dom'],
        sourceMap: true,
        target: 'ES5',
        types: ['jasmine'],
      },
      include: ['src/**/*.ts'],
      exclude: ['node_modules', 'src/**/*.spec.ts', 'src/test-support/*'],
      bundlerOptions: {
        transforms: [require('karma-typescript-es6-transform')()],
      },
    },
  });
};
