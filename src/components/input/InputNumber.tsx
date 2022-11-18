import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
import './style/input-number.less';

export interface InputNumberProps {
  type?: 'menu-bg' | 'assist-bg';
  size?: 'compact';
  status?: 'warning' | 'error' | 'success';
  value?: number | string;
  defaultValue?: number | string;
  focusOnUpDown?: boolean;
  autoFocus?: boolean;
  onChange?: (e: number | string) => void;
  onPressEnter?: (e: React.ChangeEvent) => void;
  onKeyDown?: (e: React.ChangeEvent) => void;
  onKeyUp?: (e: React.ChangeEvent) => void;
  tabIndex?: number | string;
  disabled?: boolean;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  max?: number;
  min?: number;
  step?: number | string;
  useTouch?: boolean;
  formatter?: (value: number | string) => string;
  parser?: (displayValue: string) => number | undefined;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseOver?: (e: React.MouseEvent) => void;
  onMouseOut?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  precision?: number;
  required?: boolean;
  pattern?: string;
  decimalSeparator?: string;
  inputMode?: string;
  placeholder?: string;
  className?: string;
  block?: boolean;
  centered?: boolean;
  visibilityHandler?: boolean;
  style?: React.CSSProperties;
}

const prefixCls = 'dmc-input-number';

export const InputNumber = React.forwardRef<unknown, InputNumberProps>((props, ref) => {
  const { type, size, status, className, block, centered, visibilityHandler, ...restProps } = props;

  const inputNumberClass = classNames(
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-centered`]: centered,
      [`${prefixCls}-visibility-handler`]: visibilityHandler,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-${status}-status`]: status,
    },
    className,
  );

  return (
    <RcInputNumber
      {...restProps}
      ref={ref}
      prefixCls={prefixCls}
      className={inputNumberClass}
      upHandler={<Icon icon="arrow-up" className={`${prefixCls}-handler-up-inner`} />}
      downHandler={<Icon icon="arrow-down" className={`${prefixCls}-handler-down-inner`} />}
    />
  );
});

InputNumber.defaultProps = {
  step: 1,
};

InputNumber.displayName = 'InputNumber';
export default InputNumber;

const InputNumberMemo = React.memo(InputNumber);
InputNumberMemo.displayName = 'InputNumberMemo';
export { InputNumberMemo };
