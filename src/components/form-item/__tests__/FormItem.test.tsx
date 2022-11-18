import { render } from '@testing-library/react';
import FormItem from '../FormItem';

describe('FormItem', () => {
  test('FormItem正确渲染', () => {
    const { container } = render(
      <FormItem label="名称">
        <div>11111</div>
      </FormItem>,
    );
    expect(container).toBeInTheDocument();
  });
});
