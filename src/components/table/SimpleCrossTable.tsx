import * as React from 'react';
import classNames from 'classnames';
import { ObjectInterface } from '../_utils/interfaces';
import size from 'lodash/size';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import './style/simple-cross-table.less';
import { useEventEmitter, useMemoizedFn, useCreation, useHover } from 'ahooks';
import ScrollX from '@/components/table/scroll-x';

const prefixCls = 'dmc-simple-cross-table';

export type hideSameRenderType = () => React.ReactNode;

interface CrossTableRowProps {
  yIndex: number;
  x: number;
  data?: ObjectInterface[];
  col: string;
  title: string;
  renderCell?: (value: CrossTableCellProps) => React.ReactNode;
  hideSameRender?: hideSameRenderType;
  defaultColWidth: number;
  defaultColHeight?: number;
  defaultTitleHeight?: number;
  leftColumnWidth: number;
  dataIndexSort: number[];
  nailedLeft: number[];
  sameColumns: string[]; // 值相同行
  getRowHeight?: (col: string) => number;
}
export interface CrossTableCellProps extends CrossTableRowProps {
  xIndex: number;
  value?: string | number;
  currentDataIndex: number;
}
export interface SimpleCrossTableProps {
  className?: string;
  // 条数
  data?: ObjectInterface[];
  width?: number;
  height?: number;
  // 是否隐藏相同项
  hideSame?: boolean;
  renderCell?: (props: CrossTableCellProps) => React.ReactNode;
  leftColumn: string[];
  title: string;
  hideSameRender?: hideSameRenderType;
  defaultColWidth?: number;
  defaultColHeight?: number;
  defaultTitleHeight?: number;
  scrollWidth?: number; // 滚动条长度
  leftColumnWidth?: number;
  // '[3,4,5,7]'
  nailedLeft?: number[];
  getRowHeight?: (col: string) => number;
}
const CrossTableCell = React.memo(
  React.forwardRef<HTMLDivElement, CrossTableCellProps>((props, ref) => {
    const {
      col,
      yIndex,
      xIndex,
      value = '',
      renderCell,
      title,
      hideSameRender,
      defaultColWidth,
      defaultColHeight,
      defaultTitleHeight,
      leftColumnWidth,
      nailedLeft,
      currentDataIndex,
      getRowHeight,
      ...restProps
    } = props;
    const firstCell = xIndex === 0;
    const inSortIndex = nailedLeft.indexOf(currentDataIndex);
    const inSort = inSortIndex > -1;
    const left = leftColumnWidth + defaultColWidth * inSortIndex;
    const needBoxShadow = React.useMemo(() => {
      if (inSortIndex === nailedLeft.length - 1 && nailedLeft.length > 0) {
        return true;
      } else {
        if (firstCell) {
          if (nailedLeft.length > 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    }, [firstCell, inSortIndex, nailedLeft.length]);

    return (
      <div
        {...restProps}
        ref={ref}
        className={classNames(`${prefixCls}-col`, {
          [`${prefixCls}-sticky`]: firstCell || inSort,
          [`${prefixCls}-z-index-1`]: firstCell || inSort,
          [`${prefixCls}-box-shadow`]: needBoxShadow,
        })}
        style={{
          left: firstCell ? 0 : inSort ? left : '',
          width: xIndex === 0 ? leftColumnWidth : defaultColWidth,
          height:
            yIndex === 0 ? defaultTitleHeight : getRowHeight ? getRowHeight(col) : defaultColHeight,
        }}
      >
        {title !== value && <>{renderCell ? renderCell(props) : value}</>}
        {title === value && (
          <>{hideSameRender ? hideSameRender() : <div>hideSameRender-自定义区间</div>}</>
        )}
      </div>
    );
  }),
);

const CrossTableRow = React.memo((props: CrossTableRowProps) => {
  const { yIndex, x, data = [], col, dataIndexSort, sameColumns, ...restProps } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const firstRow = yIndex === 0;
  const isHovering = useHover(ref);
  const isSame = sameColumns.includes(col);
  return (
    <div
      {...restProps}
      ref={ref}
      className={classNames(`${prefixCls}-row`, `${prefixCls}-row-${col}`, {
        [`${prefixCls}-sticky`]: firstRow,
        [`${prefixCls}-z-index-20`]: firstRow,
        [`${prefixCls}-hover-row`]: isHovering,
        [`${prefixCls}-same`]: !firstRow && isSame,
        [`${prefixCls}-diff`]: !firstRow && !isSame,
      })}
      style={{
        top: firstRow ? 0 : '',
      }}
    >
      {map(new Array(x), (_b, xIndex: number) => {
        let value = '';
        if (xIndex === 0) {
          value = col;
        } else {
          value = get(data, `${xIndex - 1}.${col}`);
        }
        return (
          <CrossTableCell
            key={xIndex}
            value={value}
            xIndex={xIndex}
            currentDataIndex={dataIndexSort[xIndex - 1]}
            {...props}
          />
        );
      })}
    </div>
  );
});
export interface SimpleCrossTableRef {
  dom: HTMLDivElement | null;
  setScrollLeft: (v: number) => void;
  setScrollTop: (v: number) => void;
  getSameRows: () => NodeListOf<HTMLDivElement> | undefined;
  getDiffRows: () => NodeListOf<HTMLDivElement> | undefined;
}
const SimpleCrossTable = React.forwardRef<SimpleCrossTableRef, SimpleCrossTableProps>(
  (props, ref) => {
    const {
      className,
      data = [],
      width = 800,
      height = 300,
      hideSame = false,
      renderCell,
      leftColumn,
      title,
      hideSameRender,
      defaultColWidth = 180,
      defaultColHeight = 56,
      defaultTitleHeight = 80,
      scrollWidth = 400,
      leftColumnWidth = defaultColWidth,
      nailedLeft = [],
      getRowHeight,
      ...restProps
    } = props;
    // same Columns
    const [sameColumns, setSameColumns] = React.useState<string[]>([]);
    // 滚动classname
    const [ping, setPing] = React.useState(false);
    const [_data, setData] = React.useState(data);
    const [dataIndexSort, setDataIndexSort] = React.useState<number[]>([]);
    const x = (size(_data) || 0) + 1;
    const y = size(_data[0]) || 0;
    const needScrollX = useCreation(() => {
      return defaultColWidth * (x - 1) + leftColumnWidth > width;
    }, [defaultColWidth, x, width, leftColumnWidth]);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-ping`]: ping,
    });
    const event$ = useEventEmitter<number>();
    const _ref = React.useRef<HTMLDivElement>(null);
    /**
     * 左侧column
     * 钉左刷新
     * 更新相同项
     */
    React.useEffect(() => {
      // 左侧column
      const _d = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const _dd: ObjectInterface = {};
        for (let j = 0; j < leftColumn.length; j++) {
          const col = leftColumn[j];
          if (col in d) {
            _dd[col] = d[col];
          }
        }
        _d.push(_dd);
      }

      // 更新相同项
      const _: ObjectInterface = {};
      for (let i = 0; i < _d.length; i++) {
        const d = _d[i];
        for (let j = 0; j < leftColumn.length; j++) {
          const col = leftColumn[j];
          const value = d[col];
          _[col] = _[col] || [];
          if (!_[col].includes(value)) {
            _[col].push(value);
          }
        }
      }
      const filterCol: string[] = [];
      forEach(_, (v, k) => {
        if (size(v) < 2) {
          filterCol.push(k);
        }
      });
      setSameColumns(filterCol);

      const arr = nailedLeft;
      const arr1 = [];
      const arr2 = [];
      const _dataIndex1 = [];
      const _dataIndex2 = [];
      for (let i = 0; i < _d.length; i++) {
        const index = arr.indexOf(i);
        if (index > -1) {
          // TODO 按照 顺序
          arr1[index] = _d[i];
          _dataIndex1[index] = i;
          // arr1.push(data[i]);
          // _dataIndex1.push(i);
        } else {
          arr2.push(_d[i]);
          _dataIndex2.push(i);
        }
      }
      setData([...arr1, ...arr2]);
      setDataIndexSort([..._dataIndex1, ..._dataIndex2]);
    }, [data, leftColumn, nailedLeft]);
    const _onScroll = useMemoizedFn((e: React.UIEvent<React.ReactNode>) => {
      const scrollLeft = (e.target as HTMLDivElement)?.scrollLeft || 0;
      if (scrollLeft > 0) {
        setPing(true);
      } else if (scrollLeft === 0) {
        setPing(false);
      }
      event$?.emit(scrollLeft);
    });
    // hideSame 更新
    React.useEffect(() => {
      const doms = document.querySelectorAll<HTMLDivElement>(`.${prefixCls}-same`);
      if (doms) {
        for (let i = 0; i < doms.length; i++) {
          const dom = doms[i];
          if (dom) dom.style.display = hideSame ? 'none' : 'flex';
        }
      }
    }, [hideSame]);
    const setScrollLeft = useMemoizedFn((scrollLeft: number) => {
      const dom = _ref.current?.querySelector(`.${prefixCls}`);
      if (dom) dom.scrollLeft = scrollLeft;
    });
    const setScrollTop = useMemoizedFn((scrollTop: number) => {
      const dom = _ref.current?.querySelector(`.${prefixCls}`);
      if (dom) dom.scrollTop = scrollTop;
    });
    event$?.useSubscription((value) => {
      if (isNumber(value)) {
        setScrollLeft(value);
      }
    });
    const getSameRows = useMemoizedFn(() => {
      const doms = _ref.current?.querySelectorAll<HTMLDivElement>(`.${prefixCls}-same`);
      return doms;
    });
    const getDiffRows = useMemoizedFn(() => {
      const doms = _ref.current?.querySelectorAll<HTMLDivElement>(`.${prefixCls}-diff`);
      return doms;
    });

    React.useImperativeHandle(ref, () => {
      return {
        dom: _ref.current,
        setScrollLeft: setScrollLeft,
        setScrollTop: setScrollTop,
        getSameRows: getSameRows,
        getDiffRows: getDiffRows,
      };
    });

    return (
      <div {...restProps} style={{ display: 'inline-block' }} ref={_ref}>
        <div
          className={cls}
          style={{ width, height: height - (needScrollX ? 28 : 0) }}
          onScroll={_onScroll}
        >
          {map(new Array(y), (_a, yIndex: number) => {
            const col = leftColumn[yIndex];
            return (
              <CrossTableRow
                key={yIndex}
                yIndex={yIndex}
                x={x}
                data={_data}
                col={col}
                renderCell={renderCell}
                title={title}
                hideSameRender={hideSameRender}
                defaultColWidth={defaultColWidth}
                defaultColHeight={defaultColHeight}
                defaultTitleHeight={defaultTitleHeight}
                leftColumnWidth={leftColumnWidth}
                dataIndexSort={dataIndexSort}
                nailedLeft={nailedLeft}
                sameColumns={sameColumns}
                getRowHeight={getRowHeight}
              />
            );
          })}
        </div>
        {needScrollX && (
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <ScrollX
              event$={event$}
              width={width}
              allWidth={defaultColWidth * (x - 1) + leftColumnWidth}
              scrollWidth={scrollWidth}
              stepWidth={width - leftColumnWidth - nailedLeft.length * defaultColWidth}
            />
          </div>
        )}
      </div>
    );
  },
);
export default SimpleCrossTable;
