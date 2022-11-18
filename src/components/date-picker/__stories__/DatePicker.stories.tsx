// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import DatePicker from '../index';
import Template1 from './DatePicker1.demo';
import { Dayjs } from 'dayjs';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DatePicker1.demo';
import { PickerProps } from '../generatePicker';

export default {
  title: '组件/DatePicker/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>输入或选择日期的控件。</Subtitle>
          <Template1 dirName="date-picker" code={code} />
        </>
      ),
    },
  },
} as Meta;

const DatePickertory: Story<PickerProps<Dayjs>> = (args) => {
  return <DatePicker {...args} />;
};
export const DefaultStory = DatePickertory.bind({});
DefaultStory.args = {
  showTime: true,
};
DefaultStory.storyName = 'DatePicker';
