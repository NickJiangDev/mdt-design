// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Template1 from './Checkbox1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Checkbox1.demo';

export default {
  title: '组件/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>多选框。</Subtitle>
          <Template1 dirName="checkbox" code={code} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<CheckboxProps> = (args) => {
  return <Checkbox {...args} />;
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  defaultChecked: true,
  title: 'checkbox',
};
DefaultStory.storyName = 'Checkbox';
