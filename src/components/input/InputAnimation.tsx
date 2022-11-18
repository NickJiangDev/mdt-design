import * as React from 'react';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { Input, InputRef, InputProps } from '@/components/input';
import { IconButton } from '@/components/button';
import './style/input-animation.less';
import classNames from 'classnames';

type InputAnimationProps = Omit<InputProps, 'prefixIcon' | 'ref'>;

const prefixCls = 'dmc-input-animation';

const InputAnimation: FC<InputAnimationProps> = (props) => {
  const [enable, setEnable] = useState(!!props.value);
  const ref = useRef<InputRef>(null);

  const onClick = () => {
    setEnable(true);
    ref.current && (ref.current as InputRef).focus();
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) return;
    setEnable(false);
    props.onBlur?.(e);
  };

  const cls = classNames(
    {
      [`${prefixCls}`]: true,
      [`${prefixCls}-open`]: enable,
    },
    props.className,
  );

  return (
    <div className={cls}>
      <Input
        {...props}
        ref={ref}
        prefixIcon="search"
        className={`${prefixCls}-input`}
        onBlur={onBlur}
      />
      <div className={`${prefixCls}-icon`}>
        <IconButton type="only-icon" icon="search" ghost onClick={onClick} />
      </div>
    </div>
  );
};

InputAnimation.displayName = 'InputAnimation';
export default InputAnimation;

const InputAnimationMemo = React.memo(InputAnimation);
InputAnimationMemo.displayName = 'InputAnimationMemo';
export { InputAnimationMemo };
