// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import DraggableWrap, { DraggableWrapProps } from '../DraggableWrap';
import Template1 from './DraggableWrap1.demo';
// import { DraggableContainer } from '@/__stories-template__';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DraggableWrap1.demo';

export default {
  title: '组件/DraggableWrap/DraggableWrap',
  component: DraggableWrap,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可拖动的组件包裹。</Subtitle>
          <Template1 dirName="draggable-wrap" code={code} />
        </>
      ),
    },
  },
} as Meta;

const DraggableWraptory: Story<DraggableWrapProps> = (args) => {
  return <DraggableWrap {...args} />;
};
export const DefaultStory = DraggableWraptory.bind({});
DefaultStory.args = {
  children: (
    <div
      style={{
        width: '300px',
        height: '550px',
        background: '#282d40',
        border: '1px solid #4a5472',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: '4px',
      }}
    />
  ),
};
DefaultStory.storyName = 'DraggableWrap';
