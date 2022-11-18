// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { dialogApi } from '../index';
import Template1 from './DialogApi.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DialogApi.demo';

type KeyType = 'open' | 'info' | 'error' | 'warning' | 'success' | 'normal' | 'confirm';

export default {
  title: '组件/Dialog/DialogApi',
  component: () => <></>,
  argTypes: {
    key: {
      type: { require: true },
      options: ['open', 'info', 'error', 'warning', 'success', 'normal', 'confirm'],
      description: '调用api方法的关键字',
      control: { type: 'radio' },
    },
    config: {
      description: '配置类型, 根据所选类型配置具体的config(ViewProps)',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>模态对话框Api调用。</Subtitle>
          <Template1 dirName="dialog" noDefault subDirNames={['DialogApi']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Dialogtory: Story = (args) => {
  const key = args.key as KeyType;
  return (
    <>
      <Button
        onClick={() => {
          dialogApi[key](args.config);
        }}
      >
        点我打开DialogApi
      </Button>
    </>
  );
};
export const DefaultStory = Dialogtory.bind({});
DefaultStory.args = {
  key: 'open',
  config: {
    title: '测试',
    okText: '确定',
    description: '请于23小时58分41秒后重试',
    onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
      onClose && onClose();
    },
  },
};
DefaultStory.storyName = 'DialogApi';
