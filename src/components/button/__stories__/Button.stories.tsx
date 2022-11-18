import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from '../Button';
import ButtonDoc from './Button.doc';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Button.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/Button/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>按钮用于开始一个即时操作</Subtitle>
          <ButtonDoc dirName="button" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

export const PrimaryStory = Template.bind({});
PrimaryStory.storyName = 'Button';
