import { AppStore } from "@/app/shared/types/redux";
import { RootState, setupStore } from "@/app/store/configureStore";
import { ThemeProvider } from "@/utils/uiUtils/themeUtils";
import {
  Action,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from "@reduxjs/toolkit";
import { act, render, RenderOptions } from "@testing-library/react-native";
import React, { JSX, PropsWithChildren } from "react";
import { Provider } from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export async function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    );
  }

  const result = render(ui, { wrapper: Wrapper, ...renderOptions });

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  return { store, ...result };
}

export function setupApiStore<
  A extends {
    reducer: Reducer<any, any>;
    reducerPath: string;
    middleware: Middleware;
    util: { resetApiState(): any };
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
  /*
   * modified version of RTK Query's helper function:
   * check docs for more details
   */
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware,
        ),
    });

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A["reducer"]>;
    } & {
      [K in keyof R]: ReturnType<R[K]>;
    },
    Action,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore() as StoreType;
  refObj.store = store;

  return refObj;
}
