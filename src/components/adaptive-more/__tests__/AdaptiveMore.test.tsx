import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdaptiveMore from '../index';

describe('AdaptiveMore', () => {
  test('AdaptiveMore正确渲染', () => {
    const { container } = render(
      <AdaptiveMore
        renderMore={(hiddenList) => {
          return <div>{hiddenList}</div>;
        }}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
