// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SideNav, { SideNavItem, SideNavItemProps } from '../index';
import Template1 from './SideNav1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SideNav1.demo';

export default {
  title: '组件/SideNav/SideNavItem',
  component: SideNavItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>侧栏导航单元。</Subtitle>
          <Template1 dirName="side-nav" code={code} />
        </>
      ),
    },
  },
} as Meta;

const SideNavtory: Story<SideNavItemProps> = (args) => {
  return (
    <SideNav>
      <SideNavItem {...args} />
    </SideNav>
  );
};
export const DefaultStory = SideNavtory.bind({});
DefaultStory.args = {
  label: '当前工作台',
};
DefaultStory.storyName = 'SideNavItem';
