import * as React from 'react';
import classNames from 'classnames';
import './style/toggle.less';

export interface ToggleProps {
  /** 大小 */
  size?: 'compact';
  /** 选中状态 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 类名 */
  className?: string;
  /** 失效状态 */
  disabled?: boolean;
  /** 选中时的内容 */
  checkedChildren?: React.ReactNode;
  /** 非选中时的内容 */
  unCheckedChildren?: React.ReactNode;
  /** 显示文案 */
  showText?: boolean;
  /** 选中文案 */
  checkedText?: React.ReactNode;
  /** 非选中文案 */
  unCheckedText?: React.ReactNode;
  /** 加载样式 */
  loading?: boolean;
  /** 允许修改加载 */
  enableChangeLoading?: boolean;
  /** 状态改变回调 */
  onChange?: (
    checked: boolean,
    e: React.MouseEvent<HTMLButtonElement>,
    finished?: () => void,
  ) => void;
}

const prefixCls = 'dmc-toggle';
const Checked = () => (
  <svg
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dmc-inner-icon"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.39537 5.75209C3.22775 5.91708 3.00967 6 2.79074 6C2.57181 6 2.35288 5.91708 2.18611 5.75209L0.250788 3.83733C-0.0835961 3.50735 -0.0835961 2.97176 0.250788 2.64093C0.585173 2.3101 1.12566 2.3101 1.46005 2.64093L2.79074 3.95748L6.53995 0.248123C6.87434 -0.0827076 7.41483 -0.0827076 7.74921 0.248123C8.0836 0.578953 8.0836 1.1137 7.74921 1.44453L3.39537 5.75209Z"
      fill="currentColor"
    />
  </svg>
);
const Uncheck = () => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dmc-inner-icon"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.7702 4.66227C6.0766 4.96869 6.0766 5.46397 5.7702 5.77038C5.6174 5.9232 5.41679 6 5.21618 6C5.01557 6 4.81497 5.9232 4.66216 5.77038L3.0001 4.10821L1.33725 5.77038C1.18445 5.9232 0.983838 6 0.78323 6C0.582623 6 0.382799 5.9232 0.22921 5.77038C-0.0764032 5.46397 -0.0764032 4.96869 0.22921 4.66227L1.89127 3.0001L0.22921 1.33793C-0.0764032 1.03151 -0.0764032 0.535445 0.22921 0.229812C0.535606 -0.0766041 1.03164 -0.0766041 1.33725 0.229812L3.0001 1.89198L4.66216 0.229812C4.96856 -0.0766041 5.46381 -0.0766041 5.7702 0.229812C6.0766 0.535445 6.0766 1.03151 5.7702 1.33793L4.10814 3.0001L5.7702 4.66227Z"
      fill="currentColor"
    />
  </svg>
);
const Loading = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="dmc-toggle-loading-icon"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.520813 4.99998C0.520813 2.5262 2.5262 0.520813 4.99998 0.520813C5.03167 0.520813 5.0633 0.521143 5.09486 0.5218C7.52495 0.572411 9.47915 2.55792 9.47915 4.99998C9.47915 7.47376 7.47376 9.47915 4.99998 9.47915C4.71233 9.47915 4.47915 9.24596 4.47915 8.95831C4.47915 8.67066 4.71233 8.43748 4.99998 8.43748C6.89846 8.43748 8.43748 6.89846 8.43748 4.99998C8.43748 3.12595 6.93773 1.60207 5.07317 1.56324C5.04884 1.56273 5.02445 1.56248 4.99998 1.56248C3.1015 1.56248 1.56248 3.1015 1.56248 4.99998C1.56248 5.28763 1.32929 5.52081 1.04165 5.52081C0.753998 5.52081 0.520813 5.28763 0.520813 4.99998Z"
      fill="currentColor"
    />
  </svg>
);

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const {
    size,
    disabled,
    className,
    onChange,
    checked,
    defaultChecked,
    checkedChildren,
    unCheckedChildren,
    showText,
    checkedText,
    unCheckedText,
    loading,
    enableChangeLoading,
    ...restProps
  } = props;
  const [unControlVal, setUnControlVal] = React.useState(defaultChecked || false);
  const isControl = 'checked' in props;
  const val = !!(isControl ? checked : unControlVal);

  const [changing, setChanging] = React.useState(false);

  const wrapperCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-on`]: val,
    },
    className,
  );

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    !isControl && setUnControlVal(!val);
    if (enableChangeLoading) {
      setChanging(true);
      onChange &&
        onChange(!val, e, () => {
          setChanging(false);
        });
    } else {
      onChange && onChange(!val, e);
    }
  };

  const node =
    loading || changing ? (
      <Loading />
    ) : val ? (
      checkedChildren || <Checked />
    ) : (
      unCheckedChildren || <Uncheck />
    );
  const text = val ? checkedText : unCheckedText;
  const onClick = loading || changing || disabled ? undefined : handleChange;

  return (
    <div {...restProps} ref={ref} className={wrapperCls}>
      {showText && <div className={`${prefixCls}-text`}>{text}</div>}
      <button className={`${prefixCls}-button`} onClick={onClick} type="button">
        <span className={`${prefixCls}-button-inner`}>{node}</span>
      </button>
    </div>
  );
});

Toggle.displayName = 'Toggle';
export default Toggle;

const ToggleMemo: React.FC<ToggleProps> = React.memo(Toggle);

ToggleMemo.displayName = 'ToggleMemo';
