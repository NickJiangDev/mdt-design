const { default: svgr } = require('@svgr/core');
const through = require('through2');
const PluginError = require('plugin-error');
const path = require('path');
const camelcase = require('camelcase');
const prettier = require('prettier');
const Vinyl = require('vinyl');

const PLUGIN_NAME = 'gulp-svgr';

async function prettify(content) {
  const prettierConfigPath = await prettier.resolveConfigFile();
  const prettierConfig = await prettier.resolveConfig(prettierConfigPath);
  return prettier.format(content, {
    ...prettierConfig,
    parser: 'babel',
  });
}

function getDefaultIcon(name, icons) {
  return icons[icons.length - 1];
}

async function createAggregatedFile(name, icons, options) {
  const aggregation = options.aggregate[0];

  const defaultIconFn = options.aggregateDefault || getDefaultIcon;
  const defaultIcon = defaultIconFn(name, icons);

  const renderIconImport = ([, componentName]) => {
    // language=JSX Harmony
    return `import ${componentName} from './${componentName}';`;
  };

  const renderIcon = (componentName) => {
    return `<${componentName} {...props} />;`;
  };

  const renderIconCase = ([variant, componentName]) => {
    return `
      case '${variant}':
        return ${renderIcon(componentName)};
    `;
  };

  const defaultIconRendered = defaultIcon && defaultIcon[1] ? renderIcon(defaultIcon[1]) : 'null';

  // language=JSX Harmony
  const content = `
    import React from 'react';
    ${icons.map(renderIconImport).join('\n')}

    export default function ${name}({ ${aggregation}, ...props }) {
      switch (${aggregation}) {
        ${icons.map(renderIconCase).join('\n')}
        default:
          return ${defaultIconRendered};
      }
    }

    ${name}.variations = {
      ${aggregation}: [${icons.map((icon) => `'${icon[0]}'`).join(',')}]
    };
  `;

  return prettify(content);
}

async function createAllIconsFile(icons) {
  const content = icons
    .map(
      (icon) =>
        // language=JSX Harmony
        `export { default as ${icon.name} } from './${icon.path}';`,
    )
    .join('\n');

  return prettify(content);
}

module.exports = function gulpSvgr(options) {
  const { prefix = 'Icon', svgr: svgrOptions, aggregate, createIndex, extension = 'jsx' } = options;

  const allIcons = [];
  const baseIconsMap = {};

  if (aggregate && !Array.isArray(aggregate)) {
    throw new PluginError(PLUGIN_NAME, "'aggregate' should be an array");
  }
  if (aggregate && aggregate.length > 1) {
    throw new PluginError(
      PLUGIN_NAME,
      `Aggregating by multiple dimensions is not supported. Got '${aggregate.join(',')}'`,
    );
  }

  return through.obj(
    async function (file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      } else if (file.isBuffer()) {
        const fileContent = file.contents.toString();
        const iconPath = file.relative.split(/[\/\\]/);
        iconPath[iconPath.length - 1] = file.stem;
        iconPath.unshift(prefix || '');
        const iconName = camelcase(iconPath[iconPath.length - 1], { pascalCase: true });
        const basePath = iconPath.slice(0, iconPath.length - 1);

        if (aggregate) {
          // Group icons by aggregator
          const baseIcon = camelcase(basePath, { pascalCase: true });
          if (!baseIconsMap[baseIcon]) {
            baseIconsMap[baseIcon] = {
              path: basePath.slice(1),
              icons: [],
            };
          }
          baseIconsMap[baseIcon].icons.push([file.stem, iconName]);
        }

        const jsCode = await svgr(fileContent, svgrOptions, {
          componentName: iconName,
        });

        const newFile = file.clone({ contents: false });
        newFile.contents = Buffer.from(jsCode, 'utf-8');
        newFile.path = path.join(path.dirname(file.path), `${iconName}.${extension}`);
        this.push(newFile);

        allIcons.push({
          name: iconName,
          path: [...basePath.slice(1), iconName].join('/'),
        });

        callback(null);
      } else {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Unknown file type'));
      }
    },
    async function (cb) {
      if (aggregate) {
        // Do not save normal files
        allIcons.length = 0;

        // Save aggregated files
        for (const [iconName, info] of Object.entries(baseIconsMap)) {
          const combined = await createAggregatedFile(iconName, info.icons, options);
          const filename = 'index.' + extension;
          const newFile = new Vinyl({
            cwd: '',
            base: null,
            path: path.join(...info.path, filename),
            contents: Buffer.from(combined, 'utf-8'),
          });
          this.push(newFile);
          allIcons.push({
            name: iconName,
            path: info.path.join('/'),
          });
        }
      }

      if (createIndex) {
        allIcons.sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        // Создаем общий файл со списком всех иконок
        const allIconsCombined = await createAllIconsFile(allIcons);
        this.push(
          new Vinyl({
            cwd: '',
            base: null,
            path: typeof createIndex === 'string' ? createIndex : 'index.' + extension,
            contents: Buffer.from(allIconsCombined, 'utf-8'),
          }),
        );
      }

      cb();
    },
  );
};
