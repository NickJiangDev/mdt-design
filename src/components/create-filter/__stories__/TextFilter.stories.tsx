// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import TextFilter, { TextFilterProps } from '../TextFilter';
import Template1 from './TextFilter1.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./TextFilter1.demo';

const list: string[] = [];
let sum = 0;
for (let i = 0; i < 500; i++) {
  sum += i;
  list.push(`中文中文${sum}`);
  if (i % 2 === 0) {
    list.push(`英文英文${sum}`);
  }
}

export default {
  title: '组件/CreateFilter/TextFilter',
  component: TextFilter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可选列表的浮动展示块。</Subtitle>
          <Template1 dirName="create-filter" noDefault subDirNames={['TextFilter']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const TextFiltertory: Story<TextFilterProps> = (args) => {
  return <TextFilter {...args} />;
};
export const DefaultStory = TextFiltertory.bind({});
DefaultStory.args = {
  children: <Button>Open</Button>,
  list,
};
DefaultStory.storyName = 'TextFilter';
