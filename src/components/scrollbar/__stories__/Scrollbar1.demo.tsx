import * as React from 'react';
import { DocPreview, DraggableContainer, ScrollWrapper } from '@/__stories-template__';
import Scrollbar from '../Scrollbar';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const allOptios = { suppressScrollX: false, suppressScrollY: false };
const xOptios = { suppressScrollY: true };

const ScrollbarDemo = (props: PriviewProps) => {
  const [val, setVal] = React.useState(0);
  const onClick = React.useCallback(() => {
    setVal(Math.random());
  }, []);

  return (
    <DocPreview {...props}>
      <h4>基本使用</h4>
      <ScrollWrapper>
        <Scrollbar>
          <DraggableContainer />
        </Scrollbar>
      </ScrollWrapper>
      <button onClick={onClick}>{val}</button>
      <h4>横轴</h4>
      <ScrollWrapper>
        <Scrollbar options={xOptios}>
          <DraggableContainer />
        </Scrollbar>
      </ScrollWrapper>

      <h4>全部</h4>
      <ScrollWrapper>
        <Scrollbar options={allOptios}>
          <DraggableContainer />
        </Scrollbar>
      </ScrollWrapper>
      <h4>menu-bg</h4>
      <ScrollWrapper>
        <Scrollbar type="menu-bg">
          <DraggableContainer style={{ background: '#343C54' }} />
        </Scrollbar>
      </ScrollWrapper>

      <h4>assist-bg</h4>
      <ScrollWrapper>
        <Scrollbar type="assist-bg">
          <DraggableContainer style={{ background: '#343B4D' }} />
        </Scrollbar>
      </ScrollWrapper>

      <h4>page-bg</h4>
      <ScrollWrapper>
        <Scrollbar type="page-bg">
          <DraggableContainer style={{ background: '#1E2130' }} />
        </Scrollbar>
      </ScrollWrapper>
    </DocPreview>
  );
};
export default ScrollbarDemo;
