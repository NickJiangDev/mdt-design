// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Collaspe, { CollapseItem, CollapseProps } from '../index';
import Template2 from './Collapse2.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Collapse2.demo';

export default {
  title: '组件/Collaspe',
  component: Collaspe,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>可以折叠/展开的内容区域。</Subtitle>
          <Template2 dirName="collaspe" subDirNames={['CollapseItem']} code={code} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<CollapseProps> = (args) => {
  return (
    <Collaspe {...args}>
      <CollapseItem header={<div>面板1</div>}>
        <div>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world. A dog is a type of
          domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </div>
      </CollapseItem>
    </Collaspe>
  );
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {};
DefaultStory.storyName = 'Collaspe';
