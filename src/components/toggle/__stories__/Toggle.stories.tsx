// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Toggle, { ToggleProps } from '../index';
import Template1 from './Toggle1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Toggle1.demo';

export default {
  title: '组件/Toggle/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>开关选择器。</Subtitle>
          <Template1 dirName="toggle" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Toggletory: Story<ToggleProps> = (args) => {
  return <Toggle {...args} />;
};
export const DefaultStory = Toggletory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Toggle';
