// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import PageHeader, { PageHeaderProps } from '../index';

export default {
  title: '组件/PageHeader/PageHeader',
  component: PageHeader,
} as Meta;

const PageHeadertory: Story<PageHeaderProps> = (args) => {
  const color = useDarkMode() ? 'white' : 'black';
  return (
    <PageHeader {...args} style={{ color }}>
      Header
    </PageHeader>
  );
};
export const DefaultStory = PageHeadertory.bind({});
DefaultStory.storyName = 'PageHeader';
