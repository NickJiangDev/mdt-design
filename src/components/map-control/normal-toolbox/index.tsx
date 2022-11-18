import Icon from '@/components/icon';
import * as React from 'react';
import { NormalToolboxProps, prefixCls } from '../index';
import { useCallback } from 'react';
import Tooltip from '@/components/tooltip';
import classnames from 'classnames';

const NormalToolbox = React.memo<NormalToolboxProps>(
  ({
    id,
    icon,
    onClick,
    tooltip,
    tooltipPlacement = 'top',
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0,
    style,
  }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        onClick(id, e);
      },
      [id, onClick],
    );
    return (
      <Tooltip
        title={tooltip}
        mouseLeaveDelay={mouseLeaveDelay}
        mouseEnterDelay={mouseEnterDelay}
        placement={tooltipPlacement}
      >
        <div className={classnames(`${prefixCls}-toolbox`)} onClick={handleClick} style={style}>
          <div className={`${prefixCls}-toolbox-inner`}>
            {typeof icon === 'string' ? <Icon icon={icon} size={16} /> : <>{icon}</>}
          </div>
        </div>
      </Tooltip>
    );
  },
);

export default NormalToolbox;
