import * as React from 'react';
import Button from '@/components/button';
import { dialogApi } from '@/components/dialog';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const DialogDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <Button
        onClick={() => {
          dialogApi.open(
            {
              title: '测试',
              okText: '确定',
              description: '请于23小时58分41秒后重试',
              onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
                onClose && onClose();
              },
            },
            (onClose) => {
              return <div onClick={onClose}>11111</div>;
            },
          );
        }}
      >
        函数调用Dialog
      </Button>
      <h2>Emotion Dialog</h2>
      <Button
        onClick={() => {
          dialogApi.info({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion
      </Button>
      <Button
        onClick={() => {
          dialogApi.error({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion(Error)
      </Button>
      <Button
        onClick={() => {
          dialogApi.warning({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion(Warning)
      </Button>
      <Button
        onClick={() => {
          dialogApi.normal({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion(不带icon)
      </Button>
      <Button
        onClick={() => {
          dialogApi.success({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion(Success)
      </Button>
      <Button
        onClick={() => {
          dialogApi.normal({
            emotion: 'chart',
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            onOk: (_e: React.SyntheticEvent, onClose?: () => void) => {
              onClose && onClose();
            },
          });
        }}
      >
        函数调用Emotion(自定义icon)
      </Button>
      <h2>Confirm Dialog</h2>
      <Button
        onClick={() => {
          dialogApi.confirm({
            title: '多次登录失败',
            description: '请于23小时58分41秒后重试',
            okText: '确定',
            cancelText: '取消',
            onOk: (
              _e: React.SyntheticEvent,
              onClose?: () => void,
              val?: string,
              setLoading?: (loading: boolean) => void,
            ) => {
              console.log(val, 'val');
              setLoading?.(true);
              setTimeout(() => {
                setLoading?.(false);
                onClose && onClose();
              }, 1000);
            },
          });
        }}
      >
        函数调用(confirm)
      </Button>
    </DocPreview>
  );
};

export default DialogDemo;
