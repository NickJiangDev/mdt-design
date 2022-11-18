import { Story, Meta } from '@storybook/react';
import { LinkButton, LinkButtonProps } from '../LinkButton';
import Doc from './LinkButton.doc';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./LinkButton.doc';

export default {
  title: '组件/Button/LinkButton',
  component: LinkButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            弱化的按钮，采用更轻量的按钮样式，可用于需大面积展示按钮场景，例如表格组件中的操作列。
          </Subtitle>
          <Doc dirName="button" subDirNames={['LinkButton']} noDefault code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<LinkButtonProps> = (args) => <LinkButton {...args}>Button Link</LinkButton>;

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'LinkButton';
