import * as React from 'react';
import classNames from 'classnames';
import find from 'lodash/find';
import get from 'lodash/get';
import useToggle from 'react-use/lib/useToggle';
import { Dropmenu, MenuItemProps } from '../../dropdown';
import Circle from './Circle';
import { ColorPrestProps } from './interface';
import { CircleType, prefixCls, PRESET_COLORS_OPT } from './constant';
import '../style/color-preset.less';
import Icon from '../../icon/Icon';

const { useCallback, useState, useRef } = React;
const ColorPreset: React.FC<ColorPrestProps> = ({
  actived,
  color,
  onChange,
  className,
  getPopupContainer,
  colorPresetOptions = PRESET_COLORS_OPT,
  value = PRESET_COLORS_OPT[0].key,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [on, toggle] = useToggle(true);
  const [val, setValues] = useState(value);
  const fd = find(PRESET_COLORS_OPT, (t) => t.key === val) || PRESET_COLORS_OPT[0];

  const renderDropNode = useCallback(
    (actived: boolean) => {
      return (
        <span className={classNames(`${prefixCls}-preset-trigger`, { actived })}>
          {get(fd, 'title')}
          <Icon size={14} icon="unfold-more" />
        </span>
      );
    },
    [fd],
  );

  const handleChange = useCallback((item) => {
    setValues(item.key);
  }, []);

  const colorChange = useCallback(
    (c) => {
      if (onChange) {
        onChange(c, CircleType.preset);
      }
    },
    [onChange],
  );

  const expandCls = classNames(`${prefixCls}-preset-expand`, { expand: on });
  return (
    <div ref={ref} className={classNames(`${prefixCls}-preset`, className)}>
      <div className={`${prefixCls}-preset-top`}>
        <Dropmenu
          values={[val]}
          onClickMenuItem={handleChange}
          menus={colorPresetOptions as MenuItemProps[]}
          openClassName={`${prefixCls}-preset-drop`}
          getPopupContainer={getPopupContainer}
          renderDropNode={renderDropNode}
        >
          {val}
        </Dropmenu>
        <Icon icon="chevron-down" className={expandCls} onClick={toggle} />
      </div>
      {on && (
        <Circle
          actived={actived}
          color={color}
          colors={fd.colors}
          circleSize={17}
          circleSpacing={11}
          onChange={colorChange}
        />
      )}
    </div>
  );
};

ColorPreset.displayName = 'ColorPreset';
export default ColorPreset;

const ColorPresetMemo = React.memo(ColorPreset);
ColorPresetMemo.displayName = 'ColorPresetMemo';
export { ColorPresetMemo };
