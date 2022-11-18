// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Popover, { PopoverProps } from '../index';
import Template1 from './Popover1.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Popover1.demo';

export default {
  title: '组件/Popover/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>气泡框。</Subtitle>
          <Template1 dirName="popover" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Popovertory: Story<PopoverProps> = (args) => {
  return <Popover {...args} />;
};
export const DefaultStory = Popovertory.bind({});
DefaultStory.args = {
  children: <Button>气泡框</Button>,
  placement: 'topLeft',
  content: 'content',
  trigger: 'click',
};
DefaultStory.storyName = 'Popover';
