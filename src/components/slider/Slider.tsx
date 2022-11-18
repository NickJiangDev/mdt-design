import * as React from 'react';
import RcSlider, { Range as RcRange, Handle as RcHandle } from 'rc-slider';
import { TooltipPlacement } from '../tooltip';
import SliderTooltip from './SliderTooltip';
import classNames from 'classnames';
import './style/slider.less';

export interface SliderMarks {
  [key: number]: React.ReactNode | { style: React.CSSProperties; label: React.ReactNode };
}

export type SliderValue = number | number[];

export interface HandleGeneratorInfo {
  value: number;
  dragging: boolean;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest: any[];
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string;
  prefixCls?: string;
  info: HandleGeneratorInfo;
}) => React.ReactNode;

export interface SliderProps {
  /** 双滑块模式 */
  range?: boolean;
  /** 反向坐标轴 */
  reverse?: boolean;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 */
  step?: number | null;
  /** marks	刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 */
  marks?: SliderMarks;
  /** 是否只能拖拽到刻度上 */
  dots?: boolean;
  /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  value?: SliderValue;
  tabIndex?: number;
  /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  defaultValue?: SliderValue;
  /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 */
  included?: boolean;
  /** 失效状态 */
  disabled?: boolean;
  /** 值为 true 时，Slider 为垂直方向 */
  vertical?: boolean;
  /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 */
  onChange?: (value: SliderValue) => void;
  /** 与 onmouseup 触发时机一致，把当前值作为参数传入 */
  onAfterChange?: (value: SliderValue) => void;
  /** Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip */
  tipFormatter?: null | ((value: number) => React.ReactNode);
  /** 类名 */
  className?: string;
  id?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 */
  tooltipVisible?: boolean;
  /** 设置 Tooltip 展示位置。参考 Tooltip */
  tooltipPlacement?: TooltipPlacement;
  /** Tooltip 渲染父节点，默认渲染到 body 上 */
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 大小 */
  size?: 'small';
}

export type Visibles = { [index: number]: boolean };

const prefixCls = 'dmc-slider';

export const Slider = React.forwardRef<unknown, SliderProps>((props, ref) => {
  const [visibles, setVisibles] = React.useState<Visibles>({});

  const toggleTooltipVisible = (index: number, visible: boolean) => {
    const temp = { ...visibles };
    temp[index] = visible;
    setVisibles(temp);
  };

  const handleWithTooltip: HandleGeneratorFn = ({
    prefixCls,
    info: { value, dragging, index, ...restProps },
  }) => {
    const {
      tipFormatter,
      tooltipVisible,
      tooltipPlacement,
      getTooltipPopupContainer,
      vertical,
    } = props;
    const isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
    const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter);
    return (
      <SliderTooltip
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={visible}
        placement={tooltipPlacement || (vertical ? 'right' : 'top')}
        key={index}
        overlayClassName={`${prefixCls}-tooltip`}
        getPopupContainer={getTooltipPopupContainer || (() => document.body)}
      >
        <RcHandle
          {...restProps}
          value={value}
          onMouseEnter={() => toggleTooltipVisible(index, true)}
          onMouseLeave={() => toggleTooltipVisible(index, false)}
        />
      </SliderTooltip>
    );
  };

  const { range, className, size, ...restProps } = props;

  if (range) {
    return (
      <RcRange
        {...restProps}
        className={classNames(className, {
          [`${prefixCls}-${size}`]: size,
        })}
        ref={ref}
        prefixCls={prefixCls}
        handle={(info: HandleGeneratorInfo) => handleWithTooltip({ prefixCls, info })}
      />
    );
  }
  return (
    <RcSlider
      {...restProps}
      className={classNames(className, {
        [`${prefixCls}-${size}`]: size,
      })}
      ref={ref}
      prefixCls={prefixCls}
      handle={(info: HandleGeneratorInfo) => handleWithTooltip({ prefixCls, info })}
    />
  );
});

Slider.displayName = 'Slider';
Slider.defaultProps = {
  tipFormatter(value: number) {
    return typeof value === 'number' ? value.toString() : '';
  },
};
export default Slider;

const SliderMemo = React.memo(Slider);
SliderMemo.displayName = 'SliderMemo';
export { SliderMemo };
