const { resolve, isThereHaveBrowserslistConfig } = require('./projectHelper');

module.exports = function (isEsModule) {
  const plugins = [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true,
      },
    ],
    // resolve('babel-plugin-inline-import-data-uri'),
    resolve('@babel/plugin-transform-member-expression-literals'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-transform-property-literals'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: isEsModule === true,
        version: '^7.10.4',
      },
    ],
    resolve('@babel/plugin-transform-spread'),
    resolve('@babel/plugin-transform-template-literals'),
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        legacy: true,
      },
    ],
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-proposal-optional-chaining'),
    resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
    [
      resolve('babel-plugin-module-resolver'),
      {
        root: [isEsModule ? './esm' : './cjs'],
        alias: {
          '@': isEsModule ? './esm' : './cjs',
        },
      },
    ],
  ];
  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules: isEsModule ? false : 'auto',
          targets: isThereHaveBrowserslistConfig()
            ? undefined
            : {
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
              },
        },
      ],
    ],
    plugins,
  };
};
