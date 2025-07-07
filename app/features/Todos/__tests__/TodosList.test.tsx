import { mockedTodosData } from "@/__mocks__/mockedData";
import { selectTodos } from "@/app/store/slices/todos/selectors";
import { renderWithProviders } from "@/utils/testUtils/test-utils";
import { TodosList, todosListTestIds } from "../TodosList";

jest.mock("expo-device", () => ({
  deviceId: "mocked-device-id",
}));

jest.mock("@/app/store/slices/todos/selectors", () => ({
  selectTodos: jest.fn(),
  selectTodosOffset: jest.fn(() => 0),
  selectTodosIsReachEndOfList: jest.fn(() => false),
}));

const mockedGetTodosQuery = jest.fn();

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
  todosEndpoints: {
    getTodos: {
      matchFulfilled: jest.fn(),
      matchPending: jest.fn(),
      matchRejected: jest.fn(),
    },
  },
}));

describe("TodoList component", () => {
  beforeEach(() => {
    jest.mocked(selectTodos).mockReturnValue(mockedTodosData.todos);
  });

  test("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<TodosList />);
    expect(getByTestId(todosListTestIds.flatList.testID)).toBeTruthy();
  });
});
