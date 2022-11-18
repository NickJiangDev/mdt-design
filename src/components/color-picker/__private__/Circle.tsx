import * as React from 'react';
import findIndex from 'lodash/findIndex';
import { ColorWrap } from 'react-color/lib/components/common';
import { CirclePropsProps } from './interface';
import CircleSwatch from './CircleSwatch';
import { prefixCls } from './constant';
import '../style/circle.less';
import { useEffect } from 'react';

const Circle: React.FC<CirclePropsProps> = ({
  onDelete,
  hex,
  actived,
  onChange,
  onSwatchHover,
  colors = [],
}) => {
  const [index, setIndex] = React.useState(findIndex(colors, (t) => t.toLowerCase() === hex));
  const handleChange = React.useCallback(
    (hexCode: string, e: MouseEvent, idx: number) => {
      onChange({ hex: hexCode, source: 'hex' }, e);
      setIndex(idx);
    },
    [onChange],
  );
  useEffect(() => {
    setIndex(findIndex(colors, (t) => t.toLowerCase() === hex));
  }, [colors, hex]);
  return (
    <div className={`${prefixCls}-circle`}>
      {colors.map((c, i) => (
        <CircleSwatch
          key={c}
          color={c}
          index={i}
          active={!!actived && i === index}
          onDelete={onDelete}
          onSwatchHover={onSwatchHover}
          onClick={(hex1, e) => handleChange(hex1, e, i)}
        />
      ))}
    </div>
  );
};

const CircleWrap = ColorWrap(Circle);
const CircleMemo = React.memo(CircleWrap);
CircleMemo.displayName = 'Circle';
export { CircleMemo };
export default CircleWrap;
