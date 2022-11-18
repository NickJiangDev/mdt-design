import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import ColorPanel from './__private__/ColorPanel';
import { ColorPickerProps } from './__private__/interface';
import {
  prefixCls,
  DEFAULT_COLOR,
  COLORPICKER_TYPE_IMG,
  DEFAULT_IMAGE_SRC,
  COLORPICKER_TYPE_GRADIENT,
  DEFAULT_ROTATE,
} from './__private__/constant';
import { CreateFilter } from '../create-filter';
import orderBy from 'lodash/orderBy';

const ColorPicker: React.FC<ColorPickerProps> = ({
  color = DEFAULT_COLOR,
  onChange,
  disabled,
  getPopupContainer,
  type,
  imgSrc,
  imgSize,
  stops = [],
  rotate = DEFAULT_ROTATE,
  pickColorFromMap = false,
  toMeasureCanvas,
  toGetColorCanvas,
  clickAwayToClose = true,
  handleCanvasColorPickerVisibleChange,
  ...props
}) => {
  const currentStops = stops.length ? stops : [{ offset: 0.5, color }];
  const colorString: string[] = [];
  orderBy(currentStops, 'offset', 'asc').forEach((it) =>
    colorString.push(`${it.color} ${it.offset * 100}%`),
  );
  const string = colorString.join(',') || '';
  const gradientStyle = {
    // backgroundColor: color,
    backgroundImage: `linear-gradient(${rotate}deg, ${string})`,
  };

  const style = {
    backgroundSize: imgSize,
    backgroundImage: `url(${imgSrc})`,
    backgroundRepeat: imgSrc === DEFAULT_IMAGE_SRC ? 'repeat' : 'no-repeat',
  };
  useEffect(() => {
    if (pickColorFromMap && toMeasureCanvas === undefined) {
      throw new Error("prop 'pickColorFromMap' should used with 'toMeasureCanvas' ");
    }
  }, [pickColorFromMap, toMeasureCanvas]);
  const renderToolTip = React.useMemo(
    () => (
      <ColorPanel
        {...props}
        stops={stops}
        rotate={rotate}
        color={color}
        imgSrc={imgSrc}
        imgSize={imgSize}
        onChange={onChange}
        pickColorFromMap={pickColorFromMap}
        toMeasureCanvas={toMeasureCanvas}
        toGetColorCanvas={toGetColorCanvas}
        useShadowElementToPickColor
        type={type}
        handleCanvasColorPickerVisibleChange={handleCanvasColorPickerVisibleChange}
      />
    ),
    [
      props,
      stops,
      rotate,
      color,
      imgSrc,
      imgSize,
      onChange,
      pickColorFromMap,
      toMeasureCanvas,
      toGetColorCanvas,
      type,
      handleCanvasColorPickerVisibleChange,
    ],
  );
  const block =
    type === COLORPICKER_TYPE_IMG ? (
      <div
        className={classNames(`${prefixCls}-img-block`, {
          [`${prefixCls}-block-disabled`]: disabled,
        })}
        style={style}
      ></div>
    ) : type === COLORPICKER_TYPE_GRADIENT ? (
      <div
        className={classNames(`${prefixCls}-gradient-block`, {
          [`${prefixCls}-block-disabled`]: disabled,
        })}
        style={gradientStyle}
      ></div>
    ) : (
      <div
        style={{ backgroundColor: color }}
        className={classNames(`${prefixCls}-color-block`, {
          [`${prefixCls}-block-disabled`]: disabled,
        })}
      />
    );
  if (disabled) return block;
  return (
    <CreateFilter
      clickAway={clickAwayToClose}
      overlay={renderToolTip}
      getPopupContainer={getPopupContainer}
      className={`${prefixCls}-create-filter`}
      footerClassName={`${prefixCls}-footer`}
    >
      {block}
    </CreateFilter>
  );
};

export default ColorPicker;
const ColorPickerMemo = React.memo<ColorPickerProps>(ColorPicker);
ColorPickerMemo.displayName = 'ColorPicker';
export { ColorPickerMemo };
