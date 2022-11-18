// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Tag, { TextAlertProps } from '../Tag';
import Template1 from './Tag1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Tag1.demo';

export default {
  title: '组件/Tag/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>标签。</Subtitle>
          <Template1 dirName="tag" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Tagtory: Story<TextAlertProps> = (args) => {
  return <Tag {...args} />;
};
export const DefaultStory = Tagtory.bind({});
DefaultStory.args = {
  tag: '行政边界',
};
DefaultStory.storyName = 'Tag';
