/* eslint-disable no-console, react/no-access-state-in-setstate */
import React from 'react';
import { ObjectInterface } from '@/components/_utils/interfaces';
import Tree from '../index';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export function generateData(x = 3, y = 2, z = 1, gData = []) {
  // x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
  function _loop(_level: number, _preKey?: string, _tns?: ObjectInterface[]) {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: `${key}-label`, key: `${key}-key` });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return _loop(__level, key, tns[index].children);
    });

    return null;
  }
  _loop(z);
  return gData;
}
export function calcTotal(x = 3, y = 2, z = 1) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rec: any = (n: number) => (n >= 0 ? x * y ** n-- + rec(n) : 0);
  return rec(z + 1);
}
console.log('总节点数（单个tree）：', calcTotal());
// 性能测试：总节点数超过 2000（z要小）明显感觉慢。z 变大时，递归多，会卡死。

export const gData = generateData();

class Demo extends React.Component<PriviewProps, ObjectInterface> {
  state = {
    gData,
    autoExpandParent: true,
    expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
  };

  onDragStart = (info: ObjectInterface) => {
    console.log('start', info);
  };

  onDragEnter = (info: ObjectInterface) => {
    console.log('enter', info);
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  };

  onDrop = (info: ObjectInterface) => {
    console.log('drop', info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loop = (data: ObjectInterface, key: string, callback: any) => {
      data.forEach((item: ObjectInterface, index: number, arr: ObjectInterface[]) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj: ObjectInterface = {};
    loop(data, dragKey, (item: ObjectInterface, index: number, arr: ObjectInterface[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: ObjectInterface) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: ObjectInterface) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar: ObjectInterface[] = [];
      let i = -1;
      loop(data, dropKey, (_item: ObjectInterface, index: number, arr: ObjectInterface[]) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  onExpand = (expandedKeys: React.ReactText[]) => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  render() {
    return (
      <DocPreview {...this.props}>
        <div className="draggable-demo">
          <h2>draggable</h2>
          <p>drag a node into another node</p>
          <div className="draggable-container" style={{ height: 300 }}>
            <Tree
              expandedKeys={this.state.expandedKeys}
              onExpand={this.onExpand}
              autoExpandParent={this.state.autoExpandParent}
              draggable
              onDragStart={this.onDragStart}
              onDragEnter={this.onDragEnter}
              onDrop={this.onDrop}
              treeData={this.state.gData}
            />
          </div>
        </div>
      </DocPreview>
    );
  }
}

export default Demo;
