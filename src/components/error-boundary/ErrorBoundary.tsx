import * as React from 'react';

export interface ErrorBoundaryProps {
  errorNode?: React.ReactNode;
  errorClassName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  reload = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(error: Error) {
    console.log(error.name); // ChunkLoadError
    return { hasError: true, error: error };
  }

  componentDidCatch(_error: Error, errorInfo: React.ErrorInfo) {
    console.log('组件渲染失败', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { errorNode } = this.props;
      return typeof errorNode === 'function'
        ? errorNode(this.state.error)
        : errorNode || <div className={this.props.errorClassName}>{this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
