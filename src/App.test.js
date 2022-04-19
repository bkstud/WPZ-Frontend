import { render, screen } from "./utils/test";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home Screen/i);
  expect(linkElement).toBeInTheDocument();
});
