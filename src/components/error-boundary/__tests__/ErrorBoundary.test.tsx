import { render } from '@testing-library/react';
import ErrorBoundary from '../index';

describe('ErrorBoundary', () => {
  test('ErrorBoundary渲染成功', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>111</div>
      </ErrorBoundary>,
    );
    expect(container).toBeInTheDocument();
  });
});
