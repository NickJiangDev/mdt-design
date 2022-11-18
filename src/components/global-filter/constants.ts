export const TILED_FIELD_ROW_HEIGHT = 28;

export const prefix = 'dmc-global-filter';

export const ICON_GEOMETRY_TRY_MAP: { [key: string]: string } = {
  point: 'location',
  polygon: 'layer',
  plain: 'description',
  line: 'line',
  [`geo-global`]: 'geo-global',
};

// date和num格式的keys
export const DATE_NUM_KEYS: { [key: string]: string[] } = {
  datetime: ['start', 'end'],
  number: ['min', 'max'],
};
