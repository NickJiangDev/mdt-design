[![pipeline status](https://gitlab.idatatlas.com/new-datamap/mdt-design/badges/master/pipeline.svg)](https://gitlab.idatatlas.com/new-datamap/mdt-design/-/commits/master)
[![coverage report](https://gitlab.idatatlas.com/new-datamap/mdt-design/badges/master/coverage.svg)](https://gitlab.idatatlas.com/new-datamap/mdt-design/-/commits/master)


# MDT DESIGN

## Install

  ```sh
  npm install @datlas/design
  yarn add @datlas/design
  ```
## Usage

  ``` js
  import { loadTheme } from '@datlas/design/esm/components/style/themes';
  import { ThemeEnum } from '@datlas/design/esm/components/style/context';
  import Button from '@datlas/design/esm/components/button';

  loadTheme(ThemeEnum.dark);

  export default () => {
    <Button type="primary">button</Button>
  }

  ```

  可以添加 webpack alias 使引用路径变短
  ```js
  addWebpackAlias({ ["@@"]: path.resolve('./node_modules/@datlas/design/esm') })

  ```
  tsconfig:
  ```json
  {
    "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@@/*": ["./node_modules/@datlas/design/esm/*"]
    }
  }
  ```

  使用时
  ```js
  import Button from '@@/components/button';
  ```


## 可能遇到的问题

1. d.ts 报错，请添加 ignore-loader

    ```js
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    });

    ```

2. react 多实例问题 [https://github.com/facebook/react/issues/13991](https://github.com/facebook/react/issues/13991)

    ```js

    addWebpackAlias({ react: path.resolve('./node_modules/react')})

    ```

3. dayjs使用报错： Uncaught TypeError: xxxx is not a function

    由于组件库项目中使用到 `dayjs` 做一些轻量级的时间计算，所以外层在将引入 `dayjs` 时会有版本不同而造成方法缺失的问题，组件库提供的解决方案如下：
    
      1. 请将本地的 `dayjs` 保持和组件库版本一致

      2. 不方便改版本的话，可以使用dayjs提供的插件支持，将缺失的自行extend到本地项目中，[使用方法详见](https://day.js.org/docs/zh-CN/plugin/loading-into-nodejs)

      例如：

      ```js
        import isoWeek from 'dayjs/plugin/isoWeek';

        dayjs.extend(isoWeek);
      ```

## 本地开发

1. storybook开发，编写story

    ```sh
    yarn start
    ```

2. link到项目开发，在组件项目执行

    ```sh
    yarn dev
    yarn link
    ```
    在项目中执行 `yarn link "@datlas/design"`

3. 快速生成组件

    ```sh
    yarn gc 组件名
    ```

## 框架推荐工具及插件

基于 Storybook V6.2

* [@storybook/preset-create-react-app](https://www.npmjs.com/package/@storybook/preset-create-react-app) 此预设使用CRA的Webpack / Babel配置
* [storybook-preset-craco](https://www.npmjs.com/package/storybook-preset-craco) 使用[craco](https://github.com/gsoft-inc/craco)配置
* [craco-less](https://www.npmjs.com/package/craco-less) 编译less
* [craco-alias](https://www.npmjs.com/package/craco-alias) 用于为Webpack和Jest自动生成别名
* [@storybook/addon-links](https://www.npmjs.com/package/@storybook/addon-links) 用于创建在Storybook中的故事之间导航的链接
* [storybook-dark-mode](https://www.npmjs.com/package/storybook-dark-mode) 暗模式和亮模式之间切换
* [@storybook/addon-essentials](https://www.npmjs.com/package/@storybook/addon-essentials) 精选的插件集
* [@storybook/addon-postcss](https://storybook.js.org/addons/@storybook/addon-postcss) Storybook PostCSS预处理器
* [storybook-addon-react-docgen](https://storybook.js.org/addons/storybook-addon-react-docgen) 生成 Props 属性表
* [@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y) UI 可读性检测插件


### 样式规范

定义color，zindex变量, 后续放开stylelint检查

```json
"sh-waqar/declaration-use-variable": [
  [
    "/color/",
    "z-index"
  ]
]
```

### 开发规范

* 引用路径使用 `import from '.'` 替换为 `import from './index'`, [babel plugin bug](https://github.com/tleunen/babel-plugin-module-resolver/pull/409/commits/e6d9b87b5259637b6890b4d5e3dfa2dd21236de6)
* 测试文件放在 `__tests__` 目录
* storybook示例放在 `__stories__` 目录
* 组件 tsx 文件使用首字母大写
* 文件夹小写，中划线间隔
* 在某些情况下，您可能希望导出故事和非故事的混合体。例如，导出故事中使用的数据可能会很有用。为此，您可以在默认导出中使用可选字段includeStories和excludeStories配置字段，可以将其设置为字符串数组或正则表达式。按大写字母开头导出故事书， 小写字母开头导出数据。
  ``` js
  // MyComponent.stories.js

  import React from 'react';

  import MyComponent from './MyComponent';

  import someData from './data.json';

  export default {
    title: 'MyComponent',
    component: MyComponent,
    includeStories: /.*Story$/, // 👈 Storybook loads these stories
    excludeStories: /.*Data$/, // 👈 Storybook ignores anything that contains Data
  };

  export const simpleData = { foo: 1, bar: 'baz' };
  export const complexData = { foo: 1, foobar: { bar: 'baz', baz: someData } };

  export const SimpleStory = () => <MyComponent data={simpleData} />;
  export const ComplexStory = () => <MyComponent data={complexData} />;

  ```

## Features

  - [x] storybook
  - [x] eslint
  - [x] jest
  - [x] commit lint
  - [x] build svg to React Component
  - [x] build less to css
  - [x] build ts to es6
  - [x] build ts to commonjs
  - [x] minify css
  - [x] watch build
  - [x] auto publish
  - [x] ci build
  - [ ] umd/iife
