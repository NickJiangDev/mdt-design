import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Alpha, Hue, Saturation, Checkboard, ColorWrap } from 'react-color/lib/components/common';
import classNames from 'classnames';
import { ColorFieldsMemo as ColorFields } from './ColorFields';
import { CustomColorPickerProps } from './interface';
import { prefixClsCustom } from './constant';
import Icon from '../../icon/Icon';
import '../style/custom-color-picker.less';
import CanvasColorPicker from '@/components/canvas-color-picker';

const CustomPointer: React.FC = React.memo(() => {
  return <span className={`${prefixClsCustom}-pointer`} />;
});

const { useRef, useCallback } = React;
const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  rgb,
  hsl,
  hsv,
  hex,
  className,
  onChange,
  renderers,
  pickColorFromMap = false,
  toMeasureCanvas,
  toGetColorCanvas,
  useShadowElementToPickColor,
  shadowElementContainer,
  handleCanvasColorPickerVisibleChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const background = { background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})` };
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const onIconClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (pickColorFromMap) {
        setColorPickerVisible(!colorPickerVisible);
      } else {
        const current = inputRef.current;
        if (current) {
          current.click();
        }
      }
    },
    [colorPickerVisible, pickColorFromMap],
  );

  const onColorChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.value, e);
      }
    },
    [onChange],
  );

  const handlePickColor = useCallback(
    (colors: number[]) => {
      onChange(`rgba(${colors[0]},${colors[1]},${colors[2]},${colors[3]})`, {} as never);
    },
    [onChange],
  );

  const handleVisibleChange = useCallback(
    (v: boolean) => {
      handleCanvasColorPickerVisibleChange?.(v);
      setColorPickerVisible(v);
    },
    [handleCanvasColorPickerVisibleChange],
  );

  return (
    <div className={classNames(`${prefixClsCustom}`, className)}>
      <div className={`${prefixClsCustom}-saturation`}>
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div className={`${prefixClsCustom}-controls`}>
        <Icon
          icon="color-picker"
          onClick={onIconClick}
          className={`${prefixClsCustom}-icon-straw`}
        />
        <input
          type="color"
          ref={inputRef}
          onChange={onColorChange}
          className={`${prefixClsCustom}-input-color`}
        />
        <div className={`${prefixClsCustom}-sliders`}>
          <div className={`${prefixClsCustom}-hue`}>
            <Hue radius={10} pointer={CustomPointer} hsl={hsl} onChange={onChange} />
          </div>
          <div className={`${prefixClsCustom}-alpha`}>
            <Alpha
              rgb={rgb}
              hsl={hsl}
              hsv={hsv}
              onChange={onChange}
              renderers={renderers}
              pointer={CustomPointer}
            />
          </div>
        </div>
        <div className={`${prefixClsCustom}-color`}>
          <Checkboard />
          <div className={`${prefixClsCustom}-color-active`} style={background} />
        </div>
      </div>
      <ColorFields rgb={rgb} hsl={hsl} hex={hex} onChange={onChange} />
      {pickColorFromMap &&
        toMeasureCanvas &&
        ReactDOM.createPortal(
          <CanvasColorPicker
            toMeasureCanvas={toMeasureCanvas}
            toGetColorCanvas={toGetColorCanvas}
            visible={colorPickerVisible}
            handleVisibleChange={handleVisibleChange}
            handlePickColor={handlePickColor}
            useShadowElementToPickColor={useShadowElementToPickColor}
            shadowElementContainer={shadowElementContainer}
          />,
          document.body,
        )}
    </div>
  );
};

export default ColorWrap(CustomColorPicker);
