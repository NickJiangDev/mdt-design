import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MapInfoWindow from '../index';
import { GeometryType } from '../types';

describe('MapInfoWindow', () => {
  test('MapInfoWindow正确渲染', () => {
    const { container } = render(
      <MapInfoWindow
        className="1"
        onClose={() => console.log('close')}
        dataSources={[
          {
            objectType: '1',
            data: [
              {
                id: 'a',
                name: 'a',
                age: 30,
              },
            ],
            geometryType: GeometryType.point,
            infoCfg: [
              { key: 'name', type: 'string' },
              { key: 'age', type: 'number' },
            ],
            packageUuid: '1',
            // 记录详情页 下方按钮
            footerTools: [],
          },
        ]}
        // tools={}
        showClose={false}
        // 头部工具栏
        renderHeaderTools={() => null}
        // position
        // 针对多数据的情况下 当前选中数据变更
        handleShowIndexChange={(params: { packageUuid: string; recordUuid: string }) => {
          console.log(params.packageUuid, params.recordUuid);
        }}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
