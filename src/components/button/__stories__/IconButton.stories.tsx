import { Story, Meta } from '@storybook/react';
import { IconButton, IconButtonProps } from '../IconButton';
import Doc from './IconButton.doc';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./IconButton.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

export default {
  title: '组件/Button/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>图标提供视觉线索，避免逐字阅读按钮文案，更高效地使用界面。</Subtitle>
          <Doc dirName="button" subDirNames={['IconButton']} noDefault code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const BorderStory = Template.bind({});
BorderStory.args = {
  icon: 'add',
};

BorderStory.storyName = 'IconButton';
