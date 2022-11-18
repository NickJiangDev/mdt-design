// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Slider, { SliderProps } from '../index';
import Template1 from './Slider1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Slider1.demo';

export default {
  title: '组件/Slider/Slider',
  component: Slider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>滑动输入条。</Subtitle>
          <Template1 dirName="slider" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Slidertory: Story<SliderProps> = (args) => {
  return <Slider {...args} />;
};
export const DefaultStory = Slidertory.bind({});
DefaultStory.args = {
  defaultValue: 30,
};
DefaultStory.storyName = 'Slider';
