import { render } from '@testing-library/react';
import Dashboard from '../Dashboard';

test('render Dashboard page', () => {
  render(<Dashboard />);

  expect(true).toBe(true);
});
