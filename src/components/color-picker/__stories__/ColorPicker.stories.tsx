// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import ColorPicker, { ColorPickerProps } from '../index';
import Template1 from './ColorPicker1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./ColorPicker1.demo';

export default {
  title: '组件/ColorPicker/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>颜色指示器。</Subtitle>
          <Template1 dirName="color-picker" code={code} />
        </>
      ),
    },
  },
} as Meta;

const ColorPickertory: Story<ColorPickerProps> = (args) => {
  return <ColorPicker {...args} />;
};
export const DefaultStory = ColorPickertory.bind({});
DefaultStory.args = {
  color: '#fff',
};
DefaultStory.storyName = 'ColorPicker';
