const gulp = require('gulp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const { cjsDir, esmDir } = require('./gulpfile/utils/constants');
const { getProjectPath } = require('./gulpfile/utils/projectHelper');

require('./gulpfile/tsc');
require('./gulpfile/less');
require('./gulpfile/assets');

const cwd = process.cwd();

const srcFiles = [
  'src/**/*',
  '!node_modules/**/*.*',
  '!**/__stories-template__/**',
  '!**/__tests__/**',
  '!**/__stories__/**',
  '!**/*.stories.*',
];

function watchFiles() {
  const cmpl = (file) => {
    const myPath = path.relative(cwd, file);
    gulp.src([myPath], { base: path.join(cwd, 'src') }).pipe(gulp.dest(getProjectPath('_tmp')));
  };

  const watcher = gulp.watch(srcFiles, function asyncFile(cb) {
    // 增加这个func，主要是看看编译状态
    cb();
  });
  watcher.on('change', function (path, stats) {
    console.log(`[async] File ${path} was changed`);
    cmpl(path);
  });

  watcher.on('add', function (path, stats) {
    console.log(`[async] File ${path} was added`);
    cmpl(path);
  });

  watcher.on('unlink', function (file, stats) {
    console.log(`[async] File ${file} was deleted`);
    const relativeFile = file.slice('src/'.length);
    const fileToDelete = path.join('_tmp', relativeFile);

    if (fs.existsSync(fileToDelete)) {
      fs.unlinkSync(fileToDelete);
    }
  });
}

/**
 * 大家先同步到tmp工作，再编译, 
 * 因为svg先生成ts文件，避免污染src
 */
gulp.task('move', function () {
  return gulp.src(srcFiles).pipe(gulp.dest('_tmp'));
});
gulp.task(
  'watch-move',
  gulp.series('move', (cb) => {
    watchFiles();
    cb();
  }),
);

gulp.task('clean-esm', (cb) => {
  rimraf.sync('_tmp');
  rimraf.sync(esmDir);
  cb();
});

gulp.task('clean-cjs', (cb) => {
  rimraf.sync('_tmp');
  rimraf.sync(cjsDir);
  cb();
});

gulp.task('clean', (cb) => {
  rimraf.sync('_tmp');
  rimraf.sync(cjsDir);
  rimraf.sync(esmDir);
  cb();
});

gulp.task(
  'watch-a',
  gulp.series(
    'clean',
    'watch-move',
    'watch-assets',
  ),
);
// assets: tmp => dist; svg: tmp => tmp
// ELSE: tmp => dist;
gulp.task('esm', gulp.series('clean-esm', 'move', 'assets', gulp.parallel('esm-js', 'less')));
gulp.task('cjs', gulp.series('clean-cjs', 'move', 'assets', gulp.parallel('cjs-js', 'less')));
gulp.task(
  'watch-esm',
  gulp.series('clean-esm', 'watch-move', 'watch-assets', gulp.parallel('watch-esm-js', 'watch-less')),
);
gulp.task(
  'watch-cjs',
  gulp.series('clean-cjs', 'watch-move', 'watch-assets', gulp.parallel('watch-cjs-js', 'watch-less')),
);

gulp.task(
  'watch',
  gulp.series(
    'watch-a',
    gulp.parallel('watch-esm-js', 'watch-cjs-js', 'watch-less'),
  ),
);
// build all
gulp.task(
  'default',
  gulp.series('clean', 'move', 'assets', gulp.parallel('esm-js', 'cjs-js', 'less')),
);
