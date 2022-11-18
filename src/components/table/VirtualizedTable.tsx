import * as React from 'react';
import { BaseTable, BaseTableProps, ArtColumn } from 'ali-react-table-fork';
import useMeasure from 'react-use/lib/useMeasure';
import classNames from 'classnames';
import { ObjectInterface } from '../_utils/interfaces';
import './style/virtual-table.less';
import {
  CrossTable as BaseCrossTable,
  CrossTableProps as BaseCrossTableProps,
  CrossTreeTable as BaseCrossTreeTable,
  CrossTreeTableProps as BaseCrossTreeTableProps,
} from 'ali-react-table-fork/dist/ali-react-table-pivot';
import Spin from '../spin';
import { createScrollbar, PerfectScrollbarClass, ScrollbarType } from '../scrollbar';
import { v4 as uuidV4 } from 'uuid';

export type AlignProps = 'right' | 'left' | 'center' | undefined;
export interface VirtualizedTableColumns extends ArtColumn, ObjectInterface {}

export interface CommonTableProps {
  type?: ScrollbarType;
  withVerticalBorder?: boolean;
  withHorizontalBorder?: boolean;
  noCellPadding?: boolean;
}

export interface VirtualizedTableProps extends BaseTableProps, CommonTableProps {}

const prefixCls = 'dmc-virtual-';
const PAGE_BG_HEADER_HEIGHT = 50;
const DEFAULT_HEADER_HEIGHT = 42;

const defaultProps = {
  withVerticalBorder: true,
  withHorizontalBorder: true,
  noCellPadding: true,
};

const defaultBorderColor = 'var(--dmc-table-bg-border-color)';
const defaultHeaderRowHeight = '42px';
const defaultRowHeight = '40px';
const defaultHeadBgcolor = 'var(--dmc-table-bg-head-bg-color)';
const defaultHeaderColor = 'var(--dmc-table-bg-head-text-color)';
const defaultBgcolor = 'var(--dmc-table-bg-color)';
const defaultTextColor = 'var(--dmc-table-bg-body-text-color)';
const defaultRowBgHoverColor = 'var(--dmc-table-bg-body-bg-hover-color)';

const pageBgBorderColor = 'var(--dmc-table-pb-border-color)';
const pageBgHeaderRowHeight = '50px';
const pageBgRowHeight = '48px';
const pageBgHeadBgcolor = 'var(--dmc-table-pb-head-bg-color)';
const pageBgBgcolor = 'var(--dmc-table-pb-bg-color)';
const pageBgHeaderColor = 'var(--dmc-table-pb-head-text-color)';
const pageBgTextColor = 'var(--dmc-table-pb-head-text-color)';
const pageBgRowBgHoverColor = 'var(--dmc-table-pb-body-bg-hover-color)';

const assistBgBorderColor = 'var(--dmc-table-ab-border-color)';
const assistBgHeaderRowHeight = '42px';
const assistBgRowHeight = '40px';
const assistBgHeadBgcolor = 'var(--dmc-table-ab-head-bg-color)';
const assistBgBgcolor = 'var(--dmc-table-ab-bg-color)';
const assistBgHeaderColor = 'var(--dmc-table-ab-head-text-color)';
const assistBgTextColor = 'var(--dmc-table-ab-body-text-color)';
const assistBgRowBgHoverColor = 'var(--dmc-table-ab-body-bg-hover-color)';

const getStyle = (type?: ScrollbarType) => {
  const defaultStyle = {
    '--border-color': defaultBorderColor,
    '--header-row-height': defaultHeaderRowHeight,
    '--row-height': defaultRowHeight,
    '--header-bgcolor': defaultHeadBgcolor,
    '--header-color': defaultHeaderColor,
    '--bgcolor': defaultBgcolor,
    '--color': defaultTextColor,
    '--row-hover-color': defaultRowBgHoverColor,
  };

  const pageBgStyle = {
    '--border-color': pageBgBorderColor,
    '--header-row-height': pageBgHeaderRowHeight,
    '--row-height': pageBgRowHeight,
    '--header-bgcolor': pageBgHeadBgcolor,
    '--header-color': pageBgHeaderColor,
    '--bgcolor': pageBgBgcolor,
    '--color': pageBgTextColor,
    '--row-hover-color': pageBgRowBgHoverColor,
  };

  const assistBgStyle = {
    '--border-color': assistBgBorderColor,
    '--header-row-height': assistBgHeaderRowHeight,
    '--row-height': assistBgRowHeight,
    '--header-bgcolor': assistBgHeadBgcolor,
    '--header-color': assistBgHeaderColor,
    '--bgcolor': assistBgBgcolor,
    '--color': assistBgTextColor,
    '--row-hover-color': assistBgRowBgHoverColor,
  };

  return type === 'page-bg' ? pageBgStyle : type === 'assist-bg' ? assistBgStyle : defaultStyle;
};

const useCommonTabelProps = (
  style?: ObjectInterface,
  type?: ScrollbarType,
  className?: string,
  noCellPadding?: boolean,
) => {
  const uuid = uuidV4();
  const psRef = React.useRef<PerfectScrollbarClass>();
  const cls = classNames(className, `${prefixCls}table-${uuid}`, {
    [`${prefixCls}table-${type}`]: type,
    [`${prefixCls}table-noCellPadding`]: !noCellPadding,
  });
  //修改样式使用style, BaseTableCSSVariables
  const mixStyle = {
    ...getStyle(type),
    ...(style ?? {}),
  };

  React.useEffect(() => {
    const dom = document.querySelector(`.${prefixCls}table-${uuid}`);
    if (dom) {
      const [ps, destroy] = createScrollbar(dom, type);
      psRef.current = ps;
      return () => {
        destroy();
        psRef.current = undefined;
      };
    }
  }, [type, uuid]);

  React.useEffect(() => {
    psRef.current?.update();
  });
  return { className: cls, style: mixStyle };
};

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  className,
  withVerticalBorder,
  withHorizontalBorder,
  type,
  headerHeight,
  style,
  noCellPadding,
  ...restProps
}) => {
  const [ref, { height: eleHeight }] = useMeasure<HTMLDivElement>();
  const mixStyle = React.useMemo(
    () => ({ width: '100%', height: eleHeight, overflow: 'auto', ...style }),
    [eleHeight, style],
  );

  const { className: commonCls, style: commonStyle } = useCommonTabelProps(
    mixStyle,
    type,
    className,
    noCellPadding,
  );

  const cls = classNames(className, commonCls, {
    [`${prefixCls}table-without-vertical-border`]: !withVerticalBorder,
    [`${prefixCls}table-without-horizontal-border`]: !withHorizontalBorder,
    [`${prefixCls}table-${type}`]: type,
  });

  return (
    <div className={`${prefixCls}table-container`} ref={ref}>
      <BaseTable
        {...restProps}
        style={commonStyle}
        prefixCls={prefixCls}
        loadingIcon={<Spin />}
        className={cls}
        headerHeight={
          headerHeight || type === 'page-bg' ? PAGE_BG_HEADER_HEIGHT : DEFAULT_HEADER_HEIGHT
        }
      />
    </div>
  );
};

VirtualizedTable.defaultProps = defaultProps;

export interface CrossTableProps extends BaseCrossTableProps, CommonTableProps {}

const CrossTable: React.FC<CrossTableProps> = ({
  type,
  style,
  className,
  noCellPadding,
  ...restProps
}) => {
  const commonProps = useCommonTabelProps(style, type, className, noCellPadding);
  return <BaseCrossTable {...restProps} {...commonProps} />;
};

CrossTable.defaultProps = defaultProps;

export interface CrossTreeTableProps extends BaseCrossTreeTableProps, CommonTableProps {}

const CrossTreeTable: React.FC<CrossTreeTableProps> = ({
  type,
  style,
  className,
  noCellPadding,
  ...restProps
}) => {
  const commonProps = useCommonTabelProps(style, type, className, noCellPadding);
  return <BaseCrossTreeTable {...restProps} {...commonProps} />;
};

CrossTreeTable.defaultProps = defaultProps;

export * from 'ali-react-table-fork';

VirtualizedTable.displayName = 'VirtualizedTable';
export default VirtualizedTable;

const VirtualizedTableMemo = React.memo(VirtualizedTable);
VirtualizedTableMemo.displayName = 'VirtualizedTableMemo';
export { VirtualizedTableMemo, CrossTable, CrossTreeTable };
