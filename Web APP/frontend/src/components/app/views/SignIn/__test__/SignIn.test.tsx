import { render } from '@testing-library/react';
import SignIn from '../SignIn';

test('render Home page', () => {
  render(<SignIn />);

  expect(true).toBe(true);
});
