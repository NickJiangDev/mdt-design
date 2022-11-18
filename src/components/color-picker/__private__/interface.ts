import * as React from 'react';
import { OptionsType } from 'rc-select/lib/interface';
import { CircleType } from './constant';

export interface HSLColor {
  a?: number;
  h: number;
  l: number;
  s: number;
  source?: string;
}

export interface RGBColor {
  a?: number;
  b: number;
  g: number;
  r: number;
  source?: string;
}

export interface HSVColor {
  a?: number;
  h: number;
  s: number;
  v: number;
  source?: string;
}

export interface ColorState {
  hex: string;
  hsl: HSLColor;
  hsv: HSVColor;
  rgb: RGBColor;
  oldHue: number;
  source: string;
}

export interface HEXColor {
  hex: string;
  source?: string;
}

export type Color = string | HEXColor | HSLColor | RGBColor | HSVColor;

export type OnChangeHandler = (colorState: ColorState) => void;

export interface CustomPickerProps {
  color?: Color;
  onChange?: OnChangeHandler;
  onChangeComplete?: OnChangeHandler;
}

export interface CirclePickerProps extends CustomPickerProps {
  colors?: string[];
  onSwatchHover?: (color: ColorState, event: MouseEvent) => void;
}

export interface CircleSwatchProps {
  onClick: (hex: string, e: MouseEvent) => void;
  color: Color;
  index: number;
  active: boolean;
  colors?: string[];
  width?: string;
  circleSize?: number;
  circleSpacing?: number;
  onDelete?: (index: number) => void;
  onSwatchHover?: (color: ColorState, event: MouseEvent) => void;
}

export interface CirclePropsProps {
  actived?: boolean;
  showAll?: boolean;
  hex?: string;
  colors?: string[];
  onChange: (color: HEXColor, e: MouseEvent) => void;
  className?: string;
  onDelete?: (index: number) => void;
  onSwatchHover?: (color: ColorState, event: MouseEvent) => void;
}

export interface StopProps {
  offset: number;
  color: string;
}

export interface PaletteItemProps extends StopProps {
  id: number;
}

export interface PaletteProps {
  palette: PaletteItemProps[];
}

export interface ColorStopProps {
  width: number;
  onDeleteColor: (id: number) => void;
  onActiveColor: (id: number) => void;
  onPosChange: (item: PaletteItemProps) => void;
}

export interface ColorImageProps {
  src?: string;
  size?: string;
  className?: string;
  showUpload?: () => void;
  showMedia?: () => void;
  onChange?: (item: string) => void;
  getPopupContainer: () => HTMLElement;
  labelUpload?: string;
  labelSelectMedia?: string;
  bgSizeOptions?: OptionsType;
}

export interface ColorPanelProps {
  color: string;
  type?: string;
  rotate?: string;
  favors?: string[];
  labelFavor?: string;
  labelFavorPlaceholder?: string;
  onChangeColors?: (colors: string[]) => void;
  onChange?: (color: string, index?: number) => void;
  stops?: StopProps[];
  className?: string;
  onStopsChange?: (stops: StopProps[], color?: string) => void;
  showUpload?: () => void;
  showMedia?: () => void;
  imgSrc?: string;
  imgSize?: string;
  showTypeSelect?: boolean;
  showPureColorOption?: boolean;
  showGradientOption?: boolean;
  showImageOption?: boolean;
  onSizeChange?: (item: string) => void;
  onRotateChange?: (item: string) => void;
  onActiveTypeChange?: (type: string) => void;
  bgSizeOptions?: OptionsType;
  // bgTypeOptions?: OptionsType;
  labelRotate?: string;
  labelUpload?: string;
  labelSelectMedia?: string;
  colorPresetOptions?: OptionsType;
  disabledTypeSelect?: boolean;
  disableGradientRotateSelect?: boolean;
  disabled?: boolean;
  pickColorFromMap?: boolean;
  toMeasureCanvas?: HTMLCanvasElement | null;
  toGetColorCanvas?: HTMLCanvasElement | null;
  useShadowElementToPickColor?: boolean;
  shadowElementContainer?: HTMLElement | null;
  clickAwayToClose?: boolean;
  handleCanvasColorPickerVisibleChange?: (visible: boolean) => void;
  disabledPanel?: boolean;
  footer?: () => React.ReactNode;
}

export interface ColorPickerProps extends ColorPanelProps {
  children?: React.ReactElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export interface ColorFavorProps {
  actived: boolean;
  color: string;
  colors?: string[];
  onChange?: (color: ColorState, type: CircleType) => void;
  className?: string;
  labelFavor?: string;
  labelFavorPlaceholder?: string;
  onChangeColors?: (colors: string[]) => void;
}

export interface CustomColorPickerProps extends ColorState {
  onChange: (data: Color, e: React.ChangeEvent) => void;
  renderers: () => void;
  className?: string;
  pickColorFromMap?: boolean;
  toMeasureCanvas: HTMLCanvasElement | null;
  toGetColorCanvas: HTMLCanvasElement | null;
  useShadowElementToPickColor?: boolean;
  shadowElementContainer?: HTMLElement | null;
  handleCanvasColorPickerVisibleChange?: (visible: boolean) => void;
}

export interface ColorPrestProps {
  actived: boolean;
  color: ColorState;
  onChange?: (color: ColorState, type: CircleType) => void;
  className?: string;
  value?: string;
  colorPresetOptions?: OptionsType;
  getPopupContainer: () => HTMLElement;
}

export interface ColorFieldsProps {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
  onChange: (data: Color, e: React.ChangeEvent) => void;
}

export interface ColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}

export type ColorChangeHandler = (color: ColorResult) => void;
