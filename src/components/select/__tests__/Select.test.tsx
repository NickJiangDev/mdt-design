import { render } from '@testing-library/react';
import Select, { OptionsType } from '../index';

const options: OptionsType = [
  { key: 'test-a', label: 'a', value: 'test-a' },
  { key: 'test-aaa', label: 'aaa', value: 'test-aaa' },
];
for (let i = 0; i < 26; i++) {
  options.push({ key: i + '', label: i + '', value: i + '' });
}

describe('Select', () => {
  test('Select', () => {
    const { container } = render(<Select placeholder="请选择" options={options} type="menu-bg" />);
    expect(container).toBeInTheDocument();
  });
});
