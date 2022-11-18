// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import VirtualizedList, { VirtualizedListProps } from '../index';
import Template1 from './List1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./List1.demo';

export default {
  title: '组件/VirtualizedList/VirtualizedList',
  component: VirtualizedList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>虚拟滚动列表。</Subtitle>
          <Template1 dirName="virtualized-list" code={code} />
        </>
      ),
    },
  },
} as Meta;

const VirtualizedListtory: Story<VirtualizedListProps> = (args) => {
  return <VirtualizedList {...args} />;
};
export const DefaultStory = VirtualizedListtory.bind({});
DefaultStory.args = {
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
    return {
      id: `index-${i}`,
    };
  }),
  ItemView: ({ item, className, style }) => {
    return (
      <div style={{ ...style, height: item.height }} className={className}>
        {item.id}
      </div>
    );
  },
  width: 300,
  height: 100,
};
DefaultStory.storyName = 'VirtualizedList';
