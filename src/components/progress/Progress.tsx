import * as React from 'react';
import classNames from 'classnames';
import { IconButton } from '../button';
import './style/progress.less';

export interface ProgressProps {
  /** 进度百分比 0-100 */
  percent?: number | string;
  /** 进度条类型 */
  type?: 'warning' | 'success' | 'error';
  /** 标题 */
  title?: React.ReactNode;
  /** 显示百分比数字 */
  showPercent?: boolean;
  /** 显示关闭 */
  cancelable?: boolean;
  /** 关闭回调 */
  onCancel?: () => void;
  /** 类名 */
  className?: string;
}

const prefixCls = 'dmc-progress';

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    type,
    className,
    title,
    onCancel,
    showPercent,
    cancelable,
    ...restProps
  } = props;
  const trailCls = classNames(`${prefixCls}-trail`, `${prefixCls}-trail-${type}`);
  const width = `${percent}%`;
  const showInfo = !!title || (showPercent && cancelable);
  const percentInline = !title && !cancelable && showPercent;

  return (
    <div {...restProps} className={`${prefixCls} ${className}`}>
      {showInfo && (
        <div className={`${prefixCls}-info`}>
          <div className={`${prefixCls}-title`}>{title}</div>
          {showPercent && <div className={`${prefixCls}-percent`}>{width}</div>}
        </div>
      )}
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-bg`}>
          <div className={trailCls} style={{ width }} />
        </div>
        {cancelable && (
          <IconButton
            className={`${prefixCls}-cancel`}
            icon="close"
            type="only-icon"
            onClick={onCancel}
          />
        )}
        {percentInline && <div className={`${prefixCls}-percent`}>{width}</div>}
      </div>
    </div>
  );
};

Progress.defaultProps = {
  percent: 0,
  showPercent: false,
  cancelable: false,
};
Progress.displayName = 'Progress';

export default Progress;

const ProgressMemo = React.memo(Progress);
ProgressMemo.displayName = 'ProgressMemo';
export { ProgressMemo };
