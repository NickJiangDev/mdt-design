import * as React from 'react';
import DataGrid, { Column, DataGridHandle, DataGridProps } from 'react-data-grid';
import { ObjectInterface } from '../_utils/interfaces';
import classNames from 'classnames';
import map from 'lodash/map';
import Icon from '@/components/icon';
import { Dropmenu } from '@/components/dropdown';
import { randomUuid } from '../_utils/stringUtil';
import useMeasure from 'react-use/lib/useMeasure';
import './style/index.less';
export enum FieldType {
  text = 'text',
  number = 'number',
  lnglat = 'lnglat',
  datetime = 'datetime',
  bool = 'bool',
  formula = 'formula',
  geometry = 'geometry',
  image = 'image',
}

const IconMap: ObjectInterface = {
  [FieldType.text]: 'text',
  [FieldType.number]: 'num',
  [FieldType.datetime]: 'time',
  [FieldType.lnglat]: 'geo-global',
  [FieldType.image]: 'image',
};

const prefixCls = 'dmc-datatable';

export enum SortTypeEnum {
  UNSET = 'unset',
  ASCEND = 'ascend',
  DESCEND = 'descend',
}

export interface DataTableProps extends DataGridProps<ObjectInterface, string, unknown> {
  /** 数据列表的类型 */
  type?: 'assist-bg';
  ref?: React.Ref<DataGridHandle>;
  /** 加载样式 */
  loading?: boolean;
}

const EmptyRowsRenderer = () => {
  return <div className={`${prefixCls}-empty-row`}>暂无数据</div>;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rowHeight,
  headerRowHeight,
  className,
  type,
  emptyRowsRenderer,
  rows,
  loading,
  enableFilters,
  ...restProps
}) => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const sortTypeArr = [SortTypeEnum.UNSET, SortTypeEnum.ASCEND, SortTypeEnum.DESCEND];
  const [sortTypeMap, setSortTypeMap] = React.useState<Record<string, SortTypeEnum>>({});

  const mixColumns = map(columns, (column: Column<ObjectInterface, unknown>) => ({
    headerRenderer: (p: ObjectInterface) => {
      const { key: columnKey, type, dropmenuProps, sorter, sortType: columnSortType } = p.column;
      const isSorter = typeof sorter === 'function';
      const icon = type ? IconMap[type] : 'text';

      const SortDom: React.FC<{ sortKey: string; visible?: boolean }> = ({ visible, sortKey }) => {
        const sortType = columnSortType || sortTypeMap[sortKey] || SortTypeEnum.UNSET;
        return (
          <>
            {visible ? (
              <div
                className={`${prefixCls}-header-cell-sort`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const currentIndex = sortTypeArr.findIndex((item) => item === sortType);
                  const nextIndex = sortTypeArr.length - 1 === currentIndex ? 0 : currentIndex + 1;
                  !columnSortType &&
                    setSortTypeMap({ ...sortTypeMap, [sortKey]: sortTypeArr[nextIndex] });
                  sorter?.(sortTypeArr[nextIndex], p);
                }}
              >
                <Icon
                  icon="arrow-up"
                  className={classNames({
                    [`${prefixCls}-header-cell-sort-active`]: sortType === SortTypeEnum.ASCEND,
                  })}
                />
                <Icon
                  icon="arrow-down"
                  className={classNames({
                    [`${prefixCls}-header-cell-sort-active`]: sortType === SortTypeEnum.DESCEND,
                  })}
                />
              </div>
            ) : null}
          </>
        );
      };

      const node = (
        <div className={`${prefixCls}-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );

      return !dropmenuProps ? (
        <div className={`${prefixCls}-header-cell-sorter`}>
          {node}
          <SortDom visible={isSorter} sortKey={columnKey} />
        </div>
      ) : (
        <Dropmenu
          {...dropmenuProps}
          renderDropNode={() => (
            <div className={`${prefixCls}-header-cell-dropmenu`}>
              {node}
              <div className={`${prefixCls}-header-cell-operate`}>
                <SortDom visible={isSorter} sortKey={columnKey} />
                <Icon icon="arrow-down" />
              </div>
            </div>
          )}
        />
      );
    },
    ...column,
    headerCellClass: classNames(column.headerCellClass, `${prefixCls}-header-cell`, {
      [`${prefixCls}-header-cell-${(column as ObjectInterface).type || 'text'}`]:
        (column as ObjectInterface).type || 'text',
    }),
  }));

  const uuid = React.useMemo(() => randomUuid(), []);

  const dataTableCls = classNames(className, prefixCls, `${prefixCls}-${uuid}`, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-empty`]: rows.length === 0,
  });
  const headerHeight = (headerRowHeight || 45) + (enableFilters ? 45 : 0);
  const contentHeight = height - headerHeight;

  return (
    <div className={`${prefixCls}-wrapper`} ref={ref}>
      <DataGrid
        {...restProps}
        enableFilters={enableFilters}
        columns={mixColumns}
        rows={rows}
        rowHeight={rowHeight || 36}
        headerRowHeight={headerRowHeight || 45}
        className={dataTableCls}
        emptyRowsRenderer={emptyRowsRenderer || EmptyRowsRenderer}
      />
      {loading && (
        <div
          style={{ height: contentHeight, marginTop: headerHeight }}
          className={`${prefixCls}-loading`}
        >
          <Icon icon="loading" />
        </div>
      )}
    </div>
  );
};

DataTable.displayName = 'DataTable';
export default DataTable;

const DataTableMemo = React.memo(DataTable);
DataTableMemo.displayName = 'DataTableMemo';
export { DataTableMemo };
