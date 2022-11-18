import * as React from 'react';
import classNames from 'classnames';
import useMeasure from 'react-use/lib/useMeasure';
import { cloneElement } from '../_utils/reactNode';
import { ObjectInterface } from '../_utils/interfaces';
import { Dropmenu } from '../dropdown';
import './style/adaptive-more.less';

export interface AdaptiveMoreProps {
  /** 类名 */
  className?: string;
  /** 被窗口折叠的模块加载 */
  renderMore?: (hiddenList: React.ReactNode[]) => React.ReactElement;
  /** 当不存在renderMore时，有折叠时下拉加载的文案 */
  moreLabel?: string;
  /** 废弃 */
  getProcess?: ({ end, start }: { end: boolean; start: boolean }) => void;
}

const prefixCls = 'dmc-adaptive-more';
const prefixClsItem = `${prefixCls}-item`;
const getAttrNum = (style: CSSStyleDeclaration, key: string): number => {
  const val = `${style.getPropertyValue(key).replace('px', '')}`;
  return val ? parseFloat(val) : 0;
};

const AdaptiveMore: React.FC<AdaptiveMoreProps> = (props) => {
  const { className, children, renderMore, moreLabel, getProcess, ...restProps } = props;
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [moreRef, { width: mWidth }] = useMeasure<HTMLDivElement>();

  const parentRef = React.useRef<HTMLDivElement>(null);
  const widthRef = React.useRef<ObjectInterface>({});
  const all = React.useMemo(() => {
    return React.Children.toArray(children).map((it) => {
      return cloneElement(it, {
        className: classNames(prefixClsItem, (it as React.ReactElement).props.className),
      });
    });
  }, [children]);

  const [list, setList] = React.useState({
    viewList: all as React.ReactNode[],
    hiddenList: [] as React.ReactNode[],
  });

  React.useEffect(() => {
    const widthMap: ObjectInterface = {};
    const eleList = (parentRef.current as HTMLDivElement).querySelectorAll(`.${prefixClsItem}`);

    all.forEach((it, index) => {
      const ist = window.getComputedStyle(eleList[index]);
      widthMap[it.key as string] =
        getAttrNum(ist, 'width') + getAttrNum(ist, 'margin-left') + getAttrNum(ist, 'margin-right');
    });
    widthRef.current = widthMap;
  }, [all]);

  React.useEffect(() => {
    let wdTotal = 0;
    const vl: React.ReactNode[] = [];
    const hl: React.ReactNode[] = [];
    all.forEach((it) => {
      const w = widthRef.current[it.key as string] || 0;
      wdTotal += w;
      wdTotal <= width - (mWidth || 0) ? vl.push(it) : hl.push(it);
    });
    setList({ viewList: vl, hiddenList: hl });
  }, [all, width, mWidth, getProcess]);

  const cls = classNames(prefixCls, className);
  const moreNode = renderMore
    ? renderMore(list.hiddenList)
    : !!list.hiddenList.length && (
        <Dropmenu onlyText renderOverlay={() => <React.Fragment>{list.hiddenList}</React.Fragment>}>
          {moreLabel}
        </Dropmenu>
      );
  return (
    <div {...restProps} ref={ref} className={cls}>
      <div className={`${prefixCls}-hidden`} ref={parentRef}>
        {all}
      </div>
      <div className={`${prefixCls}-inner`}>{list.viewList}</div>
      <div className={`${prefixCls}-more`} ref={moreRef}>
        {moreNode}
      </div>
    </div>
  );
};

AdaptiveMore.displayName = 'AdaptiveMore';
export default AdaptiveMore;

const AdaptiveMoreMemo = React.memo(AdaptiveMore);
AdaptiveMoreMemo.displayName = 'AdaptiveMoreMemo';
export { AdaptiveMoreMemo };
