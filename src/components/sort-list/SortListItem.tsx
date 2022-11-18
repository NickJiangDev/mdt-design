import * as React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import Icon from '../icon';
import { LabelValueItemInterface } from '../_utils/interfaces';

export type SortListItemType = LabelValueItemInterface | string;

export type RenderItemType = (
  provided: DraggableProvided,
  item: SortListItemType,
  index: number,
) => React.ReactElement;

export interface ListItemProps {
  item: SortListItemType;
  index: number;
  renderItem?: RenderItemType;
  valueKey: string;
  labelKey: string;
  removable?: string;
  disabled?: boolean;
  isObj?: boolean;
  visibleUpDown?: boolean;
}

const itemCls = `dmc-sort-list-item`;
const handleCls = `${itemCls}-handle`;
const labelCls = `${itemCls}-label`;

const SortListItem: React.FC<ListItemProps> = (props) => {
  const { item, index, renderItem, valueKey, labelKey, removable, disabled, isObj } = props;
  const key = isObj ? (item as LabelValueItemInterface)[valueKey] : item;
  return (
    <Draggable index={index} isDragDisabled={disabled} draggableId={key}>
      {(provided) => {
        return renderItem ? (
          renderItem(provided, item, index)
        ) : (
          <div ref={provided.innerRef} {...provided.draggableProps} className={itemCls}>
            {!disabled && (
              <Icon icon="drag-handle" className={handleCls} {...provided.dragHandleProps} />
            )}
            <div className={labelCls}>
              {isObj ? (item as LabelValueItemInterface)[labelKey] : item}
            </div>
            {removable && <Icon icon="close" />}
          </div>
        );
      }}
    </Draggable>
  );
};

SortListItem.displayName = 'SortListItem';
export default SortListItem;

const SortListItemMemo = React.memo(SortListItem);
SortListItemMemo.displayName = 'SortListItemMemo';
export { SortListItemMemo };
