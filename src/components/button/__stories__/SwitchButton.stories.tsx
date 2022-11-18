import { Story, Meta } from '@storybook/react';
import { SwitchButton, SwitchButtonProps } from '../SwitchButton';
import Doc from './SwitchButton.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SwitchButton.doc';

export default {
  title: '组件/Button/SwitchButton',
  component: SwitchButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>选择按钮，可控制其选中状态的按钮</Subtitle>
          <Doc dirName="button" subDirNames={['SwitchButton']} noDefault code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<SwitchButtonProps> = (args) => <SwitchButton {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  children: '不限',
};
DefaultStory.storyName = 'SwitchButton';
