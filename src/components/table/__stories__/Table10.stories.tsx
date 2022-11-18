// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { ScrollX, ScrollXProps } from '../index';
import Template1 from './Table10.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Table10.demo';

export default {
  title: '组件/Table/ScrollX',
  component: ScrollX,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>表格滚动条。</Subtitle>
          <Template1 dirName="ScrollX" code={code} />
        </>
      ),
    },
  },
} as Meta;

const ScrollXtory: Story<ScrollXProps> = (args) => {
  return <ScrollX {...args} />;
};
export const DefaultStory = ScrollXtory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'ScrollX';
