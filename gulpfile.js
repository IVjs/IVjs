const gulp = require('gulp');
const s3 = require('gulp-s3');
const rs = require('run-sequence');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
const git = require('gulp-git');
const semver = require('semver');
const webpack = require('webpack');
const {spawn} = require('child_process');
const getPackageJson = require('./npm-scripts/getPackageJson')
const getJsonFile = require('./npm-scripts/getJsonFile')
const deleteFile = require('./npm-scripts/deleteFile')
const replace = require('gulp-replace')
const concat = require('gulp-concat-util')
require('dotenv').load();

let increment, currentVersion, releaseVersion, continuingVersion, gitTagName;

const testCommand = 'npm run test:release'.split(' ');
const testResultsFile = './test-results.json';

function logAndExit(str) {
  console.log('\n\n');
  console.log(str)
  console.log('\n\n');
  process.exit(1);
}

gulp.task('aws', () => {
  const awsCredentials = {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'IVjs'
  }

  if (!awsCredentials.key || !awsCredentials.secret) {
    logAndExit( 'AWS credentials were not present. Did you create a `.env` file that looks like `.env.example` in the root directory of this repo?');
  }

  const storeInFolder = {
    uploadPath: `v${(releaseVersion || getPackageJson().version)}/`
  }

  const overwriteLatest = {
    uploadPath: 'latest/'
  }

  return gulp.src('./build/**')
    .pipe( s3(awsCredentials, storeInFolder) )
    .pipe( s3(awsCredentials, overwriteLatest) );
});

gulp.task('checkRepoReady', (cb) => {
  (async () => {
    const status = await gitCommand('status');
    const isClean = status.match(/nothing to commit, working [a-z]+ clean/);
    const onMaster = status.match(/on branch master$/mi);
    if (!isClean) {
      logAndExit('There are uncommited changes in the repo.');
    }
    if (!onMaster) {
      logAndExit('You are not on the master branch');
    }

    // const behindOrigin = await gitCommand(['rev-list', 'HEAD..origin']);
    // if (behindOrigin.trim().length > 0) {
    //   logAndExit('You seem to be behind origin: ' + behindOrigin);
    // }
    cb();
  })()
})

gulp.task('release', () => {
  rs(
    'checkRepoReady',
    'testSource',
    'buildAndRelease',
  )
});

gulp.task('testSource', (done) => {
  deleteFile(testResultsFile)
  .then(() => command(testCommand))
    .then(() => done())
    .catch(() => {
      const results = getJsonFile(testResultsFile);
      logTestRestults(results);
      logAndExit(
        `There are test failures in your code. Run \`npm run test\` and debug.\n` +
        `This could have been caused by intermittent failures, or by the ${testCommand}` +
        `going missing from the package.json file.\n\n` +
        `The output above should direct you to the failing tests.`
      )
    })
})

gulp.task('copyBuildToDist', () => {
  return gulp.src(['./build/*'])
    .pipe(gulp.dest('./dist/'))
})

gulp.task('buildAndRelease', () => {
  increment = argv.increment || 'patch';
  currentVersion = getPackageJson().version;
  releaseVersion = semver.inc(currentVersion, increment);
  continuingVersion = semver.inc(releaseVersion, 'patch') + '-pre';
  gitTagName = 'v' + releaseVersion

  rs(
    'bumpToRelease',
    'buildForDistribution',
    'copyBuildToDist',
    'replaceVersionInChangelog',
    'commitAllForRelease',
    'tagCurrentRelease',
    'undoCommit',
    'bumpToContinuingVersion',
    'replaceVersionInChangelog', // again, so we have the changes in master
    'addNextVersionToChangelog',
    'commitPkgForContinuing',
    'pushBranchAndNewTag',
    'aws'
  );

});

gulp.task('replaceVersionInChangelog', () => {
  const allNextVersion = /\{\{\s*next-version\s*\}\}/g
  const versionCallout = /\s*#\s*\{\{\s*next-version\s*\}\}\s*?$/m
  return gulp.src(['./CHANGELOG.md'])
    .pipe(replace(versionCallout, () => {
      const headingLevel = (() => {
        if (increment === 'patch') return '###';
        if (increment === 'minor') return '##';
        return '#';
      })()
      return `${headingLevel} ${gitTagName}`
    }))
    .pipe(replace(allNextVersion), gitTagName)
    .pipe(gulp.dest('./'))
})

gulp.task('addNextVersionToChangelog', () => {
  return gulp.src(['CHANGELOG.md'])
    .pipe(concat.header('# {{next-version}}\n\n\n'))
    .pipe(gulp.dest('./'))
})

gulp.task('bumpToRelease', () => {
  return gulp.src('./package.json')
  .pipe(bump({version: releaseVersion}))
  .pipe(gulp.dest('./'));
});

gulp.task('buildForDistribution', (done) => {
  function duringBuild(finished) {
    return (err, stats) => {
      if (err) throw err;
      finished();
    }
  }
  webpack(require('./webpack.deploy.config.js')).run(duringBuild(done))
});

gulp.task('commitAllForRelease', () => {
  return gulp.src(['./dist/*', './package.json'])
    .pipe(git.add())
    .pipe(git.commit('Release Version ' + gitTagName))
})

gulp.task('tagCurrentRelease', (cb) => {
  git.tag(gitTagName, '', (err) => {
    if (err) throw err;
    cb();
  });
});

gulp.task('undoCommit', (cb) => {
  git.reset('HEAD~1', {args:'--hard'}, function (err) {
    if (err) throw err;
    cb();
  });
})

gulp.task('bumpToContinuingVersion', () => {
  return gulp.src('./package.json')
  .pipe(bump({version: continuingVersion}))
  .pipe(gulp.dest('./'));
});

gulp.task('commitPkgForContinuing', () => {
  return gulp.src('./package.json')
    .pipe(git.add())
    .pipe(git.commit('bump to ' + continuingVersion))
})

gulp.task('pushBranchAndNewTag', (cb) => {
  let currentBranch = '';
  git.exec({args : 'rev-parse --abbrev-ref HEAD'}, function (err, stdout) {
    if (err) throw err;
    currentBranch = stdout.trim();
    git.push('origin', currentBranch, (err) => {
      if (err) throw err;
      git.push('origin', gitTagName, (err) => {
        if (err) throw err;
        cb();
      })
    });
  });
});


function command(cmdAndArgs) { return new Promise((res, rej) => {
  const cmd = [].concat(cmdAndArgs)
  const theProcess = spawn(cmd.shift(), cmd);
  let err = '';
  let out = '';
  theProcess.stdout.on('data', (data) => {
    out = `${out}\n${data}`;
  });

  theProcess.stderr.on('data', (data) => {
    err = `${err}\n${data}`;
  });

  theProcess.on('close', (code) => {
    if (code > 0) {
      rej(err)
    } else {
      res(out)
    }
  });
})}

function gitCommand(cmd) {
  return command(['git', cmd])
    .catch(logAndExit)
}

function logTestRestults(r) {
  console.log(`Out of ${r.numTotalTests}, there were ${r.numFailedTests}`)

  const failedSuites = r.testResults.filter(t => t.status === 'failed');
  failedSuites.forEach(s => {
    console.log(`\n\n\n\nFailing suite: ${s.name}`)
    console.log('\nFailed tests in suite:')
    s.assertionResults.filter(ar => ar.status === 'failed').forEach(ft => {
      console.log(ft.fullName)
    })
  })
}
