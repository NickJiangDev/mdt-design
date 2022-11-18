// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { DragDrawer, DragDrawerProps } from '../index';
import Template1 from './DragDrawer.demo';
import Button from '@/components/button';
import { useArgs } from '@storybook/client-api';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DragDrawer.demo';

export default {
  title: '组件/Drawer/DragDrawer',
  component: DragDrawer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可以拖动的浮层面板。</Subtitle>
          <Template1 dirName="drawer" noDefault subDirNames={['DragDrawer']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Drawertory: Story<DragDrawerProps> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <>
      <Button
        onClick={() => {
          updateArgs({ ...args, open: true });
        }}
      >
        点我打开Drawer(可拖拽)
      </Button>
      <DragDrawer
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
};
DefaultStory.storyName = 'DragDrawer';
