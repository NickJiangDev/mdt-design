// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import FieldItem, { FieldItemProps } from '../FieldItem';
import Template1 from './FieldItem1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./FieldItem1.demo';

export default {
  title: '组件/FieldItem/FieldItem',
  component: FieldItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>文字标签。</Subtitle>
          <Template1 dirName="field-item" code={code} />
        </>
      ),
    },
  },
} as Meta;

const FieldItemtory: Story<FieldItemProps> = (args) => <FieldItem {...args} />;
export const DefaultStory = FieldItemtory.bind({});
DefaultStory.args = {
  type: 'text',
  name: 'type: text',
};
DefaultStory.storyName = 'FieldItem';
