import { TApplicationState } from "@/app/shared/types/redux";
import {
  todosSelectors,
  TTodosState,
} from "@/app/store/slices/todos/todosSlice";
import { createSelector } from "reselect";

export const selectTodos = createSelector(
  (state: TApplicationState) => state,
  (state) => todosSelectors.selectAll(state),
);

export const selectTodosState = (state: TApplicationState): TTodosState =>
  state.todos;

export const selectTotalTodosCount = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.totalElements,
);
export const selectTodosOffset = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.offset,
);

export const selectTodosIsReachEndOfList = createSelector(
  selectTodosState,
  (todosState) => todosState.todos.isReachEndOfList,
);

export const selectCompletedTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.completed),
);
