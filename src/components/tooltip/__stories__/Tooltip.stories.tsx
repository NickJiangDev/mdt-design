// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@/components/button';
import Tooltip, { TooltipProps } from '../index';
import Template1 from './Tooltip1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
import { useArgs } from '@storybook/client-api';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Tooltip1.demo';

export default {
  title: '组件/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>简单的文字提示气泡框。</Subtitle>
          <Template1 dirName="Tooltip" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Tooltiptory: Story<TooltipProps> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <Tooltip {...args}>
      <Button
        onClick={() => {
          updateArgs({ ...args, visible: true });
        }}
      >
        按钮
      </Button>
    </Tooltip>
  );
};
export const DefaultStory = Tooltiptory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Tooltip';
