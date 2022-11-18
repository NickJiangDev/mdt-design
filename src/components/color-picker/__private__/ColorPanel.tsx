import * as React from 'react';
import { toState } from 'react-color/lib/helpers/color';
import Select from '../../select';
import CustomColorPicker from './CustomColorPicker';
import {
  CircleType,
  COLORPICKER_TYPE_GRADIENT,
  COLORPICKER_TYPE_IMG,
  COLORPICKER_TYPE_PURE,
  COLORPICKER_TYPES_OPT,
  DEFAULT_ROTATE,
  prefixCls,
  ROTATE_OPT,
} from './constant';
import ColorGradient from '../../color-gradient';
import { ColorPresetMemo as ColorPreset } from './ColorPreset';
import { ColorFavorMemo as ColorFavor } from './ColorFavor';
import { ColorPanelProps, ColorState } from './interface';
import { ColorImageMemo as ColorImage } from './ColorImage';
import { getRgbaColor } from './helper';
import '../style/color-picker.less';
import { useEffect } from 'react';

const { useCallback } = React;

const ColorPanel: React.FC<ColorPanelProps> = ({
  stops = [],
  color,
  favors,
  labelFavor,
  onChangeColors,
  labelFavorPlaceholder,
  imgSrc,
  imgSize,
  onChange,
  labelRotate,
  showMedia,
  showUpload,
  onStopsChange,
  onSizeChange,
  onRotateChange,
  onActiveTypeChange,
  labelUpload,
  labelSelectMedia,
  // bgTypeOptions,
  bgSizeOptions,
  colorPresetOptions,
  disabledTypeSelect,
  disableGradientRotateSelect,
  showTypeSelect = false,
  showPureColorOption = true,
  showGradientOption = true,
  showImageOption = true,
  rotate = DEFAULT_ROTATE,
  type = COLORPICKER_TYPE_PURE,
  disabled = false,
  disabledPanel = false,
  footer,
  className,
  pickColorFromMap = false,
  toMeasureCanvas,
  toGetColorCanvas,
  useShadowElementToPickColor,
  shadowElementContainer,
  handleCanvasColorPickerVisibleChange,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  // const [activeType, setActiveType] = useState<string>(type);
  const [activeCircle, setActiveCircle] = React.useState<CircleType>(CircleType.preset);

  const onColorChange = useCallback(
    (color: ColorState, type: CircleType) => {
      setActiveCircle(type);
      if (onChange) {
        onChange(getRgbaColor(color.rgb));
      }
      if (onStopsChange) {
        onStopsChange(
          stops.map((t, index) =>
            activeIndex === index ? { ...t, color: getRgbaColor(color.rgb) } : t,
          ),
          getRgbaColor(color.rgb),
        );
      }
    },
    [onChange, onStopsChange, stops, activeIndex],
  );
  const getPopupContainer = useCallback(() => ref.current as HTMLElement, []);
  const { rgb, hex } = toState(color);
  const currentStops = stops.length ? stops : [{ offset: 0.5, color }];

  const bgOptions = React.useMemo(() => {
    const opt = [...COLORPICKER_TYPES_OPT];
    if (!showImageOption) {
      opt.splice(2, 1);
    }
    if (!showGradientOption) {
      opt.splice(1, 1);
    }
    if (!showPureColorOption) {
      opt.splice(0, 1);
    }
    return opt;
  }, [showGradientOption, showImageOption, showPureColorOption]);

  useEffect(() => {
    if (pickColorFromMap && toMeasureCanvas === undefined) {
      throw new Error("prop 'pickColorFromMap' should used with 'toMeasureCanvas' ");
    }
  }, [pickColorFromMap, toMeasureCanvas]);

  return (
    <div ref={ref} className={prefixCls}>
      {/* {showfollowTheme && ftv && <div className={`${prefixCls}-follow-theme`} />} */}
      <div className={disabled || disabledPanel ? `${prefixCls}-disabled` : ''}>
        {showTypeSelect && (
          <div className={`${prefixCls}-top-wrap`}>
            <Select
              size="mini"
              type="menu-bg"
              allowClear={false}
              value={type}
              disabled={disabledTypeSelect}
              onChange={onActiveTypeChange}
              options={bgOptions}
              getPopupContainer={getPopupContainer}
              className={`${prefixCls}-type-select ${prefixCls}-select`}
            />

            {type === COLORPICKER_TYPE_GRADIENT && !disableGradientRotateSelect && (
              <div className={`${prefixCls}-rotate-wrap`}>
                <span className={`${prefixCls}-rotate-label`}>{labelRotate}</span>
                <Select
                  size="mini"
                  type="menu-bg"
                  createAble
                  showSearch
                  allowClear={false}
                  value={rotate}
                  options={ROTATE_OPT}
                  onChange={onRotateChange}
                  getPopupContainer={getPopupContainer}
                />
              </div>
            )}
          </div>
        )}

        {type === COLORPICKER_TYPE_GRADIENT && (
          <div className={`${prefixCls}-gradient-wrap`}>
            <ColorGradient
              stops={currentStops}
              color={hex}
              activeIndex={activeIndex}
              onSelect={onChange}
              onChange={onStopsChange}
              onActiveChange={setActiveIndex}
            />
          </div>
        )}

        {(type === COLORPICKER_TYPE_PURE || type === COLORPICKER_TYPE_GRADIENT) && (
          <React.Fragment>
            <CustomColorPicker
              color={rgb}
              onChange={onColorChange}
              pickColorFromMap={pickColorFromMap}
              toMeasureCanvas={toMeasureCanvas}
              toGetColorCanvas={toGetColorCanvas}
              useShadowElementToPickColor={useShadowElementToPickColor}
              shadowElementContainer={shadowElementContainer}
              handleCanvasColorPickerVisibleChange={handleCanvasColorPickerVisibleChange}
            />
            <div className={`${prefixCls}-divider`} />
            <ColorPreset
              color={hex}
              onChange={onColorChange}
              getPopupContainer={getPopupContainer}
              colorPresetOptions={colorPresetOptions}
              actived={activeCircle === CircleType.preset}
            />
            <div className={`${prefixCls}-divider`} />
            <ColorFavor
              colors={favors}
              color={hex}
              onChange={onColorChange}
              labelFavor={labelFavor}
              labelFavorPlaceholder={labelFavorPlaceholder}
              actived={activeCircle === CircleType.favor}
              onChangeColors={onChangeColors}
            />
          </React.Fragment>
        )}

        {type === COLORPICKER_TYPE_IMG && (
          <ColorImage
            className={className}
            src={imgSrc}
            size={imgSize}
            showMedia={showMedia}
            showUpload={showUpload}
            onChange={onSizeChange}
            labelSelectMedia={labelSelectMedia}
            labelUpload={labelUpload}
            bgSizeOptions={bgSizeOptions}
            getPopupContainer={getPopupContainer}
          />
        )}
      </div>
      {footer?.()}
    </div>
  );
};

ColorPanel.defaultProps = {
  labelRotate: '角度',
  // bgTypeOptions: COLORPICKER_TYPES_OPT,
};

ColorPanel.displayName = 'ColorPanel';
export default ColorPanel;

const ColorPanelMemo = React.memo(ColorPanel);
ColorPanelMemo.displayName = 'ColorPanelMemo';
export { ColorPanelMemo };
