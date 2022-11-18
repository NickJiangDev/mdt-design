import { storiesOf } from '@storybook/react';
import { ComponentPreview } from '@/__stories-template__';
import GlobalFilter from '../index';
import Demo1 from './GlobalFilter.demo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw1 from '!!raw-loader!./GlobalFilter.demo';

const DIR_NAME = 'global-filter'; // 组件的文件夹名w
const stories = storiesOf('业务组件/GlobalFilter', module);

stories.addParameters({
  props: {
    propTables: [GlobalFilter],
    propTablesExclude: [ComponentPreview, Demo1],
  },
});

stories.add('基本用法', () => (
  <ComponentPreview dirName={DIR_NAME} code={raw1}>
    <Demo1 />
  </ComponentPreview>
));
