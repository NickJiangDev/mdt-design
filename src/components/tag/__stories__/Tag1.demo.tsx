import { DocPreview, FlexHorAround } from '@/__stories-template__';
import Tag from '@/components/tag';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => (
  <DocPreview {...props}>
    <FlexHorAround>
      <div style={{ width: 100 }}>
        <h2>default</h2>
        <Tag tag={'行政边界'} />
      </div>
      <div style={{ width: 100 }}>
        <h2>disabled</h2>
        <Tag tag={'行政边界'} disabled />
      </div>
      <div style={{ width: 100 }}>
        <h2>new</h2>
        <Tag tag={'新建标签'} type={'new'} />
      </div>
      <div style={{ width: 100 }}>
        <h2>closable</h2>
        <Tag tag={'新建标签'} closable icon={'location'} />
      </div>
    </FlexHorAround>
    <br />
    <h2>彩色标签</h2>
    <FlexHorAround>
      <Tag tag={'行政边界'} color={'blue-900'} closable />
      <Tag tag={'行政边界'} color={'green-900'} closable />
      <Tag tag={'行政边界'} color={'plain-blue-900'} closable />
      <Tag tag={'行政边界'} color={'orange-900'} closable />
      <Tag tag={'行政边界'} color={'grey-blue-500'} closable />
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <Tag tag={'行政边界'} color={'blue-700'} closable />
      <Tag tag={'行政边界'} color={'green-700'} closable />
      <Tag tag={'行政边界'} color={'plain-blue-700'} closable />
      <Tag tag={'行政边界'} color={'orange-700'} closable />
      <Tag tag={'行政边界'} color={'grey-blue-400'} closable />
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <Tag tag={'行政边界'} color={'red-900'} closable />
      <Tag tag={'行政边界'} color={'yellow-900'} closable />
      <Tag tag={'行政边界'} color={'magenta-900'} closable />
      <Tag tag={'行政边界'} color={'purple-900'} closable />
    </FlexHorAround>
    <br />
    <FlexHorAround>
      <Tag tag={'行政边界'} color={'red-700'} closable />
      <Tag tag={'行政边界'} color={'yellow-700'} closable />
      <Tag tag={'行政边界'} color={'magenta-700'} closable />
      <Tag tag={'行政边界'} color={'purple-700'} closable />
    </FlexHorAround>
  </DocPreview>
);
