import { storiesOf } from '@storybook/react';
import { ComponentPreview } from '@/__stories-template__';
import MapControl from '../index';
import Demo1 from './MapControl.demo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw1 from '!!raw-loader!./MapControl.demo';

const DIR_NAME = 'map-control'; // 组件的文件夹名
const stories = storiesOf('业务组件/MapControl', module);

stories.addParameters({
  props: {
    propTables: [MapControl],
    propTablesExclude: [ComponentPreview, Demo1],
  },
});

stories.add('基本用法', () => (
  <ComponentPreview dirName={DIR_NAME} code={raw1}>
    <Demo1 />
  </ComponentPreview>
));
