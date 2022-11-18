import * as React from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import classNames from 'classnames';
import useStaticCallback from '@/hooks/useStaticCallback';
import useRegistInputEnterEvent from '@/hooks/useRegistInputEnterEvent';
import calculateNodeHeight from '../_utils/calculateNodeHeight';
import './style/textarea.less';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}
export interface TextareaProps {
  type?: 'menu-bg' | 'assist-bg';
  status?: 'warning' | 'error' | 'success';
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  block?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  onFocus?: (e: React.ChangeEvent) => void;
  onBlur?: (e: React.ChangeEvent) => void;
  autoSize?: boolean | AutoSizeType;
  style?: React.CSSProperties;
}
export interface TextareaRef {
  dom: HTMLDivElement | null;
  textarea: HTMLTextAreaElement | null;
  focus: () => void;
  blur: () => void;
}

const prefixCls = 'dmc-input-textarea';

export const Textarea = React.forwardRef<TextareaRef, TextareaProps>((props, ref) => {
  const {
    type,
    status,
    value,
    defaultValue,
    className,
    disabled,
    onChange,
    onPressEnter,
    autoSize,
    onFocus,
    block,
    style,
    ...restProps
  } = props;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => {
    return {
      dom: wrapperRef.current,
      textarea: textareaRef.current,
      focus: () => {
        textareaRef.current && textareaRef.current.focus();
      },
      blur: () => {
        textareaRef.current && textareaRef.current.blur();
      },
    };
  });

  const [unControlVal, setUnControlVal] = React.useState(defaultValue ?? '');
  const [textareaStyles, setTextareaStyles] = React.useState({});
  const [isFocus, setIsFocus] = React.useState(false);
  const isControl = 'value' in props;
  const val = isControl ? value ?? '' : unControlVal;

  React.useEffect(() => {
    if (autoSize && textareaRef.current) {
      const { minRows, maxRows } = (autoSize || {}) as AutoSizeType;
      const textareaStyles = calculateNodeHeight(textareaRef.current, false, minRows, maxRows);
      setTextareaStyles(textareaStyles);
    }
  }, [autoSize, val]);

  const wrapperCls = classNames(
    `${prefixCls}`,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${status}-status`]: status,
      [`${prefixCls}-focused`]: isFocus,
      [`${prefixCls}-resize`]: !autoSize,
    },
    className,
  );

  useRegistInputEnterEvent(textareaRef, onPressEnter);

  const handleChange = useStaticCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    !isControl && setUnControlVal(e.target.value);
    onChange && onChange(e);
  });

  const handleFocus = useStaticCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsFocus(true);
    onFocus && onFocus(e);
  });

  useClickAway(wrapperRef, () => {
    setIsFocus(false);
  });

  return (
    <div className={wrapperCls} ref={wrapperRef}>
      <textarea
        {...restProps}
        value={val}
        ref={textareaRef}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        className={`${prefixCls}-textarea`}
        style={{ ...(style || {}), ...textareaStyles }}
      />
    </div>
  );
});

Textarea.defaultProps = {
  autoSize: { minRows: 2 },
};

Textarea.displayName = 'Textarea';
export default Textarea;

const TextareaMemo = React.memo(Textarea);
TextareaMemo.displayName = 'TextareaMemo';
export { TextareaMemo };
