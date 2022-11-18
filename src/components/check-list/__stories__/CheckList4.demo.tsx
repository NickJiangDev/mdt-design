import * as React from 'react';
import TreeCheckList, { TreeLabelValueItemInterface } from '../TreeCheckList';
import { BaseContext, ThemeEnum } from '@/components/style/context';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const treeData: TreeLabelValueItemInterface[] = [];
for (let i = 0; i < 5; i++) {
  const item: TreeLabelValueItemInterface = {
    title: `文字${i}`,
    key: `key-${i}`,
    children: [],
  };
  for (let j = 0; j < 30; j++) {
    item.children?.push({
      title: `文字${i}-${j}`,
      key: `key-${i}-${j}`,
    });
  }
  treeData.push(item);
}

const CheckList4Demo = (props: PriviewProps) => {
  const { theme } = React.useContext(BaseContext);
  const [vals, setVals] = React.useState([]);
  const onChange = React.useCallback((v) => {
    setVals(v);
  }, []);

  return (
    <DocPreview {...props}>
      <h4>基本用法</h4>
      <div>
        <TreeCheckList
          noContentText="暂无数据"
          noResultText="搜索无结果"
          placeholder="搜索字段"
          options={treeData}
        />
      </div>
      <h4>设置listHeight</h4>
      <div>
        <TreeCheckList
          noContentText="暂无数据"
          noResultText="搜索无结果"
          placeholder="搜索字段"
          options={treeData}
          listHeight={500}
        />
      </div>
      <h4>添加说明</h4>
      <div>
        <TreeCheckList
          noContentText="暂无数据"
          noResultText="搜索无结果"
          placeholder="搜索字段"
          options={treeData}
          text="abc"
        />
      </div>
      <h4>受控</h4>
      <div>
        <TreeCheckList
          noContentText="暂无数据"
          noResultText="搜索无结果"
          placeholder="搜索字段"
          loading={false}
          value={vals}
          options={treeData}
          onChange={onChange}
        />
      </div>
      <h4>高度弹性</h4>
      <div style={{ height: 300 }}>
        <TreeCheckList
          noContentText="暂无数据"
          noResultText="搜索无结果"
          placeholder="搜索字段"
          loading={false}
          value={vals}
          options={treeData}
          onChange={onChange}
          defaultExpandAll
          defaultExpandParent
          selectable={false}
          flexHeight
        />
      </div>
      {theme === ThemeEnum.dark && (
        <React.Fragment>
          <h4>assist bg</h4>
          <div style={{ background: '#343C54' }}>
            <TreeCheckList
              noContentText="暂无数据"
              noResultText="搜索无结果"
              placeholder="搜索字段"
              options={treeData}
              type="assist-bg"
            />
          </div>
        </React.Fragment>
      )}
    </DocPreview>
  );
};
export default CheckList4Demo;
