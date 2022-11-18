// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Dot, { DotProps } from '../index';
import Template1 from './Dot1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Dot1.demo';

export default {
  title: '组件/Dot/Dot',
  component: Dot,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>状态灯。</Subtitle>
          <Template1 dirName="dot" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dottory: Story<DotProps> = (args) => {
  return <Dot {...args} />;
};
export const DefaultStory = Dottory.bind({});
DefaultStory.args = {
  text: '运行中',
};
DefaultStory.storyName = 'Dot';
