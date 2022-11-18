import * as React from 'react';
import lazyLoad from '@/components/lazy-load';
import Button from '@/components/button';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Lazy: any = lazyLoad(() => import('./Text'));

const LazyLoadDemo = () => {
  const [load, setLoad] = React.useState(false);
  const onClick = React.useCallback(() => {
    setLoad(true);
  }, []);

  return (
    <div>
      <div>没有加载</div>
      <Button onClick={onClick}>点击加载</Button>
      {load && <Lazy />}
    </div>
  );
};
export default LazyLoadDemo;
