// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SwitchTag, { SwitchTagProps } from '../SwitchTag';
import Template2 from './Tag2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Tag2.demo';

export default {
  title: '组件/Tag/SwitchTag',
  component: SwitchTag,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可选择标签。</Subtitle>
          <Template2 dirName="tag" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Tagtory: Story<SwitchTagProps> = (args) => {
  return <SwitchTag {...args} />;
};
export const DefaultStory = Tagtory.bind({});
DefaultStory.args = {
  tag: '行政边界',
};
DefaultStory.storyName = 'SwitchTag';
