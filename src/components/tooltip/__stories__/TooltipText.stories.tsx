// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { TooltipText } from '../index';
import Template2 from './Tooltip2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Tooltip2.demo';
import { TooltipTextProps } from '../TooltipText';

export default {
  title: '组件/Tooltip/TooltipText',
  component: TooltipText,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>文字提示，根据当前节点大小决定文字省略提示。</Subtitle>
          <Template2 dirName="TooltipText" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Tooltiptory: Story<TooltipTextProps> = (args) => {
  return <TooltipText {...args} />;
};
export const DefaultStory = Tooltiptory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'TooltipText';
