import { render } from '@testing-library/react';
import GlobalFilter from '../index';
import { FilterTypeEnum } from '../enum';

const allFieldValueObj: { [key: string]: (React.ReactText | null)[] } = {
  'cacdecb1-7b9e-5e2d-b54d-f1bd198972f3': [
    null,
    '01_ 扎根者',
    '02_功能悦居者',
    '03_功能改善者',
    '04_舒适乐活者',
    '05_舒适改善者',
    '06_私享者',
    '07_尊享者',
    '08_收藏者',
    '09_颐养者',
  ],
  'f150a3c0-204c-53b5-a26f-cfda44dfe317': [
    '地段敏感性',
    '公区设计',
    '户型设计',
    '精装修',
    '绿色健康关注点',
    '园区服务',
    '园区规划',
  ],
  '219d6f57-5d7e-5c06-9538-39e4566d894b': [
    '车库需求',
    '成本分配',
    '单元大堂需求',
    '功能敏感点',
    '功能性景观需求',
    '观赏性景观需求',
    '户型敏感点',
    '加装包',
    '精装关注点',
    '可变空间',
    '绿色健康关注点',
    '配套敏感性',
    '社区配置',
    '土地敏感性',
    '外立面关注点',
    '玄关客厅餐厅地面材质',
    '园区入口需求',
    '增值服务',
  ],
};

const tiledProps = {
  filterType: FilterTypeEnum.tiled,
  list: [
    {
      mode: 'multi',
      name: '客群类别',
      type: 'text',
      index: 0,
      detail: {
        db: 'str',
        name: '客群类别',
        uuid: 'cacdecb1-7b9e-5e2d-b54d-f1bd198972f3',
        hType: 'text',
        hValue: '客群类别',
        sourcePackageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
      },
    },
    {
      mode: 'single',
      name: '一级分类',
      type: 'text',
      index: 1,
      detail: {
        db: 'str',
        name: '一级分类',
        uuid: 'f150a3c0-204c-53b5-a26f-cfda44dfe317',
        hType: 'text',
        hValue: '一级分类',
        sourcePackageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
      },
    },
    {
      mode: 'multi',
      name: '二级分类',
      type: 'text',
      index: 2,
      detail: {
        db: 'str',
        name: '二级分类',
        uuid: '219d6f57-5d7e-5c06-9538-39e4566d894b',
        hType: 'text',
        hValue: '二级分类',
        sourcePackageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
      },
    },
  ],
  packageInfo: {
    packages: [
      {
        source: 'customer',
        objectType: '北京_客户需求详表',
        packageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
        geometryType: 'plain',
      },
    ],
    currentPackage: {
      source: 'customer',
      objectType: '北京_客户需求详表',
      packageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
      geometryType: 'plain',
    },
  },
  startAnalysisProps: {
    isConfirmFilter: true,
    btnLoading: false,
    size: 'compact',
    title: '开始分析',
  },
  fieldValueObj: allFieldValueObj,
  suppFilter: [],
  fieldCount: 2,
};

//根据i18n
const textLabels = {
  //标准筛选左侧的更多按钮
  more: '更多',
  //number的最大值label
  labelMax: '最大值',
  //number的最小值label
  labelMin: '最小值',
  //标准筛选器text list的空值
  //平铺筛选器list 的全选
  emptyValText: '空值',
  //标准筛选器text list的全选
  //平铺筛选器list 的全选
  allSelectLabel: '全选',
  //平铺筛选器的展开
  expand: '展开',
  //平铺筛选器的手气
  collapse: '收起',
};

describe('GlobalFilter', () => {
  test('GlobalFilter正确渲染', () => {
    render(
      <GlobalFilter
        {...tiledProps}
        suppFilter={[]}
        onChange={(filterItem, field) => {
          console.log('🚀 ~ file: GlobalFilter.test.tsx ~ line 126 ~ test ~ field', field);
          console.log(
            '🚀 ~ file: GlobalFilter.test.tsx ~ line 126 ~ test ~ filterItem',
            filterItem,
          );
        }}
        textLabels={textLabels}
      />,
    );
  });
});
