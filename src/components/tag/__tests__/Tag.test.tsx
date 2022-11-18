import { render } from '@testing-library/react';

import Tag from '../Tag';

describe('Tag', () => {
  test('Tag正确渲染', () => {
    const { container } = render(<Tag tag={'测试'} />);
    expect(container).toBeInTheDocument();
  });
});
