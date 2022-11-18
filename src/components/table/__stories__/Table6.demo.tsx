/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { VirtualizedTable } from '../index';
import dayjs from 'dayjs';
import { VirtualizedTableColumns, AlignProps } from '../VirtualizedTable';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export const amount = (v: string | null) => {
  if (v === '-' || v == null) {
    return '-';
  }
  return v;
};

export function time(d: number) {
  return dayjs(d).format('YYYY-MM-DD');
}

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
  const dataSource = [];
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
  for (let index = 0; index < 1000; index++) {
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

  const repeatedColumns: VirtualizedTableColumns[] = [];

  for (let i = 0; i < 100; i++) {
    for (const col of cols.indCols) {
      repeatedColumns.push({ ...col, name: `copy-${i} ${col.name}` });
    }
  }

  const [index, setIndex] = React.useState(100);

  return (
    <DocPreview {...props}>
      <h2 id="first"> 大数据滚动容器为window</h2>
      <VirtualizedTable
        dataSource={bigDataSource}
        columns={[
          {
            lock: true,
            width: 80,
            name: 'index',
            getValue(_record: any, rowIndex: number) {
              return rowIndex;
            },
          },
          cols.updateTime,
          cols.provinceName,
          cols.cityName,
          ...cols.indCols,
        ]}
      />
      <h2 id="second">滚动容器为指定高度的div</h2>
      <VirtualizedTable
        style={{ height: 400, overflow: 'auto' }}
        dataSource={bigDataSource}
        columns={[
          {
            lock: true,
            width: 80,
            name: 'index',
            getValue(_record: any, rowIndex: number) {
              return rowIndex;
            },
          },
          cols.updateTime,
          cols.provinceName,
          cols.cityName,
          ...cols.indCols,
        ]}
      />

      <h2 id="third">滚动容器为指定高度的div scrollToIndex={100}</h2>
      <button
        onClick={() => {
          setIndex(110);
        }}
      >
        setIndex
      </button>
      <VirtualizedTable
        style={{ height: 400, overflow: 'auto' }}
        dataSource={bigDataSource}
        scrollToIndex={index}
        columns={[
          {
            lock: true,
            width: 80,
            name: 'index',
            getValue(_record: any, rowIndex: number) {
              return rowIndex;
            },
          },
          cols.updateTime,
          cols.provinceName,
          cols.cityName,
          ...cols.indCols,
        ]}
      />

      <h2 id="four">双向虚拟滚动</h2>
      <VirtualizedTable
        useVirtual={true}
        dataSource={[
          bigDataSource,
          bigDataSource,
          bigDataSource,
          bigDataSource,
          bigDataSource,
        ].flat()}
        columns={[
          {
            lock: true,
            width: 80,
            name: 'index',
            getValue(_record: any, rowIndex: number) {
              return rowIndex;
            },
          },
          cols.updateTime,
          cols.provinceName,
          cols.cityName,
          ...repeatedColumns,
        ]}
      />
    </DocPreview>
  );
};

export default Demo;
