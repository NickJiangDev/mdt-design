import * as React from 'react';
import classNames from 'classnames';
import Checkbox from '@/components/checkbox';
import { IconButton } from '@/components/button';
import map from 'lodash/map';
import './style/index.less';
import { ObjectInterface } from '@/components/_utils/interfaces';

export interface GroupOption extends ObjectInterface {
  id: string;
  img?: string;
  name?: string;
}
export interface MapBaseChangeProps {
  className?: string;
  headerTitle?: string;
  groupOptions?: GroupOption[];
  currentStyle?: string;
  onClose?: () => void;
  onChange?: (id: string) => void;
  hideBase?: boolean;
  changeHideBase?: (checked: boolean) => void;
}
const prefixCls = 'dmc-map-base-change';

const DIVIDER_ID = 'divider';

export interface GroupItemProps {
  className?: string;
  id?: string;
  img?: string;
  name?: string;
  onClick?: (key: string) => void;
}
const GroupItem: React.FC<GroupItemProps> = React.memo((props: GroupItemProps) => {
  const { id, className, onClick, img, name, ...restProps } = props;
  const style = { backgroundImage: `url(${img})` };
  const isDark = id === 'dark';
  const isLight = id === 'light';

  const _onClick = (checked?: boolean) => {
    let key = id;
    if (isDark && checked) {
      key = 'darklabel';
    }
    if (isLight && checked) {
      key = 'lightlabel';
    }
    onClick && onClick(key as string);
  };
  const _select = () => {
    _onClick();
  };
  return (
    <div
      {...restProps}
      className={classNames(`${prefixCls}-content-style`, className)}
      style={style}
      title={name}
    >
      <div onClick={_select} style={{ width: '100%', height: '100%' }} />
      <div className={`${prefixCls}-content-style-label`}>
        <div>{name}</div>
      </div>
    </div>
  );
});
const MapBaseChange: React.FC<MapBaseChangeProps> = React.memo((props: MapBaseChangeProps) => {
  const {
    className,
    headerTitle,
    hideBase,
    groupOptions = [],
    onClose,
    currentStyle,
    onChange,
    changeHideBase,
    ...restProps
  } = props;
  return (
    <div {...restProps} className={classNames(prefixCls, className)}>
      <div className={classNames(`${prefixCls}-header`)}>
        <Checkbox title={headerTitle ?? '-'} checked={hideBase} onChange={changeHideBase} />
        <IconButton icon="close" type={'only-icon'} onClick={onClose} />
      </div>
      {groupOptions.length > 0 && (
        <div className={classNames(`${prefixCls}-content`)}>
          {map(groupOptions, (options) => {
            const { id, name, img } = options;
            if (id === DIVIDER_ID) {
              return <div key={id} className={classNames(`${prefixCls}-line`)}></div>;
            }
            const selected = currentStyle === options.id;
            const cls = classNames(`${prefixCls}-group-item`, {
              [`${prefixCls}-selected`]: selected,
            });
            return (
              <GroupItem
                key={id}
                id={id}
                name={name}
                img={img}
                className={cls}
                onClick={onChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});

export default MapBaseChange;
