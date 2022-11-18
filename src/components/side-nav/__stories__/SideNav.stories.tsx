// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SideNav, { SideNavItem, SideNavProps } from '../index';
import Template1 from './SideNav1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SideNav1.demo';

export default {
  title: '组件/SideNav/SideNav',
  component: SideNav,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>侧栏导航。</Subtitle>
          <Template1 dirName="side-nav" code={code} />
        </>
      ),
    },
  },
} as Meta;

const SideNavtory: Story<SideNavProps> = (args) => {
  return (
    <SideNav {...args}>
      <SideNavItem label={'大屏工作台'} icon={'project-screen-on'} actived />
      <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} />
      <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} />
      <SideNavItem label={'大屏工作台'} icon={'project-screen-off'} type={'mark'} />
      <SideNavItem label={'大屏工作台'} icon={'project-screen-on'} type={'mark'} actived />
    </SideNav>
  );
};
export const DefaultStory = SideNavtory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'SideNav';
