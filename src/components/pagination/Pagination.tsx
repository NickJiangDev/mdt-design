import * as React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import classNames from 'classnames';
import Icon from '../icon';
import './style/pagination.less';

export interface PaginationProps extends ReactPaginateProps {
  /** 尺寸 */
  size?: 'compact';
  /** 类型 */
  type?: 'assist';
}

const DEFAULT_BREAK_LABEL = '...';
const prefixCls = 'dmc-pagination';

const Pagination: React.FC<PaginationProps> = (props) => {
  const { size, type, ...restProps } = props;
  const paginationCls = classNames(prefixCls, {
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-${type}`]: type,
  });

  return (
    <ReactPaginate
      breakLabel={DEFAULT_BREAK_LABEL}
      nextLabel={<Icon icon="chevron-right" />}
      previousLabel={<Icon icon="chevron-left" />}
      {...restProps}
      containerClassName={paginationCls}
      pageClassName={`${prefixCls}-item`}
      breakClassName={`${prefixCls}-break`}
      previousClassName={`${prefixCls}-prev`}
      nextClassName={`${prefixCls}-next`}
      activeClassName={`${prefixCls}-item-active`}
    />
  );
};

Pagination.displayName = 'Pagination';
export default Pagination;

const PaginationMemo = React.memo(Pagination);
PaginationMemo.displayName = 'PaginationMemo';
export { PaginationMemo };
