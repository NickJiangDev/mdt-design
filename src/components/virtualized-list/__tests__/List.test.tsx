import * as React from 'react';
import { render, screen } from '@testing-library/react';
import VirtualizedList, { ItemViewProps } from '../VirtualizedList';

const options = Array.from({ length: 1000 }).map((_v, i) => ({
  value: 'value' + i,
  label: 'label' + i,
}));

const ItemView: React.FC<ItemViewProps> = ({ item, style }) => {
  return (
    <div aria-label={item.label} style={style}>
      {item.label}
    </div>
  );
};

describe('VirtualizedList', () => {
  test('VirtualizedList', () => {
    render(<VirtualizedList ItemView={ItemView} data={options} />);
    expect(screen.queryAllByLabelText('label1000')).toHaveLength(0);
  });
});
