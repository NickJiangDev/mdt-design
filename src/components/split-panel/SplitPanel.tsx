import * as React from 'react';
import SplitPane, { SplitPaneProps } from 'react-split-pane';
import classNames from 'classnames';
import './style/split-panel.less';

export type SplitPanelProps = SplitPaneProps;

const prefixCls = 'dmc-split-panel';
const SplitPanel: React.FC<SplitPanelProps> = ({ className, ...restProps }) => {
  const cls = classNames(prefixCls, className);
  return <SplitPane {...restProps} className={cls} resizerClassName={`${prefixCls}-resizer`} />;
};

SplitPanel.defaultProps = {
  allowResize: true,
  minSize: 50,
  primary: 'first',
  split: 'vertical',
};
SplitPanel.displayName = 'SplitPanel';

export default SplitPanel;

const SplitPanelMemo = React.memo(SplitPanel);
SplitPanelMemo.displayName = 'SplitPanelMemo';
export { SplitPanelMemo };
