// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Template1 from './Notification2.demo';
import Button from '@/components/button';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Notification2.demo';
import notificationApi, { ArgsProps } from '../notificationApi';

type KeyType = 'open' | 'info' | 'error' | 'warning' | 'success';
interface ApiProps {
  key: KeyType;
  config: ArgsProps;
}

export default {
  title: '组件/Notification/NotificationApi',
  component: () => <></>,
  argTypes: {
    config: {
      description: '通知的属性（ ArgsProps ）',
    },
    key: {
      options: ['open', 'info', 'error', 'warning', 'success'],
      description: '调用api方法的关键字',
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>浮层面板Api调用</Subtitle>
          <Template1
            dirName="notification"
            noDefault
            subDirNames={['notificationApi']}
            code={code}
          />
        </>
      ),
    },
  },
} as Meta;

const Drawertory: Story<ApiProps> = (args) => {
  const key = args.key as KeyType;
  return (
    <>
      <Button
        onClick={() => {
          notificationApi[key](args.config);
        }}
      >
        点我打开NotificationApi
      </Button>
    </>
  );
};
export const DefaultStory = Drawertory.bind({});
DefaultStory.args = {
  key: 'open',
  config: {
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  },
};
DefaultStory.storyName = 'NotificationApi';
