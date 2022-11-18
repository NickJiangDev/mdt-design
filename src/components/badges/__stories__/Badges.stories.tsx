// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import Badges, { BadgesProps } from '../Badges';
import Template1 from './Badges1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./Badges1.demo';
import { useDarkMode } from 'storybook-dark-mode';

export default {
  title: '组件/Badges/Badges',
  component: Badges,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>图标右上角的圆形徽标数字。</Subtitle>
          <Template1 dirName="badges" code={code} />
        </>
      ),
    },
  },
} as Meta;

const BadgeStory: Story<BadgesProps> = (args) => {
  const commonStyle = { width: 50, height: 50, background: useDarkMode() ? '#32384E' : '#F0F1F3' };
  return (
    <Badges {...args}>
      <div style={commonStyle} />
    </Badges>
  );
};
export const DefaultStory = BadgeStory.bind({});
DefaultStory.args = {
  count: 10,
};
DefaultStory.storyName = 'Badges';
