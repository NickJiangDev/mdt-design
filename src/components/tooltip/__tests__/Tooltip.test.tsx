import { render } from '@testing-library/react';
import Tooltip, { TooltipText } from '../index';

describe('Tooltip', () => {
  test('Tooltip正确渲染', () => {
    const { container } = render(
      <Tooltip placement={'top'} overlay={'Lorem ipsum'}>
        <button>top</button>
      </Tooltip>,
    );
    expect(container).toBeInTheDocument();
  });

  test('TooltipText正确渲染', () => {
    const { container } = render(<TooltipText text="1" />);
    expect(container).toBeInTheDocument();
  });
});
