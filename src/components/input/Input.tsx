import * as React from 'react';
import classNames from 'classnames';
import useClickAway from 'react-use/lib/useClickAway';
import useRegistInputEnterEvent from '@/hooks/useRegistInputEnterEvent';
import IconButton from '../button/IconButton';
import Icon from '../icon';
import './style/input.less';

export type InputType = 'text' | 'password';

export type InputStatusType = 'warning' | 'error' | 'success';

export interface InputProps {
  type?: 'menu-bg' | 'assist-bg';
  size?: 'compact';
  status?: InputStatusType;
  /** 'text' | 'password' */
  inputType?: InputType;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  block?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  prefixIcon?: string;
  prefixAddon?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixIcon?: string;
  suffixAddon?: React.ReactNode;
  centered?: boolean;
  autoFocus?: boolean | string | number;
  autoComplete?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  onPrefixClick?: (e: React.MouseEvent) => void;
  onSuffixClick?: (e: React.MouseEvent) => void;
}
export interface InputRef {
  dom: HTMLDivElement | null;
  input: HTMLInputElement | null;
  focus: () => void;
  blur: () => void;
  select: () => void;
}

const prefixCls = 'dmc-input';

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    type,
    size,
    status,
    value,
    inputType,
    defaultValue,
    disabled,
    className,
    block,
    onChange,
    onPressEnter,
    onFocus,
    onBlur,
    allowClear,
    suffix,
    prefix,
    prefixIcon,
    suffixIcon,
    prefixAddon,
    suffixAddon,
    centered,
    autoFocus,
    style,
    inputStyle,
    onPrefixClick,
    onSuffixClick,
    ...restProps
  } = props;

  const [unControlVal, setUnControlVal] = React.useState(defaultValue ?? '');
  const isControl = 'value' in props;
  const val = isControl ? value ?? '' : unControlVal;
  const [isFocus, setIsFocus] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => {
    return {
      dom: wrapperRef.current,
      input: inputRef.current,
      focus: () => {
        inputRef.current && inputRef.current.focus();
      },
      blur: () => {
        inputRef.current && inputRef.current.blur();
      },
      select: () => {
        inputRef.current && inputRef.current.select();
      },
    };
  });

  const wrapperCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-${status}-status`]: status,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-focused`]: isFocus,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const inputCls = classNames(`${prefixCls}-input`, {
    [`${prefixCls}-input-centered`]: centered,
  });

  useRegistInputEnterEvent(inputRef, onPressEnter);

  const handleClearValue = () => {
    !isControl && setUnControlVal('');
    if (onChange) {
      const event = { target: {}, currentTarget: {} } as React.ChangeEvent<HTMLInputElement>;
      event.target.value = '';
      event.currentTarget.value = '';
      onChange(event);
    }
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current && inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !isControl && setUnControlVal(e.target.value);
    onChange && onChange(e);
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBlur && onBlur(e);
  };

  useClickAway(wrapperRef, () => {
    setIsFocus(false);
  });

  const prefixNode = prefixAddon ? (
    <div className={`${prefixCls}-prefix-addon`} onClick={onPrefixClick}>
      {prefixAddon}
    </div>
  ) : prefixIcon ? (
    <Icon icon={prefixIcon} className={`${prefixCls}-prefix-icon`} onClick={onPrefixClick} />
  ) : prefix ? (
    <div className={`${prefixCls}-prefix`} onClick={onPrefixClick}>
      {prefix}
    </div>
  ) : null;

  const suffixNode = suffixAddon ? (
    <div className={`${prefixCls}-suffix-addon`} onClick={onSuffixClick}>
      {suffixAddon}
    </div>
  ) : suffixIcon ? (
    <Icon icon={suffixIcon} className={`${prefixCls}-suffix-icon`} onClick={onSuffixClick} />
  ) : suffix ? (
    <div className={`${prefixCls}-suffix`} onClick={onSuffixClick}>
      {suffix}
    </div>
  ) : allowClear && !disabled && val ? (
    <IconButton icon="close-2" type="only-icon" onClick={handleClearValue} />
  ) : null;

  return (
    <div className={wrapperCls} style={style} ref={wrapperRef}>
      {prefixNode}
      <input
        {...restProps}
        type={inputType}
        ref={inputRef}
        disabled={disabled}
        value={val}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputCls}
        style={inputStyle}
      />
      {suffixNode}
    </div>
  );
});

Input.defaultProps = {
  inputType: 'text',
  allowClear: true,
};

Input.displayName = 'Input';
export default Input;

const InputMemo = React.memo(Input);
InputMemo.displayName = 'InputMemo';
export { InputMemo };
