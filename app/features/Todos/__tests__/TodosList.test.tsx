import { mockedTodosData, mockedUpdatedTodoData } from "@/__mocks__/mockedData";
import { DEFAULT_PAGE_SIZE } from "@/app/shared/constants";
import { TToDo } from "@/app/shared/types";
import { renderWithProviders } from "@/utils/testUtils/test-utils";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { TodosList, todosListTestIds } from "../TodosList";

// Create entity adapter to set up proper initial state
const todosAdapter = createEntityAdapter<TToDo>();

// Create initial state with mocked todos data
const initialTodosState = {
  todos: todosAdapter.setAll(
    todosAdapter.getInitialState({
      offset: 0,
      totalElements: mockedTodosData.total,
      isReachEndOfList: false,
    }),
    mockedTodosData.todos,
  ),
};

const preloadedState = {
  todos: initialTodosState,
};

const mockedGetTodosQuery = jest.fn();
const mockedUpdateTodoStatusMutation = jest.fn();

jest.mock("@/app/store/api/todos/todos", () => ({
  useLazyGetTodosQuery: () => [
    mockedGetTodosQuery,
    {
      data: mockedTodosData,
      isLoading: false,
      isSuccess: true,
      isError: false,
    },
  ],
  useUpdateTodoStatusMutation: () => [
    mockedUpdateTodoStatusMutation,
    {
      data: mockedUpdatedTodoData,
      isLoading: false,
      isSuccess: true,
      isError: false,
    },
  ],
  todosEndpoints: {
    getTodos: {
      matchFulfilled: jest.fn(),
      matchPending: jest.fn(),
      matchRejected: jest.fn(),
    },
    updateTodoStatus: {
      matchFulfilled: jest.fn(),
      matchPending: jest.fn(),
      matchRejected: jest.fn(),
    },
  },
}));

describe("TodoList component", () => {
  test("renders correctly", async () => {
    const { getByTestId } = renderWithProviders(<TodosList />, {
      preloadedState,
    });
    await waitFor(() => {
      expect(getByTestId(todosListTestIds.flatList.testID)).toBeTruthy();
    });
  });

  test("updates todo status on checkbox press", async () => {
    const { getByTestId } = renderWithProviders(<TodosList />, {
      preloadedState,
    });
    const updatingCheckBoxItem = getByTestId(
      `${todosListTestIds.listItem.testID}-${mockedUpdatedTodoData.id}`,
    );
    const changedTodo = mockedTodosData.todos.find(
      (todo) => todo.id === mockedUpdatedTodoData.id,
    );
    //simulate checkbox press
    fireEvent.press(updatingCheckBoxItem);
    //checking if the updateTodoStatus mutation was called with correct parameters
    await waitFor(() => {
      expect(mockedUpdateTodoStatusMutation).toHaveBeenCalledWith({
        id: mockedUpdatedTodoData.id,
        completed: !changedTodo?.completed,
      });
    });
  });
  test("will trigger pagination when reaching end of list", async () => {
    const { getByTestId } = renderWithProviders(<TodosList />, {
      preloadedState,
    });

    const flatList = getByTestId(todosListTestIds.flatList.testID);
    // simulate reaching the end of the list
    fireEvent(flatList, "onEndReached");
    await waitFor(() => {
      expect(mockedGetTodosQuery).toHaveBeenCalledWith({
        limit: DEFAULT_PAGE_SIZE,
        skip: DEFAULT_PAGE_SIZE,
      });
    });
  });
});
