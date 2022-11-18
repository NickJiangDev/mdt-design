import { render } from '@testing-library/react';
import Transfer from '../index';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'sss', key: '0-0-1-0' }],
      },
    ],
  },
];

describe('Transfer', () => {
  test('Transfer', () => {
    const { container } = render(<Transfer options={treeData} />);
    expect(container).toBeInTheDocument();
  });
});
