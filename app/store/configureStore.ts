import rootReducer from "@/app/store/slices/rootReducer";
import { baseApi } from "@/app/store/toolkitServices";
import reactotron from "@/ReactotronConfig";
import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import { createLoggerEnhancer } from "./loggerEnhancer";

export type RootState = ReturnType<typeof rootReducer>;
const loggerEnhancer = createLoggerEnhancer("ws://127.0.0.1:7878");

const enhancers: StoreEnhancer[] = [];
if (__DEV__) {
  enhancers.push(reactotron.createEnhancer!());
  enhancers.push(loggerEnhancer);
}

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
    preloadedState,
  });
}
const store = setupStore();
export default store;
