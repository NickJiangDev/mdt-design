// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import TimePicker, { TimePickerProps } from '../index';
import dayjs from 'dayjs';
import Template1 from './TimePicker1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./TimePicker1.demo';

export default {
  title: '组件/TimePicker/TimePicker',
  component: TimePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>时间选择。</Subtitle>
          <Template1 dirName="time-picker" code={code} />
        </>
      ),
    },
  },
} as Meta;

const TimePickertory: Story<TimePickerProps> = (args) => {
  return <TimePicker {...args} />;
};
export const DefaultStory = TimePickertory.bind({});
DefaultStory.args = {
  defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss'),
};
DefaultStory.storyName = 'TimePicker';
