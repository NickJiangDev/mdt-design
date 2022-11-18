// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Dialog, { DialogProps } from '../Dialog';
import Template1 from './Dialog.demo';
import Button from '@/components/button';
import { useArgs } from '@storybook/client-api';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Dialog.demo';

export default {
  title: '组件/Dialog/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>模态对话框。</Subtitle>
          <Template1 dirName="dialog" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dialogtory: Story<DialogProps> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <>
      <Button
        onClick={() => {
          updateArgs({ ...args, visible: true });
        }}
      >
        点我打开Dialog
      </Button>
      <Dialog
        {...args}
        onCancel={() => {
          updateArgs({ ...args, visible: false });
        }}
        onOk={() => {
          updateArgs({ ...args, visible: false });
        }}
      />
    </>
  );
};
export const DefaultStory = Dialogtory.bind({});
DefaultStory.args = {
  visible: false,
  title: '面板名称',
  okText: '确定',
  cancelText: '取消',
};
DefaultStory.storyName = 'Dialog';
