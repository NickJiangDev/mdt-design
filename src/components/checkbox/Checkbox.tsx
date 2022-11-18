import * as React from 'react';
import classNames from 'classnames';
// import Icon from '../icon';
import CheckboxOn from '@/components/icons/checkbox-on';
import CheckboxOff from '@/components/icons/checkbox-off';
import CheckboxIntermediate from '@/components/icons/checkbox-intermediate';
import './style/checkbox.less';

export interface CheckboxProps {
  /** 多选框的类型 */
  type?: 'page-bg' | 'menu-bg' | 'assist-bg';
  /** 多选框的大小 */
  size?: 'compact';
  /** 类名 */
  className?: string;
  /** 隐藏标题 */
  hiddenTitle?: boolean;
  /** 点击时回调函数 */
  onClick?: (checked: boolean, value?: string, e?: React.MouseEvent) => void;
  /** 变化时回调函数 */
  onChange?: (checked: boolean, value?: string, e?: React.MouseEvent) => void;
  /** 用来区分checkbox  */
  value?: string;
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 失效状态 */
  disabled?: boolean;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** 标题 */
  title?: (() => React.ReactNode) | React.ReactNode;
  /** 副标题 */
  subTitle?: (() => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  /** 标题前Icon */
  icon?: React.ReactNode;
}

const prefixCls = 'dmc-checkbox';
const getIconAttr = (on: boolean, indeterminate?: boolean): [React.ElementType, string] => {
  return on
    ? [CheckboxOn, 'checked']
    : indeterminate
    ? [CheckboxIntermediate, 'intermediate']
    : [CheckboxOff, 'uncheck'];
};

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>((props, ref) => {
  const {
    type,
    size,
    defaultChecked,
    checked,
    disabled,
    onClick,
    onChange,
    indeterminate,
    className,
    hiddenTitle,
    value,
    subTitle,
    title,
    children,
    ...restProps
  } = props;
  const [unControlVal, setUnControlVal] = React.useState(defaultChecked || false);
  const isControl = 'checked' in props;
  const val = !!(isControl ? checked : unControlVal);

  const labelCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-has-sub-title`]: subTitle,
    },
    className,
  );

  const handleChange = (e: React.MouseEvent) => {
    !isControl && setUnControlVal(!val);
    onChange && onChange(!val, value, e);
    onClick?.(val, value, e);
  };

  const [Icon, status] = getIconAttr(val, indeterminate);
  let cn = children;
  if (!cn && !!title) {
    cn = (
      <div className={`${prefixCls}-info`}>
        {!!title && <div className={`${prefixCls}-title`}>{title}</div>}
        {!!subTitle && <div className={`${prefixCls}-sub-title`}>{subTitle}</div>}
      </div>
    );
  }

  return (
    <label
      {...restProps}
      ref={ref}
      className={labelCls}
      onClick={disabled ? undefined : handleChange}
    >
      <span className={`${prefixCls}-icon-container`}>
        <Icon className={`${prefixCls}-icon-${status}`} />
      </span>
      {props.icon}
      {!hiddenTitle && cn}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;

const CheckboxMemo = React.memo(Checkbox);
CheckboxMemo.displayName = 'CheckboxMemo';
export { CheckboxMemo };
