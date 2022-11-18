import { render } from '@testing-library/react';
import Breadcrumb, { BreadcrumbItem } from '../index';

describe('Breadcrumb', () => {
  test('Breadcrumb调用成功', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Application Center</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/">Application List</a>
        </BreadcrumbItem>
        <BreadcrumbItem>An Application</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(container).toBeInTheDocument();
  });
});
