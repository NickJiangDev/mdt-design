import * as React from 'react';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export interface BreadcrumbItemProps {
  /** 分隔符自定义 */
  separator?: React.ReactNode;
  /** 链接的目的地 */
  href?: string;
  /** 单击事件 */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  /** 是否显示最后一个面包屑的分隔符 */
  lastSeparator?: boolean;
}

const prefixCls = 'dmc-breadcrumb-item';

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {
  const { separator, children, lastSeparator, ...restProps } = props;

  const HtmlTag = 'href' in props ? 'a' : 'span';
  const link = (
    <HtmlTag {...restProps} className={`${prefixCls}-link`}>
      {children}
    </HtmlTag>
  );

  return children ? (
    <span className={prefixCls}>
      {link}
      {separator && separator !== '' && !lastSeparator && (
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
      )}
    </span>
  ) : null;
};

BreadcrumbItem.defaultProps = {
  separator: '/',
  lastSeparator: false,
};

BreadcrumbItem.displayName = 'BreadcrumbItem';
export default BreadcrumbItem;

const BreadcrumbItemMemo = React.memo(BreadcrumbItem);
BreadcrumbItemMemo.displayName = 'BreadcrumbItemMemo';
export { BreadcrumbItemMemo };
