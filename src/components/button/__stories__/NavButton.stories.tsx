import { Story, Meta } from '@storybook/react';
import { NavButton, NavButtonProps } from '../NavButton';
import Doc from './NavButton.doc';
import { Title, Subtitle } from '@storybook/addon-docs';

/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./NavButton.doc';

export default {
  title: '组件/Button/NavButton',
  component: NavButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>导航栏按钮，正常按钮的属性封装</Subtitle>
          <Doc dirName="button" subDirNames={['NavButton']} noDefault code={code} />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<NavButtonProps> = (args) => <NavButton {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  children: 'Button',
};
DefaultStory.storyName = 'NavButton';
