/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  VirtualizedTable,
  VirtualizedTableColumns,
  collectNodes,
  ArtColumn,
  VirtualizedTableMemo,
} from '../index';
import { applyTransforms, commonTransforms } from 'ali-react-table-fork/biz';
import { amount, time } from './Table6.demo';
import { ObjectInterface } from '@/components/_utils/interfaces';
import Radio from '@/components/radio';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export type AlignProps = 'right' | 'left' | 'center' | undefined;

const rawCols = {
  provinceName: { code: 'provinceName', name: '省份', width: 150 },
  cityName: { code: 'cityName', name: '城市', width: 150 },
  confirmedCount: {
    code: 'confirmedCount',
    name: '确诊',
    width: 100,
    render: amount,
    align: 'right' as AlignProps,
  },
  suspectedCount: {
    code: 'suspectedCount',
    name: '疑似',
    width: 100,
    render: amount,
    align: 'right' as AlignProps,
  },
  curedCount: {
    code: 'curedCount',
    name: '治愈',
    width: 100,
    render: amount,
    align: 'right' as AlignProps,
  },
  deadCount: {
    code: 'deadCount',
    name: '死亡',
    width: 100,
    render: amount,
    align: 'right' as AlignProps,
  },
  updateTime: { code: 'updateTime', name: '最后更新时间', width: 180, render: time },
};

const lockProvCol = { lock: true, ...rawCols.provinceName };
const lockCityCol = { lock: true, ...rawCols.cityName };
const lockTimeCol = { lock: true, ...rawCols.updateTime };
const indCols = [rawCols.confirmedCount, rawCols.curedCount, rawCols.deadCount];
const cols = { ...rawCols, indCols, lockProvCol, lockCityCol, lockTimeCol };

const Demo = (props: PriviewProps) => {
  const columns: VirtualizedTableColumns[] = [
    { code: 'provinceName', name: '省份', width: 150 },
    {
      code: 'confirmedCount',
      name: '确诊',
      width: 100,
      render: amount,
      align: 'right',
      ellipsis: true,
    },
    {
      code: 'suspectedCount',
      name: '疑似',
      width: 100,
      render: amount,
      align: 'right',
      ellipsis: true,
    },
    { code: 'curedCount', name: '治愈', width: 100, render: amount, ellipsis: true },
    { code: 'deadCount', name: '死亡', width: 100, render: amount },
    { code: 'updateTime', name: '最后更新时间', width: 180, render: time },
  ];

  //默认列宽
  const columns1: VirtualizedTableColumns[] = [
    { code: 'provinceName', name: '省份' },
    { code: 'confirmedCount', name: '确诊', render: amount },
    { code: 'suspectedCount', name: '疑似', render: amount },
    { code: 'curedCount', name: '治愈', render: amount },
    { code: 'deadCount', name: '死亡', render: amount },
    { code: 'updateTime', name: '最后更新时间', render: time },
  ];

  const dataSource: any[] = [];
  for (let index = 0; index < 20; index++) {
    dataSource.push({
      provinceName: `上海-${index}`,
      confirmedCount: '10',
      suspectedCount: '20',
      curedCount: '30',
      deadCount: 0,
      updateTime: new Date().getTime(),
    });
  }

  const bigDataSource = [];
  for (let index = 0; index < 100; index++) {
    bigDataSource.push({
      provinceName: `上海-${index}`,
      cityName: `上海-${index}`,
      confirmedCount: '10',
      suspectedCount: '20',
      curedCount: '30',
      deadCount: 0,
      updateTime: new Date().getTime(),
    });
  }

  const columns2: VirtualizedTableColumns[] = [cols.provinceName, ...cols.indCols, cols.updateTime];

  const defaultColumnWidth = 180;
  // 注意 columns 可能是嵌套的结构，这里使用 collectNodes 来获取所有叶子节点
  // 同时注意部分列的 width 可能为空，此时可以用 defaultColumnWidth 作为列的宽度
  const defaultSizes = collectNodes(columns, 'leaf-only').map(
    (col) => col.width ?? defaultColumnWidth,
  );
  console.log(defaultSizes, 'defaultSizes');
  const [sizes, onChangeSizes] = React.useState(defaultSizes);

  const renderData = applyTransforms(
    { columns: columns2, dataSource: dataSource.slice(0, 5) },
    commonTransforms.columnResize({
      sizes,
      onChangeSizes,
      appendExpander: true,
      disableUserSelectWhenResizing: true,
      minSize: 60,
      maxSize: 500,
    }),
  );

  const columnsTemp = [
    {
      code: 'A',
      name: 'A',
      width: 100,
      children: [
        { code: 'index', name: '序号', type: 'number', width: 180, sort: '', filterValues: {} },
      ],
    },
    {
      code: 'B',
      name: 'B',
      width: 100,
      children: [
        { code: 'id', name: 'id', type: 'number', width: 180, sort: '', filterValues: {} },
      ],
    },
    {
      code: 'C',
      name: 'C',
      width: 160,
      children: [
        { code: 'name', name: '名称', type: 'text', width: 180, sort: '', filterValues: ['empty'] },
      ],
    },
    {
      code: 'D',
      name: 'D',
      width: 100,
      children: [
        {
          code: 'extra.object_type',
          name: 'object_type',
          type: 'text',
          dbType: 'str',
          width: 180,
          sort: '',
          filterValues: ['lab_test_line'],
        },
      ],
    },
    {
      code: 'E',
      name: 'E',
      width: 160,
      children: [
        {
          code: 'extra.geometry_type',
          name: 'geometry_type',
          type: 'text',
          dbType: 'str',
          width: 180,
          sort: '',
          filterValues: ['line'],
        },
      ],
    },
    {
      code: 'F',
      name: 'F',
      width: 100,
      children: [
        {
          code: 'extra.value',
          name: 'value',
          type: 'number',
          dbType: 'float',
          width: 180,
          sort: '',
          filterValues: {},
        },
      ],
    },
    {
      code: 'G',
      name: 'G',
      width: 160,
      children: [
        { code: 'lng', name: '经度', type: 'lnglat', width: 180, sort: '', filterValues: [] },
      ],
    },
    {
      code: 'H',
      name: 'H',
      width: 160,
      children: [
        { code: 'lat', name: '纬度', type: 'lnglat', width: 180, sort: '', filterValues: [] },
      ],
    },
    {
      code: 'I',
      name: 'I',
      width: 100,
      children: [
        { code: 'address', name: '地址', type: 'text', width: 180, sort: '', filterValues: [''] },
      ],
    },
    {
      code: 'J',
      name: 'J',
      width: 160,
      children: [
        {
          code: 'user_name',
          name: '修改用户',
          type: 'text',
          width: 180,
          sort: '',
          filterValues: [''],
        },
      ],
    },
    {
      code: 'K',
      name: 'K',
      width: 160,
      children: [
        {
          code: 'update_time',
          name: '修改时间',
          type: 'datetime',
          width: 180,
          sort: '',
          filterValues: {},
        },
      ],
    },
  ];

  const tableDataTemp = [
    {
      id: 81837809,
      name: 'empty',
      geometry: {
        type: 'LineString',
        coordinates: [
          [120.992175754539, 30.9812525307741],
          [120.995175754539, 30.9812525307741],
        ],
      },
      user_id: 147884,
      update_time: '2020-08-21 14:43:21',
      extra: { value: 63, object_type: 'lab_test_line', geometry_type: 'line' },
      index: 1,
      'extra.object_type': 'lab_test_line',
      'extra.geometry_type': 'line',
      'extra.value': 63,
      lng: '',
      lat: '',
      address: '',
      user_name: '张一培',
    },
  ];

  const defaultSizes1 = collectNodes(columnsTemp as ArtColumn[], 'leaf-only').map(
    (col) => col.width ?? defaultColumnWidth,
  );
  console.log(defaultSizes1, 'defaultSizes1');
  const [sizes1, onChangeSizes1] = React.useState(defaultSizes1);

  console.log(columnsTemp, 'columnsTemp');
  console.log(tableDataTemp, 'tableDataTemp');

  const renderDataTemp = applyTransforms(
    { columns: columnsTemp, dataSource: tableDataTemp },
    commonTransforms.columnResize({
      sizes: sizes1,
      onChangeSizes: onChangeSizes1,
      appendExpander: true,
      disableUserSelectWhenResizing: true,
      minSize: 60,
      maxSize: 500,
    }),
  );

  console.log(renderDataTemp, 'renderDataTemp');

  const [tableParams, setTableParams] = React.useState<ObjectInterface>({
    isLoading: true,
    dataSource: [],
  });

  setTimeout(() => {
    setTableParams({ isLoading: false, dataSource: dataSource.slice(0, 5) });
  }, 5000000);

  const [value, onChange] = useState('');

  const singleSelectColumn: ArtColumn = {
    name: '',
    width: 60,
    align: 'center',
    render(_: any, record: any) {
      const key = record.provinceName;
      return <Radio checked={value === key} onChange={() => onChange(key)} />;
    },
  };

  const renderData1 = applyTransforms({
    dataSource: dataSource,
    columns: [singleSelectColumn, ...columns],
  });

  return (
    <DocPreview {...props}>
      <h2>基础 default-bg 省略</h2>
      <div style={{ height: 400 }}>
        <VirtualizedTable dataSource={dataSource.slice(0, 5)} columns={columns} />
      </div>
      <h2>基础 page-bg</h2>
      <div style={{ height: 400 }}>
        <VirtualizedTable dataSource={dataSource.slice(0, 5)} columns={columns} type="page-bg" />
      </div>
      <h2>基础 assist-bg</h2>
      <div style={{ height: 400 }}>
        <VirtualizedTable dataSource={dataSource.slice(0, 5)} columns={columns} type="assist-bg" />
      </div>
      <h2>emptyContext</h2>
      <div style={{ height: 300 }}>
        <VirtualizedTable
          dataSource={[]}
          columns={[...columns1, ...columns]}
          emptyContent={<div>无数据</div>}
        />
      </div>
      <h2>loading</h2>
      <div style={{ height: 300 }}>
        <VirtualizedTable
          defaultColumnWidth={200}
          dataSource={tableParams.dataSource}
          columns={[...columns1, ...columns]}
          isLoading={tableParams.isLoading}
        />
      </div>
      <h2>默认列宽</h2>
      <div style={{ height: 300 }}>
        <VirtualizedTable
          defaultColumnWidth={200}
          dataSource={dataSource.slice(0, 5)}
          columns={[...columns1, ...columns]}
        />
      </div>
      <h2>withVerticalBorder=false</h2>
      <div style={{ height: 300 }}>
        <VirtualizedTable
          defaultColumnWidth={200}
          dataSource={dataSource.slice(0, 5)}
          columns={[...columns1, ...columns]}
          withVerticalBorder={false}
        />
      </div>
      <h2>withHorizontalBorder=false</h2>
      <div style={{ height: 300 }}>
        <VirtualizedTable
          defaultColumnWidth={200}
          dataSource={dataSource.slice(0, 5)}
          columns={[...columns1, ...columns]}
          withHorizontalBorder={false}
        />
      </div>
      <h2>左侧fix</h2>
      <VirtualizedTable
        style={{ width: 500, height: 300, overflow: 'auto' }}
        dataSource={dataSource}
        columns={[
          { lock: true, code: 'provinceName', name: '省份', width: 150 },
          { code: 'confirmedCount', name: '确诊', width: 100, render: amount, align: 'right' },
          { code: 'suspectedCount', name: '疑似', width: 100, render: amount, align: 'right' },
          { code: 'curedCount', name: '治愈', width: 100, render: amount, align: 'right' },
          { code: 'deadCount', name: '死亡', width: 100, render: amount, align: 'right' },
          { code: 'updateTime', name: '最后更新时间', width: 180, render: time },
        ]}
      />
      <h2>左侧和右侧同时fix default-bg</h2>
      注意为表格设置 style.overflow = 'auto' 之后，必须同时设置 style.height 或 style.maxHeight
      <VirtualizedTable
        style={{ width: 600, height: 400, overflow: 'auto' }}
        dataSource={dataSource}
        columns={[cols.lockProvCol, cols.cityName, ...cols.indCols, cols.lockTimeCol]}
        type="assist-bg"
      />
      <h2>左侧和右侧同时fix page-bg</h2>
      注意为表格设置 style.overflow = 'auto' 之后，必须同时设置 style.height 或 style.maxHeight
      <VirtualizedTable
        style={{ width: 600, height: 400, overflow: 'auto' }}
        dataSource={dataSource}
        columns={[cols.lockProvCol, cols.cityName, ...cols.indCols, cols.lockTimeCol]}
        type="page-bg"
      />
      <h2>左侧和右侧同时fix assist-bg</h2>
      注意为表格设置 style.overflow = 'auto' 之后，必须同时设置 style.height 或 style.maxHeight
      <VirtualizedTable
        style={{ width: 600, height: 400, overflow: 'auto' }}
        dataSource={dataSource}
        columns={[cols.lockProvCol, cols.cityName, ...cols.indCols, cols.lockTimeCol]}
        type="assist-bg"
      />
      <h2>拖拽调整列宽</h2>
      <div style={{ display: 'flex', alignItems: 'center', height: 400 }}>
        <VirtualizedTable dataSource={renderData.dataSource} columns={renderData.columns} />
      </div>
      <h2>拖拽调整列宽 children</h2>
      <div
        style={{
          height: 400,
          width: 530,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
          <VirtualizedTableMemo
            dataSource={renderDataTemp.dataSource}
            columns={renderDataTemp.columns}
          />
        </div>
      </div>
      <h2>单选</h2>
      <div style={{ display: 'flex', alignItems: 'center', height: 400 }}>
        <VirtualizedTable
          primaryKey="provinceName"
          dataSource={renderData1.dataSource}
          columns={renderData1.columns}
          getRowProps={(record) => {
            const key = record.provinceName;
            return {
              style: {
                backgroundColor: key === value ? '#f5f5f5' : undefined,
                cursor: 'pointer',
              },
              onClick() {
                onChange(key);
              },
            };
          }}
        />
      </div>
      <h2>border样式</h2>
      <div style={{ display: 'flex', alignItems: 'center', height: 400 }}>
        <VirtualizedTable
          dataSource={dataSource.slice(0, 5)}
          columns={columns}
          style={{
            '--cell-border': '3px solid red',
            '--header-cell-border': '3px solid red',
          }}
        />
      </div>
      <h2>nopadding</h2>
      <div style={{ display: 'flex', alignItems: 'center', height: 400 }}>
        <VirtualizedTable
          dataSource={dataSource.slice(0, 5)}
          columns={columns}
          noCellPadding={false}
        />
      </div>
    </DocPreview>
  );
};

export default Demo;
