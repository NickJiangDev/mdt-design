// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Popconfirm, { PopconfirmProps } from '../index';
import Template1 from './Popconfirm1.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Popconfirm1.demo';

export default {
  title: '组件/Popconfirm/Popconfirm',
  component: Popconfirm,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>确认气泡框。</Subtitle>
          <Template1 dirName="popconfirm" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Popconfirmtory: Story<PopconfirmProps> = (args) => {
  return <Popconfirm {...args} />;
};
export const DefaultStory = Popconfirmtory.bind({});
DefaultStory.args = {
  children: <Button>气泡框</Button>,
  placement: 'topLeft',
  okText: '确定',
  cancelText: '取消',
  message: '主标题',
  trigger: 'click',
  emotion: 'info',
};
DefaultStory.storyName = 'Popconfirm';
