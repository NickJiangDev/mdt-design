// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import TreeSelect, { TreeSelectProps, TreeNode } from '../index';
import Template1 from './TreeSelect1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./TreeSelect1.demo';

export default {
  title: '组件/TreeSelect/TreeSelect',
  component: TreeSelect,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>树结构选择器。</Subtitle>
          <Template1 dirName="tree-select" code={code} />
        </>
      ),
    },
  },
} as Meta;

const TreeSelecttory: Story<TreeSelectProps> = (args) => {
  return <TreeSelect {...args} />;
};
export const DefaultStory = TreeSelecttory.bind({});
DefaultStory.args = {
  children: (
    <TreeNode value="parent 1" title="parent 1">
      <TreeNode value="parent 1-0" title="parent 1-0">
        <TreeNode value="leaf1" title="my leaf" />
        <TreeNode value="leaf2" title="your leaf" />
      </TreeNode>
      <TreeNode value="parent 1-1" title="parent 1-1">
        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
      </TreeNode>
    </TreeNode>
  ),
  showSearch: true,
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  placeholder: 'Please select',
  allowClear: true,
  treeDefaultExpandAll: true,
  notFoundContent: '无选项',
};
DefaultStory.storyName = 'TreeSelect';
