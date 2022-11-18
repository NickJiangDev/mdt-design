import React, { FC, useEffect, useRef, useState } from 'react';
import ToolTip, { TooltipPlacement } from '@/components/tooltip';
import './style/tooltip-text.less';

export interface TooltipTextProps {
  text: string;
  textCls?: string;
  className?: string;
  placement?: TooltipPlacement;
}

const prefixCls = 'dmc-tooltip-text';

const TooltipText: FC<TooltipTextProps> = ({ text, className, placement }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const ele = ref.current! as HTMLSpanElement;
    const pw = ele.parentElement!.getBoundingClientRect().width;
    const ew = ele.getBoundingClientRect().width;
    setEnable(ew > pw);
  }, []);

  const comp = (
    <div className={`${prefixCls} ${className || ''}`}>
      <span ref={ref}>{text}</span>
    </div>
  );

  return enable ? (
    <ToolTip title={text} placement={placement}>
      {comp}
    </ToolTip>
  ) : (
    comp
  );
};

TooltipText.displayName = 'Tooltip';

export default TooltipText;

const TooltipTextMemo = React.memo(TooltipText);
TooltipTextMemo.displayName = 'TooltipTextMemo';
export { TooltipTextMemo };
