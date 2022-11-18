import * as React from 'react';
import CheckList, { TreeCheckList, TreeLabelValueItemInterface } from '../check-list';
import classnames from 'classnames';
import SortList, { RenderItemType } from '../sort-list';
import './style/transfer.less';
import useStaticCallback from '@/hooks/useStaticCallback';
import Scrollbar from '@/components/scrollbar';
import find from 'lodash/find';
import map from 'lodash/map';
import { useMeasure } from 'react-use';
import { LabelValueItemInterface } from '../_utils/interfaces';

const prefixCls = 'dmc-transfer';

const getChild = (arr: TreeLabelValueItemInterface[]) => {
  const childs: TreeLabelValueItemInterface[] = [];
  arr.forEach((item) => {
    if (item.children) {
      childs.splice(-1, 0, ...getChild(item.children));
    } else {
      childs.push(item);
    }
  });
  return childs;
};

export enum TransferMode {
  plain = 'plain',
  normal = 'normal',
}

export interface TransferProps {
  /** 模式 */
  mode?: TransferMode;
  /** 类型 */
  type?: 'assist-bg' | 'menu-bg';
  /** 大小 */
  size?: 'compact';
  /** 展示全选 */
  allSelectLabel?: React.ReactNode;
  /** 搜索占位 */
  placeholder?: string;
  /** 配置项 */
  options?: TreeLabelValueItemInterface[];
  /** 当前值 */
  value?: string[];
  /** 默认当前值 */
  defaultValue?: string[];
  /** 更改回调 */
  onChange?: (selected: string[]) => void;
  /** 移除回调 */
  onRemove?: (item: string[]) => void;
  /** 支持排序 */
  sortable?: boolean;
  /** 支持移除 */
  removable?: boolean;
  /** 支持排序的上下图标 */
  visibleUpDown?: boolean;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number | string;
  /** label 关键字 */
  labelKey?: string;
  /** value 关键字 */
  valueKey?: string;
  /** 无内容占位 */
  noContentText?: string;
  /** 无结果占位 */
  noResultText?: string;
  /** 列表动态高度（同Table） */
  checkListDynamicRowHeight?: boolean;
  /** sortlist 启用虚拟化 */
  sortListVirtualized?: boolean;
  /** checklist 描述文字 */
  checkListDescriptionText?: string;
  /** sortlist 描述文字 */
  sortListDescriptionText?: string;
  /** 显示选中计数 */
  showCount?: boolean;
  /** 清空 */
  allowClear?: boolean;
  /** 清空文案 */
  allowClearText?: string;
  /** 自定义渲染排序单元 */
  renderSortItem?: RenderItemType;
  /** 过滤列表 */
  filterList?: (options: LabelValueItemInterface, search: string) => LabelValueItemInterface[];
  /** 过滤数列表 */
  filterTreeList?: (
    options: TreeLabelValueItemInterface[],
    search: string,
  ) => TreeLabelValueItemInterface[];
  /** 是否显示tip提示 */
  showTip?: boolean;
}

const Transfer: React.FC<TransferProps> = (props) => {
  const {
    mode = TransferMode.normal,
    type,
    size,
    allSelectLabel,
    placeholder,
    options,
    value,
    defaultValue,
    onChange,
    onRemove,
    sortable,
    removable,
    visibleUpDown,
    width,
    height,
    labelKey,
    valueKey,
    noContentText,
    noResultText,
    sortListVirtualized,
    checkListDescriptionText,
    sortListDescriptionText,
    showCount,
    allowClear,
    allowClearText,
    filterList,
    filterTreeList,
    checkListDynamicRowHeight,
    showTip,
    ...restProps
  } = props as TransferProps & typeof defaultProps;
  const isTree = options.some((opt) => !!opt.children);
  const cls = classnames(prefixCls, {
    [`${prefixCls}-tree`]: isTree,
    [`${prefixCls}-plain`]: mode === TransferMode.plain,
    [`${prefixCls}-no-padding`]: mode === TransferMode.normal,
  });
  const [unControlVal, setUnControlVal] = React.useState(defaultValue);
  const isControl = 'value' in props;
  const val: string[] = isControl ? (value as string[]) : unControlVal;
  const [ref, { width: sortListWidth, height: sortListHeight }] = useMeasure<HTMLDivElement>();

  const optionArray = React.useMemo(() => {
    return getChild(options);
  }, [options]);

  const sortlistVal = React.useMemo(() => {
    const sVal: TreeLabelValueItemInterface[] = [];
    val.forEach((v) => {
      const item = find(optionArray, (option) => option.key === v);
      if (item) {
        sVal.push(item);
      }
    });
    return sVal;
  }, [optionArray, val]);

  const countStr = `${sortlistVal.length}/${optionArray.length}`;

  const onCheckChange = useStaticCallback((selected: string[]) => {
    const newVal = selected;
    !isControl && setUnControlVal(newVal);
    onChange && onChange(newVal);
  });

  const onListRemove = useStaticCallback((selected: TreeLabelValueItemInterface[]) => {
    const newVal = map(selected, (val) => val.key as string);
    !isControl && setUnControlVal(newVal);
    onRemove && onRemove(newVal);
  });

  const handleClear = useStaticCallback(() => {
    !isControl && setUnControlVal([]);
    onRemove && onRemove([]);
  });

  return (
    <div {...restProps} className={cls} style={{ width, height }}>
      {isTree ? (
        <TreeCheckList
          className={`${prefixCls}-tree-checklist`}
          type={type}
          size={size}
          options={options}
          value={val}
          onChange={onCheckChange}
          filterList={filterTreeList}
          placeholder={placeholder}
          flexHeight
          noContentText={noContentText}
          noResultText={noResultText}
        />
      ) : (
        <CheckList
          className={`${prefixCls}-checklist`}
          type={type}
          mode={mode}
          size={size ?? mode === TransferMode.plain ? 'compact' : undefined}
          options={options}
          value={val}
          showCheckbox
          text={checkListDescriptionText}
          allSelectLabel={allSelectLabel}
          placeholder={placeholder}
          labelKey={labelKey || 'title'}
          valueKey={valueKey || 'key'}
          onChange={onCheckChange}
          filterList={filterList}
          flexHeight
          noContentText={noContentText}
          noResultText={noResultText}
          dynamicRowHeight={checkListDynamicRowHeight}
          showTip={showTip}
        />
      )}
      <div
        className={classnames(`${prefixCls}-checked`, {
          [`${prefixCls}-plain-sort`]: mode === TransferMode.plain,
        })}
      >
        <div className={`${prefixCls}-checked-top-right`}>
          {sortListDescriptionText && (
            <span className={`${prefixCls}-sort-list-desc`}>{sortListDescriptionText}</span>
          )}
          <span
            className={classnames(`${prefixCls}-checked-top-right-other`, {
              'align-right': (showCount && !allowClear) || (!showCount && allowClear),
              'space-between': showCount && allowClear,
            })}
          >
            {showCount && <div className={`${prefixCls}-checked-count`}>{countStr}</div>}
            {allowClear && val.length > 0 && (
              <span className="clear" onClick={handleClear}>
                {allowClearText}
              </span>
            )}
          </span>
        </div>
        <div
          className={classnames(`${prefixCls}-checked-list`, {
            [`${prefixCls}-${type}`]: type,
          })}
        >
          <Scrollbar type={type}>
            <div
              ref={ref}
              className={classnames(`${prefixCls}-checked-list-wrapper`, {
                [`${prefixCls}-${type}`]: type,
                [`${prefixCls}-checked-list-plain`]: mode === TransferMode.plain,
              })}
            >
              <SortList
                type={type}
                mode={mode}
                disabled={!sortable}
                removable={removable}
                visibleUpDown={visibleUpDown}
                list={sortlistVal}
                listWidth={sortListWidth}
                listHeight={sortListHeight}
                labelKey={labelKey || 'title'}
                valueKey={valueKey || 'key'}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                useVirtual={sortListVirtualized}
                onChange={onListRemove}
              />
            </div>
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};
const defaultProps = {
  sortable: false,
  removable: true,
  height: 379,
  options: [] as TreeLabelValueItemInterface[],
  // value: [] as string[],
  defaultValue: [] as string[],
  sortListDescriptionText: '',
  showCount: true,
  allowClear: false,
  allowClearText: '清空',
};
Transfer.defaultProps = defaultProps;

export default Transfer;
