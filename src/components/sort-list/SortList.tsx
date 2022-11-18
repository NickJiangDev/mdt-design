import * as React from 'react';
import { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
  DroppableMode,
} from 'react-beautiful-dnd';
import { List } from 'react-virtualized';
import useStaticCallback from '@/hooks/useStaticCallback';
import createScrollbar, {
  PerfectScrollbarClass,
  ScrollbarType,
} from '../scrollbar/createScrollbar';
import Icon from '../icon';
import './style/sort-list.less';

import { LabelValueItemInterface, ObjectInterface } from '../_utils/interfaces';
import useDataValue from '@/hooks/useDataValue';
import FieldItem from '@/components/field-item';

export type SortListItemType = LabelValueItemInterface | string;
export type ClickItemAction = (e: React.MouseEvent) => void;

export type RenderItemType = (
  provided: DraggableProvided,
  item: SortListItemType,
  index: number,
  isDraging: boolean,
  style?: React.CSSProperties,
) => React.ReactElement;

export interface SortListProps {
  /** 类型 */
  type?: ScrollbarType;
  /** 模式 */
  mode?: 'plain' | 'normal';
  /** 数据源 */
  list?: SortListItemType[];
  /** 默认数据源 */
  defaultList?: SortListItemType[];
  /** 拖拽变化的回调 */
  onChange?: (items: SortListItemType[], dragResult?: DropResult) => void;
  /** 自定义渲染单元 */
  renderItem?: RenderItemType;
  /** value 关键字 */
  valueKey?: string;
  /** label 关键字 */
  labelKey?: string;
  /** 可以删除 */
  removable?: boolean;
  /** 失效状态 */
  disabled?: boolean;
  /** 显示上下图标 */
  visibleUpDown?: boolean;
  /** 列表高度 */
  listHeight?: number;
  /** 列表宽度 */
  listWidth?: number;
  /** 单元高度 */
  rowHeight?: number;
  /** 启用虚拟滚动 */
  useVirtual?: boolean;
}

export interface SortListItemProps {
  index: number;
  item: SortListItemType;
  renderItem?: RenderItemType;
}

const prefixCls = 'dmc-sort-list';
const itemCls = `${prefixCls}-item`;
const handleCls = `${itemCls}-handle`;
const labelCls = `${itemCls}-label`;
enum ActionEnum {
  Up = 'up',
  Down = 'down',
  Del = 'del',
}

const plainRowRenderer = (
  index: number,
  value: string,
  item: ObjectInterface | string,
  handleClose?: (e: React.MouseEvent) => void,
) => {
  return (
    <div className={`${prefixCls}-plain-row-wrap`}>
      <FieldItem
        type={typeof item === 'string' ? 'text' : item.type || 'text'}
        name={value}
        checked
        onClose={handleClose as never}
        dataValue={`${ActionEnum.Del}-${index}`}
      />
    </div>
  );
};

const arrayMove = (list: SortListItemType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const SortList: React.FC<SortListProps> = (props) => {
  const {
    type,
    mode,
    listHeight,
    listWidth,
    rowHeight,
    list,
    defaultList,
    valueKey,
    labelKey,
    onChange,
    renderItem,
    disabled,
    visibleUpDown,
    removable,
    useVirtual,
    ...restProps
  } = props as SortListProps & typeof defaultProps;
  const [unControlVal, setUnControlVal] = React.useState(defaultList);
  const [isDraging, setDraging] = React.useState(false);
  const isControl = 'list' in props;
  const val: SortListItemType[] = isControl ? (list as SortListItemType[]) : unControlVal;
  const isObj = typeof val[0] !== 'string';
  const psRef = React.useRef<PerfectScrollbarClass>();
  const listRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const [ps, destroy] = createScrollbar(listRef.current, type);
      psRef.current = ps;
      return () => {
        destroy();
        psRef.current = undefined;
      };
    }
  }, [type]);

  React.useEffect(() => {
    psRef.current?.update();
  });

  const onDragEnd = useStaticCallback((result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
    const list = arrayMove(val, result.source.index, result.destination.index);
    !isControl && setUnControlVal(list);
    setDraging(false);
    onChange && onChange(list, result);
  });

  const onDragStart = React.useCallback(() => {
    setDraging(true);
  }, []);

  const clickItemActionIcon = useDataValue((value) => {
    const [action, indexStr] = value.split('-');
    const cIndex = parseInt(indexStr);
    let list: SortListItemType[] = [];
    if (action === ActionEnum.Up) {
      if (cIndex === 0) return;
      list = arrayMove(val, cIndex, 0);
    } else if (action === ActionEnum.Down) {
      if (cIndex === val.length - 1) return;
      list = arrayMove(val, cIndex, val.length - 1);
    } else if (action === ActionEnum.Del) {
      list = val.filter((_, index) => index !== cIndex);
    }
    !isControl && setUnControlVal(list);
    onChange && onChange(list);
  });

  const getRowRender = useCallback(
    ({ index, style }: { index: number; style?: React.CSSProperties }) => {
      const item = val[index] as LabelValueItemInterface;
      const key = JSON.stringify(isObj ? item[valueKey] : item);
      const cls = classNames(itemCls, { [`${itemCls}-draging`]: isDraging });
      return (
        <Draggable draggableId={key} index={index} key={key} isDragDisabled={disabled}>
          {(provided) => {
            // combine virtual inline style and drag inline style
            const { style: dragStyle = {}, ...otherDragProps } = provided.draggableProps;
            const styleProps: { style?: React.CSSProperties } = { style: dragStyle };
            if (style) {
              styleProps.style = {
                ...styleProps.style,
                ...style,
              };
            }
            const val = isObj ? (item as LabelValueItemInterface)[labelKey] : item;
            return (
              <>
                {renderItem ? (
                  renderItem(provided, item, index, isDraging, styleProps.style)
                ) : (
                  <div className={cls} ref={provided.innerRef} {...otherDragProps} {...styleProps}>
                    {!disabled && (
                      <Icon
                        icon="drag-handle"
                        className={handleCls}
                        {...provided.dragHandleProps}
                      />
                    )}
                    {mode === 'plain' ? (
                      plainRowRenderer(index, val, item, clickItemActionIcon)
                    ) : (
                      <div className={labelCls}>{val}</div>
                    )}
                    {mode === 'normal' && !!visibleUpDown && (
                      <Icon
                        icon="vertical-align-top"
                        className={`${itemCls}-action`}
                        onClick={clickItemActionIcon}
                        data-value={`${ActionEnum.Up}-${index}`}
                      />
                    )}
                    {mode === 'normal' && !!visibleUpDown && (
                      <Icon
                        icon="vertical-align-bottom"
                        className={`${itemCls}-action`}
                        onClick={clickItemActionIcon}
                        data-value={`${ActionEnum.Down}-${index}`}
                      />
                    )}
                    {mode === 'normal' && !!removable && (
                      <Icon
                        icon="close"
                        className={`${itemCls}-action`}
                        onClick={clickItemActionIcon}
                        data-value={`${ActionEnum.Del}-${index}`}
                      />
                    )}
                  </div>
                )}
              </>
            );
          }}
        </Draggable>
      );
    },
    [
      clickItemActionIcon,
      disabled,
      isDraging,
      isObj,
      labelKey,
      mode,
      removable,
      renderItem,
      val,
      valueKey,
      visibleUpDown,
    ],
  );

  const otherProps = useMemo(() => {
    if (useVirtual) {
      return {
        mode: 'virtual' as DroppableMode,
        renderClone: (
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric,
        ) => {
          const _index = rubric.source.index;
          const item = val[_index];
          const cls = classNames(itemCls, { [`${itemCls}-draging`]: snapshot.isDragging });
          const content = isObj ? (item as LabelValueItemInterface)[labelKey] : item;
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={cls}
            >
              {renderItem ? (
                renderItem(provided, item, _index, snapshot.isDragging)
              ) : mode === 'plain' ? (
                plainRowRenderer(_index, content, item)
              ) : (
                <div className={labelCls}>{content}</div>
              )}
            </div>
          );
        },
      };
    } else {
      return {};
    }
  }, [isObj, labelKey, mode, renderItem, useVirtual, val]);

  return (
    <div
      {...restProps}
      className={classNames(prefixCls, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${mode}`]: mode === 'plain',
      })}
    >
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId={prefixCls} {...otherProps}>
          {(provided) => {
            return useVirtual ? (
              <List
                height={listHeight || 300}
                width={listWidth || 200}
                rowCount={val.length}
                rowHeight={rowHeight}
                ref={(ref) => {
                  if (ref) {
                    // eslint-disable-next-line react/no-find-dom-node
                    const dom = ReactDOM.findDOMNode(ref);
                    if (dom instanceof HTMLElement) {
                      provided.innerRef(dom);
                      listRef.current = dom;
                    }
                  }
                }}
                rowRenderer={getRowRender}
              />
            ) : (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {val.map((_item, index) => getRowRender({ index }))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

SortList.displayName = 'SortList';
const defaultProps = {
  mode: 'normal' as 'plain' | 'normal',
  rowHeight: 30,
  // list: [] as SortListItemType[],
  defaultList: [] as SortListItemType[],
  valueKey: 'value',
  labelKey: 'label',
  disabled: false,
  useVirtual: false,
};
SortList.defaultProps = defaultProps;
export default SortList;

const SortListMemo = React.memo(SortList);
SortListMemo.displayName = 'SortListMemo';
export { SortListMemo };
