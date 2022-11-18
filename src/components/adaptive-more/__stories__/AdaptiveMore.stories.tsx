// import * as React from 'react';
import { Meta } from '@storybook/react';

import CanvasColorPicker from '../AdaptiveMore';
import Template1 from './AdaptiveMore1.demo';

export default {
  title: '组件/AdaptiveMore/AdaptiveMore',
  component: CanvasColorPicker,
} as Meta;

export const DefaultStory = Template1.bind({});
DefaultStory.storyName = 'AdaptiveMore';
