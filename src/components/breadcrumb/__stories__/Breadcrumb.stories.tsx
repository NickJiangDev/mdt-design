// import * as React from 'react';
import { Meta, ComponentStory } from '@storybook/react';
import Breadcrumb, { BreadcrumbItem } from '../index';
import Template1 from './Breadcrumb1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';

/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Breadcrumb1.demo';

export default {
  title: '组件/Breadcrumb',
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>显示当前页面在系统层级结构中的位置，并能向上返回。</Subtitle>
          <Template1 dirName="breadcrumb" subDirNames={['BreadcrumbItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Story: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem onClick={() => console.log('全部')}>全部</BreadcrumbItem>
    <BreadcrumbItem onClick={() => console.log('第一级')}>第一级</BreadcrumbItem>
    <BreadcrumbItem lastSeparator>文件名称</BreadcrumbItem>
  </Breadcrumb>
);

export const DefaultStory = Story.bind({});

DefaultStory.args = {
  prefixText: '下一页',
};
DefaultStory.storyName = 'Breadcrumb';
