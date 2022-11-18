import * as React from 'react';
import classNames from 'classnames';
import { Virtuoso, VirtuosoProps } from 'react-virtuoso';
import createScrollbar, {
  PerfectScrollbarClass,
  ScrollbarType,
} from '../scrollbar/createScrollbar';
import useMeasure from 'react-use/lib/useMeasure';
import { ObjectInterface } from '../_utils/interfaces';
import { randomUuid } from '../_utils/stringUtil';
import './style/group-virtualized-list.less';

export interface DataItemInterface {
  title: string;
  items: ObjectInterface[];
}

export interface GroupViewProps {
  item: DataItemInterface;
  className?: string;
}

export interface GroupItemViewProps {
  index: number;
  item: ObjectInterface;
  className?: string;
}

export type GroupVirtualListProps = {
  data: DataItemInterface[];
  GroupView: React.ElementType;
  ItemView: React.ElementType;
  defaultHeight: number;
  // 滚动到group
  scrollToIndex?: number;
  scrollToAlignment?: 'end' | 'start' | 'center';
  // 配色
  type?: ScrollbarType;
  // showStickyTitle?: boolean;
  width?: number;
  height?: number;
  noBorder?: boolean;
  style?: React.CSSProperties;
  className?: string;
  noRowRender?: React.ReactNode;
  // 额外渲染高度
  overscan?: number;
  onLoadMore?: () => void;
} & Pick<VirtuosoProps, 'footer' | 'computeItemKey' | 'itemHeight'>;

const prefixCls = 'dmc-group-list';

const GroupVirtualizedList: React.FC<GroupVirtualListProps> = (props) => {
  const {
    data,
    scrollToIndex,
    GroupView,
    ItemView,
    defaultHeight,
    type,
    className,
    style,
    width,
    height,
    noBorder,
    noRowRender,
    overscan,
    onLoadMore,
    ...others
  } = props;
  const wrapperCls = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-no-border`]: noBorder,
    },
    className,
  );

  const count = React.useMemo(() => {
    let c = data.length;
    data.forEach((d) => {
      c += d.items.length;
    });
    return c;
  }, [data]);

  const dataList = React.useMemo(() => {
    let list: ObjectInterface[] = [];
    data.forEach((groupItem) => {
      list.push({
        type: 'group',
        ...groupItem,
      });
      if (groupItem.items) {
        list = list.concat([...groupItem.items]);
      }
    });
    return list;
  }, [data]);

  const itemRender = React.useCallback(
    (index: number) => {
      const item = dataList[index];
      if (item.type === 'group') {
        return <GroupView item={item} className={`${prefixCls}-group`} />;
      } else {
        return <ItemView index={index} item={item} className={`${prefixCls}-group-item`} />;
      }
    },
    [GroupView, ItemView, dataList],
  );

  const [containerRef, { width: boxWidth, height: boxHeight }] = useMeasure<HTMLDivElement>();
  const psRef = React.useRef<PerfectScrollbarClass>();
  const uuid = React.useMemo(() => randomUuid(), []);

  React.useEffect(() => {
    const selector = `.${prefixCls}-list.${prefixCls}-list-${uuid}`;
    const dom = document.querySelector(selector);
    if (dom) {
      const [ps, destroy] = createScrollbar(dom, type);
      psRef.current = ps;
      return () => {
        destroy();
        psRef.current = undefined;
      };
    }
  }, [uuid, type, data]);

  React.useEffect(() => {
    psRef.current?.update();
  });
  const wrapperStyle = React.useMemo(() => ({ ...style, width, height }), [height, style, width]);

  const vStyle = React.useMemo(
    () => ({
      width: boxWidth,
      height: boxHeight,
    }),
    [boxHeight, boxWidth],
  );

  return (
    <div ref={containerRef} style={wrapperStyle} className={wrapperCls}>
      {data.length > 0 ? (
        <Virtuoso
          {...others}
          key={uuid}
          className={`${prefixCls}-list ${prefixCls}-list-${uuid}`}
          style={vStyle}
          totalCount={count}
          item={itemRender}
          initialTopMostItemIndex={scrollToIndex}
          overscan={overscan || 200}
          defaultItemHeight={defaultHeight}
          endReached={onLoadMore}
        />
      ) : (
        <>{noRowRender}</>
      )}
    </div>
  );
};

GroupVirtualizedList.defaultProps = {
  data: [],
};

GroupVirtualizedList.displayName = 'GroupVirtualizedList';
export default GroupVirtualizedList;

const GroupVirtualizedListMemo = React.memo(GroupVirtualizedList);
GroupVirtualizedListMemo.displayName = 'GroupVirtualizedListMemo';
export { GroupVirtualizedListMemo };
