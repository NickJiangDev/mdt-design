import { Button } from '../Button';
import {
  FlexHorAround,
  FlexColumnVerCenter,
  LabelButton,
  DocPreview,
} from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const btnArray1 = [
  <>
    <Button type="primary">按钮</Button>
    <Button type="primary" withoutBorder>
      按钮
    </Button>
    <Button type="primary" actived>
      按钮
    </Button>
    <Button type="primary" disabled>
      按钮
    </Button>
    <Button type="primary" loading onlyLoading>
      按钮
    </Button>
    <Button type="primary" loading>
      按钮
    </Button>
    <Button type="primary" leftIcon="save">
      按钮
    </Button>
    <Button type="primary" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="primary" onlyIcon="code" />
    <Button type="primary" size="compact">
      按钮
    </Button>
    <Button type="primary" size="compact" leftIcon="save">
      按钮
    </Button>
    <Button type="primary" size="compact" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="primary" size="compact" ghost onlyIcon="done-check" />
    <Button type="primary" size="compact" ghost actived onlyIcon="done-check" />
  </>,

  <>
    <Button>按钮</Button>
    <Button withoutBorder>按钮</Button>
    <Button actived>按钮</Button>
    <Button disabled>按钮</Button>
    <Button loading onlyLoading>
      按钮
    </Button>
    <Button loading>按钮</Button>
    <Button leftIcon="save">按钮</Button>
    <Button rightIcon="right-forward">按钮</Button>
    <Button onlyIcon="code" />
    <Button onlyIcon="text-2" size="compact" />
    <Button size="compact" leftIcon="save">
      按钮
    </Button>
    <Button size="compact" rightIcon="right-forward">
      按钮
    </Button>
    <Button onlyIcon="done-check" size="compact" ghost />
    <Button onlyIcon="done-check" size="compact" ghost actived />
  </>,
  <>
    <Button type="assist">按钮</Button>
    <Button type="assist" withoutBorder>
      按钮
    </Button>
    <Button type="assist" actived>
      按钮
    </Button>
    <Button type="assist" disabled>
      按钮
    </Button>
    <Button type="assist" loading onlyLoading>
      按钮
    </Button>
    <Button type="assist" loading>
      按钮
    </Button>
    <Button type="assist" leftIcon="save">
      按钮
    </Button>
    <Button type="assist" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="assist" onlyIcon="code" />
    <Button type="assist" size="compact">
      按钮
    </Button>
    <Button type="assist" size="compact" leftIcon="save">
      按钮
    </Button>
    <Button type="assist" size="compact" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="assist" size="compact" ghost onlyIcon="done-check" />
    <Button type="assist" size="compact" ghost actived onlyIcon="done-check" />
  </>,
  <>
    <Button type="assist-bg">按钮</Button>
    <Button type="assist-bg" withoutBorder>
      按钮
    </Button>
    <Button type="assist-bg" actived>
      按钮
    </Button>
    <Button type="assist-bg" disabled>
      按钮
    </Button>
    <Button type="assist-bg" loading onlyLoading>
      按钮
    </Button>
    <Button type="assist-bg" loading>
      按钮
    </Button>
    <Button type="assist-bg" leftIcon="save">
      按钮
    </Button>
    <Button type="assist-bg" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="assist-bg" onlyIcon="code" />
    <Button type="assist-bg" size="compact">
      按钮
    </Button>
    <Button type="assist-bg" size="compact" leftIcon="save">
      按钮
    </Button>
    <Button type="assist-bg" size="compact" rightIcon="right-forward">
      按钮
    </Button>
    <Button type="assist-bg" size="compact" ghost onlyIcon="done-check" />
    <Button type="assist-bg" size="compact" ghost actived onlyIcon="done-check" />
  </>,
];

const btnArray2 = [
  <>
    <Button type="primary" status="danger">
      按钮
    </Button>
    <Button type="primary" status="danger" withoutBorder>
      按钮
    </Button>
    <Button type="primary" actived status="danger">
      按钮
    </Button>
    <Button type="primary" disabled status="danger">
      按钮
    </Button>
    <Button type="primary" loading onlyLoading status="danger">
      按钮
    </Button>
    <Button type="primary" loading status="danger">
      按钮
    </Button>
    <Button type="primary" leftIcon="save" status="danger">
      按钮
    </Button>
    <Button type="primary" rightIcon="right-forward" status="danger">
      按钮
    </Button>
    <Button type="primary" onlyIcon="code" status="danger" />
    <Button type="primary" size="compact" status="danger">
      按钮
    </Button>
    <Button type="primary" size="compact" leftIcon="save" status="danger">
      按钮
    </Button>
    <Button type="primary" size="compact" rightIcon="right-forward" status="danger">
      按钮
    </Button>
    <Button type="primary" size="compact" ghost onlyIcon="done-check" status="danger" />
    <Button type="primary" size="compact" ghost actived onlyIcon="done-check" status="danger" />
  </>,
  <>
    <Button type="primary" status="success">
      按钮
    </Button>
    <Button type="primary" status="success" withoutBorder>
      按钮
    </Button>
    <Button type="primary" actived status="success">
      按钮
    </Button>
    <Button type="primary" disabled status="success">
      按钮
    </Button>
    <Button type="primary" loading onlyLoading status="success">
      按钮
    </Button>
    <Button type="primary" loading status="success">
      按钮
    </Button>
    <Button type="primary" leftIcon="save" status="success">
      按钮
    </Button>
    <Button type="primary" rightIcon="right-forward" status="success">
      按钮
    </Button>
    <Button type="primary" onlyIcon="code" status="success" />
    <Button type="primary" size="compact" status="success">
      按钮
    </Button>
    <Button type="primary" size="compact" leftIcon="save" status="success">
      按钮
    </Button>
    <Button type="primary" size="compact" rightIcon="right-forward" status="success">
      按钮
    </Button>
    <Button type="primary" size="compact" ghost onlyIcon="done-check" status="success" />
    <Button type="primary" size="compact" ghost actived onlyIcon="done-check" status="success" />
  </>,
  <>
    <Button type="assist" status="danger">
      按钮
    </Button>
    <Button type="assist" status="danger" withoutBorder>
      按钮
    </Button>
    <Button type="assist" actived status="danger">
      按钮
    </Button>
    <Button type="assist" disabled status="danger">
      按钮
    </Button>
    <Button type="assist" loading onlyLoading status="danger">
      按钮
    </Button>
    <Button type="assist" loading status="danger">
      按钮
    </Button>
    <Button type="assist" leftIcon="save" status="danger">
      按钮
    </Button>
    <Button type="assist" rightIcon="right-forward" status="danger">
      按钮
    </Button>
    <Button type="assist" onlyIcon="code" status="danger" />
    <Button type="assist" size="compact" status="danger">
      按钮
    </Button>
    <Button type="assist" size="compact" leftIcon="save" status="danger">
      按钮
    </Button>
    <Button type="assist" size="compact" rightIcon="right-forward" status="danger">
      按钮
    </Button>
    <Button type="assist" size="compact" ghost onlyIcon="done-check" status="danger" />
    <Button type="assist" size="compact" ghost actived onlyIcon="done-check" status="danger" />
  </>,
  <>
    <Button type="assist" status="success">
      按钮
    </Button>
    <Button type="assist" status="success" withoutBorder>
      按钮
    </Button>
    <Button type="assist" actived status="success">
      按钮
    </Button>
    <Button type="assist" disabled status="success">
      按钮
    </Button>
    <Button type="assist" loading onlyLoading status="success">
      按钮
    </Button>
    <Button type="assist" loading status="success">
      按钮
    </Button>
    <Button type="assist" leftIcon="save" status="success">
      按钮
    </Button>
    <Button type="assist" rightIcon="right-forward" status="success">
      按钮
    </Button>
    <Button type="assist" onlyIcon="code" status="success" />
    <Button type="assist" size="compact" status="success">
      按钮
    </Button>
    <Button type="assist" size="compact" leftIcon="save" status="success">
      按钮
    </Button>
    <Button type="assist" size="compact" rightIcon="right-forward" status="success">
      按钮
    </Button>
    <Button type="assist" size="compact" ghost onlyIcon="done-check" status="success" />
    <Button type="assist" size="compact" ghost actived onlyIcon="done-check" status="success" />
  </>,
];

const col = [
  'Default',
  'WithoutBorder',
  'Actived',
  'Disable',
  'Only Loading',
  'Loading',
  'With Left Icon',
  'With right Icon',
  'Only Icon',
  'Compact',
  'Compact With Left Icon',
  'Compact With right Icon',
  'Ghost',
  'Ghost Actived',
];

const raw1 = ['Primary', 'Default', 'Assist', 'Assist-bg'];
const raw2 = ['Danger-Primary', 'Success-Primary', 'Danger-assist', 'Success-assist'];

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h3>Button - type</h3>
      <ButtonTable btnArray={btnArray1} col={col} raw={raw1} />
      <h3>Button - status跟type结合</h3>
      <ButtonTable btnArray={btnArray2} col={col} raw={raw2} />
    </DocPreview>
  );
};

const ButtonTable = (props: { btnArray: React.ReactNode[]; col: string[]; raw: string[] }) => {
  const { btnArray, col, raw } = props;
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
          {btnArray[i]}
        </FlexColumnVerCenter>
      ))}
    </FlexHorAround>
  );
};
