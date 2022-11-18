// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Dropmenu, { DropmenuProps } from '../Dropmenu';
import Template1 from './Dropdown2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Dropdown2.demo';

export default {
  title: '组件/Dropdown/Dropmenu',
  component: Dropmenu,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>向下弹出的菜单列表。</Subtitle>
          <Template1 dirName="dropmenu" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dropmenutory: Story<DropmenuProps> = (args) => <Dropmenu {...args}>工作台</Dropmenu>;
export const DefaultStory = Dropmenutory.bind({});
DefaultStory.args = {
  menus: [
    { title: '按名称', key: '1' },
    { title: '按创建时间', key: '2' },
    { title: '按最后编辑时间', key: '3', divider: true },
    { title: '文件夹置顶', key: '4' },
  ],
  values: ['1', '4'],
};
DefaultStory.storyName = 'Dropmenu';
