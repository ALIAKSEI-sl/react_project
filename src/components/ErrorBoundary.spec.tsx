import mockRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

function ErrorElement() {
  throw new Error("Упс, произошла ошибка.");
  return <div />;
}

describe("ErrorBoundary", () => {
  it("should render no error elements", () => {
    mockRouter.setCurrentUrl("/?page=1&limit=10");

    render(
      <RouterContext.Provider value={mockRouter}>
        <ErrorBoundary>
          <div>No error</div>
        </ErrorBoundary>
      </RouterContext.Provider>
    );

    const element = screen.getByText("No error");
    expect(element).toBeInTheDocument();
  });

  it("should render error elements", () => {
    mockRouter.setCurrentUrl("/?page=1&limit=10");

    render(
      <RouterContext.Provider value={mockRouter}>
        <ErrorBoundary>
          <ErrorElement />
        </ErrorBoundary>
      </RouterContext.Provider>
    );

    const element = screen.getByText(
      "Произошла ошибка. Пожалуйста, обновите страницу."
    );
    expect(element).toBeInTheDocument();
  });
});
