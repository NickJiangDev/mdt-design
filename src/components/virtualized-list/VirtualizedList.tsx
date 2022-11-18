import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { List, ListRowProps } from 'react-virtualized/dist/commonjs/List';
import { OnScrollParams } from 'react-virtualized';
import useMeasure from 'react-use/lib/useMeasure';
import { ObjectInterface } from '../_utils/interfaces';
import createScrollbar, {
  PerfectScrollbarClass,
  ScrollbarType,
} from '../scrollbar/createScrollbar';
import './style/virtualized-list.less';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { useState } from 'react';

export interface ItemViewProps extends ObjectInterface {
  index: number;
  item: ObjectInterface;
  style: React.CSSProperties;
  className: string;
}
export interface VirtualizedListProps {
  /** 类型 */
  type?: ScrollbarType;
  /** 数据源 */
  data: ObjectInterface[];
  /** 行高 */
  rowHeight?: number;
  /** 行宽度 */
  rowWidth?: number;
  /** 单元内容 */
  ItemView: React.ElementType<ItemViewProps>;
  /** 单元属性 */
  itemViewProps?: ObjectInterface;
  onScroll?: (params: OnScrollParams) => void;
  noRowsRenderer?: () => JSX.Element;
  scrollToAlignment?: 'auto' | 'end' | 'start' | 'center';
  scrollToIndex?: number;
  scrollTop?: number;
  style?: React.CSSProperties;
  tabIndex?: number | null;
  maxHeight?: number;
  width?: number;
  height?: number;
  className?: string;
  noBorder?: boolean;
  /** 动态高度 */
  dynamicRowHeight?: boolean;
  /** 最小行高 */
  minRowHeight?: number;
  /** 默认行高 */
  defaultRowHeight?: number;
  /** 使用滚动条 */
  useScrollbar?: boolean;
}

const prefixCls = 'dmc-list';
const defaultRowHeight = 36;

const VirtualizedList: React.FC<VirtualizedListProps> = (props) => {
  const {
    data = [],
    rowHeight = props.defaultRowHeight || defaultRowHeight,
    rowWidth,
    itemViewProps = {},
    type,
    width,
    height,
    maxHeight,
    ItemView,
    className,
    noBorder,
    dynamicRowHeight,
    minRowHeight,
    useScrollbar = true,
    ...restProps
  } = props;

  const wrapperCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-no-border`]: noBorder,
      [`${prefixCls}-no-scrollbar`]: !useScrollbar,
    },
    className,
  );
  const [ref, { width: eleWidth, height: eleHeight }] = useMeasure<HTMLDivElement>();
  const itemCls = `${prefixCls}-item`;
  const psRef = React.useRef<PerfectScrollbarClass>();
  const listRef = React.useRef<List | null>(null);

  const [cache] = useState(
    new CellMeasurerCache({
      fixedWidth: true,
      minHeight: minRowHeight,
    }),
  );

  const rowRender = React.useCallback(
    ({ key, index, parent, style }: ListRowProps) => {
      const item = data[index];
      const cls = classNames(itemViewProps.className, itemCls);
      return dynamicRowHeight ? (
        <CellMeasurer cache={cache} parent={parent} key={key} rowIndex={index} columnIndex={0}>
          <div style={style}>
            <ItemView
              {...itemViewProps}
              key={key}
              index={index}
              item={item}
              style={{}}
              className={cls}
            />
          </div>
        </CellMeasurer>
      ) : (
        <ItemView
          {...itemViewProps}
          key={key}
          index={index}
          item={item}
          style={style}
          className={cls}
        />
      );
    },
    // eslint-disable-next-line
    [data, ItemView, itemViewProps],
  );

  React.useEffect(() => {
    if (useScrollbar) {
      const dom = ReactDOM.findDOMNode(listRef.current) as Element;
      if (dom) {
        const [ps, destroy] = createScrollbar(dom, type);
        psRef.current = ps;
        return () => {
          destroy();
          psRef.current = undefined;
        };
      }
    }
  }, [type, useScrollbar]);

  React.useEffect(() => {
    psRef.current?.update();
  });

  React.useEffect(() => {
    if (dynamicRowHeight) {
      cache.clearAll();
      listRef.current?.forceUpdateGrid();
    }
  }, [cache, data, dynamicRowHeight]);

  const allHeight = data.length * rowHeight || rowHeight;
  const calcHeight = maxHeight ? Math.min(allHeight, maxHeight) : eleHeight || allHeight;
  const style: React.CSSProperties = { width, height };
  if (height) {
    style.flex = 'none';
  }
  return (
    <div className={wrapperCls} style={style} ref={ref}>
      <List
        {...restProps}
        ref={listRef}
        height={calcHeight}
        rowHeight={dynamicRowHeight ? cache.rowHeight : rowHeight}
        rowCount={data.length}
        rowRenderer={rowRender}
        width={rowWidth ?? eleWidth}
      />
    </div>
  );
};

VirtualizedList.defaultProps = {
  data: [],
};

VirtualizedList.displayName = 'VirtualizedList';
export default VirtualizedList;

const VirtualizedListMemo = React.memo(VirtualizedList);
VirtualizedListMemo.displayName = 'VirtualizedListMemo';
export { VirtualizedListMemo };
