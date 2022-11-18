// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioButton, { RadioButtonProps } from '../RadioButton';
import Template2 from './Radio2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Radio2.demo';

export default {
  title: '组件/Radio/RadioButton',
  component: RadioButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>单选按钮。</Subtitle>
          <Template2 dirName="radio" noDefault subDirNames={['RadioButton']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const RadioButtontory: Story<RadioButtonProps> = (args) => {
  return <RadioButton {...args} />;
};
export const DefaultStory = RadioButtontory.bind({});
DefaultStory.args = {
  children: 'RadioButton',
};
DefaultStory.storyName = 'RadioButton';
