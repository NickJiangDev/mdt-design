import * as React from 'react';
import classNames from 'classnames';
import RcTable from 'rc-table';
import {
  ColumnsType,
  ColumnType,
  ExpandableConfig,
  GetComponentProps,
  GetRowKey,
  PanelRender,
  RowClassName,
  TableComponents,
  TableLayout,
  FixedType,
} from 'rc-table/lib/interface';
import { randomUuid } from '../_utils/stringUtil';
import { ScrollbarType, createScrollbar, PerfectScrollbarClass } from '../scrollbar';
import './style/table.less';

export type { FixedType };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<RecordType = any> {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** 数据源 */
  data?: RecordType[];
  /** 表格列的配置描述 */
  columns?: ColumnsType<RecordType>;
  /** 表格行 key 的取值，可以是字符串或一个函数 */
  rowKey?: string | GetRowKey<RecordType>;
  /** 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 */
  tableLayout?: TableLayout;
  /** 设置滚动 */
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
  /** Config expand rows */
  expandable?: ExpandableConfig<RecordType>;
  /** 展示树形数据时，每层缩进的宽度，以 px 为单位 */
  indentSize?: number;
  /** 表格行的类名 */
  rowClassName?: string | RowClassName<RecordType>;
  /** 表格标题 */
  title?: PanelRender<RecordType>;
  /** 表格尾部 */
  footer?: PanelRender<RecordType>;
  /** 总结栏 */
  summary?: (data: RecordType[]) => React.ReactNode;
  id?: string;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 覆盖默认的 table 元素 */
  components?: TableComponents<RecordType>;
  /** 设置行属性 */
  onRow?: GetComponentProps<RecordType>;
  /** 设置头部行属性 */
  onHeaderRow?: GetComponentProps<ColumnType<RecordType>[]>;
  /** 空表格显示 */
  emptyText?: React.ReactNode | (() => React.ReactNode);
  /** 表格方向 */
  direction?: 'ltr' | 'rtl';
  /** 类型 */
  type?: ScrollbarType;
  /** 显示边框 */
  withVerticalBorder?: boolean;
}

export const prefixCls = 'dmc-table';

const Table: React.FC<TableProps> = ({ type, className, withVerticalBorder, ...restProps }) => {
  const psRef = React.useRef<PerfectScrollbarClass>();
  const uuid = React.useMemo(() => randomUuid(), []);

  React.useEffect(() => {
    const selector = `.${prefixCls}[data-id="${uuid}"] .${prefixCls}-body`;
    const dom = document.querySelector(selector);
    if (dom) {
      const [ps, destroy] = createScrollbar(dom);
      psRef.current = ps;
      return () => {
        destroy();
        psRef.current = undefined;
      };
    }
  }, [uuid]);

  React.useEffect(() => {
    psRef.current?.update();
  });

  const tableCls = classNames(
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-without-vertical-border`]: !withVerticalBorder,
    },
    className,
  );

  return <RcTable data-id={uuid} {...restProps} prefixCls={prefixCls} className={tableCls} />;
};

Table.defaultProps = {
  withVerticalBorder: true,
};

Table.displayName = 'Table';
export default Table;

const TableMemo = React.memo(Table);
TableMemo.displayName = 'TableMemo';
export { TableMemo };
