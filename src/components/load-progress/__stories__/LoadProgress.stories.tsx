// import * as React from 'react';
import { Meta } from '@storybook/react';

import LoadProgress from '../LoadProgress';
import Template1 from './LoadProgress1.demo';

export default {
  title: '组件/LoadProgress/LoadProgress',
  component: LoadProgress,
} as Meta;

export const DefaultStory = Template1.bind({});
DefaultStory.args = {
  animationDuration: 200,
  incrementDuration: 800,
  isAnimating: false,
  minimum: 0.08,
};
DefaultStory.storyName = 'LoadProgress';
