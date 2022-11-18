import { render } from '@testing-library/react';
import Popconfirm from '../index';

describe('Popconfirm', () => {
  test('Popconfirm正确渲染', () => {
    const { container } = render(<Popconfirm message={'sss'} />);
    expect(container).toBeInTheDocument();
  });
});
