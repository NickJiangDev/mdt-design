import { Story, Meta } from '@storybook/react';
import SideMenu, { SideMenuProps } from '../index';
import SideMenuDoc from './SideMenu.doc';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SideMenu.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/SideMenu/SideMenu',
  component: SideMenu,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>侧栏菜单Tree结构</Subtitle>
          <SideMenuDoc dirName="side-menu" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<SideMenuProps> = (args) => <SideMenu {...args}>SideMenu</SideMenu>;

export const PrimaryStory = Template.bind({
  treeProps: {},
});
PrimaryStory.storyName = 'SideMenu';
