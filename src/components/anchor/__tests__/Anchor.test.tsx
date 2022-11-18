import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Anchor from '../index';

describe('Anchor', () => {
  test('Anchor正确渲染', () => {
    const { container } = render(<Anchor />);
    expect(container).toBeInTheDocument();
  });
});
