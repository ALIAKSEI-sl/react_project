import { render, screen } from "@testing-library/react";

import Loader from "./Loader";

describe("Loader", () => {
  it(" should render elements", () => {
    render(<Loader />);

    const containerLoader = screen.getByTestId("loader");
    expect(containerLoader).toBeInTheDocument();
  });
});
