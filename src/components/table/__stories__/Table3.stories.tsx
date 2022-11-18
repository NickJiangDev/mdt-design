// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { TableProps } from '../index';
import Template1 from './Table3.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Table3.demo';

export default {
  title: '组件/Table/Table-fix',
  component: Table,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>表格 - 固定列。</Subtitle>
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
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100, fixed: 'left' },
    { title: 'title2', dataIndex: 'b', key: 'b', width: 100, fixed: 'left' },
    { title: 'title3', dataIndex: 'c', key: 'c' },
    { title: 'title4', dataIndex: 'b', key: 'd' },
    { title: 'title5', dataIndex: 'b', key: 'e' },
    {
      title: 'title6',
      dataIndex: 'b',
      key: 'f',
      render: () => <div style={{ height: '40px', lineHeight: '40px' }}>我很高</div>,
    },
    { title: 'title7', dataIndex: 'b', key: 'g' },
    { title: 'title8', dataIndex: 'b', key: 'h' },
    { title: 'title9', dataIndex: 'b', key: 'i' },
    { title: 'title10', dataIndex: 'b', key: 'j' },
    { title: 'title11', dataIndex: 'b', key: 'k' },
    { title: 'title12', dataIndex: 'b', key: 'l', width: 100, fixed: 'right' },
  ],
  data: [],
};
DefaultStory.storyName = 'Table-fix';
