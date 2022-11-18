/* eslint-disable no-console */
import MapInfoWindow from '@/components/map-info-window';
import { GeometryType } from '../types';

const MapInfoWindowDemo = () => {
  return (
    <div
      style={{
        position: 'relative',
        left: '300px',
      }}
    >
      <MapInfoWindow
        className="outer-classname"
        onClose={() => console.log('close')}
        style={{
          marginBottom: '100px',
        }}
        dataSources={[
          {
            objectType: '测试数据2',
            data: [
              {
                name: '1-1',
                id: '1-1',
                age: 30,
                work: 'software engineer',
                location: 'shanghai',
                etc: 'xxxxx',
                a: 'a',
                b: 'b',
                c: 'c',
                d: 'd',
              },
            ],
            geometryType: GeometryType.point,
            infoCfg: [
              { key: 'name', type: 'string' },
              { key: 'age', type: 'number' },
            ],
            packageUuid: '2',
          },
        ]}
        // tools={}
        showClose={true}
        // 头部工具栏
        renderHeaderTools={() => null}
        headerTools={[
          {
            id: 'app-grid',
            name: 'app-grid',
            action: () => {
              console.log('app-grid');
            },
          },
        ]}
        // 记录详情页 下方按钮
        footerTools={[
          {
            id: 'default',
            name: 'default-btn',
            action: () => {
              console.log('click');
            },
          },
        ]}
        // position
        // 针对多数据的情况下 当前选中数据变更
        handleShowIndexChange={(params: {
          // 选中数据包（DataSource）uuid
          packageUuid: string;
          // 选中数据包下记录 (rec) uuid
          recordUuid: string;
        }) => {
          console.log(params.packageUuid, params.recordUuid);
        }}
      />
      <MapInfoWindow
        className="outer-classname"
        onClose={() => console.log('close')}
        dataSources={[
          {
            objectType:
              '这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本',
            data: [
              {
                name: '1-1',
                这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本:
                  '这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本这是测试文本',
                id: '1-1',
                age: 30,
                work: 'software engineer',
                location: 'shanghai',
                etc: 'xxxxx',
                imgs: ['1', '2', '3', '4', '5'],
              },
              {
                name: '1-2',
                id: '1-2',
                age: 44,
              },
            ],
            geometryType: GeometryType.point,
            // infoCfg: [
            //   { key: 'name', type: 'string' },
            //   { key: 'age', type: 'number' },
            // ],
            // 默认取 packageUuid 也可自定义 uuid 字段名
            // packageUuid: '1',
            dataSourceUniqueKey: '__uuid__',
            __uuid__: '1',
            headerTools: [
              {
                id: 'delete',
                name: 'delete-2',
                action: () => console.log('delete'),
              },
            ],
            // 记录详情页 下方按钮
            footerTools: [
              {
                id: 'tool-0',
                name: 'tool-0',
                action: () => console.log('tool-0'),
              },
              {
                id: 'tool-1',
                name: 'tool-1',
                action: () => console.log('tool-1'),
              },
              {
                id: 'tool-2',
                name: 'tool-2',
                action: () => console.log('tool-2'),
              },
            ],
          },
          {
            objectType: '测试数据2',
            data: [
              {
                name: '2-1',
                id: '2-1',
                age: 20,
              },
              {
                name: '2-2',
                id: '2-2',
                age: 22,
              },
            ],
            geometryType: GeometryType.point,
            infoCfg: [
              { key: 'name', type: 'string' },
              { key: 'age', type: 'number' },
            ],
            // packageUuid: '2',
            dataSourceUniqueKey: '__uuid__',
            __uuid__: '1',
          },
        ]}
        // tools={}
        showClose={true}
        // 头部工具栏
        // renderHeaderTools={() => null}
        headerTools={[
          {
            id: 'app-grid',
            name: 'app-grid',
            action: () => {
              console.log('app-grid');
            },
          },
        ]}
        // 记录详情页 下方按钮
        footerTools={[
          {
            id: 'default',
            name: 'default-btn',
            action: () => {
              console.log('click');
            },
          },
        ]}
        // position
        // 针对多数据的情况下 当前选中数据变更
        handleShowIndexChange={(params: {
          // 选中数据包（DataSource）uuid
          packageUuid: string;
          // 选中数据包下记录 (rec) uuid
          recordUuid: string;
        }) => {
          console.log(params.packageUuid, params.recordUuid);
        }}
      />
    </div>
  );
};
export default MapInfoWindowDemo;
