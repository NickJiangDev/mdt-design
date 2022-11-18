import * as React from 'react';
import orderBy from 'lodash/orderBy';
import { randomUuid } from '../_utils/stringUtil';
import { StopProps, prefixCls } from './ColorGradient';

export interface PaletteProps {
  palette: StopProps[];
}

const Palette: React.FC<PaletteProps> = ({ palette = [] }) => {
  const gradientId = React.useMemo(() => randomUuid(), []);
  return (
    <svg className={`${prefixCls}-palette`} width="100%" height="100%">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0.5" x2="1" y2="0.5">
          {' '}
          {orderBy(palette, 'offset', 'asc').map((c, index) => (
            <stop key={index} offset={c.offset} style={{ stopColor: c.color, stopOpacity: 1 }} />
          ))}
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
    </svg>
  );
};

Palette.displayName = 'Palette';
export default Palette;

const PaletteMemo = React.memo(Palette);
PaletteMemo.displayName = 'PaletteMemo';
export { PaletteMemo };
