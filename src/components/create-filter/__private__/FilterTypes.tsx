import * as React from 'react';
import find from 'lodash/find';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { Dropmenu, MenuItemProps } from '../../dropdown';
import { FilterTypeKeys } from './constant';
import { Locale } from '../languages/zh-CN';

const prefixCls = 'dmc-text-filter';

export interface FilterTypesProps {
  value?: string;
  locale: Locale;
  getPopupContainer?: () => HTMLDivElement;
  onClickMenuItem: MenuClickEventHandler;
}

const FilterTypes: React.FC<FilterTypesProps> = ({
  value,
  locale,
  getPopupContainer,
  onClickMenuItem,
}) => {
  const fastLocale = locale.filterTypeLocale;
  const fastTypeOpts: MenuItemProps[] = [
    { title: fastLocale.include, key: FilterTypeKeys.contain },
    { title: fastLocale.uninclude, key: FilterTypeKeys.nocontain },
    { title: fastLocale.equal, key: FilterTypeKeys.equal },
    { title: fastLocale.empty, key: FilterTypeKeys.empty },
    { title: fastLocale.unempty, key: FilterTypeKeys.unempty },
    { title: fastLocale.startwith, key: FilterTypeKeys.startwith },
    { title: fastLocale.endwith, key: FilterTypeKeys.endwith },
    { title: fastLocale.eitherof, key: FilterTypeKeys.eitherof },
    { title: fastLocale.neitherof, key: FilterTypeKeys.neitherof },
  ];
  const item = find(fastTypeOpts, (t) => t.key === value) || fastTypeOpts[0];
  return (
    <Dropmenu
      dropNoBorder
      size="compact"
      values={[item.key]}
      menus={fastTypeOpts}
      type={'menu-bg'}
      className={`${prefixCls}-dropmenu`}
      getPopupContainer={getPopupContainer}
      onClickMenuItem={onClickMenuItem}
    >
      {item.title}
    </Dropmenu>
  );
};

FilterTypes.displayName = 'FilterTypes';
export default FilterTypes;

const FilterTypesMemo = React.memo(FilterTypes);
FilterTypesMemo.displayName = 'FilterTypesMemo';
export { FilterTypesMemo };
