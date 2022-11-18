import { storiesOf } from '@storybook/react';
import { ComponentPreview } from '@/__stories-template__';
import MapBaseChange from '../MapBaseChange';
import Demo1 from './MapBaseChange1.demo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw1 from '!!raw-loader!./MapBaseChange1.demo';

const DIR_NAME = 'map-base-change'; // 组件的文件夹名
const stories = storiesOf('业务组件/MapBaseChange', module);

stories.addParameters({
  props: {
    propTables: [MapBaseChange],
    propTablesExclude: [ComponentPreview, Demo1],
  },
});

stories.add('基本用法', () => (
  <ComponentPreview dirName={DIR_NAME} code={raw1}>
    <Demo1 />
  </ComponentPreview>
));
