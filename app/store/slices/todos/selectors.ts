import { TApplicationState } from "@/app/store/createStore";
import { createSelector } from "reselect";
import {
  todosSelectors,
  TTodosState,
} from "@/app/store/slices/todos/todosSlice";

export const selectTodos = createSelector(
  (state: TApplicationState) => state,
  (state) => todosSelectors.selectAll(state),
);

export const selectTodosState = (state: TApplicationState): TTodosState =>
  state.todos;

export const selectTodosOffset = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.offset,
);

export const selectTodosIsReachEndOfList = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.isReachEndOfList,
);
