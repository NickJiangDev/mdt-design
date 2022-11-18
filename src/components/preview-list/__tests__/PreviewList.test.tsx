import { render } from '@testing-library/react';
import PreviewList from '../index';

const RenderCell = () => {
  return <div />;
};

const RenderPreview = () => {
  return <div />;
};

describe('PreviewList', () => {
  test('PreviewList正确渲染', () => {
    const { container } = render(
      <PreviewList list={[]} RenderCell={RenderCell} RenderPreview={RenderPreview} />,
    );
    expect(container).toBeInTheDocument();
  });
});
