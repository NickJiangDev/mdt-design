import React from 'react';
import { ScrollX } from '@/components/table';
import Slider from '@/components/slider';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import { DocPreview } from '@/__stories-template__';

const Demo = React.memo((props: PriviewProps) => {
  const [allWidth, setAllWidth] = React.useState(1000);
  const [width, setWidth] = React.useState(100);
  const [scrollWidth, setScrollWidth] = React.useState(600);
  const [stepWidth, setStepWidth] = React.useState(100);
  return (
    <DocPreview {...props}>
      <div style={{ marginBottom: 40 }}>
        <div>
          allWidth（滚动全部长度）:
          <Slider
            max={10000}
            step={1}
            defaultValue={allWidth}
            onAfterChange={(val) => setAllWidth(Number(val))}
          />
        </div>
        <div>
          width（滚动容器宽度）:
          <Slider
            max={allWidth}
            step={1}
            defaultValue={width}
            onAfterChange={(val) => setWidth(Number(val))}
          />
        </div>
        <div>
          scrollWidth（滚动条宽度）:
          <Slider
            max={1000}
            step={1}
            defaultValue={scrollWidth}
            onAfterChange={(val) => setScrollWidth(Number(val))}
          />
        </div>
        <div>
          stepWidth（点击左右按钮移动step）:
          <Slider
            max={1000}
            step={1}
            defaultValue={stepWidth}
            onAfterChange={(val) => setStepWidth(Number(val))}
          />
        </div>
        <div>注：该组件event$属性依赖于ahooks useEventEmitter 实例</div>
      </div>

      <ScrollX allWidth={allWidth} width={width} scrollWidth={scrollWidth} stepWidth={stepWidth} />
    </DocPreview>
  );
});

export default Demo;
