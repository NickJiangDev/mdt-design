// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Pagination, { PaginationProps } from '../index';
import Template1 from './Pagination1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Pagination1.demo';

export default {
  title: '组件/Pagination/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>采用分页的形式分隔长列表，每次只加载一个页面。</Subtitle>
          <Template1 dirName="pagination" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Paginationtory: Story<PaginationProps> = (args) => {
  return <Pagination {...args} />;
};
export const DefaultStory = Paginationtory.bind({});
DefaultStory.args = {
  pageCount: 1000,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
};
DefaultStory.storyName = 'Pagination';
