const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');
const jestConfig = require('./jest.config.js');
const assign = require('lodash/assign');
const merge = require('lodash/merge');

module.exports = {
  jest: {
    configure: (config, { env, paths, resolve, rootDir }) => {
      return assign(config, jestConfig, {transform: merge(config.transform, jestConfig.transform)});
    },
  },
  plugins: [
    { plugin: CracoLessPlugin },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './',
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
        ],
      });
      return config;
    },
  },
};
