import { render, screen } from "../utils/test";
import Footer from "../components/Footer";
import { BrowserRouter } from "react-router-dom";

test("renders logo", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );
  const linkElement = screen.getByAltText(/logo/i);
  expect(linkElement).toBeInTheDocument();
});
