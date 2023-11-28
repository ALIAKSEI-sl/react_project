import mockRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { Provider } from "react-redux";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import pokemonService from "../../api/PokemonService";
import server from "../../mocks/handlers";
import { mockPokemon } from "../../mocks/mockPokemon";
import { store } from "../../store/appStore";
import Details from "./Details";

describe("Details", () => {
  beforeAll(() => {
    jest
      .spyOn(pokemonService, "getPokemonByQuery")
      .mockReturnValue(Promise.resolve(mockPokemon));

    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it(" should render details", async () => {
    mockRouter.setCurrentUrl("/?page=1&limit=10");
    render(
      <RouterContext.Provider value={mockRouter}>
        <Provider store={store}>
          <Details data={mockPokemon} />
        </Provider>
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const buttonElement = screen.getByRole("button") as HTMLButtonElement;
      expect(buttonElement).toBeInTheDocument();

      const imgElement = screen.getByRole("img") as HTMLImageElement;
      expect(imgElement).toBeInTheDocument();

      const headerElement = screen.getByRole("heading", { level: 2 });
      expect(headerElement).toBeInTheDocument();

      fireEvent.click(buttonElement);
    });
  });
});
