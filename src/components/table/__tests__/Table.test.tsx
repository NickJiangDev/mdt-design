import { render } from '@testing-library/react';
import Table from '../index';
import { ObjectInterface } from '@/components/_utils/interfaces';

const columns = [
  { title: 'A', dataIndex: 'a', width: 100 },
  { title: 'B', dataIndex: 'b', width: 100 },
  { title: 'C', dataIndex: 'c', width: 100 },
];

const data: ObjectInterface[] = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    key: i,
    a: `a${i}`,
    b: `b${i}`,
    c: `c${i}`,
  });
}

describe('Table', () => {
  test('Table正确渲染', () => {
    const { container } = render(<Table data={data} columns={columns} />);
    expect(container).toBeInTheDocument();
  });
});
