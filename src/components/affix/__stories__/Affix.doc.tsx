import React from 'react';
import { DocPreview } from '@/__stories-template__';
import Affix from '@/components/affix';
import Button from '@/components/button';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const AffixDemo = (props: PriviewProps) => {
  const [top, setTop] = React.useState(10);
  const [bottom, setBottom] = React.useState(10);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <DocPreview {...props}>
      <h2>常规</h2>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top
        </Button>
      </Affix>
      <br />
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix>
      <br />
      <h2>滚动容器</h2>
      <div style={{ height: 100, overflowY: 'scroll' }} ref={setContainer}>
        <div style={{ height: 300, paddingTop: 60, background: 'black' }}>
          <Affix target={() => container}>
            <Button type="primary">Fixed at the top of container</Button>
          </Affix>
        </div>
      </div>
    </DocPreview>
  );
};
export default AffixDemo;
