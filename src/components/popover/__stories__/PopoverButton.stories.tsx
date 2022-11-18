// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import PopoverButton, { PopoverButtonProps } from '../PopoverButton';
import Template2 from './Popover2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Popover2.demo';

export default {
  title: '组件/Popover/PopoverButton',
  component: PopoverButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>气泡框Button。</Subtitle>
          <Template2 dirName="popover" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Popovertory: Story<PopoverButtonProps> = (args) => {
  return <PopoverButton {...args} />;
};
export const DefaultStory = Popovertory.bind({});
DefaultStory.args = {
  content: <p>1111</p>,
  buttonText: '新建',
  buttonProps: { type: 'primary' },
};
DefaultStory.storyName = 'PopoverButton';
