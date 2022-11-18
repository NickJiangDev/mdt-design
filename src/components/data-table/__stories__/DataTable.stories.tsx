// import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import DataTable, { DataTableProps } from '../DataTable';
import Template1 from './DataTable1.demo';
import { Title, Subtitle } from '@storybook/addon-docs';
import { Dropmenu, MenuItemProps } from '@/components/dropdown';
import Icon from '@/components/icon';
import { ObjectInterface } from '../../_utils/interfaces';
/* eslint-disable import/no-webpack-loader-syntax */
import code from '!!raw-loader!./DataTable1.demo';

const menus2: MenuItemProps[] = [
  {
    title: '按类型',
    key: '1',
    type: 'group',
    children: [
      { title: '全部工作台', key: '1-1' },
      { title: '标准工作台', key: '1-2' },
      { title: '自定义工作台', key: '1-3' },
      { title: '报表工作台', key: '1-4' },
    ],
    divider: true,
  },
  {
    title: '按权限',
    key: '2',
    type: 'group',
    children: [
      { title: '所有', key: '2-1' },
      { title: '可编辑', key: '2-2' },
      { title: '不可编辑', key: '2-3' },
    ],
  },
];

/**
 * 字段类型
 */
enum FieldType {
  text = 'text',
  number = 'number',
  lnglat = 'lnglat',
  datetime = 'datetime',
  bool = 'bool',
  formula = 'formula',
  geometry = 'geometry',
  image = 'image',
}

const IconMap: ObjectInterface = {
  [FieldType.text]: 'text',
  [FieldType.number]: 'num',
  [FieldType.datetime]: 'time',
  [FieldType.lnglat]: 'geo-global',
  [FieldType.image]: 'image',
};

const columns = [
  {
    key: 'avatar',
    name: 'Avatar',
    width: 200,
    resizable: true,
    type: 'image',
    dropmenuProps: {
      menus: menus2,
    },
  },
  {
    key: 'title',
    name: 'Title',
    // editor: React.forwardRef((props, ref) => (
    //   <DropDownEditor ref={ref} {...props} options={titles} />
    // )),
    width: 200,
    resizable: true,
    formatter(props: ObjectInterface) {
      return <>{props.row.title}</>;
    },
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'firstName',
    name: 'First Name',
    editable: true,
    width: 200,
    resizable: true,
    frozen: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'lastName',
    name: 'Last Name',
    editable: true,
    width: 200,
    resizable: true,
    frozen: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'email',
    name: 'Email',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'street',
    name: 'Street',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'zipCode',
    name: 'ZipCode',
    editable: true,
    width: 200,
    resizable: true,
    type: 'number',
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'date',
    name: 'Date',
    editable: true,
    width: 200,
    resizable: true,
    type: 'datetime',
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'bs',
    name: 'bs',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'catchPhrase',
    name: 'Catch Phrase',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'companyName',
    name: 'Company Name',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
  {
    key: 'sentence',
    name: 'Sentence',
    editable: true,
    width: 200,
    resizable: true,
    headerRenderer: (p: ObjectInterface) => {
      const type = p.column.type;
      const icon = type ? IconMap[type] : 'text';
      return (
        <div className={`dmc-datatable-header-cell-wrapper`}>
          <Icon icon={icon} />
          {p.column.name}
        </div>
      );
    },
    filterRenderer: () => (
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
    ),
  },
];

export default {
  title: '组件/DataTable/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>数据列表的展示。</Subtitle>
          <Template1 dirName="data-table" code={code} />
        </>
      ),
    },
  },
} as Meta;

const DataTabletory: Story<DataTableProps> = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
      <DataTable {...args} />
    </div>
  );
};
export const DefaultStory = DataTabletory.bind({});
DefaultStory.args = {
  columns,
  rows: [],
};
DefaultStory.storyName = 'DataTable';
