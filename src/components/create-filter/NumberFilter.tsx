import * as React from 'react';
import classNames from 'classnames';
import { InputNumber } from '../input';
import Select from '../select';
import { IconButton } from '../button';
import Popconfirm from '../popconfirm';
import CreateFilter from './CreateFilter';
import './style/number-filter.less';
import { TooltipPlacement } from '@/components/tooltip';
import { map, size, isNumber } from 'lodash';
import { useMemoizedFn, useSetState, useCreation } from 'ahooks';
import { BaseContext, LocaleEnum } from '@/components/style';
import en from './languages/en-US';
import zh from './languages/zh-CN';

const prefixCls = 'dmc-number-filter';
const { useCallback } = React;
const localeMap = {
  [LocaleEnum.en]: en.numberFilterLocale,
  [LocaleEnum.zh]: zh.numberFilterLocale,
};
export enum NumberFilterTypeSet {
  interval = 'interval', // 区间
  segment = 'segment', // 分段
}
interface Seg {
  min?: number;
  max?: number;
}
export interface NumberItemProps {
  defaultValue?: number; // 设置的最大值
  statistic?: number; // 统计的最大值
  label: string;
  placeholder?: string;
  onChange: (e: number | string) => void;
  overlayClassName?: string;
}

const NumberItem: React.FC<NumberItemProps> = React.memo(
  ({ defaultValue, statistic, onChange, label, placeholder }) => {
    return (
      <div className={`${prefixCls}-item`}>
        <div className={`${prefixCls}-label`}>
          {label}{' '}
          <span title={`${statistic || ''}`} className={`${prefixCls}-statistic`}>
            ({statistic})
          </span>
        </div>
        <InputNumber
          type="menu-bg"
          size="compact"
          onChange={onChange}
          placeholder={placeholder}
          visibilityHandler
          defaultValue={defaultValue}
          className={`${prefixCls}-input`}
        />
      </div>
    );
  },
);

export interface NumberFilterResult {
  min?: number;
  max?: number;
  segmentation?: Seg[];
}

export interface NumberFilterProps {
  /** 设置的最小值 */
  min?: number;
  /** 设置的最大值 */
  max?: number;
  /** 类名 */
  className?: string;
  /** 统计的最小值 */
  statisticMin: number;
  /** 统计的最大值 */
  statisticMax: number;
  /** 加载样式 */
  loading?: boolean;
  /** 占位文案 */
  placeholder?: string;
  children: string | React.ReactElement;
  /** 关闭回调 */
  onClose?: () => void;
  /** 最大值的描述文案 */
  labelMax: string;
  /** 最小值的描述文案 */
  labelMin: string;
  /** 确定按钮的文字 */
  okButtonLabel?: React.ReactNode;
  /** 取消按钮的文字 */
  cancelButtonLabel?: React.ReactNode;
  /** 确定按钮的点击回调 */
  onOk?: (result: NumberFilterResult) => void;
  /** 任意点击关闭 */
  clickAway?: boolean;
  /** 气泡框位置 */
  placement?: TooltipPlacement;
  /** 内容的类名 */
  overlayClassName?: string;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 区间｜分段 不传，老版本区间*/
  type?: NumberFilterTypeSet;
  /** 分段区间 */
  segmentation?: Seg[];
}

interface StateRefInterface extends Seg {
  segmentation?: Seg[];
}
interface ContentProps {
  type?: NumberFilterTypeSet;
  min?: number; // 设置的最大值
  max?: number; // 设置的最大值
  statisticMin?: number; // 统计的最大值
  statisticMax?: number; // 统计的最大值
  labelMin: string;
  labelMax: string;
  placeholder?: string;
  changeMin: (e: number | string) => void;
  changeMax: (e: number | string) => void;
  overlayClassName?: string;
  segmentation?: Seg[];
  pushSegmentation?: (seg: Seg) => void;
  deleteSegmentation?: (index: number) => void;
}

const Content = (props: ContentProps) => {
  const { locale = LocaleEnum.zh } = React.useContext(BaseContext);
  const {
    type,
    placeholder,
    labelMin,
    statisticMin,
    min,
    labelMax,
    statisticMax,
    max,
    changeMax,
    changeMin,
    segmentation,
    pushSegmentation,
    deleteSegmentation,
  } = props;
  const newRef = React.useRef<{ max: number | string; min: number | string }>({
    max: '',
    min: '',
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const [_type, setType] = React.useState(type);
  const _confirm = () => {
    const { min, max } = newRef.current;
    if (isNumber(Number(min)) && isNumber(Number(max))) {
      pushSegmentation?.({ min: Number(min), max: Number(max) });
    }
  };
  const options = useCreation(() => {
    return [
      {
        kay: localeMap[locale].intervalScreening,
        label: localeMap[locale].intervalScreening,
        value: localeMap[locale].intervalScreening,
      },
      {
        kay: localeMap[locale].segmentScreening,
        label: localeMap[locale].segmentScreening,
        value: localeMap[locale].segmentScreening,
      },
    ];
  }, []);

  return (
    <div ref={ref}>
      {_type && (
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <Select
            className={`${prefixCls}-select`}
            size="mini"
            type="assist-bg"
            value={
              _type === NumberFilterTypeSet.segment
                ? localeMap[locale].segmentScreening
                : localeMap[locale].intervalScreening
            }
            options={options}
            getPopupContainer={() => ref.current as HTMLElement}
            onChange={(value) => {
              let _value = NumberFilterTypeSet.interval;
              if (value === localeMap[locale].segmentScreening) {
                _value = NumberFilterTypeSet.segment;
              }
              setType(_value);
            }}
          />
          {_type === NumberFilterTypeSet.segment && (
            <Popconfirm
              description={
                <div style={{ display: 'flex' }}>
                  <NumberItem
                    placeholder={placeholder}
                    label={labelMin}
                    statistic={statisticMin}
                    onChange={(e) => {
                      newRef.current.min = e;
                    }}
                  />
                  <div className={`${prefixCls}-split`}>-</div>
                  <NumberItem
                    label={labelMax}
                    statistic={statisticMax}
                    onChange={(e) => {
                      newRef.current.max = e;
                    }}
                    placeholder={placeholder}
                  />
                </div>
              }
              onConfirm={() => {
                _confirm();
              }}
              okText={localeMap[locale].ok}
              cancelText={localeMap[locale].cancel}
              message={localeMap[locale].addSegment}
              emotion={'info'}
              placement="bottom"
              trigger="click"
              getPopupContainer={() => ref.current as HTMLElement}
            >
              <IconButton icon="add" type="assist-bg" className={`${prefixCls}-ml6`} />
            </Popconfirm>
          )}
        </div>
      )}
      {(_type === NumberFilterTypeSet.interval || _type === undefined) && (
        <div className={`${prefixCls}-content`}>
          <NumberItem
            placeholder={placeholder}
            label={labelMin}
            statistic={statisticMin}
            defaultValue={min}
            onChange={changeMin}
          />
          <div className={`${prefixCls}-split`}>-</div>
          <NumberItem
            label={labelMax}
            statistic={statisticMax}
            defaultValue={max}
            onChange={changeMax}
            placeholder={placeholder}
          />
        </div>
      )}
      {_type === NumberFilterTypeSet.segment && (
        <div
          className={classNames(`${prefixCls}-content`, {
            [`${prefixCls}-mb16`]: size(segmentation) > 0,
          })}
          style={{ display: 'block' }}
        >
          {size(segmentation) === 0 && (
            <div className={`${prefixCls}-none-text`}>
              <div>{localeMap[locale].noContent}</div>
              <div>
                {localeMap[locale].please}
                <span>
                  {statisticMin}-{statisticMax}
                  {localeMap[locale].between}
                </span>
                {localeMap[locale].addSegment}
              </div>
            </div>
          )}
          {map(segmentation, (seg, index) => {
            return (
              <div className={`${prefixCls}-content-item`} key={index}>
                <div>
                  {seg.min}-{seg.max}
                </div>
                <IconButton
                  icon="delete-2"
                  type="only-icon"
                  onClick={() => {
                    deleteSegmentation?.(index);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NumberFilter: React.FC<NumberFilterProps> = (props) => {
  const {
    min,
    max,
    onOk,
    onClose,
    children,
    className,
    labelMax,
    labelMin,
    statisticMin,
    statisticMax,
    placeholder,
    type, // 区间｜分段  不传，就是老版本区间
    segmentation,
    ...restProps
  } = props as NumberFilterProps & typeof defaultProps;

  const [state, setState] = useSetState<StateRefInterface>({
    min: min,
    max: max,
    segmentation: segmentation || [],
  });

  React.useEffect(() => {
    setState({
      segmentation: segmentation || [],
    });
  }, [segmentation, setState]);

  const changeMin = useMemoizedFn((v) => {
    setState({ min: v });
  });

  const changeMax = useMemoizedFn((v) => {
    setState({ max: v });
  });

  const pushSegmentation = useCallback(
    (seg: Seg) => {
      const segmentation = state.segmentation;
      segmentation?.push(seg);
      setState({ segmentation });
    },
    [setState, state.segmentation],
  );

  const deleteSegmentation = useCallback(
    (index: number) => {
      const segmentation = state.segmentation;
      segmentation?.splice(index, 1);
      setState({ segmentation });
    },
    [setState, state.segmentation],
  );

  const handleConfirm = useCallback(() => {
    if (onOk) {
      const current = state;
      const result: NumberFilterResult = {
        min: current.min,
        max: current.max,
        segmentation: current.segmentation || [],
      };
      onOk(result);
    }
  }, [onOk, state]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }

    setState({
      min: min,
      max: max,
    });
  }, [onClose, min, max, setState]);

  return (
    <CreateFilter
      onClose={handleClose}
      onOk={handleConfirm}
      overlay={
        <Content
          type={type}
          placeholder={placeholder}
          labelMin={labelMin}
          statisticMin={statisticMin}
          min={min}
          changeMin={changeMin}
          labelMax={labelMax}
          statisticMax={statisticMax}
          max={max}
          changeMax={changeMax}
          segmentation={state.segmentation}
          pushSegmentation={pushSegmentation}
          deleteSegmentation={deleteSegmentation}
        />
      }
      footerClassName={`${prefixCls}-footer`}
      className={classNames(prefixCls, className)}
      {...restProps}
    >
      {children}
    </CreateFilter>
  );
};

NumberFilter.displayName = 'NumberFilter';
export default NumberFilter;
const defaultProps = {
  placement: 'bottomLeft' as TooltipPlacement,
};
NumberFilter.defaultProps = defaultProps;
const NumberFilterMemo = React.memo(NumberFilter);
NumberFilterMemo.displayName = 'NumberFilterMemo';
export { NumberFilterMemo };
