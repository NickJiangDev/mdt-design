import * as React from 'react';
import classNames from 'classnames';
import './style/{{demo}}.less';

export interface {{Demo}}Props {
  className?: string;
}

const prefixCls = 'dmc-{{demo}}';

const {{Demo}}: React.FC<{{Demo}}Props> = (props) => {
  const { className, children } = props;

  const cls = classNames(prefixCls, className);

  return <div className={cls}>{children}</div>;
};

{{Demo}}.displayName = '{{Demo}}';
export default {{Demo}};

const {{Demo}}Memo = React.memo({{Demo}});
{{Demo}}Memo.displayName = '{{Demo}}Memo';
export { {{Demo}}Memo };
