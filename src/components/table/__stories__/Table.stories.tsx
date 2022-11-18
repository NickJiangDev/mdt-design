// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { TableProps } from '../index';
import Template1 from './Table1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Table1.demo';

export default {
  title: '组件/Table/Table',
  component: Table,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>表格。</Subtitle>
          <Template1 dirName="table" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Tabletory: Story<TableProps> = (args) => {
  return <Table {...args} />;
};
export const DefaultStory = Tabletory.bind({});
DefaultStory.args = {
  columns: [
    { title: 'A', dataIndex: 'a', width: 100 },
    { title: 'B', dataIndex: 'b', width: 100 },
    { title: 'C', dataIndex: 'c', width: 100 },
  ],
  data: [],
};
DefaultStory.storyName = 'Table';
