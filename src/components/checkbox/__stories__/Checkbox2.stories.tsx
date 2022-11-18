// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import CheckboxGroup, { CheckboxGroupProps } from '../CheckboxGroup';
import Template2 from './Checkbox2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Checkbox2.demo';

export default {
  title: '组件/Checkbox/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>多选框组合使用。</Subtitle>
          <Template2 dirName="checkbox" subDirNames={['CheckboxGroup']} noDefault code={code} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<CheckboxGroupProps> = (args) => {
  return <CheckboxGroup {...args} />;
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  options: ['Apple', 'Pear', 'Orange'],
};
DefaultStory.storyName = 'CheckboxGroup';
