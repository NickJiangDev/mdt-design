// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Menu, { MenuItem, MenuProps } from '../Menu';
import Template1 from './Menu1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Menu1.demo';

export default {
  title: '组件/Menu/Menu',
  component: Menu,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>菜单。</Subtitle>
          <Template1 dirName="menu" subDirNames={['MenuItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Menutory: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem key={1} title="第一步">
      第一步
    </MenuItem>
  </Menu>
);
export const DefaultStory = Menutory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Menu';
