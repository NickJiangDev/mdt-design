// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { Confirm, ConfirmProps } from '../index';
import Template1 from './Confirm.demo';
import Button from '@/components/button';
import { useArgs } from '@storybook/client-api';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Confirm.demo';

export default {
  title: '组件/Dialog/Confirm',
  component: Confirm,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>二次确认的模态对话框。</Subtitle>
          <Template1 dirName="dialog" noDefault subDirNames={['Confirm']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dialogtory: Story<ConfirmProps> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <>
      <Button
        onClick={() => {
          updateArgs({ ...args, visible: true });
        }}
      >
        点我打开Confirm
      </Button>
      <Confirm
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
  title: 'Confirm',
  okText: '确定',
  cancelText: '取消',
  errorMessage: '报错信息',
};
DefaultStory.storyName = 'Confirm';
