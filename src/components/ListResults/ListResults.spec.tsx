import mockRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { Provider } from "react-redux";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import pokemonService from "../../api/PokemonService";
import server from "../../mocks/handlers";
import { mockPokemonResponse } from "../../mocks/mockPokemon";
import { store } from "../../store/appStore";
import ListResults from "./ListResults";

describe("ListResults", () => {
  beforeAll(() => {
    jest
      .spyOn(pokemonService, "getAllPokemon")
      .mockReturnValue(Promise.resolve(mockPokemonResponse));

    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render elements", async () => {
    mockRouter.setCurrentUrl("/?page=1&limit=10");
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider store={store}>
          <ListResults data={mockPokemonResponse} />
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const buttonElements = screen.getAllByRole(
        "button"
      ) as HTMLButtonElement[];
      expect(buttonElements.length).toBe(2);

      const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
      expect(selectElement).toBeInTheDocument();

      const listItem = screen.getAllByRole("listitem");
      expect(listItem.length).toBe(1);

      const container = screen.getByTestId("results");
      fireEvent.click(container);

      expect(container).toBeInTheDocument();
    });
  });
});
