import { mockedTodosData } from "@/__mocks__/mockedData";
import todosReducer, { TTodosState } from "../todosSlice";
//todos slice test

describe("todosSlice", () => {
  it("should return the initial state", () => {
    const initialState: TTodosState = {
      todos: {
        ids: mockedTodosData.todos.map((todo) => todo.id),
        entities: mockedTodosData.todos.map((todo) => {
          return { ...todo, completed: false };
        }),
        offset: 0,
        totalElements: 0,
        isReachEndOfList: false,
      },
    };
    expect(
      todosReducer(initialState, {
        type: "baseApi/executeQuery/fulfilled",
      }),
    ).toEqual(initialState);
  });
});
