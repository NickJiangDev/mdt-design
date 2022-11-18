// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import TextAlert, { TextAlertProps } from '../index';
import Template1 from './TextAlert1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./TextAlert1.demo';

export default {
  title: '组件/TextAlert/TextAlert',
  component: TextAlert,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>提示框。</Subtitle>
          <Template1 dirName="text-alert" code={code} />
        </>
      ),
    },
  },
} as Meta;

const TextAlerttory: Story<TextAlertProps> = (args) => {
  return <TextAlert {...args} />;
};
export const DefaultStory = TextAlerttory.bind({});
DefaultStory.args = {
  message: '运行中',
};
DefaultStory.storyName = 'TextAlert';
