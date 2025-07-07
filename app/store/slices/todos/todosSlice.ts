import { DEFAULT_PAGE_SIZE } from "@/app/shared/constants";
import { EReducerNames, TToDo } from "@/app/shared/types";
import { ETodosQueries } from "@/app/store/api/todos/queries";
import { todosEndpoints } from "@/app/store/api/todos/todos";
import { TApplicationState } from "@/shared/types/redux";

import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

export type TTodosState = {
  todos: EntityState<TToDo, number> & {
    offset: number;
    totalElements: number;
    isReachEndOfList: boolean;
  };
};

const todosAdapter = createEntityAdapter<TToDo>();

const initialState: TTodosState = {
  todos: todosAdapter.getInitialState({
    offset: 0,
    totalElements: 0,
    isReachEndOfList: false,
  }),
};

const todosSlice = createSlice({
  name: EReducerNames.TODOS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      todosEndpoints[ETodosQueries.GET_TODOS].matchFulfilled,
      (state, { payload }) => {
        const isRefresh = payload.skip === 0;
        state.todos.offset = payload.skip;
        state.todos.isReachEndOfList = DEFAULT_PAGE_SIZE > payload.todos.length;
        state.todos.totalElements = payload.total;

        if (isRefresh) {
          todosAdapter.setAll(state.todos, payload.todos);
        } else {
          todosAdapter.addMany(state.todos, payload.todos);
        }
      },
    );
  },
});

export const todosSelectors = todosAdapter.getSelectors(
  (state: TApplicationState) => state.todos.todos,
);

export default todosSlice.reducer;
