// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioNav, { RadioNavProps } from '../RadioNav';
import Template4 from './Radio4.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Radio4.demo';

export default {
  title: '组件/Radio/RadioNav',
  component: RadioNav,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>单选导航。</Subtitle>
          <Template4 dirName="radio" code={code} />
        </>
      ),
    },
  },
} as Meta;

const RadioNavtory: Story<RadioNavProps> = (args) => {
  return <RadioNav {...args}>常规</RadioNav>;
};
export const DefaultStory = RadioNavtory.bind({});
DefaultStory.storyName = 'RadioNav';
