import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { fireEvent, render, screen } from "@testing-library/react";

import { searchActions } from "../../store/search.slice";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const mockStore = configureMockStore();
  const initialState = {
    search: {
      page: 2,
      limit: 20,
      searchTerm: "butterfree",
    },
  };

  it("should render elements", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Pagination count={20} />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("button") as HTMLButtonElement[];
    expect(buttonElements.length).toBe(2);

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
  });

  it("should navigation to the next page", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Pagination count={50} />
      </Provider>
    );

    const buttonElement = screen.getByTestId("next") as HTMLButtonElement;
    fireEvent.click(buttonElement);

    const expectedAction = searchActions.setParams({
      page: 3,
    });

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should navigation to the previous page", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Pagination count={30} />
      </Provider>
    );

    const buttonPrevious = screen.getByTestId("previous") as HTMLButtonElement;
    fireEvent.click(buttonPrevious);

    const expectedAction = searchActions.setParams({
      page: 1,
    });

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should not navigation to the new page", () => {
    const store = mockStore({
      search: {
        page: 1,
        limit: 20,
        searchTerm: "butterfree",
      },
    });

    render(
      <Provider store={store}>
        <Pagination count={0} />
      </Provider>
    );

    const buttonNext = screen.getByTestId("next") as HTMLButtonElement;
    fireEvent.click(buttonNext);

    const buttonPrevious = screen.getByTestId("previous") as HTMLButtonElement;
    fireEvent.click(buttonPrevious);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it("should change limit", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Pagination count={50} />
      </Provider>
    );

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: "10" } });

    const expectedAction = searchActions.setParams({
      limit: 10,
      page: 1,
    });

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
