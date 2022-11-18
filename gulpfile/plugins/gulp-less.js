const path = require('path');
const accord = require('accord');
const through2 = require('through2');
const replaceExt = require('replace-ext');
const assign = require('object-assign');
const applySourceMap = require('vinyl-sourcemaps-apply');
const PluginError = require('plugin-error');
const less = accord.load('less');

const lessProcess = function (options) {
  const opts = assign(
    {},
    {
      compress: false,
      paths: [],
    },
    options,
  );
  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError('gulp-less', 'Streaming not supported'));
    }

    const str = file.contents.toString();

    // Injects the path of the current file
    opts.filename = file.path;

    // Bootstrap source maps
    if (file.sourceMap) {
      opts.sourcemap = true;
    }

    less
      .render(str, opts)
      .then(function (res) {
        file.contents = Buffer.from(res.result);
        file.path = replaceExt(file.path, '.css');
        if (res.sourcemap) {
          res.sourcemap.file = file.relative;
          res.sourcemap.sources = res.sourcemap.sources.map(function (source) {
            return path.relative(file.base, source);
          });

          applySourceMap(file, res.sourcemap);
        }
        return file;
      })
      .then(function (file) {
        cb(null, file);
      })
      .catch(function (err) {
        // Convert the keys so PluginError can read them
        err.lineNumber = err.line;
        err.fileName = err.filename;

        // Add a better error message
        err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;
        // console.log('compile less error: ', err.message);
        opts.onError && opts.onError(err);
        return cb(null, null);
      });
  });
};

module.exports = lessProcess;
