import * as React from 'react';
import { LabelValueItemInterface } from '../_utils/interfaces';
import SortListItem, { SortListItemType, RenderItemType } from './SortListItem';

export interface SortListWrapProps {
  list: SortListItemType[];
  renderItem?: RenderItemType;
  valueKey: string;
  labelKey: string;
  removable?: string;
  disabled?: boolean;
  isObj: boolean;
}

const prefixCls = `dmc-sort-list-wrap`;

const SortListWrap: React.FC<SortListWrapProps> = (props) => {
  const { list, ...restProps } = props;
  return (
    <div className={prefixCls}>
      {list.map((item, index) => {
        const key = restProps.isObj ? (item as LabelValueItemInterface)[restProps.valueKey] : item;
        return <SortListItem key={key} item={item} index={index} {...restProps} />;
      })}
    </div>
  );
};

SortListWrap.displayName = 'SortListWrap';
export default SortListWrap;

const SortListWrapMemo = React.memo(SortListWrap);
SortListWrapMemo.displayName = 'SortListWrapMemo';
export { SortListWrapMemo };
