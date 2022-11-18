import * as React from 'react';
import ErrorBoundary, { ErrorBoundaryNotify } from '@/components/error-boundary';
import Button from '@/components/button';

const ErrorWrapper = () => {
  const [error, setError] = React.useState(false);
  const click = React.useCallback(() => {
    setError(true);
  }, []);

  if (error) {
    throw new Error('点击报错');
  }

  return <Button onClick={click}>点击报错</Button>;
};

const ErrorBoundaryDemo = () => {
  React.useMemo(() => {
    ErrorBoundaryNotify.configToast(function () {
      return document.querySelector('#root') as HTMLElement;
    });
  }, []);
  return (
    <div>
      <ErrorBoundary>没有错误</ErrorBoundary>
      <h2>已组件形式显示react渲染错误</h2>
      <ErrorBoundary>
        <ErrorWrapper />
      </ErrorBoundary>
      <h2>已toast形式显示react渲染错误</h2>
      <ErrorBoundaryNotify args={(errorMsg) => ({ message: errorMsg })}>
        <ErrorWrapper />
      </ErrorBoundaryNotify>
    </div>
  );
};
export default ErrorBoundaryDemo;
