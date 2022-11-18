// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import PreviewList, { PreviewListProps } from '../index';
import { ObjectInterface } from '@/components/_utils/interfaces';
import Template1 from './PreviewList1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./PreviewList1.demo';
import { useDarkMode } from 'storybook-dark-mode';

export default {
  title: '组件/PreviewList/PreviewList',
  component: PreviewList,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>卡片预览。</Subtitle>
          <Template1 dirName="preview-list" code={code} />
        </>
      ),
    },
  },
} as Meta;

const PreviewListtory: Story<PreviewListProps> = (args) => {
  const color = useDarkMode() ? 'white' : 'black';
  return (
    <div style={{ width: 600, height: 500, color }}>
      <PreviewList {...args} />
    </div>
  );
};
export const DefaultStory = PreviewListtory.bind({});

const list = [];
for (let i = 0; i < 10; i++) {
  list.push({ id: `${i}`, label: `组件${i}` });
}

const RenderCell = (props: ObjectInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.item.label}
    </div>
  );
};

const RenderPreview = (props: ObjectInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.item.label}
    </div>
  );
};

DefaultStory.args = {
  list,
  RenderCell,
  RenderPreview,
};
DefaultStory.storyName = 'PreviewList';
