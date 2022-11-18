import * as React from 'react';
import RcSteps, { Step as RcStep } from 'rc-steps';
import Icon from '@/components/icon';
import './style/steps.less';
import { ProgressDotRender } from 'rc-steps/lib/Steps';

export type StatusType = 'wait' | 'process' | 'finish' | 'error';
export interface StepsProps {
  /** 类型 */
  type?: 'default' | 'navigation';
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 当前节点 */
  current?: number;
  /** 步骤条方向 */
  direction?: 'horizontal' | 'vertical';
  /** icon样式类前缀 */
  iconPrefix?: string;
  /** 初始index */
  initial?: number;
  /** placement of step title */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 进度条小圆点 */
  progressDot?: boolean | ProgressDotRender;
  /** 大小 */
  size?: 'default' | 'small';
  /** 状态 */
  status?: StatusType;
  /** 变化回调 */
  onChange?: (current: number) => void;
  /** icon数组 */
  icons?: { finish: React.ReactNode; error: React.ReactNode };
}

export interface StepProps {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 描述 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 点击回调 */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** 状态 */
  status?: StatusType;
  /** 失效状态 */
  disabled?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  children?: React.ReactNode;
}

const prefixCls = 'dmc-steps';
const Steps: React.FC<StepsProps> = (props: StepsProps) => {
  const icons = {
    finish: <Icon icon="done-check" className={`${prefixCls}-finish-icon`} />,
    error: <Icon icon="close" className={`${prefixCls}-error-icon`} />,
  };
  return <RcSteps icons={icons} {...props} prefixCls={prefixCls} />;
};

Steps.defaultProps = {
  current: 0,
};

Steps.displayName = 'Steps';
export default Steps;

const StepsMemo = React.memo(Steps);
StepsMemo.displayName = 'StepsMemo';
export { StepsMemo };

const Step: React.FC<StepProps> = (props: StepProps) => {
  return <RcStep {...props} prefixCls={prefixCls} />;
};

Step.displayName = 'Step';
export { Step };

const StepMemo = React.memo(Step);
StepMemo.displayName = 'StepMemo';
export { StepMemo };
