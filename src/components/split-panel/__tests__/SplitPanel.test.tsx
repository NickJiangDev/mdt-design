import { render, screen } from '@testing-library/react';
import SplitPanel from '../SplitPanel';

describe('SplitPanel', () => {
  test('SplitPanel正确渲染', () => {
    render(
      <SplitPanel>
        <div aria-label={'left'}></div>
        <div aria-label={'right'}></div>
      </SplitPanel>,
    );
    expect(screen.queryAllByLabelText('right')).toHaveLength(1);
  });
});
