import { get as checkboardGet } from 'react-color/lib/helpers/checkboard';

export enum CircleType {
  favor = 'favor',
  preset = 'preset',
}

export const PRESET_COLORS_OPT = [
  {
    title: '默认色板',
    key: '1',
    colors: [
      '#FF504E',
      '#FFA74F',
      '#FEFF50',
      '#4EFF4E',
      '#4FFFFF',
      '#4FA7FF',
      '#A64FFF',
      '#FF50A7',
      '#03939C',
      '#3DADB3',
      '#7CC7CB',
      '#BAE1E2',
      '#F8C0AA',
      '#E59071',
      '#D45F39',
      '#C12E00',
    ],
  },
  {
    title: '城市用地',
    key: '2',
    colors: [
      '#FFFF00',
      '#FFFF7F',
      '#FFBF00',
      '#FF003F',
      '#FF7F9F',
      '#FF7FBF',
      '#A5DD00',
      '#FF7F7F',
      '#DD6E8A',
      '#B8002E',
      '#FF007F',
      '#DD006E',
      '#FF0000',
      '#FF3F00',
      '#FF7F00',
      '#DD3700',
      '#B88A5C',
      '#95704A',
      '#725639',
      '#A56EDD',
      '#8A5CB8',
      '#704A95',
      '#7FBFFF',
      '#005CB8',
      '#00A5DD',
      '#4A8395',
      '#00FF00',
      '#00B82E',
      '#6EDD6E',
    ],
  },
  {
    title: '可视化色板',
    key: '3',
    colors: [
      '#B2172A',
      '#D6614E',
      '#F4A582',
      '#FDDBC6',
      '#D1E4F0',
      '#92C5DE',
      '#4393C3',
      '#2166AC',
      '#007A99',
      '#0298BD',
      '#4AE2CE',
      '#E7FEB4',
      '#FEEDB1',
      '#FEAD54',
      '#D50056',
      '#7F1941',
      '#FFFFCC',
      '#FFECA0',
      '#FED976',
      '#FEB24C',
      '#FD8D3B',
      '#FC4E29',
      '#E3191C',
      '#B10026',
      '#D5DEBF',
      '#AECEA1',
      '#82BB92',
      '#5EA28D',
      '#49838A',
      '#3D5F7E',
      '#383C65',
      '#2A1E3E',
    ],
  },
];

export const prefixCls = 'dmc-color-picker';
export const prefixClsCustom = `${prefixCls}-custom`;

export const COLORPICKER_TYPE_GRADIENT = 'gradient';
export const COLORPICKER_TYPE_PURE = 'pure';
export const COLORPICKER_TYPE_IMG = 'img';

export const COLORPICKER_TYPES_OPT = [
  {
    key: 'pure',
    value: 'pure',
    label: '纯色',
  },
  {
    key: 'gradient',
    value: 'gradient',
    label: '渐变色',
  },
  {
    key: 'img',
    value: 'img',
    label: '图片',
  },
];

export const BACKGROUND_SIZE_OPT = [
  {
    key: 'initial',
    value: 'initial',
    label: '默认',
  },
  {
    key: 'cover',
    value: 'cover',
    label: '填充',
  },
  {
    key: 'contain',
    value: 'contain',
    label: '包含',
  },
];

export const ROTATE_OPT = [
  { key: '45', value: '45', label: '45' },
  { key: '45', value: '90', label: '90' },
  { key: '45', value: '180', label: '180' },
];

export const DEFAULT_ROTATE = '90';
export const DEFAULT_COLOR = '#fff';
export const DEFAULT_IMAGE_SRC = checkboardGet('#000', '#fff', 55);
