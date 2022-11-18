// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import VirtualizedTable, { VirtualizedTableProps } from '../index';
import Template1 from './Table5.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Table5.demo';

export default {
  title: '组件/Table/VirtualizedTable',
  component: VirtualizedTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>表格。</Subtitle>
          <Template1 dirName="table" code={code} noDefault subDirNames={['VirtualizedTable']} />
        </>
      ),
    },
  },
} as Meta;

const VirtualizedTabletory: Story<VirtualizedTableProps> = (args) => {
  return <VirtualizedTable {...args} />;
};
export const DefaultStory = VirtualizedTabletory.bind({});
DefaultStory.args = {
  columns: [],
  dataSource: [],
};
DefaultStory.storyName = 'VirtualizedTable';
