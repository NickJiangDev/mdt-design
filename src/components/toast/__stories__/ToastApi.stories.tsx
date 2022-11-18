// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import toastApi from '../toastApi';
import Template1 from './Toast2.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Toast2.demo';

type KeyType = 'notification' | 'info' | 'error' | 'warning' | 'success';

export default {
  title: '组件/Toast/toastApi',
  component: () => <></>,
  argTypes: {
    key: {
      type: { require: true },
      options: ['notification', 'info', 'error', 'warning', 'success'],
      description: '调用api方法的关键字',
      control: { type: 'radio' },
    },
    config: {
      description: '配置类型, 根据所选类型配置具体的config',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>全局展示操作反馈信息Api调用。</Subtitle>
          <Template1 dirName="dialogApi" noDefault subDirNames={['toastApi']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const Toaststory: Story = (args) => {
  const key = args.key as KeyType;
  return (
    <>
      <Button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          toastApi[key](args.config);
        }}
      >
        点我打开toastApi
      </Button>
    </>
  );
};
export const DefaultStory = Toaststory.bind({});
DefaultStory.args = {
  key: 'success',
  config: '上传成功',
};
DefaultStory.storyName = 'toastApi';
