import { DEFAULT_PAGE_SIZE } from "@/app/shared/constants";
import { TToDo } from "@/app/shared/types";
import { useLazyGetTodosQuery } from "@/app/store/api/todos/todos";
import {
  selectTodos,
  selectTodosIsReachEndOfList,
  selectTodosOffset,
} from "@/app/store/slices/todos/selectors";
import { Checkboxed } from "@/components/Checkboxed/Checkboxed";
import { useAppSelector } from "@/hooks/useRedux";
import {
  createParentTestIDObjectKeys,
  createTestIDsObject,
} from "@/utils/createTestIDs";
import { useCallback, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";

export const todosListTestIds = createTestIDsObject(
  "TodosList",
  createParentTestIDObjectKeys("flatList", "listItem"),
);

export const TodosList = () => {
  const [getTodos, { isLoading }] = useLazyGetTodosQuery();

  const todosData = useAppSelector(selectTodos);
  const todosOffset = useAppSelector(selectTodosOffset);
  const isReachEndOfList = useAppSelector(selectTodosIsReachEndOfList);

  const renderItem = useCallback(({ item }: { item: TToDo }) => {
    return (
      <Checkboxed
        testID={`${todosListTestIds.listItem.testID}-${item.id}`}
        content={item.todo}
        key={item.id}
        onPress={() => {}}
        selected={item.completed}
      />
    );
  }, []);

  const fetchTodos = useCallback(() => {
    getTodos({
      limit: DEFAULT_PAGE_SIZE,
      skip: 0,
    });
  }, [getTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onEndReached = useCallback(() => {
    if (!isLoading && !isReachEndOfList) {
      getTodos({
        limit: DEFAULT_PAGE_SIZE,
        skip: todosOffset + DEFAULT_PAGE_SIZE,
      });
    }
  }, [getTodos, isLoading, isReachEndOfList, todosOffset]);

  return (
    <FlatList
      testID={todosListTestIds.flatList.testID}
      data={todosData}
      contentContainerStyle={{
        rowGap: 16,
      }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchTodos} />
      }
      onEndReached={onEndReached}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};
