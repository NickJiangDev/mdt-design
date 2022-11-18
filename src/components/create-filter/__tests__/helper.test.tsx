import { translateFilterData, formatFilterData } from '../__private__/helper';
import { FilterTypeKeys } from '../__private__/constant';

const formatData = {
  $and: [
    {
      $or: [
        {
          type: FilterTypeKeys.contain,
          value: undefined,
        },
        {
          type: FilterTypeKeys.startwith,
          value: 'start_with',
        },
        {
          type: FilterTypeKeys.endwith,
          value: 'end_with',
        },
        {
          $not: {
            type: FilterTypeKeys.contain,
            value: 'no_contain',
          },
        },
      ],
    },
    {
      $or: [
        {
          type: FilterTypeKeys.empty,
          value: undefined,
        },
        {
          $not: {
            type: FilterTypeKeys.empty,
            value: undefined,
          },
        },
      ],
    },
    {
      $or: [
        {
          type: FilterTypeKeys.eitherof,
          value: 'eitherof',
        },
        {
          type: FilterTypeKeys.neitherof,
          value: ['neihter_of', 'neither_of2'],
        },
      ],
    },
  ],
};

const componentData = [
  [
    {
      type: FilterTypeKeys.contain,
      value: undefined,
    },
    {
      type: FilterTypeKeys.startwith,
      value: 'start_with',
    },
    {
      type: FilterTypeKeys.endwith,
      value: 'end_with',
    },
    {
      type: FilterTypeKeys.nocontain,
      value: 'no_contain',
    },
  ],
  [
    {
      type: FilterTypeKeys.empty,
      value: undefined,
    },
    {
      type: FilterTypeKeys.unempty,
      value: undefined,
    },
  ],
  [
    {
      type: FilterTypeKeys.eitherof,
      value: 'eitherof',
    },
    {
      type: FilterTypeKeys.neitherof,
      value: ['neihter_of', 'neither_of2'],
    },
  ],
];

describe('createFilterHelper', () => {
  it('数据源转换组件数据源成功', () => {
    expect(translateFilterData(formatData)).toEqual(componentData);
  });

  it('组件数据翻译为规范数据成功', () => {
    expect(formatFilterData(componentData)).toEqual(formatData);
  });
});
