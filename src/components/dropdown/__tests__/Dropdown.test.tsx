import { render } from '@testing-library/react';
import Dropdown from '../index';

describe('Dropdown', () => {
  test('Dropdown正确渲染', () => {
    const { container } = render(
      <Dropdown placement={'top'} overlay={<div>111</div>}>
        <button>top</button>
      </Dropdown>,
    );
    expect(container).toBeInTheDocument();
  });
});
