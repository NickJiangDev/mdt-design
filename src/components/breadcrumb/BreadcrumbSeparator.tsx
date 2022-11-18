import * as React from 'react';

const prefixCls = 'dmc-breadcrumb-separator';

const BreadcrumbSeparator: React.FC = ({ children, ...restProps }) => {
  return (
    <span {...restProps} className={prefixCls}>
      {children || '/'}
    </span>
  );
};

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
export default BreadcrumbSeparator;

const BreadcrumbSeparatorMemo = React.memo(BreadcrumbSeparator);
BreadcrumbSeparatorMemo.displayName = 'BreadcrumbSeparatorMemo';
export { BreadcrumbSeparatorMemo };
