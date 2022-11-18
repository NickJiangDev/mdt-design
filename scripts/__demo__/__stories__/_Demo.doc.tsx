import {{Demo}} from '../index';
import {
  FlexHorAround,
  FlexColumnVerCenter,
  LabelButton,
  DocPreview,
} from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const {{demo}}Array1 = [
  <>
    <{{Demo}}>组件</{{Demo}}>
  </>,
];

const col = ['Default'];

const raw1 = ['Primary'];

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h3>{{Demo}}</h3>
      <{{Demo}}Table {{demo}}Array={{{demo}}Array1} col={col} raw={raw1}></{{Demo}}Table>
    </DocPreview>
  );
};

const {{Demo}}Table = (props: { {{demo}}Array: React.ReactNode[]; col: string[]; raw: string[] }) => {
  const { {{demo}}Array, col, raw } = props;
  return (
    <FlexHorAround>
      <FlexColumnVerCenter>
        <h4>&ensp;</h4>
        {col.map((v) => (
          <LabelButton>{v}</LabelButton>
        ))}
      </FlexColumnVerCenter>
      {raw.map((v, i) => (
        <FlexColumnVerCenter>
          <h4>{v}</h4>
          {{{demo}}Array[i]}
        </FlexColumnVerCenter>
      ))}
    </FlexHorAround>
  );
};
