import * as React from 'react';
import { getRenderPropValue, RenderFunction } from '../_utils/getRenderPropValue';
import Tooltip, { AbstractTooltipProps } from '../tooltip';
import './style/popover.less';

export interface PopoverProps extends Omit<AbstractTooltipProps, 'prefixCls'> {
  /** 标题 */
  title?: React.ReactNode | RenderFunction;
  /** 内容 */
  content?: React.ReactNode | RenderFunction;
}

const prefixCls = 'dmc-popover';

export const Popover = React.forwardRef<unknown, PopoverProps>((props, ref) => {
  const { title, content, ...restProps } = props;

  const getOverlay = (prefixCls: string) => {
    return (
      <React.Fragment>
        {!!title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
        <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
      </React.Fragment>
    );
  };

  return <Tooltip {...restProps} prefixCls={prefixCls} ref={ref} overlay={getOverlay(prefixCls)} />;
});

Popover.defaultProps = {
  placement: 'top',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
};

Popover.displayName = 'Popover';
export default Popover;

const PopoverMemo = React.memo(Popover);
PopoverMemo.displayName = 'PopoverMemo';
export { PopoverMemo };
