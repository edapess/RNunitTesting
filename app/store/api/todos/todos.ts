import { TToDo } from "@/app/shared/types";
import { ETodosQueries } from "@/app/store/api/todos/queries";
import { TTodosRequest, TTodosResponse } from "@/app/store/api/todos/types";
import { baseApi } from "@/app/store/toolkitServices";

const todosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [ETodosQueries.GET_TODOS]: builder.query<TTodosResponse, TTodosRequest>({
      query: (params) => ({
        url: "todos",
        method: "GET",
        params,
      }),
    }),
    [ETodosQueries.UPDATE_TODO_STATUS]: builder.mutation<
      TToDo,
      {
        id: number;
        completed: boolean;
      }
    >({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: "PUT",
        data: { completed },
      }),
    }),
  }),
});

export const {
  useLazyGetTodosQuery,
  useUpdateTodoStatusMutation,
  endpoints: todosEndpoints,
} = todosApi;
