// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import DateFilter, { DateFilterProps } from '../DateFilter';
import Template1 from './DateFilter1.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DateFilter1.demo';

export default {
  title: '组件/CreateFilter/DateFilter',
  component: DateFilter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>日期格式的浮动展示块。</Subtitle>
          <Template1 dirName="create-filter" noDefault subDirNames={['DateFilter']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const DateFiltertory: Story<DateFilterProps> = (args) => {
  return <DateFilter {...args} />;
};
export const DefaultStory = DateFiltertory.bind({});
DefaultStory.args = {
  children: <Button>Open</Button>,
};
DefaultStory.storyName = 'DateFilter';
