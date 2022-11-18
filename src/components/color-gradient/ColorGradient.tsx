import * as React from 'react';
import classNames from 'classnames';
import { PaletteMemo as Palette } from './Palette';
import Slider from '@/components/slider';
import useEvent from 'react-use/lib/useEvent';
import useMeasure from 'react-use/lib/useMeasure';
import './style/color-gradient.less';

export const prefixCls = 'dmc-color-gradient';

export interface StopProps {
  offset: number;
  color: string;
}

export interface ColorGradientProps {
  /** 进度条颜色 */
  color: string;
  /** 点位颜色渐变 */
  stops: StopProps[];
  /** 当前激活的点位 */
  activeIndex?: number;
  /** 类名 */
  className?: string;
  /** 选择回调 */
  onSelect?: (idx: string, index?: number) => void;
  /** 变化回调 */
  onChange?: (stops: StopProps[]) => void;
  /** 激活状态变化回调 */
  onActiveChange?: (idx: number) => void;
}

const ColorGradient: React.FC<ColorGradientProps> = (props) => {
  const {
    className,
    onChange,
    stops,
    color,
    activeIndex: aIdx,
    onSelect,
    onActiveChange,
    ...restProps
  } = props as ColorGradientProps & typeof defaultProps;
  const isControl = 'activeIndex' in props;
  const [active, setActive] = React.useState(aIdx);
  const activeIndex = isControl ? aIdx ?? '' : active;
  const refWrap = React.useRef(null);
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [vstops, setVstops] = React.useState<StopProps[]>([]);

  React.useEffect(() => {
    setVstops(stops);
  }, [stops]);

  const onStopsChange = React.useCallback(
    (s: StopProps[]) => {
      if (onChange) {
        setVstops(s);
        onChange(s);
      }
    },
    [onChange],
  );

  const handleKeyup = React.useCallback(
    ({ key, target }) => {
      const tagName = target && target.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return;
      }
      if (key === 'Backspace') {
        const newStops = stops.filter((_, index) => index !== active);
        onStopsChange(newStops);
      }
    },
    [onStopsChange, active, stops],
  );

  const handleClick = React.useCallback(
    (e) => {
      let index = activeIndex;
      const target = e.target;
      const classList = e.target.classList || [];
      if (classList.contains('dmc-slider-handle')) {
        index = parseInt(target.tabIndex);
        if (onSelect) {
          onSelect(stops[target.tabIndex].color, target.tabIndex);
        }
      } else {
        const offset =
          Math.round(((e.clientX - target.getBoundingClientRect().left) / width) * 100) / 100;
        const newStops = [...stops, { offset, color }];
        index = newStops.length - 1;
        onStopsChange(newStops);
      }
      setActive(index);
      if (onActiveChange) {
        onActiveChange(index);
      }
    },
    [onSelect, onStopsChange, stops, color, width, onActiveChange, activeIndex],
  );

  const handleChange = React.useCallback(
    (index: number, value: number) => {
      const newVal = [...stops];
      newVal[index].offset = value;
      onStopsChange(newVal);
    },
    [onStopsChange, stops],
  );

  useEvent('keyup', handleKeyup, document.body);
  return (
    <div {...restProps} className={`${prefixCls}-wrap`} ref={refWrap}>
      <div
        ref={ref}
        onClick={handleClick}
        className={classNames(`${prefixCls}-gradient`, className)}
      >
        <Palette palette={vstops} />
        {vstops.map((t, idx) => (
          <Slider
            max={1}
            min={0}
            step={0.01}
            key={idx}
            value={t.offset}
            tabIndex={idx}
            tooltipVisible={false}
            onChange={(v) => handleChange(idx, v as number)}
            data-index={idx}
            className={classNames(`${prefixCls}-slider`, `${prefixCls}-slider-${idx}`, {
              actived: idx === activeIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};

const defaultProps = {
  stops: [] as StopProps[],
  color: '#fff',
};

ColorGradient.defaultProps = defaultProps;

ColorGradient.displayName = 'ColorGradient';
export default ColorGradient;

const ColorGradientMemo = React.memo(ColorGradient);
ColorGradientMemo.displayName = 'ColorGradientMemo';
export { ColorGradientMemo };
