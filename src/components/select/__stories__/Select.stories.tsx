// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Select, { SelectProps } from '../index';
import Template1 from './Select1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Select1.demo';

export default {
  title: '组件/Select/Select',
  component: Select,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>选择器。</Subtitle>
          <Template1 dirName="select" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Selecttory: Story<SelectProps> = (args) => {
  return <Select {...args} />;
};
export const DefaultStory = Selecttory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Select';
