// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import SplitPanel, { SplitPanelProps } from '../index';
import Template1 from './SplitPanel1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./SplitPanel1.demo';

export default {
  title: '组件/SplitPanel/SplitPanel',
  component: SplitPanel,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>分割Panel。</Subtitle>
          <Template1 dirName="split-panel" code={code} />
        </>
      ),
    },
  },
} as Meta;

const SplitPaneltory: Story<SplitPanelProps> = (args) => {
  return (
    <div style={{ height: '300px', backgroundColor: 'black', position: 'relative' }}>
      <SplitPanel {...args}>
        <div></div>
        <div style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}></div>
      </SplitPanel>
    </div>
  );
};
export const DefaultStory = SplitPaneltory.bind({});
DefaultStory.args = {
  split: 'horizontal',
  primary: 'second',
  defaultSize: '50%',
  minSize: 50,
  maxSize: 250,
};
DefaultStory.storyName = 'SplitPanel';
