import * as React from 'react';
import { Swatch } from 'react-color/lib/components/common';
import { useEvent, useHover } from 'react-use';
import classNames from 'classnames';
import { prefixCls } from './constant';
import { CircleSwatchProps } from './interface';

const CircleSwatch: React.FC<CircleSwatchProps> = ({
  onDelete,
  index,
  color,
  onClick,
  active,
  onSwatchHover,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const element = React.useMemo(
    () => (
      <div className={`${prefixCls}-circle-swatch`}>
        <Swatch color={color} onClick={onClick} onHover={onSwatchHover} />
      </div>
    ),
    [color, onClick, onSwatchHover],
  );
  const handleKeyup = React.useCallback(
    ({ key }) => {
      if (key === 'Backspace' && onDelete) {
        onDelete(index);
      }
    },
    [index, onDelete],
  );

  useEvent('keydown', handleKeyup, ref.current, {});
  const [hoverable, hovered] = useHover(element);
  const wrapCls = classNames(`${prefixCls}-circle-swatch-wrap`, { hovered: hovered, active });
  return (
    <div ref={ref} className={wrapCls}>
      {hoverable}
    </div>
  );
};

CircleSwatch.displayName = 'CircleSwatch';
export default CircleSwatch;

const CircleSwatchMemo = React.memo(CircleSwatch);
CircleSwatchMemo.displayName = 'CircleSwatchMemo';
export { CircleSwatchMemo };
