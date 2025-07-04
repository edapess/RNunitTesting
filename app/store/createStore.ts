import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import rootReducer from "@/app/store/slices/rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reactotron from "@/ReactotronConfig";
import { baseApi } from "@/app/store/toolkitServices";

const enhancers: StoreEnhancer[] = [];
if (__DEV__) {
  enhancers.push(reactotron.createEnhancer!());
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
});

export type TApplicationState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TApplicationState> =
  useSelector;

export default store;
