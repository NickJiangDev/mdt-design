import loadable from '@loadable/component';
import { LoadProgressMemo as LoadProgress } from '../load-progress';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LazyLoad<T>(component: any) {
  if (!component) return;
  return loadable<T>(component, {
    fallback: <LoadProgress isAnimating={true} />,
  });
}

export default LazyLoad;
