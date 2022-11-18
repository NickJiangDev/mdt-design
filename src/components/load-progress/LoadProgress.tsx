import * as React from 'react';
import { useNProgress } from '@tanem/react-nprogress';
import './style/load-progress.less';

const prefixCls = 'dmc-load-progress';

export interface LoadProgressProps {
  /** 可选数字，表示动画持续时间，单位为ms。 */
  animationDuration?: number;
  /** 可选数值，表示进度条增量之间的时间间隔，单位ms。 */
  incrementDuration?: number;
  /** 指示进度条是否处于动画状态。 */
  isAnimating?: boolean;
  /** 0到1之间的可选数字，指示进度条的最小值。 */
  minimum?: number;
  /** 类名 */
  className?: string;
}

const LoadProgress: React.FC<LoadProgressProps> = (props) => {
  const { animationDuration, isFinished, progress } = useNProgress(props);
  const { className } = props;
  const wrapperStyle = {
    opacity: isFinished ? 0 : 1,
    transition: `opacity ${animationDuration}ms linear`,
  };
  const lineBarStyle = {
    marginLeft: `${(-1 + progress) * 100}%`,
    transition: `margin-left ${animationDuration}ms linear`,
  };

  return (
    <div className={`${prefixCls} ${className}`} style={wrapperStyle}>
      <div className={`${prefixCls}-line-bar`} style={lineBarStyle}>
        <div className={`${prefixCls}-line-bar-container`} />
      </div>
    </div>
  );
};

LoadProgress.defaultProps = {
  animationDuration: 200,
  incrementDuration: 800,
  isAnimating: true,
  minimum: 0.08,
};

LoadProgress.displayName = 'LoadProgress';
export default LoadProgress;

const LoadProgressMemo = React.memo(LoadProgress);
LoadProgressMemo.displayName = 'LoadProgressMemo';
export { LoadProgressMemo };
