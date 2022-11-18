import * as React from 'react';
import { CollapseItem } from '@/components/collapse';
import Icon from '@/components/icon';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const CollapseDemo = (props: PriviewProps) => {
  const [active, setActive] = React.useState(false);
  const [active1, setActive1] = React.useState(false);
  return (
    <DocPreview {...props}>
      <h4>单独使用</h4>
      <CollapseItem
        header={<div>面板</div>}
        isActive={active}
        onItemClick={() => {
          setActive(!active);
        }}
        extra={<Icon icon="visibility-on" size={20} />}
      >
        <div>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world. A dog is a type of
          domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </div>
      </CollapseItem>
      <h4>右侧箭头</h4>
      <CollapseItem
        header={<div>面板</div>}
        isActive={active1}
        onItemClick={() => {
          setActive1(!active1);
        }}
        extra={<Icon icon="visibility-on" size={20} />}
        arrowPosition="right"
      >
        <div>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world. A dog is a type of
          domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </div>
      </CollapseItem>
    </DocPreview>
  );
};

export default CollapseDemo;
