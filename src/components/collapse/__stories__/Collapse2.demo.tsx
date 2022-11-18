import * as React from 'react';
import Collapse, { CollapseItem } from '@/components/collapse';
import Icon from '@/components/icon';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const CollapseDemo = (props: PriviewProps) => {
  const [activeKey, setActiveKey] = React.useState<React.Key | React.Key[]>([]);
  const [activeKey1, setActiveKey1] = React.useState<React.Key | React.Key[]>([]);
  const [activeKey2, setActiveKey2] = React.useState<React.Key | React.Key[]>([]);
  return (
    <DocPreview {...props}>
      <h4>基本用法</h4>
      <Collapse
        activeKey={activeKey}
        onChange={(keys) => {
          setActiveKey(keys);
        }}
      >
        <CollapseItem header={<div>面板1</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem header={<div>面板2</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem
          disabled
          header={<div>面板3</div>}
          extra={<Icon icon="visibility-off" size={20} />}
        >
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
      </Collapse>
      <h4>右侧箭头</h4>
      <Collapse
        activeKey={activeKey1}
        onChange={(keys) => {
          setActiveKey1(keys);
        }}
        arrowPosition="right"
      >
        <CollapseItem header={<div>面板1</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem header={<div>面板2</div>} extra={<Icon icon="visibility-off" size={20} />}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem disabled header={<div>面板3</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
      </Collapse>
      <h4>手风琴</h4>
      <Collapse
        activeKey={activeKey2}
        onChange={(keys) => {
          setActiveKey2(keys);
        }}
        accordion
      >
        <CollapseItem header={<div>面板1</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem header={<div>不显示icon</div>} showArrow={false}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
        <CollapseItem header={<div>面板3</div>}>
          <div>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
            be found as a welcome guest in many households across the world. A dog is a type of
            domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            welcome guest in many households across the world.
          </div>
        </CollapseItem>
      </Collapse>
    </DocPreview>
  );
};

export default CollapseDemo;
