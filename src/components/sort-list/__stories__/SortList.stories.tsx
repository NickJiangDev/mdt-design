// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SortList, { SortListProps } from '../index';
import Template1 from './SortList1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SortList1.demo';

export default {
  title: '组件/SortList/SortList - 非受控',
  component: SortList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>拖拽排序列表(非受控)。</Subtitle>
          <Template1 dirName="sort-list" code={code} />
        </>
      ),
    },
  },
} as Meta;

const SortListtory: Story<SortListProps> = (args) => {
  return <SortList {...args} />;
};
export const DefaultStory = SortListtory.bind({});
DefaultStory.args = {
  defaultList: [
    { label: '列表1', value: '1' },
    { label: '列表2', value: '2' },
  ],
  removable: true,
  visibleUpDown: true,
  listHeight: 500,
  useVirtual: false,
};
DefaultStory.storyName = 'SortList - 非受控';
