const path = require('path');

module.exports = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: 'storybook-preset-craco',
      options: {
        cracoConfigFile: path.resolve(__dirname, '../craco.config.js'),
      },
    },
    '@storybook/addon-links',
    'storybook-dark-mode',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    'storybook-addon-react-docgen',
    '@storybook/addon-a11y',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{ loader: require.resolve('react-docgen-typescript-loader') }],
    });

    /**
     * fix error : dumplicate rule https://github.com/webpack/webpack/issues/10843
     *    (1:1) Unknown word var
     *    var api = require("!../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
     */
    config.module.rules.splice(2, 1);
    const scopePluginIndex = config.resolve.plugins.findIndex(
      ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
    );

    config.resolve.plugins.splice(scopePluginIndex, 1);
    return config;
  },
};
