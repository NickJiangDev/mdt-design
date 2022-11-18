// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import lazyLoad from '@/components/lazy-load';
import Button from '@/components/button';
import { useDarkMode } from 'storybook-dark-mode';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Lazy: any = lazyLoad(() => import('./Text'));

export default {
  title: '组件/Lazyload/Lazyload',
  component: () => <></>,
  argTypes: {
    component: {
      description: '需要懒加载的节点',
    },
  },
} as Meta;

const Drawertory: Story = () => {
  const color = useDarkMode() ? 'white' : 'black';
  const [load, setLoad] = React.useState(false);
  const onClick = React.useCallback(() => {
    setLoad(true);
  }, []);

  return (
    <div style={{ color }}>
      <div>没有加载</div>
      <Button onClick={onClick}>点击加载</Button>
      {load && <Lazy />}
    </div>
  );
};
export const DefaultStory = Drawertory.bind({});
DefaultStory.storyName = 'Lazyload';
