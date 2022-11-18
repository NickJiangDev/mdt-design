// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SortList, { SortListProps } from '../index';
import Template1 from './SortList1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SortList1.demo';

export default {
  title: '组件/SortList/SortList - 虚拟滚动',
  component: SortList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>拖拽排序列表(虚拟滚动)。</Subtitle>
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
  list: new Array(100).fill('').map((_, i) => {
    return { label: `列表${i}`, value: `${i}` };
  }),
  removable: true,
  visibleUpDown: true,
  listHeight: 800,
  useVirtual: true,
};
DefaultStory.storyName = 'SortList - 虚拟滚动';
