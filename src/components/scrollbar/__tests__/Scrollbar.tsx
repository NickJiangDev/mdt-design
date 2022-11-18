import { render } from '@testing-library/react';
import Scrollbar from '../Scrollbar';

describe('Scrollbar', () => {
  test('Scrollbar渲染', () => {
    const dom = 'Test Message';
    const { queryByText } = render(<Scrollbar>{dom}</Scrollbar>);
    expect(queryByText(dom)).toBeInTheDocument();
  });
});
