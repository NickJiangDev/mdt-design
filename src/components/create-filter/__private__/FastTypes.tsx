import * as React from 'react';
import find from 'lodash/find';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { Dropmenu, MenuItemProps } from '../../dropdown';
import { FastTypeKeys } from './constant';
import { Locale } from '../languages/zh-CN';
import { prefixCls } from '../DateFilter';

export interface FastTypesProps {
  value?: string;
  locale: Locale;
  labelFastType: string;
  getPopupContainer: () => HTMLDivElement;
  onClickMenuItem: MenuClickEventHandler;
}

const FastTypes: React.FC<FastTypesProps> = ({
  value,
  locale,
  getPopupContainer,
  labelFastType,
  onClickMenuItem,
}) => {
  const fastLocale = locale.fastTypeLocale;
  const fastTypeOpts: MenuItemProps[] = [
    { title: fastLocale.unlimited, key: FastTypeKeys.unlimited, divider: true },
    { title: fastLocale.untilNow, key: FastTypeKeys.untilNow },
    { title: fastLocale.today, key: FastTypeKeys.today },
    { title: fastLocale.yesterday, key: FastTypeKeys.yesterday },
    { title: fastLocale.last24Hours, key: FastTypeKeys.last24Hours },
    { title: fastLocale.lastWeek, key: FastTypeKeys.lastWeek },
    { title: fastLocale.lastMonth, key: FastTypeKeys.lastMonth },
    { title: fastLocale.lastQuarter, key: FastTypeKeys.lastQuarter },
    { title: fastLocale.lastYear, key: FastTypeKeys.lastYear },
    { title: fastLocale.thisWeek, key: FastTypeKeys.thisWeek },
    { title: fastLocale.thisMonth, key: FastTypeKeys.thisMonth },
    { title: fastLocale.thisYear, key: FastTypeKeys.thisYear },
    { title: fastLocale.tomorrow, key: FastTypeKeys.tomorrow },
    { title: fastLocale.future24Hours, key: FastTypeKeys.future24Hours },
    { title: fastLocale.nextWeek, key: FastTypeKeys.nextWeek, divider: true },
    { title: fastLocale.customer, key: FastTypeKeys.customer },
  ];
  const item = find(fastTypeOpts, (t) => t.key === value) || fastTypeOpts[0];
  return (
    <div className={`${prefixCls}-fast`}>
      <div className={`${prefixCls}-fast-label`}>{labelFastType}：</div>
      <Dropmenu
        dropNoBorder
        values={[item.key]}
        menus={fastTypeOpts}
        type={'menu-bg'}
        className={`${prefixCls}-dropmenu`}
        getPopupContainer={getPopupContainer}
        onClickMenuItem={onClickMenuItem}
      >
        {item.title}
      </Dropmenu>
    </div>
  );
};

FastTypes.displayName = 'FastTypes';
export default FastTypes;

const FastTypesMemo = React.memo(FastTypes);
FastTypesMemo.displayName = 'FastTypesMemo';
export { FastTypesMemo };
