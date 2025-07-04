import { TToDo } from "@/app/shared/types";

export type TTodosRequest = {
  limit: number;
  skip: number;
};
export type TTodosResponse = {
  todos: TToDo[];
  total: number;
  skip: number;
  limit: number;
};
