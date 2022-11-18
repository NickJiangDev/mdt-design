import * as React from 'react';
import createScrollbar, {
  ScrollBarOptions,
  PerfectScrollbarClass,
  ScrollbarType,
} from './createScrollbar';

export interface ScrollbarProps {
  /** 滚动条类型 */
  type?: ScrollbarType;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 滚动条配置项 */
  options?: ScrollBarOptions;
  /** id标识 */
  id?: string;
}

const hidden = { overflow: 'hidden' };

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { type, className, style, children, options, id, ...restProps } = props;
  const listRef = React.useRef<HTMLDivElement>(null);
  const psRef = React.useRef<PerfectScrollbarClass>();

  React.useEffect(() => {
    const [ps, destroy] = createScrollbar(listRef.current as Element, type, options, className);
    psRef.current = ps;
    return () => {
      destroy();
      psRef.current = undefined;
    };
  }, [type, className, options]);

  React.useEffect(() => {
    psRef.current?.update();
  });

  const dstyle = React.useMemo(() => {
    return { ...hidden, ...style };
  }, [style]);

  return (
    <div {...restProps} ref={listRef} style={dstyle} id={id}>
      {children}
    </div>
  );
};

Scrollbar.displayName = 'Scrollbar';
export default Scrollbar;

const ScrollbarMemo = React.memo(Scrollbar);
ScrollbarMemo.displayName = 'ScrollbarMemo';
export { ScrollbarMemo };
