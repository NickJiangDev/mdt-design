// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import FormItem, { FormItemProps } from '../FormItem';
import Template1 from './FormItem1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
import Input from '@/components/input';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./FormItem1.demo';

export default {
  title: '组件/FormItem/FormItem',
  component: FormItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>表单控件。</Subtitle>
          <Template1 dirName="form-item" code={code} />
        </>
      ),
    },
  },
} as Meta;

const FormItemtory: Story<FormItemProps> = (args) => <FormItem {...args} />;
export const DefaultStory = FormItemtory.bind({});
DefaultStory.args = {
  label: '模型名称',
  children: <Input />,
};
DefaultStory.storyName = 'FormItem';
