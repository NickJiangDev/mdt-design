// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Timeline, { TimelineItem, TimelineProps } from '../index';
import Template1 from './Timeline1.demo';
import styled from '@emotion/styled';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Timeline1.demo';

export default {
  title: '组件/Timeline/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>时间线（和TimelineItem结合使用）。</Subtitle>
          <Template1 dirName="time-line" subDirNames={['TimelineItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const StyledTagP = styled.div`
  margin: 0;
  padding: 0;
`;

const Timelinetory: Story<TimelineProps> = (args) => {
  return (
    <Timeline {...args}>
      <TimelineItem>
        <StyledTagP>2020-5-12 12:23:12</StyledTagP>
        <StyledTagP>触发</StyledTagP>
      </TimelineItem>
      <TimelineItem>
        <StyledTagP>2020-5-11 12:23:12</StyledTagP>
        <StyledTagP>触发</StyledTagP>
      </TimelineItem>
      <TimelineItem>
        <StyledTagP>2020-5-10 12:23:12</StyledTagP>
        <StyledTagP>触发</StyledTagP>
      </TimelineItem>
    </Timeline>
  );
};
export const DefaultStory = Timelinetory.bind({});
DefaultStory.args = {
  style: { width: 600, border: '1px solid #5f6984' },
};
DefaultStory.storyName = 'Timeline';
