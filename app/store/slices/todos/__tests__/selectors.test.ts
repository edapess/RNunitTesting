import { mockedTodosData } from "@/__mocks__/mockedData";
import { TToDo } from "@/app/shared/types";

import { baseApi } from "@/app/store/toolkitServices";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { selectTodos } from "../selectors";

const todosAdapter = createEntityAdapter<TToDo>();

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
const result = selectTodos({
  todos: {
    ...initialTodosState,
  },
  [baseApi.reducerPath]: baseApi.reducer(undefined, { type: "" }),
});

describe("TodosList selectors", () => {
  it("selectTodos should return the todos from the state", () => {
    expect(result).toEqual(mockedTodosData.todos);
  });
});
