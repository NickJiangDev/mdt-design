// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Radio, { RadioProps } from '../index';
import Template1 from './Radio1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Radio1.demo';

export default {
  title: '组件/Radio/Radio',
  component: Radio,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>单选。</Subtitle>
          <Template1 dirName="radio" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Radiotory: Story<RadioProps> = (args) => {
  return <Radio {...args} />;
};
export const DefaultStory = Radiotory.bind({});
DefaultStory.args = {
  children: 'radio',
};
DefaultStory.storyName = 'Radio';
