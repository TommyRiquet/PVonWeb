import { render } from "@testing-library/react";
import Error from "../Error";

test('render Error page', () => {
  render(<Error />);

  expect(true).toBe(true);
});
