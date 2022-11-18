// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Scrollbar, { ScrollbarProps } from '../index';
import Template1 from './Scrollbar1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Scrollbar1.demo';
import { DraggableContainer, ScrollWrapper } from '@/__stories-template__';

export default {
  title: '组件/Scrollbar/Scrollbar',
  component: Scrollbar,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>滚动条Api。</Subtitle>
          <Template1 dirName="scrollbar" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Scrollbartory: Story<ScrollbarProps> = (args) => {
  return (
    <ScrollWrapper>
      <Scrollbar {...args}>
        <DraggableContainer />
      </Scrollbar>
    </ScrollWrapper>
  );
};
export const DefaultStory = Scrollbartory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Scrollbar';
