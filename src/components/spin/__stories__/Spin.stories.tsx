// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Spin, { SpinProps } from '../index';
import Template1 from './Spin1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Spin1.demo';

export default {
  title: '组件/Spin/Spin',
  component: Spin,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>用于页面和区块的加载中状态。</Subtitle>
          <Template1 dirName="spin" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Spintory: Story<SpinProps> = (args) => {
  return <Spin {...args} />;
};
export const DefaultStory = Spintory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Spin';
