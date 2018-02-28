const gulp = require('gulp');
const s3 = require('gulp-s3');
const rs = require('run-sequence');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
const git = require('gulp-git');
const semver = require('semver');
const webpack = require('webpack');
const getPackageJson = require('./npm-scripts/getPackageJson')
require('dotenv').load();

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
    bucket: getPackageJson().awsTesting.bucket
  }

  if (!awsCredentials.key || !awsCredentials.secret) {
    logAndExit( 'AWS credentials were not present. Did you create a `.env` file that looks like `.env.example` in the root directory of this repo?');
  }

  const awsOptions = {
    uploadPath: getPackageJson().awsTesting.path
  }

  logAndExit('ran aws');

  return gulp.src('build/**')
    .pipe( s3(awsCredentials, awsOptions) );
});

gulp.task('checkRepoReady', (cb) => {
  (async () => {
    const status = await gitCommand('status');
    const isClean = status.match(/nothing to commit, working [a-z]+ clean/);
    const onMaster = status.match(/on branch master$/m);
    if (!isClean) {
      logAndExit('There are uncommited changes in the repo.');
    }
    if (!onMaster) {
      logAndExit('You are not on the master branch');
    }

    const behindOrigin = await gitCommand('rev-list HEAD..origin');
    if (behindOrigin.trim().length > 0) {
      logAndExit('You seem to be behind origin: ' + behindOrigin);
    }
    cb();
  })()
})

let increment, currentVersion, releaseVersion, continuingVersion, gitTagName;

gulp.task('release', () => {
  rs('checkRepoReady', 'buildAndRelease')
});

gulp.task('buildAndRelease', () => {
  logAndExit('ran build and release');
  increment = argv.increment || 'patch';
  currentVersion = getPackageJson().version;
  releaseVersion = semver.inc(currentVersion, increment);
  continuingVersion = semver.inc(releaseVersion, 'patch') + '-pre';
  gitTagName = 'v' + releaseVersion

  git.pull((err) => {
    if (err) throw err;
    rs('bumpToRelease', 'buildForDistribution', 'commitAllForRelease', 'tagCurrentRelease', 'undoCommit', 'bumpToContinuingVersion', 'commitPkgForContinuing', 'pushBranchAndNewTag')
  });

});

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
  webpack(require('./webpack.deploy.config.js').run(duringBuild(done)))
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


function gitCommand(cmd) { return new Promise((res) => {
  git.exec({args: cmd}, (err, stdout) => {
    if (err) logAndExit(err);
    res(stdout)
  })
})}
