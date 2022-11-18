import Anchor, { AnchorLink } from '../index';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h3>Anchor</h3>
      <div id="step1">step1</div>
      <br />
      <div id="step2">step2</div>
      <br />
      <div id="step3">step3</div>
      <br />
      <div id="step3-1">step3-1</div>
      <br />
      <div id="step3-2">step3-2</div>
      <br />
      <Anchor>
        <AnchorLink href="#step1" title="step1 demo" />
        <AnchorLink href="#step2" title="step2 demo" />
        <AnchorLink href="#step3" title="step3 demo">
          <AnchorLink href="#step3-1" title="step3-1 demo" />
          <AnchorLink href="#step3-2" title="step3-2 demo" />
        </AnchorLink>
      </Anchor>
    </DocPreview>
  );
};
