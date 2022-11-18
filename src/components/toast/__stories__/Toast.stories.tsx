// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { ToastContainer, ToastContainerProps } from '../index';
import Template1 from './Toast1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Toast1.demo';

export default {
  title: '组件/Toast/Toast',
  component: ToastContainer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>全局展示操作反馈信息。</Subtitle>
          <Template1 dirName="Toast" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Toasttory: Story<ToastContainerProps> = (args) => {
  return <ToastContainer {...args} />;
};
export const DefaultStory = Toasttory.bind({});
DefaultStory.args = {
  type: 'success',
  message:
    '“数据包-1上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功上传成功” 上传成功',
  withClose: true,
};
DefaultStory.storyName = 'Toast';
