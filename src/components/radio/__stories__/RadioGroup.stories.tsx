// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioGroup, { RadioGroupProps } from '../RadioGroup';
import Template3 from './Radio3.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Radio3.demo';

export default {
  title: '组件/Radio/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>单选组。</Subtitle>
          <Template3 dirName="radio" code={code} />
        </>
      ),
    },
  },
} as Meta;

const RadioGrouptory: Story<RadioGroupProps> = (args) => {
  return <RadioGroup {...args} />;
};
export const DefaultStory = RadioGrouptory.bind({});
DefaultStory.args = {
  value: '苹果',
  options: ['橘子', '橙子', '苹果', '香蕉', '火龙果'],
};
DefaultStory.storyName = 'RadioGroup';
