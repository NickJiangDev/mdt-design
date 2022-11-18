import findIndex from 'lodash/findIndex';
import * as React from 'react';
import GlobalFilter from '../index';
import { FilterTypeEnum } from '../enum';
import { useCallback, useState } from 'react';
import { SuppFilterProps, FilterItemTemplateProp, FieldItemProps } from '../components/interface';
import { BaseContext, ThemeEnum } from '@/components/style/context';

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

// //没有字段的value
// const originStandardProps = {
//   filterType: FilterTypeEnum.standard,
//   list: [
//     {
//       mode: 'multi',
//       name: '客群类别',
//       type: 'text',
//       index: 0,
//       detail: {
//         db: 'str',
//         name: '客群类别',
//         uuid: 'cacdecb1-7b9e-5e2d-b54d-f1bd198972f3',
//         hType: 'text',
//         hValue: '客群类别',
//       },
//     },
//     {
//       mode: 'single',
//       name: '一级分类',
//       type: 'text',
//       index: 1,
//       detail: {
//         db: 'str',
//         name: '一级分类',
//         uuid: 'f150a3c0-204c-53b5-a26f-cfda44dfe317',
//         hType: 'text',
//         hValue: '一级分类',
//       },
//     },
//     {
//       mode: 'multi',
//       name: '二级分类',
//       type: 'text',
//       index: 2,
//       detail: {
//         db: 'str',
//         name: '二级分类',
//         uuid: '219d6f57-5d7e-5c06-9538-39e4566d894b',
//         hType: 'text',
//         hValue: '二级分类',
//       },
//     },
//   ],
//   packageInfo: {
//     packages: [
//       {
//         source: 'customer',
//         objectType: '北京_客户需求详表',
//         packageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
//         geometryType: 'plain',
//       },
//     ],
//     currentPackage: {
//       source: 'customer',
//       objectType: '北京_客户需求详表',
//       packageUuid: '34b3368d-1537-419b-992c-3fa35f116ac9',
//       geometryType: 'plain',
//     },
//   },
//   startAnalysisProps: {
//     isConfirmFilter: true,
//     btnLoading: false,
//     size: 'compact',
//     title: '开始分析',
//   },
//   fieldValueObj: {},
//   // 生成的suppFilter
//   suppFilter: [],
//   showPackage: true,
// };

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

const commStyle = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
};

const GlobalFilter1Demo = () => {
  const { theme } = React.useContext(BaseContext);

  const style = React.useMemo(() => {
    switch (theme) {
      case ThemeEnum.light:
        return {
          background: 'rgb(251, 252, 254)',
          border: '1px solid var(--dmc-split-page-color)',
          boxShadow:
            '0 4px 8px rgb(255 255 255 / 32%), 0 0 2px rgb(255 255 255 / 48%), 0 0 1px rgb(255 255 255 / 32%)',
        };
      default:
        return {
          background: '#282d40',
          border: '1px solid var(--dmc-split-page-color)',
          boxShadow:
            '0 4px 8px rgb(0 0 0 / 32%), 0 0 2px rgb(0 0 0 / 48%), 0 0 1px rgb(0 0 0 / 32%)',
        };
    }
  }, [theme]);

  // const [standardProps, setStandardProps] = useState(originStandardProps);
  const [suppFilter, setSuppFilter] = useState<SuppFilterProps[]>([]);
  const onChange = useCallback(
    (filterItem: FilterItemTemplateProp, field: FieldItemProps) => {
      console.log('🚀 ~ file: GlobalFilter.demo.tsx ~ line 217 ~ GlobalFilter1Demo ~ field', field);
      const suppFilterTemp = [...suppFilter];
      const currentPackage = tiledProps.packageInfo.currentPackage;
      if (!currentPackage) return;
      const it = filterItem;
      //构建筛选条件
      const newItem: SuppFilterProps = {
        ...currentPackage,
        filters: [it],
      };
      if (!suppFilterTemp.length) {
        suppFilterTemp.push(newItem);
      } else {
        const index = findIndex(suppFilterTemp, { packageUuid: currentPackage.packageUuid });
        if (index !== -1) {
          const filtersTemp = suppFilter[index].filters;
          const sameIndex = findIndex(filtersTemp, { hValue: it.hValue });
          sameIndex > -1 ? filtersTemp.splice(sameIndex, 1, it) : filtersTemp.push(it);
          suppFilterTemp.splice(index, 1, { ...suppFilter[index], filters: filtersTemp });
        } else {
          suppFilterTemp.push(newItem);
        }
      }
      setSuppFilter(suppFilterTemp);
    },
    [suppFilter],
  );

  const clearFilter = useCallback(() => {
    setSuppFilter([]);
  }, []);

  // const onVisibleChange = useCallback((field: FieldItemProps) => {
  //   setTimeout(() => {
  //     setStandardProps((origin) => ({
  //       ...(origin ?? {}),
  //       fieldValueObj: {
  //         ...(origin.fieldValueObj ?? {}),
  //         [field.detail.uuid]: allFieldValueObj[field.detail.uuid],
  //       },
  //     }));
  //   }, 2000);
  // }, []);

  return (
    <div>
      <div style={{ ...commStyle, ...style } as React.CSSProperties}>
        <h2>平铺 容器的样式</h2>
        <GlobalFilter
          {...tiledProps}
          suppFilter={suppFilter}
          onChange={onChange}
          textLabels={textLabels}
          clearFilter={clearFilter}
        />
      </div>
      <div style={{ height: 300 }}>
        <h2>没有开始分析按钮</h2>
        <GlobalFilter
          {...tiledProps}
          startAnalysisProps={{
            isConfirmFilter: false,
            btnLoading: false,
            size: 'compact',
            title: '开始分析',
          }}
          suppFilter={suppFilter}
          onChange={onChange}
          textLabels={textLabels}
        />
      </div>

      {/* <div style={{ height: 300 }}>
        <h2>标准</h2>
        <GlobalFilter
          {...standardProps}
          suppFilter={suppFilter}
          onChange={onChange}
          textLabels={textLabels}
          onVisibleChange={onVisibleChange}
        />
      </div> */}
    </div>
  );
};
export default GlobalFilter1Demo;
