// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import CreateFilter, { CreateFilterProps } from '../CreateFilter';
import Template1 from './CreateFilter1.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./CreateFilter1.demo';

export default {
  title: '组件/CreateFilter/CreateFilter',
  component: CreateFilter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可拖动的浮动展示块。</Subtitle>
          <Template1 dirName="create-filter" noDefault subDirNames={['CreateFilter']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const CreateFiltertory: Story<CreateFilterProps> = (args) => {
  return <CreateFilter {...args} />;
};
export const DefaultStory = CreateFiltertory.bind({});
DefaultStory.args = {
  children: <Button>Open</Button>,
};
DefaultStory.storyName = 'CreateFilter';
