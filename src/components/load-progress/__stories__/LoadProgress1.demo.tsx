import LoadProgress, { LoadProgressProps } from '@/components/load-progress';
import { Story } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

const LoadProgressDemo: Story<LoadProgressProps> = (props) => {
  const color = useDarkMode() ? 'white' : 'black';
  return (
    <div style={{ color }}>
      <h4>观察蓝色进度条</h4>
      <LoadProgress isAnimating={true} {...props} />
    </div>
  );
};
export default LoadProgressDemo;
