import { render } from '@testing-library/react';
import { NotificationContainer } from '../index';

describe('Notification', () => {
  test('NotificationContainer正确渲染', () => {
    const { container } = render(
      <NotificationContainer emotion="info" description={'dd'} message="测试" />,
    );
    expect(container).toBeInTheDocument();
  });
});
