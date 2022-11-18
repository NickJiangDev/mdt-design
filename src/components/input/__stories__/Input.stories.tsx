// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Input, { InputProps } from '../Input';
import Template1 from './Input1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Input1.demo';

export default {
  title: '组件/Input/Input',
  component: Input,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>文字标签。</Subtitle>
          <Template1 dirName="input" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Inputtory: Story<InputProps> = (args) => <Input {...args} />;
export const DefaultStory = Inputtory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Input';
