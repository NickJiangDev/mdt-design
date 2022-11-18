import * as React from 'react';
import { toastOnTarget, ToastOnTargetInterface, ToastOnTargetOpts } from '@/components/toast';

export interface ErrorBoundaryNotifyProps {
  args: ((errorMsg: string) => ToastOnTargetOpts) | ToastOnTargetOpts;
}

interface ErrorBoundaryNotifyPropsState {
  hasError: boolean;
  errorMsg: string;
}

let globelToast: ToastOnTargetInterface;

class ErrorBoundaryNotify extends React.Component<
  ErrorBoundaryNotifyProps,
  ErrorBoundaryNotifyPropsState
> {
  static configToast(getContainer?: () => HTMLElement, prefix = 'boundary') {
    if (!globelToast) {
      requestAnimationFrame(() => {
        globelToast = toastOnTarget(getContainer, prefix);
      });
    }
  }

  constructor(props: ErrorBoundaryNotifyProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: '',
    };
  }

  reload = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(_error: Error, errorInfo: React.ErrorInfo) {
    console.log('组件渲染失败Notify', errorInfo);
    const argProps = this.props.args;
    const errorMsg = this.state.errorMsg;
    const args = typeof argProps === 'function' ? argProps(errorMsg) : argProps;
    globelToast.error(args);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default ErrorBoundaryNotify;
