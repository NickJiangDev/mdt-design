// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Transfer, { TransferProps } from '../index';
import Template1 from './Transfer1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Transfer1.demo';

export default {
  title: '组件/Transfer/Transfer',
  component: Transfer,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>穿梭框。</Subtitle>
          <Template1 dirName="transfer" code={code} />
        </>
      ),
    },
  },
} as Meta;

const Transfertory: Story<TransferProps> = (args) => {
  return <Transfer {...args} />;
};

const options = [];
let sum = 0;
for (let i = 0; i < 100; i++) {
  sum += i;
  options.push({
    title: `中文中文${sum}`,
    key: `c${i}`,
  });
  if (i % 2 === 0) {
    options.push({
      title: `英文英文${sum}`,
      key: `e${i}`,
    });
  }
}
export const DefaultStory = Transfertory.bind({});
DefaultStory.args = {
  options,
  sortListDescriptionText: '已选字段',
  allSelectLabel: true,
};
DefaultStory.storyName = 'Transfer';
