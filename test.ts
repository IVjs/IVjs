// require all modules ending in ".test" from the
// current directory and all subdirectories

import './src/karma-support/setup';

const testsContext = (require as any).context('./src/', true, /\.test\.ts$/);

testsContext.keys().forEach(testsContext);
