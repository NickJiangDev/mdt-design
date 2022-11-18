const fs = require('fs');
const assign = require('object-assign');
const merge = require('lodash/merge');
const { getProjectPath } = require('./projectHelper');

function resolveConfig(config) {
  if (config.extends) {
    config = merge({}, resolveConfig(require(getProjectPath(config.extends))), config);
  }
  return config;
}

module.exports = function (isEsMoudule) {
  const configPath = isEsMoudule ? 'tsconfig.esm.json' : 'tsconfig.cjs.json';
  let my = {};
  if (fs.existsSync(getProjectPath(configPath))) {
    my = resolveConfig(require(getProjectPath(configPath)));
  }
  return assign(
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      target: 'es6',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true,
    },
    my.compilerOptions,
  );
};
