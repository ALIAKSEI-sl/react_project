import mockRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

import { fireEvent, render, screen } from "@testing-library/react";

import { mockPokemon } from "../../mocks/mockPokemon";
import ItemResults from "./ItemResults";

describe("ItemResults", () => {
  it("should render elements", () => {
    mockRouter.setCurrentUrl("/?page=1&limit=10");
    render(
      <RouterContext.Provider value={mockRouter}>
        <ItemResults item={mockPokemon} />{" "}
      </RouterContext.Provider>
    );

    const linkElement = screen.getByRole("link") as HTMLAnchorElement;
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);

    const imgElement = screen.getByRole("img") as HTMLImageElement;
    expect(imgElement.src).toBe(
      mockPokemon.sprites.other.dream_world.front_default
    );

    const headerElement = screen.getByRole("heading", { level: 2 });
    expect(headerElement.textContent).toBe(mockPokemon.name);

    const types = mockPokemon.types.map((t) => t.type.name).join(", ");
    const typesElement = screen.getByText(types);
    expect(typesElement).toBeInTheDocument();
  });
});
