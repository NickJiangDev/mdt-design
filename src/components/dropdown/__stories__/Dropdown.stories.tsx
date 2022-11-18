// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Dropdown, { DropdownProps } from '../Dropdown';
import Template1 from './Dropdown1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Dropdown1.demo';

export default {
  title: '组件/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>向下弹出的列表。</Subtitle>
          <Template1 dirName="dropdown" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dropdowntory: Story<DropdownProps> = (args) => <Dropdown {...args} />;
export const DefaultStory = Dropdowntory.bind({});
DefaultStory.args = {
  overlay: <div>1111</div>,
  children: <div>open</div>,
};
DefaultStory.storyName = 'Dropdown';
