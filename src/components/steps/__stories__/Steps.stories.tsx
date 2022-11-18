// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Steps, { Step, StepsProps } from '../index';
import Template1 from './Steps1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Steps1.demo';

export default {
  title: '组件/Steps/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>步骤条。</Subtitle>
          <Template1 dirName="steps" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Stepstory: Story<StepsProps> = (args) => {
  return (
    <Steps {...args}>
      <Step title="步骤1" />
      <Step title="步骤2" />
      <Step title="步骤3" />
      <Step title="步骤4" />
    </Steps>
  );
};
export const DefaultStory = Stepstory.bind({});
DefaultStory.args = {
  current: 2,
};
DefaultStory.storyName = 'Steps';
