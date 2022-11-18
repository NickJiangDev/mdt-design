// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import NotificationContainer, { NotificationContainerProps } from '../NotificationContainer';
import Template1 from './Notification1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Notification1.demo';

export default {
  title: '组件/Notification/Notification',
  component: NotificationContainer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>屏幕边缘滑出的浮层面板。</Subtitle>
          <Template1 dirName="notification" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Notificationtory: Story<NotificationContainerProps> = (args) => {
  return <NotificationContainer {...args} />;
};
export const DefaultStory = Notificationtory.bind({});
DefaultStory.args = {
  message: '消息标题',
  description:
    '这个消息我也不知道该说什么，但是它就是很重要的消息。这个消息我也不知道该说什么，但是它就是很重要的消息。',
};
DefaultStory.storyName = 'Notification';
