import { Meta, Story } from '@storybook/react';
import { Title, Subtitle, Description } from '@storybook/addon-docs';
import TreeCheckList, { TreeLabelValueItemInterface, TreeCheckListProps } from '../TreeCheckList';
import Demo4 from './CheckList4.demo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import raw4 from '!!raw-loader!./CheckList4.demo';

const treeData: TreeLabelValueItemInterface[] = [];
for (let i = 0; i < 5; i++) {
  const item: TreeLabelValueItemInterface = {
    title: `文字${i}`,
    key: `key-${i}`,
    children: [],
  };
  for (let j = 0; j < 30; j++) {
    item.children?.push({
      title: `文字${i}-${j}`,
      key: `key-${i}-${j}`,
    });
  }
  treeData.push(item);
}

export default {
  title: '组件/CheckList/4.CheckList-Tree',
  component: TreeCheckList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>复选框列表的树形结构</Subtitle>
          <Description>*属性继承自rc-tree</Description>
          <Demo4 dirName="check-list" subDirNames={['TreeCheckList']} noDefault code={raw4} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<TreeCheckListProps> = (args) => {
  return <TreeCheckList {...args} />;
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  noContentText: '暂无数据',
  noResultText: '搜索无结果',
  placeholder: '搜索字段',
  loading: false,
  options: treeData,
};
DefaultStory.storyName = '4.CheckList-Tree';
