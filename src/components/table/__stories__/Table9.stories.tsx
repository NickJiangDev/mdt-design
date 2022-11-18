import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  SimpleCrossTable,
  hideSameRenderType,
  CrossTableCellProps,
  SimpleCrossTableRef,
} from '@/components/table';
import Toggle from '@/components/toggle';
import Button from '@/components/button';
import { ObjectInterface } from '@/components/_utils/interfaces';
import { set } from 'lodash';
import { useUpdateEffect } from 'ahooks';
import { SimpleCrossTableProps } from '../SimpleCrossTable';

export default {
  title: '组件/Table/SimpleCrossTable',
  component: SimpleCrossTable,
} as Meta;

const title = '土地名称';
const leftColumn = [
  '土地名称',
  // '项目名称',
  // '项目名称1',
  // '地货比',
  // '地货比1',
  // '地货比2',
  // '地货比3',
  // '地货比4',
  // '地货比5',
  // '地货比6',
  '占地面积',
  '总价格',
  '楼面价格',
  '供需比',
];
const _data: ObjectInterface[] = [];
for (let i = 0; i < 30; i++) {
  const r = Number(Math.random().toFixed(3));
  const d = {
    土地名称: '名称' + i,
    项目名称: '哈哈哈' + i,
    项目名称1: '哈哈哈' + i,
    地货比: 0.2,
    地货比1: 0.2,
    地货比2: 0.2,
    地货比3: 0.2,
    地货比4: 0.2,
    地货比5: 0.2,
    地货比6: 0.2,
    供需比: 0.2,
    楼面价格: 199999,
    总价格: 199922299 + r,
    占地面积: 222222 + r,
  };
  for (let j = 0; j < 20; j++) {
    const name = `测试${j}`;
    set(d, name, j);
    leftColumn.push(`测试${j}`);
  }
  _data.push(d);
}

const className = 'demo-123';

const getRowHeight = (col: string) => {
  if (col === '地货比') {
    return 200;
  } else {
    return 54;
  }
};
const scrollNum = 200;

const SimpleCrossTabletory: Story<SimpleCrossTableProps> = (args) => {
  // const { theme } = React.useContext(BaseContext);
  // 钉在左侧 data下标集合
  const [nailedLeft, setNailedLeft] = React.useState<number[]>([]);
  const [data, setData] = React.useState<ObjectInterface[]>(_data);
  const [hideSame, setHideSame] = React.useState<boolean>(false);
  const [highLightSame, setHighLightSame] = React.useState<boolean>(false);
  const [highLightDiff, setHighLightDiff] = React.useState<boolean>(false);
  const ref = React.useRef<SimpleCrossTableRef>(null);
  const hideSameRender: hideSameRenderType = React.useCallback(() => {
    return (
      <div>
        <Toggle
          onChange={() => setHighLightSame(!highLightSame)}
          checked={highLightSame}
          showText
          checkedText={'取消高亮相同'}
          unCheckedText={'高亮相同的行'}
        />
        <Toggle
          onChange={() => setHighLightDiff(!highLightDiff)}
          checked={highLightDiff}
          showText
          checkedText={'取消高亮不同'}
          unCheckedText={'高亮不同的行'}
        />
        <Toggle
          onChange={(checked) => setHideSame(checked)}
          checked={hideSame}
          showText
          checkedText={'显示相同内容'}
          unCheckedText={'隐藏相同内容'}
        />
      </div>
    );
  }, [hideSame, highLightDiff, highLightSame]);

  const renderCell: (props: CrossTableCellProps) => React.ReactNode = React.useCallback(
    (props) => {
      const { currentDataIndex } = props;
      const _onClick = () => {
        const arr: number[] = nailedLeft;
        const _idx = arr.indexOf(currentDataIndex);
        if (_idx > -1) {
          arr.splice(_idx, 1);
        } else {
          arr.unshift(currentDataIndex);
        }
        setNailedLeft([...arr]);
      };
      const _onDelete = () => {
        const arr: number[] = nailedLeft;
        const _idx = arr.indexOf(currentDataIndex);
        if (_idx > -1) {
          arr.splice(_idx, 1);
          setNailedLeft([...arr]);
        }
        data.splice(currentDataIndex, 1);
        setData([...data]);
      };
      return (
        <div>
          {props.yIndex === 0 && <div onClick={_onDelete}>移除</div>}
          renderCell: {props.value}
          <br />
          xIndex: {props.xIndex}
          {props.yIndex === 0 && (
            <Toggle
              onChange={_onClick}
              checked={nailedLeft.length > props.xIndex - 1}
              showText
              checkedText={'取消钉住'}
              unCheckedText={'钉在左侧'}
            />
          )}
        </div>
      );
    },
    [data, nailedLeft],
  );

  useUpdateEffect(() => {
    const doms = ref.current?.getSameRows();
    if (doms) {
      for (let i = 0; i < doms.length; i++) {
        const dom = doms[i];
        dom.style.color = highLightSame ? 'red' : '';
      }
    }
  }, [highLightSame]);

  useUpdateEffect(() => {
    const doms = ref.current?.getDiffRows();
    if (doms) {
      for (let i = 0; i < doms.length; i++) {
        const dom = doms[i];
        dom.style.color = highLightDiff ? 'red' : '';
      }
    }
  }, [highLightDiff]);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button
          onClick={() => {
            ref.current?.dom?.querySelector(`.${className}`)?.scrollTo({
              top: scrollNum,
              left: scrollNum,
              behavior: 'smooth',
            });
          }}
        >
          滚动到top:{scrollNum}, left: {scrollNum}
        </Button>
        <Button
          onClick={() => {
            ref.current?.dom?.querySelector(`.${className}`)?.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          滚动到top:{0}, left: {0}
        </Button>
      </div>

      <SimpleCrossTable
        {...args}
        ref={ref}
        className={className}
        height={450}
        width={1000}
        hideSame={hideSame}
        title={title}
        leftColumn={leftColumn}
        data={data}
        leftColumnWidth={300}
        nailedLeft={nailedLeft}
        hideSameRender={hideSameRender}
        renderCell={renderCell}
        scrollWidth={250}
        defaultTitleHeight={100}
        getRowHeight={getRowHeight}
      />
    </div>
  );
};
export const DefaultStory = SimpleCrossTabletory.bind({});
DefaultStory.storyName = 'SimpleCrossTable';
