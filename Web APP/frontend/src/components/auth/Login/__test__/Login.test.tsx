import { render } from '@testing-library/react';
import Login from '../LoginScreen';

test('render Home page', () => {
  render(<Login />);

  expect(true).toBe(true);
});
