import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ObjectInterface } from '../_utils/interfaces';
import Dialog, { DialogProps } from './Dialog';
import Emotion, { EmotionProps } from './Emotion';
import Confirm, { ConfirmProps } from './Confirm';

type OmitOkType<T> = Pick<T, keyof Omit<T, 'onOk'>> & {
  onOk?: (
    e: React.SyntheticEvent,
    onClose: () => void,
    val: string,
    setLoading: (loading: boolean) => void,
  ) => void;
};

export type ViewProps =
  | OmitOkType<DialogProps>
  | OmitOkType<EmotionProps>
  | OmitOkType<ConfirmProps>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createFunc = (View: React.FC<any>, icon?: string) => (
  config: ViewProps,
  context?: (onClose: () => void) => React.ReactNode,
) => {
  const Dg = (props: ObjectInterface) => {
    const [visible, setVisible] = React.useState(true);
    const onClose = () => {
      setVisible(false);
    };
    const onOk = (
      e: React.SyntheticEvent,
      value: string,
      setLoading: (loading: boolean) => void,
    ) => {
      props.onOk && props.onOk(e, onClose, value, setLoading);
    };
    const onCancel = (e: React.SyntheticEvent) => {
      onClose();
      props.onCancel && props.onCancel(e);
    };
    return (
      <View {...props} visible={visible} onOk={onOk} onCancel={onCancel}>
        {props.children && props.children(onClose)}
      </View>
    );
  };

  let dom = document.createElement('div');
  document.body.append(dom);
  const afterClose = () => {
    ReactDOM.unmountComponentAtNode(dom);
    dom.remove();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dom = undefined;
  };

  if (View.displayName === 'Emotion') {
    const ct = config as EmotionProps;
    ct.emotion = icon ? icon : ct.emotion;
  }

  ReactDOM.render(<Dg {...config} children={context} afterClose={afterClose} />, dom);
};

const dialogApi = {
  open: createFunc(Dialog),
  info: createFunc(Emotion, 'info'),
  error: createFunc(Emotion, 'alert'),
  warning: createFunc(Emotion, 'help-2'),
  success: createFunc(Emotion, 'success'),
  normal: createFunc(Emotion),
  confirm: createFunc(Confirm),
};

export default dialogApi;
