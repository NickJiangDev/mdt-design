import * as React from 'react';
import Icon from '@/components/icon';
import map from 'lodash/map';
import { Dropdown } from '@/components/dropdown';
import classNames from 'classnames';
import { PackageInfoProps } from '../interface';
import { ICON_GEOMETRY_TRY_MAP } from '../../constants';

export const prefixCls = `dmc-global-filter-sf`;

const PackageDropDown: React.FC<PackageInfoProps> = ({
  currentPackage,
  packages,
  changeCurrentPackage,
}) => {
  const { objectType, geometryType = 'point', packageUuid } = currentPackage ?? {};
  const overlay = React.useCallback(() => {
    return (
      <ul className="dmc-menu dmc-menu-vertical" role="menu">
        {map(packages, (item) => {
          const itemCls = classNames('dmc-dropmenu-menu-item', {
            [`dmc-dropmenu-menu-item-actived`]: packageUuid === item.packageUuid,
          });

          const onClick = () => {
            changeCurrentPackage && changeCurrentPackage(item);
          };
          return (
            <li className="dmc-menu-item" role="menuitem" onClick={onClick}>
              <div className={itemCls}>
                <Icon icon="done-check" className="dmc-dropmenu-drop-icon" />
                <Icon icon={ICON_GEOMETRY_TRY_MAP[item.geometryType ?? 'point']} size={16} />
                {item.objectType}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }, [changeCurrentPackage, packageUuid, packages]);

  return currentPackage ? (
    <React.Fragment>
      <Dropdown trigger="click" placement="bottomLeft" overlay={overlay}>
        <div style={{ flexShrink: 0 }}>
          <div className={`${prefixCls}-item`}>
            <Icon icon={ICON_GEOMETRY_TRY_MAP[geometryType]} />
            <div className={`${prefixCls}-item-text`}>{objectType}</div>
            <Icon icon="chevron-down" size={12} />
          </div>
        </div>
      </Dropdown>
      <div className={`${prefixCls}-item-split-line`} />
    </React.Fragment>
  ) : null;
};

export default PackageDropDown;
