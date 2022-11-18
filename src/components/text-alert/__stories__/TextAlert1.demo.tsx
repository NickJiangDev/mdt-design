import { DocPreview, FlexHorAround } from '@/__stories-template__';
import TextAlert from '@/components/text-alert';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default</h2>
        <TextAlert message={'Info text'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>success</h2>
        <TextAlert message={'Success text'} status={'success'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning</h2>
        <TextAlert message={'Warning text'} status={'warning'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>error</h2>
        <TextAlert message={'Error text'} status={'error'} />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default column</h2>
        <TextAlert message={'Info text'} type={'column'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>success column</h2>
        <TextAlert message={'Success text'} status={'success'} type={'column'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning column</h2>
        <TextAlert message={'Warning text'} status={'warning'} type={'column'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>error column</h2>
        <TextAlert message={'Error text'} status={'error'} type={'column'} />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default solid</h2>
        <TextAlert message={'Info text'} type={'solid'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>success solid</h2>
        <TextAlert message={'Success text'} status={'success'} type={'solid'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning solid</h2>
        <TextAlert message={'Warning text'} status={'warning'} type={'solid'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>error solid</h2>
        <TextAlert message={'Error text'} status={'error'} type={'solid'} />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default no-icon</h2>
        <TextAlert message={'Info text'} type={'solid'} noIcon />
      </div>
      <div style={{ width: 200 }}>
        <h2>success no-icon</h2>
        <TextAlert message={'Success text'} status={'success'} noIcon />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning no-icon</h2>
        <TextAlert message={'Warning text'} status={'warning'} noIcon />
      </div>
      <div style={{ width: 200 }}>
        <h2>error no-icon</h2>
        <TextAlert message={'Error text'} status={'error'} noIcon />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default desc</h2>
        <TextAlert
          message={'Info text'}
          type={'solid'}
          description={'info info info info info info info info info info info info'}
        />
      </div>
      <div style={{ width: 200 }}>
        <h2>success desc</h2>
        <TextAlert
          message={'Success text'}
          status={'success'}
          description={'success info info info info info info info info info info info'}
        />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning desc</h2>
        <TextAlert
          message={'Warning text'}
          status={'warning'}
          noIcon
          description={'warning info info info info info info info info info info info'}
        />
      </div>
      <div style={{ width: 200 }}>
        <h2>error desc</h2>
        <TextAlert
          message={'Error text'}
          status={'error'}
          description={'Error info info info info info info info info info info info'}
        />
      </div>
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <div style={{ width: 200 }}>
        <h2>default desc</h2>
        <TextAlert message={'Info text'} type={'solid'} size={'compact'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>success desc</h2>
        <TextAlert message={'Success text'} status={'success'} size={'compact'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>warning desc</h2>
        <TextAlert message={'Warning text'} status={'warning'} noIcon size={'compact'} />
      </div>
      <div style={{ width: 200 }}>
        <h2>error desc</h2>
        <TextAlert message={'Error text'} status={'error'} size={'compact'} />
      </div>
    </FlexHorAround>
  </DocPreview>
);
