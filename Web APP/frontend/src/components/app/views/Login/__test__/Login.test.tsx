import { render } from '@testing-library/react';
import Login from '../Login';

test('render Home page', () => {
  render(<Login />);

  expect(true).toBe(true);
});
