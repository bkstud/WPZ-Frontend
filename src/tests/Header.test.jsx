import { render, screen } from "../utils/test";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

test("renders nav bar", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );
  const linkElement = screen.getByAltText(/logo/i);
  expect(linkElement).toBeInTheDocument();
});
