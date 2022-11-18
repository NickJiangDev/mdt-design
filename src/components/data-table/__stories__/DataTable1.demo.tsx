import faker from 'faker';
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { DataGridHandle, RowsUpdateEvent, CalculatedColumn } from 'react-data-grid';
import DataGrid, { SortTypeEnum } from '../index';
import { Dropmenu, MenuItemProps } from '@/components/dropdown';
import Icon from '@/components/icon';
import { ObjectInterface } from '../../_utils/interfaces';
import '../style/index.less';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

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

// export interface ObjectInterface {
//   id: string;
//   avatar: string;
//   email: string;
//   title: string;
//   firstName: string;
//   lastName: string;
//   street: string;
//   zipCode: string;
//   date: string;
//   bs: string;
//   catchPhrase: string;
//   companyName: string;
//   words: string;
//   sentence: string;
// }

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

faker.locale = 'en_GB';

// const titles: string[] = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

function createFakeRowObjectData(index: number): ObjectInterface {
  return {
    id: `id_${index}`,
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    date: faker.date.past().toLocaleDateString(),
    bs: faker.company.bs(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    words: faker.lorem.words(),
    sentence: faker.lorem.sentence(),
  };
}

function createRows(numberOfRows: number): ObjectInterface[] {
  const rows: ObjectInterface[] = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }

  return rows;
}

function isAtBottom(event: React.UIEvent<HTMLDivElement>): boolean {
  const target = event.target as HTMLDivElement;
  return target.clientHeight + target.scrollTop === target.scrollHeight;
}

function loadMoreRows(newRowsCount: number, length: number): Promise<ObjectInterface[]> {
  return new Promise((resolve) => {
    const newRows: ObjectInterface[] = [];

    for (let i = 0; i < newRowsCount; i++) {
      newRows[i] = createFakeRowObjectData(i + length);
    }

    setTimeout(() => resolve(newRows), 1000);
  });
}

export default function AllFeatures(props: PriviewProps) {
  const [rows, setRows] = useState(() => createRows(2000));
  const [selectedRows, setSelectedRows] = useState(() => new Set<string>());
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef<DataGridHandle>(null);
  const [sortTypeMap, setSortTypeMap] = React.useState<Record<string, SortTypeEnum>>({});
  const columns = useMemo(
    () => [
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
        key: 'title1',
        name: '非受控多选1',
        type: 'text',
        width: 200,
        resizable: true,
        sorter: (type: SortTypeEnum, p: ObjectInterface) => {
          console.log(type, p);
        },
      },
      {
        key: 'title2',
        name: '非受控多选2',
        type: 'text',
        width: 200,
        resizable: true,
        sorter: (type: SortTypeEnum, p: ObjectInterface) => {
          console.log(type, p);
        },
      },
      {
        key: 'titleSort1',
        name: '受控单选1',
        type: 'text',
        width: 200,
        resizable: true,
        sortType: sortTypeMap['titleSort1'] || SortTypeEnum.UNSET,
        sorter: (type: SortTypeEnum, p: ObjectInterface) => {
          setSortTypeMap({ titleSort1: type });
          console.log(type, p);
        },
      },
      {
        key: 'titleSort2',
        name: '受控单选2',
        type: 'text',
        width: 200,
        resizable: true,
        sortType: sortTypeMap['titleSort2'] || SortTypeEnum.UNSET,
        sorter: (type: SortTypeEnum, p: ObjectInterface) => {
          setSortTypeMap({ titleSort2: type });
          console.log(type, p);
        },
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
    ],
    [sortTypeMap],
  );

  const handleRowUpdate = useCallback(
    ({ fromRow, toRow, updated, action }: RowsUpdateEvent<Partial<ObjectInterface>>): void => {
      const newRows = [...rows];
      let start: number;
      let end: number;

      if (action === 'COPY_PASTE') {
        start = toRow;
        end = toRow;
      } else {
        start = Math.min(fromRow, toRow);
        end = Math.max(fromRow, toRow);
      }

      for (let i = start; i <= end; i++) {
        newRows[i] = { ...newRows[i], ...updated };
      }

      setRows(newRows);
    },
    [rows],
  );

  const handleRowClick = useCallback(
    (rowIdx: number, _row: unknown, column: CalculatedColumn<ObjectInterface>) => {
      if (column.key === 'title') {
        gridRef.current?.selectCell({ rowIdx, idx: column.idx }, true);
      }
    },
    [],
  );

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (!isAtBottom(event)) return;

    setIsLoading(true);

    const newRows = await loadMoreRows(50, rows.length);

    setRows([...rows, ...newRows]);
    setIsLoading(false);
  }

  return (
    <DocPreview {...props}>
      <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        <DataGrid
          ref={gridRef}
          columns={columns}
          rows={rows}
          rowKey="id"
          onRowsUpdate={handleRowUpdate}
          onRowClick={handleRowClick}
          selectedRows={selectedRows}
          onScroll={handleScroll}
          onSelectedRowsChange={setSelectedRows}
          enableCellCopyPaste
          enableCellDragAndDrop
        />
        {isLoading && <div className="load-more-rows-tag">Loading more rows...</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        <DataGrid
          ref={gridRef}
          columns={columns}
          rows={rows}
          rowKey="id"
          onRowsUpdate={handleRowUpdate}
          onRowClick={handleRowClick}
          selectedRows={selectedRows}
          onScroll={handleScroll}
          onSelectedRowsChange={setSelectedRows}
          enableCellCopyPaste
          enableCellDragAndDrop
          type="assist-bg"
        />
        {isLoading && <div className="load-more-rows-tag">Loading more rows...</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
        <DataGrid columns={columns} rows={[]} />
      </div>
    </DocPreview>
  );
}
