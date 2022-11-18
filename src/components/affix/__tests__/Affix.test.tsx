import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Affix from '../index';

describe('Affix', () => {
  test('Affix正确渲染', () => {
    const { container } = render(
      <Affix>
        <div>test</div>
      </Affix>,
    );
    expect(container).toBeInTheDocument();
  });
});
