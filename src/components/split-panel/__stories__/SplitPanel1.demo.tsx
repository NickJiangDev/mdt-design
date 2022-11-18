import * as React from 'react';
import SplitPanel from '@/components/split-panel';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const container1 = {
  position: 'relative',
  width: '100%',
  height: '150px',
  backgroundColor: 'black',
} as React.CSSProperties;

const container2 = {
  position: 'relative',
  width: '100%',
  height: '300px',
  backgroundColor: 'black',
} as React.CSSProperties;

const fillColor = {
  width: '100%',
  height: '100%',
  backgroundColor: 'gray',
} as React.CSSProperties;

const PanelDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h2>横向分割</h2>
      <div style={container2}>
        <SplitPanel
          split="horizontal"
          primary="second"
          defaultSize="50%"
          minSize={50}
          maxSize={250}
        >
          <div></div>
          <div style={fillColor}></div>
        </SplitPanel>
      </div>
      <h2>竖直方向分割</h2>
      <div style={container1}>
        <SplitPanel split="vertical" defaultSize="30%" minSize={250} maxSize={600}>
          <div style={fillColor}></div>
          <div></div>
        </SplitPanel>
      </div>

      <h2>竖直方向分割 multi</h2>
      <div style={container1}>
        <SplitPanel split="vertical" defaultSize="33%">
          <div style={fillColor}>pane 1 size: 33%</div>
          <SplitPanel split="vertical" defaultSize="50%">
            <div>pane 2 size: 50% (of remaining space)</div>
            <div style={fillColor}>pane 3</div>
          </SplitPanel>
        </SplitPanel>
      </div>
    </DocPreview>
  );
};

export default PanelDemo;
