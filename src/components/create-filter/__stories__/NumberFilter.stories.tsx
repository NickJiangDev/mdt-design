// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import NumberFilter, { NumberFilterProps, NumberFilterTypeSet } from '../NumberFilter';
import Template1 from './NumberFilter1.demo';
import Button from '@/components/button';
import { Subtitle, Title } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./NumberFilter1.demo';

export default {
  title: '组件/CreateFilter/NumberFilter',
  component: NumberFilter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>数字范围的浮动展示块。</Subtitle>
          <Template1 dirName="create-filter" noDefault subDirNames={['NumberFilter']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const NumberFiltertory: Story<NumberFilterProps> = (args) => {
  return <NumberFilter {...args} />;
};
export const DefaultStory = NumberFiltertory.bind({});
DefaultStory.args = {
  children: <Button>Open</Button>,
  labelMax: '最大值',
  labelMin: '最小值',
  min: 12,
  max: 121212,
  statisticMin: 12,
  statisticMax: 4444,
  type: NumberFilterTypeSet.segment,
  segmentation: [{ min: 20, max: 100 }],
};
DefaultStory.storyName = 'NumberFilter';
