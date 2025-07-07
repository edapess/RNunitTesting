import { EReducerNames } from "@/app/shared/types";
import { baseApi } from "@/app/store/toolkitServices";
import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice";

export const combinedReducers = {
  [EReducerNames.TODOS]: todosReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers(combinedReducers);
export default rootReducer;
