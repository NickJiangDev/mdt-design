import { RGBColor } from './interface';

export const getRgbaColor = (rgb: RGBColor) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
