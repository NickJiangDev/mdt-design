const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const gulpSvgr = require('./plugins/gulp-svgr');
const { cjsDir, esmDir } = require('./utils/constants');
const { template } = require('./plugins/svgr.config');
const cwd = process.cwd();

const svgFiles = '_tmp/**/*.svg';

function getSvgJsPath(file) {
  const iconPath = file.split(/[\/\\]/);
  const filename = iconPath[iconPath.length - 1].split('.')[0];
  iconPath[iconPath.length - 1] = filename;
  const iconName = camelcase(iconPath[iconPath.length - 1], { pascalCase: true });
  return path.join(path.dirname(file), `${iconName}.tsx`);
}

function compileSvg(stream) {
  return stream
    .pipe(gulp.dest('cjs'))
    .pipe(gulp.dest('esm'))
    .pipe(
      gulpSvgr({
        // You can pass any svgr options
        svgr: {
          template: template,
          typescript: true,
          // icon: true,
          plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        },
        createIndex: false,
        extension: 'tsx',
      }),
    )
    .pipe(gulp.dest('_tmp'));
}

gulp.task('svg', function () {
  return compileSvg(gulp.src(svgFiles, { base: path.join(cwd, '_tmp') }));
});

function watchSvg() {
  const cmpl = (file) => {
    const myPath = path.relative(cwd, file);
    compileSvg(gulp.src([myPath], { base: path.join(cwd, '_tmp') }));
  };

  const watcher = gulp.watch(svgFiles, function buildChangeSvg(cb) {
    // 增加这个func，主要是看看编译状态
    cb();
  });
  watcher.on('change', function (path, stats) {
    console.log(`[assets] File ${path} was changed`);
    cmpl(path);
  });

  watcher.on('add', function (path, stats) {
    console.log(`[assets] File ${path} was added`);
    cmpl(path);
  });

  watcher.on('unlink', function (file, stats) {
    console.log(`[assets] File ${file} was deleted`);
    const filesToDelete = [];
    [cjsDir, esmDir].forEach((d) => {
      const relativeFile = file.slice('_tmp/'.length);
      const distPath = path.join(d, relativeFile);
      // 删除dist svg
      filesToDelete.push(distPath);
    });
    // 删除 tmp tsx
    filesToDelete.push(getSvgJsPath(file));

    filesToDelete.forEach((f) => {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
      }
    });
  });
}

gulp.task(
  'watch-svg',
  gulp.series('svg', (cb) => {
    watchSvg();
    cb();
  }),
);

gulp.task('assets', gulp.parallel('svg'));
gulp.task('watch-assets', gulp.parallel('watch-svg'));
