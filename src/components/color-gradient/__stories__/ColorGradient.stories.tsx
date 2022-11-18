// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ColorGradient, { ColorGradientProps } from '../ColorGradient';
import Template1 from './ColorGradient1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./ColorGradient1.demo';

export default {
  title: '组件/ColorGradient/ColorGradient',
  component: ColorGradient,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>颜色渐变的进度条。</Subtitle>
          <Template1 dirName="color-gradient" code={code} />
        </>
      ),
    },
  },
} as Meta;

const ColorGradienttory: Story<ColorGradientProps> = (args) => {
  return <ColorGradient {...args} />;
};
export const DefaultStory = ColorGradienttory.bind({});
DefaultStory.args = {
  color: '#ddd',
  stops: [
    {
      color: '#9adafa',
      offset: 0,
    },
    {
      color: '#000',
      offset: 0.5,
    },
    {
      color: '#028080',
      offset: 1,
    },
  ],
};
DefaultStory.storyName = 'ColorGradient';
