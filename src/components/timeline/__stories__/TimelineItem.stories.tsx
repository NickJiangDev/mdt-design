// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Timeline from '../index';
import TimelineItem, { TimeLineItemProps } from '../TimelineItem';
import Template1 from './Timeline1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Timeline1.demo';

export default {
  title: '组件/Timeline/TimelineItem',
  component: TimelineItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>TimelineItem。</Subtitle>
          <Template1 dirName="time-line" noDefault subDirNames={['TimelineItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Timelinetory: Story<TimeLineItemProps> = (args) => {
  return (
    <Timeline style={{ width: 600, border: '1px solid #5f6984' }}>
      <TimelineItem {...args}></TimelineItem>
    </Timeline>
  );
};
export const DefaultStory = Timelinetory.bind({});
DefaultStory.args = {
  children: '触发',
  dot: '1',
};
DefaultStory.storyName = 'TimelineItem';
