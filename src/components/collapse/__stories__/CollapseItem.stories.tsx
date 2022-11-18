// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { CollapseItem, CollapseItemProps } from '../index';
import Template1 from './Collapse1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Collapse1.demo';

export default {
  title: '组件/Collaspe/CollaspeItem',
  component: CollapseItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可以折叠/展开的内容区域。</Subtitle>
          <Template1 dirName="collaspe" noDefault subDirNames={['CollapseItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<CollapseItemProps> = (args) => {
  return <CollapseItem {...args} />;
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  header: <div>面板</div>,
  isActive: true,
  children: '我是内容',
};
DefaultStory.storyName = 'CollaspeItem';
