// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import GroupVirtualizedList, { GroupVirtualListProps } from '../GroupVirtualizedList';
import Template1 from './List3.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./List3.demo';

export default {
  title: '组件/VirtualizedList/GroupVirtualizedList',
  component: GroupVirtualizedList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>虚拟滚动列表 - 分组。</Subtitle>
          <Template1
            dirName="virtualized-list"
            noDefault
            subDirNames={['GroupVirtualizedList']}
            code={code}
          />
        </>
      ),
    },
  },
} as Meta;

const GroupVirtualizedListtory: Story<GroupVirtualListProps> = (args) => {
  return <GroupVirtualizedList {...args} />;
};
export const DefaultStory = GroupVirtualizedListtory.bind({});
DefaultStory.args = {
  data: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((index) => {
    return {
      title: index,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        return {
          title: `${index}-${i}`,
        };
      }),
    };
  }),
  ItemView: ({ item, className }) => {
    return (
      <div
        className={className}
        style={{
          height: 40,
          color: '#D4D9EB',
          marginBottom: 4,
          boxSizing: 'border-box',
        }}
      >
        <p style={{ margin: 0, padding: 0 }}>{item.title}</p>
      </div>
    );
  },
  GroupView: ({ item, className }) => {
    return (
      <div className={className} style={{ color: '#5F6984', height: 20, lineHeight: 1 }}>
        {item.title}
      </div>
    );
  },
  width: 300,
  height: 400,
  defaultHeight: 20,
};
DefaultStory.storyName = 'GroupVirtualizedList';
