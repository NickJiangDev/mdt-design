// import * as React from 'react';
import { Meta } from '@storybook/react';

import CanvasColorPicker from '../CanvasColorPicker';
import Template1 from './CanvasColorPicker1.template';
import Template2 from './CanvasColorPicker2.template';

export default {
  title: '组件/CanvasColorPicker/CanvasColorPicker',
  component: CanvasColorPicker,
} as Meta;

export const DefaultStory = Template1.bind({});
DefaultStory.args = {
  visible: false,
};
DefaultStory.storyName = '基本用法';

export const FollowMouseStory = Template1.bind({});
FollowMouseStory.args = {
  visible: false,
  magnifierFollowMouse: true,
  displayColorInfo: true,
};
FollowMouseStory.storyName = '取色器跟随光标';

export const DiffCanvasStory = Template2.bind({});
DiffCanvasStory.args = {
  visible: true,
  magnifierFollowMouse: true,
  displayColorInfo: false,
};
DiffCanvasStory.storyName = '获取光标定位 canvas 与实际取色 canvas 不同';
