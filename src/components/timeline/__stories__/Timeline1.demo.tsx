import * as React from 'react';
import styled from '@emotion/styled';

import Icon from '@/components/icon';
import Timeline, { TimelineItem } from '@/components/timeline';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const StyledTagP = styled.div`
  margin: 0;
  padding: 0;
`;

const Dot: React.FC = () => {
  return <div>3</div>;
};

const Timeline1Demo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h4>不使用label</h4>
      <h5>default</h5>
      <Timeline style={{ width: 600, border: '1px solid #5f6984' }}>
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
      <h5>mode="right"</h5>
      <Timeline mode="right" style={{ width: 600, border: '1px solid #5f6984' }}>
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
      <h5>mode="alternate"</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
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
      <h4>自定义dot</h4>
      <h5>default</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h5>right</h5>
      <Timeline mode="right" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h5>alternate</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h4>使用label</h4>
      <h5>default</h5>
      <Timeline style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem label="星期五" dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期四" dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期三" dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h5>mode="right"</h5>
      <Timeline mode="right" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem label="星期五" dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期四" dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期三" dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h5>mode="alternate"</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem position="right" label="星期五" dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem position="left" label="星期四" dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期三" dot={<Dot />}>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h4>mode为alternate时可手动设置Item居左或右</h4>
      <h5>没有label</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem position="right">
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem position="left">
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem>
          <StyledTagP>2020-5-10 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
      <h5>有label</h5>
      <Timeline mode="alternate" style={{ width: 600, border: '1px solid #5f6984' }}>
        <TimelineItem position="right" label="星期五" dot={<Icon icon="done-check" />}>
          <StyledTagP>2020-5-12 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem position="left" label="星期四" dot={<Icon icon="time-clock" />}>
          <StyledTagP>2020-5-11 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label={<StyledTagP>2020-5-10 12:23:12</StyledTagP>} dot={<Dot />}>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
        <TimelineItem label="星期二">
          <StyledTagP>2020-5-09 12:23:12</StyledTagP>
          <StyledTagP>触发</StyledTagP>
        </TimelineItem>
      </Timeline>
    </DocPreview>
  );
};

export default Timeline1Demo;
