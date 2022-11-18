const gulp = require('gulp');
const postcss = require('gulp-postcss');
// const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs');
const path = require('path');
const gulpLess = require('./plugins/gulp-less');
const { cjsDir, esmDir } = require('./utils/constants');
const cwd = process.cwd();

const lessFiles = '_tmp/**/*.less';

function compileLess(stream) {
  return (
    stream
      .pipe(gulpLess({onError: (err) => {
        console.log('compile less error: ', err.message.replace('_tmp/', 'src/'));
      }}))
      // .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer(), cssnano()]))
      // .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(cjsDir))
      .pipe(gulp.dest(esmDir))
  );
}

gulp.task('less', function () {
  return compileLess(gulp.src(lessFiles, { base: path.join(cwd, '_tmp') }));
});

function watchLess() {
  const cmpl = (file) => {
    const myPath = path.relative(cwd, file);
    compileLess(gulp.src([myPath], { base: path.join(cwd, '_tmp') }));
  };

  const watcher = gulp.watch(lessFiles, function buildChangeLess(cb) {
    // 增加这个func，主要是看看编译状态
    cb();
  });
  watcher.on('change', function (path, stats) {
    console.log(`[less] File ${path} was changed`);
    cmpl(path);
  });

  watcher.on('add', function (path, stats) {
    console.log(`[less] File ${path} was added`);
    cmpl(path);
  });

  watcher.on('unlink', function (file, stats) {
    console.log(`[less] File ${file} was deleted`);
    const filesToDelete = [];
    [cjsDir, esmDir].forEach((d) => {
      const relativeFile = file.slice('_tmp/'.length);
      const distPath = path.join(d, relativeFile);
      filesToDelete.push(distPath.replace(/\.less?$/, '.css'));
      filesToDelete.push(distPath.replace(/\.less?$/, '.css.map'));
    });
    filesToDelete.forEach((f) => {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
      }
    });
  });
  watcher.on('unlinkDir', function (path) {
    console.log(`Directory ${path} has been removed`);
  });
}

gulp.task(
  'watch-less',
  gulp.series('less', (cb) => {
    watchLess();
    cb();
  }),
);
