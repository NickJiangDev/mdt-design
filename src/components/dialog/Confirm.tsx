import * as React from 'react';
import Input from '../input';
import FormItem from '../form-item';
import { ObjectInterface } from '../_utils/interfaces';
import Emotion, { EmotionProps } from './Emotion';

export interface ConfirmProps extends Omit<EmotionProps, 'extra' | 'emotion' | 'onOk'> {
  /** 当前值 */
  value?: string;
  /** 校验规则 */
  valueValidator?: (value: string) => string;
  /** 错误信息 */
  errorMessage?: string;
  /** ok 按钮 加载样式 */
  okLoading?: boolean;
  /** 内容样式 */
  contentStyle?: ObjectInterface;
  /** 确认按钮回调 */
  onOk?: (e: React.SyntheticEvent, val?: string, setLoading?: (loading: boolean) => void) => void;
}

const Confirm: React.FC<ConfirmProps> = (props) => {
  const {
    value,
    valueValidator,
    description,
    errorMessage,
    okLoading,
    contentStyle,
    ...restProps
  } = props;
  const [enableValidator, setEnableValidator] = React.useState(!!value);
  const [val, setVal] = React.useState(value ?? '');
  const [loading, setLoading] = React.useState(false);

  const onChange = React.useCallback((e) => {
    setEnableValidator(true);
    setVal(e.target.value);
  }, []);

  const onOk = (e: React.SyntheticEvent) => {
    props.onOk && props.onOk(e, val, setLoading);
  };

  React.useEffect(() => {
    setLoading(okLoading || false);
  }, [okLoading]);

  const onBlur = React.useCallback(() => {
    setEnableValidator(true);
  }, []);
  const onPressEnter = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOk((e as unknown) as React.SyntheticEvent);
  };
  let message = val ? '' : errorMessage ?? ' ';
  let status = enableValidator && !val ? 'error' : undefined;
  if (enableValidator && valueValidator) {
    message = valueValidator(val);
    status = message ? 'error' : '';
  }

  const extra = (
    <div style={{ marginBottom: '20px', ...contentStyle }}>
      <FormItem
        direction={'column'}
        label={description}
        messageIcon="alert"
        message={enableValidator ? message : ''}
        status={status as 'error'}
        block
      >
        <Input
          block
          value={val}
          onBlur={onBlur}
          onChange={onChange}
          status={status as 'error'}
          onPressEnter={onPressEnter}
        />
      </FormItem>
    </div>
  );
  const okButtonProps = React.useMemo(() => {
    return loading
      ? { loading: true, onlyLoading: true }
      : message
      ? { disabled: true }
      : undefined;
  }, [loading, message]);

  return (
    <Emotion
      emotion={'info'}
      {...restProps}
      extra={extra}
      okButtonProps={okButtonProps}
      onOk={onOk}
    />
  );
};

Confirm.displayName = 'Confirm';
export default Confirm;

const ConfirmMemo = React.memo(Confirm);
ConfirmMemo.displayName = 'ConfirmMemo';
export { ConfirmMemo };
