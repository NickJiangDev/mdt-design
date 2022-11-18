// import * as React from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import Template1 from './Breadcrumb1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';

/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Breadcrumb1.demo';

export default {
  title: '组件/Breadcrumb/BreadcrumbItem',
  component: BreadcrumbItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>面包屑的子节点</Subtitle>
          <Template1 dirName="breadcrumb" subDirNames={['BreadcrumbItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Story: ComponentStory<typeof BreadcrumbItem> = (args) => (
  <Breadcrumb prefixText="下一页">
    <BreadcrumbItem {...args} />
    <BreadcrumbItem {...args} />
    <BreadcrumbItem {...args} />
  </Breadcrumb>
);

export const DefaultStory = Story.bind({});

DefaultStory.args = {
  children: '全部',
};
DefaultStory.storyName = 'BreadcrumbItem';
