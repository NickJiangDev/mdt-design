import { render } from '@testing-library/react';
import MapBaseChange from '../index';

describe('MapBaseChange', () => {
  test('MapBaseChanges正确渲染', () => {
    const { container } = render(<MapBaseChange />);
    expect(container).toBeInTheDocument();
  });
});
