import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "@/app/store/toolkitServices";
import { EReducerNames } from "@/app/shared/types";
import todosReducer from "./todos/todosSlice";

const combinedReducers = {
  [EReducerNames.TODOS]: todosReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers(combinedReducers);
export default rootReducer;
