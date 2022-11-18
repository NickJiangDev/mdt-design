import * as React from 'react';
import classNames from 'classnames';
import useToggle from 'react-use/lib/useToggle';
import { CircleType, prefixCls } from '@/components/color-picker';
import Circle from './Circle';
import Icon from '@/components/icon';
import '../style/color-favor.less';
import { ColorFavorProps } from './interface';

const ColorFavor: React.FC<ColorFavorProps> = ({
  color,
  actived,
  labelFavor,
  onChange,
  className,
  colors = [],
  labelFavorPlaceholder,
  onChangeColors,
}) => {
  const [on, toggle] = useToggle(true);

  const addColor = React.useCallback(() => {
    if (colors?.every((c) => c !== color)) {
      const newColors = [...colors, color];
      onChangeColors && onChangeColors(newColors);
      return newColors;
    }
  }, [colors, color, onChangeColors]);

  const handleChange = React.useCallback(
    (c) => {
      if (onChange) {
        onChange(c, CircleType.favor);
      }
    },
    [onChange],
  );

  const handleInnerDelete = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    onChangeColors && onChangeColors(newColors);
    return newColors;
  };
  const expandCls = classNames(`${prefixCls}-favor-expand`, { expand: on });
  return (
    <div className={classNames(`${prefixCls}-favor`, className)}>
      <div className={`${prefixCls}-favor-top`}>
        <div className={`${prefixCls}-favor-label`}>{labelFavor}</div>
        <div className={`${prefixCls}-favor-btns`}>
          <Icon icon="add" onClick={addColor} className={`${prefixCls}-favor-add`} />
          <Icon icon="chevron-down" onClick={toggle} className={expandCls} />
        </div>
      </div>
      {on && colors.length ? (
        <Circle
          actived={actived}
          onDelete={handleInnerDelete}
          color={color}
          colors={colors}
          onChange={handleChange}
        />
      ) : (
        <div className={`${prefixCls}-favor-placeholder`}>
          <span className={`${prefixCls}-favor-placeholder-circle`} />
          <span>{labelFavorPlaceholder}</span>
        </div>
      )}
    </div>
  );
};

ColorFavor.defaultProps = {
  labelFavor: '收藏的颜色',
  labelFavorPlaceholder: '点击“+”添加颜色',
};

ColorFavor.displayName = 'ColorFavor';
export default ColorFavor;

const ColorFavorMemo = React.memo(ColorFavor);
ColorFavorMemo.displayName = 'ColorFavorMemo';
export { ColorFavorMemo };
