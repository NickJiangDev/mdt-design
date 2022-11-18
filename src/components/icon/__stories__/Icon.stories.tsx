import { storiesOf } from '@storybook/react';
import { ComponentPreview } from '@/__stories-template__';
import { Icon } from '../index';
import Demo1 from './Icon1.demo';
import Demo2 from './Icon2.demo';
import Demo3 from './Icon3.demo';
import Demo5 from './Icon5.demo';
import Demo6 from './Icon6.demo';
/* eslint-disable import/no-webpack-loader-syntax */
import raw1 from '!!raw-loader!./Icon1.demo';

const DIR_NAME = 'icon'; // 组件的文件夹名
const stories = storiesOf('图标Icon/Icon', module);

stories.addParameters({
  props: {
    propTables: [Icon],
    propTablesExclude: [ComponentPreview, Demo1, Demo2, Demo3, Demo5, Demo6],
  },
});

stories.add('基本用法', () => (
  <ComponentPreview dirName={DIR_NAME} code={raw1}>
    <Demo1 />
  </ComponentPreview>
));

stories.add('图标列表', () => (
  <ComponentPreview>
    <Demo2 />
  </ComponentPreview>
));

stories.add('标准图标-Material Icon', () => (
  <ComponentPreview>
    <Demo3 />
  </ComponentPreview>
));

stories.add('自定义图标', () => (
  <ComponentPreview>
    <Demo5 />
  </ComponentPreview>
));

stories.add('插画图标', () => (
  <ComponentPreview>
    <Demo6 />
  </ComponentPreview>
));
