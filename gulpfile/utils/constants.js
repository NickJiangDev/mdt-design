const { getProjectPath } = require('./projectHelper');

const cjsDir = getProjectPath('cjs');
const esmDir = getProjectPath('esm');

function compileStatus(isEsModule) {
  return isEsModule ? '[ESM Mode]' : '[CJS Mode]';
}

module.exports = {
  cjsDir,
  esmDir,
  compileStatus,
};
