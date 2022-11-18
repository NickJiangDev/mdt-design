// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Template1 from './DrawerApi.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DrawerApi.demo';
import drawerApi, { CloseType } from '../drawerApi';
import { DrawerProps } from '../Drawer';
import { DragDrawerProps } from '../DragDrawer';

interface ApiProps {
  children: (onClose: CloseType) => React.ReactNode;
  drawerConfig?: Omit<DrawerProps | DragDrawerProps, 'defaultOpen' | 'open' | 'level'>;
  drag?: boolean;
}

export default {
  title: '组件/Drawer/DrawerApi',
  component: () => <></>,
  argTypes: {
    children: {
      type: { require: true },
    },
    drawerConfig: {
      description: '抽屉的属性（ DrawerProps | DragDrawerProps ）',
    },
    drag: {
      description: '支持拖动',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>浮层面板Api调用</Subtitle>
          <Template1 dirName="drawer" noDefault subDirNames={['drawerApi']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Drawertory: Story<ApiProps> = (args) => {
  return (
    <>
      <Button
        onClick={() => {
          drawerApi.open(args.children, args.drawerConfig, args.drag);
        }}
      >
        Drawer api
      </Button>
    </>
  );
};
export const DefaultStory = Drawertory.bind({});
DefaultStory.args = {
  children: (close) => <Button onClick={close}>关闭</Button>,
  drawerConfig: { width: '80vw' },
  drag: true,
};
DefaultStory.storyName = 'DrawerApi';
