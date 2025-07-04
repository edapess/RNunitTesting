import { baseApi } from "@/app/store/toolkitServices";
import { ETodosQueries } from "@/app/store/api/todos/queries";
import { TTodosRequest, TTodosResponse } from "@/app/store/api/todos/types";

const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [ETodosQueries.GET_TODOS]: builder.query<TTodosResponse, TTodosRequest>({
      query: (params) => ({
        url: "todos",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useLazyGetTodosQuery, endpoints: todosEndpoints } = todosApi;
