import * as React from 'react';
import classNames from 'classnames';
import './style/page-header.less';

const prefixCls = 'dmc-page-header';

export interface PageHeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { className, style, children, ...restProps } = props;

  return (
    <div {...restProps} className={classNames(prefixCls, className)} style={style}>
      {children}
    </div>
  );
};

PageHeader.displayName = 'PageHeader';
export default PageHeader;

const PageHeaderMemo = React.memo(PageHeader);
PageHeaderMemo.displayName = 'PageHeaderMemo';
export { PageHeaderMemo };
