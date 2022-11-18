// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Drawer, { DrawerProps } from '../Drawer';
import Template1 from './Drawer1.demo';
import Button from '@/components/button';
import { useArgs } from '@storybook/client-api';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Drawer1.demo';

export default {
  title: '组件/Drawer/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>屏幕边缘滑出的浮层面板。</Subtitle>
          <Template1 dirName="drawer" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Drawertory: Story<DrawerProps> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <>
      <Button
        onClick={() => {
          updateArgs({ ...args, open: true });
        }}
      >
        点我打开Drawer
      </Button>
      <Drawer
        {...args}
        onClose={() => {
          updateArgs({ ...args, open: false });
        }}
      />
    </>
  );
};
export const DefaultStory = Drawertory.bind({});
DefaultStory.args = {
  open: false,
  level: null,
  handler: false,
  width: '80vw',
};
DefaultStory.storyName = 'Drawer';
