// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { TreeNode, CascadeCheckListWrapProps } from '../index';
import CascadeCheckList from '../CascadeCheckListWrap';
import Template1 from './CascadeCheckList1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./CascadeCheckList1.demo';

export default {
  title: '组件/CascadeCheckList/CascadeCheckList',
  component: CascadeCheckList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>多层级的Checklist展示组件。</Subtitle>
          <Template1 dirName="cascade-check-list" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<CascadeCheckListWrapProps> = (args) => <CascadeCheckList {...args} />;

export const DefaultStory = Template.bind({});

DefaultStory.args = {
  data: [
    {
      id: 'A1',
      val: 'looooooooog value A',
      children: [
        {
          id: 'B1',
          val: 'B',
          children: [
            {
              id: 'D1',
              val: 'D',
              children: [] as TreeNode[],
            },
            {
              id: 'E1',
              val: 'E',
              children: [] as TreeNode[],
            },
          ],
        },
        {
          id: 'C1',
          val: 'C',
          children: [
            {
              id: 'F1',
              val: 'F',
              children: [] as TreeNode[],
            },
            {
              id: 'G1',
              _id: ['A1', 'C1', 'G1'], // 叶子节点可选通路数据，勾选变化时优先返回通路
              val: 'G',
              children: [] as TreeNode[],
            },
          ],
        },
      ],
    },
    {
      id: 'H1',
      val: 'H',
      children: [],
    },
  ],
};
DefaultStory.storyName = 'CascadeCheckList';
