// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Progress, { ProgressProps } from '../index';
import Template1 from './Progress1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Progress1.demo';

export default {
  title: '组件/Progress/Progress',
  component: Progress,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>进度条。</Subtitle>
          <Template1 dirName="progress" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Progresstory: Story<ProgressProps> = (args) => {
  return <Progress {...args} />;
};
export const DefaultStory = Progresstory.bind({});
DefaultStory.args = {
  percent: 50,
};
DefaultStory.storyName = 'Progress';
