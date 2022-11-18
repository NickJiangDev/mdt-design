const gulp = require('gulp');
const through2 = require('through2');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge = require('merge2');
const isObjectLike = require('lodash/isObjectLike');
const path = require('path');
const fs = require('fs');
const tsConfig = require('./utils/getTsConfig');
const getBabelCommonConfig = require('./utils/getBabelCommonConfig');
const { cssInjection, svgInjection, iconInjection } = require('./utils/cssInjection');
const { compileStatus, cjsDir, esmDir } = require('./utils/constants');

const tsDefaultReporter = ts.reporter.defaultReporter();

const cwd = process.cwd();

const tsFiles = ['_tmp/**/*.ts', '_tmp/**/*.tsx', 'typings/**/*.d.ts'];

function babelify(js, isEsModule) {
  const babelConfig = getBabelCommonConfig(isEsModule);
  // delete babelConfig.cacheDirectory;
  const stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\.js$/)) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(iconInjection(svgInjection(cssInjection(content), isEsModule)));
        this.push(file);
        next();
      } else {
        next();
      }
    }),
  );
  return stream;
}

function injectDTS(js, isEsModule) {
  const stream = js.pipe(
    through2.obj(function (file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\.d.ts$/)) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(cssInjection(content), isEsModule);
        this.push(file);
        next();
      } else {
        next();
      }
    }),
  );
  return stream;
}

function compileTs(stream, isEsModule) {
  let error = 0;

  function replaceSrc(e, count = 0) {
    if (count > 2) return;
    for (const key in e) {
      if (Object.hasOwnProperty.call(e, key)) {
        const element = e[key];
        if (key == 'file' && e.file) {
          e.file.path = e.file.path.replace('_tmp/', 'src/');
        }
        if (element && isObjectLike(element)) {
          replaceSrc(element, count + 1);
        } else {
          e[key] = (element && element.replace && element.replace('_tmp/', 'src/')) || element;
        }
      }
    }
  }

  const tsResult = stream.pipe(
    ts(tsConfig(isEsModule), {
      error(e) {
        replaceSrc(e);
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    }),
  );
  function check() {
    if (error) {
      process.exit(1);
    }
  }
  tsResult.on('finish', check);
  tsResult.on('end', check);
  return merge([
    injectDTS(tsResult.dts,isEsModule).pipe(gulp.dest(cwd)),
    babelify(tsResult.js, isEsModule).pipe(gulp.dest(cwd)),
  ]);
}

function watchTs(isEsModule) {
  const cmpl = (file) => {
    const myPath = path.relative(cwd, file);
    compileTs(
      gulp.src([myPath, 'typings/**/*.d.ts'], {
        base: cwd,
      }),
      isEsModule,
    );
  };
  const status = compileStatus(isEsModule);

  const watcher = gulp.watch(tsFiles, function buildChangeTs(cb) {
    // 增加这个func，主要是看看编译状态
    cb();
  });
  watcher.on('change', function (path, stats) {
    console.log(status, `File ${path} was changed`);
    cmpl(path);
  });

  watcher.on('add', function (path, stats) {
    console.log(status, `File ${path} was added`);
    cmpl(path);
  });

  watcher.on('unlink', function (file, stats) {
    console.log(status, `File ${file} was deleted`);
    const filesToDelete = [];
    const relativeFile = file.slice('_tmp/'.length);
    const distDir = isEsModule ? esmDir : cjsDir;
    const distPath = path.join(distDir, relativeFile);
    filesToDelete.push(distPath.replace(/\.tsx?$/, '.js'));
    filesToDelete.push(distPath.replace(/\.tsx?$/, '.d.ts'));
    filesToDelete.forEach((f) => {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
      }
    });
  });
}

gulp.task('esm-js', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    }),
    true,
  ),
);

gulp.task(
  'watch-esm-js',
  gulp.series('esm-js', (cb) => {
    watchTs(true);
    cb();
  }),
);

gulp.task('cjs-js', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    }),
    false,
  ),
);

gulp.task(
  'watch-cjs-js',
  gulp.series('cjs-js', (cb) => {
    watchTs(false);
    cb();
  }),
);

module.exports = {
  compileTs,
};
