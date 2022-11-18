import * as React from 'react';
import Button from '@/components/button';
import { Emotion } from '@/components/dialog';
import { DocPreview, FlexColumnVerCenter } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const initialData = {
  open1: false,
  open2: false,
  open3: false,
  open4: false,
  open5: false,
  open6: false,
};

const DialogDemo = (props: PriviewProps) => {
  const [openObj, dispatch] = React.useReducer(
    (state: typeof initialData, action: { key: string; value: boolean }) => {
      return { ...state, [action.key]: action.value };
    },
    initialData,
  );

  return (
    <DocPreview {...props}>
      <FlexColumnVerCenter>
        {[
          '组件调用Emotion',
          '组件调用Emotion(Error)',
          '组件调用Emotion(Warnning)',
          '组件调用Emotion(不带Icon)',
          '组件调用Emotion(Success)',
          '组件调用Emotion(自定义icon)',
        ].map((v, i) => (
          <Button
            onClick={() => {
              dispatch({ key: `open${i + 1}`, value: true });
            }}
          >
            {v}
          </Button>
        ))}
      </FlexColumnVerCenter>

      <Emotion
        emotion="info"
        visible={openObj.open1}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open1', value: false });
        }}
      />
      <Emotion
        emotion="alert"
        visible={openObj.open2}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open2', value: false });
        }}
      />
      <Emotion
        emotion="help-2"
        visible={openObj.open3}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open3', value: false });
        }}
      />
      <Emotion
        visible={openObj.open4}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open4', value: false });
        }}
      />
      <Emotion
        emotion="success"
        visible={openObj.open5}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open5', value: false });
        }}
      />
      <Emotion
        emotion="chart"
        visible={openObj.open6}
        title={'多次登录失败'}
        description={'请于23小时58分41秒后重试'}
        okText={'确定'}
        onOk={() => {
          dispatch({ key: 'open6', value: false });
        }}
      />
    </DocPreview>
  );
};

export default DialogDemo;
