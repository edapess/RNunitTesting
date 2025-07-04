import {
  FlatList,
  RefreshControl,
  View
} from "react-native";

import { DEFAULT_PAGE_SIZE } from "@/app/shared/constants";
import { TToDo } from "@/app/shared/types";
import { useLazyGetTodosQuery } from "@/app/store/api/todos/todos";
import { useAppSelector } from "@/app/store/createStore";
import {
  selectTodos,
  selectTodosIsReachEndOfList,
  selectTodosOffset,
} from "@/app/store/slices/todos/selectors";
import { Checkboxed } from "@/components/Checkboxed/Checkboxed";
import { useCallback, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [getTodos, { isLoading }] = useLazyGetTodosQuery();
  const insets = useSafeAreaInsets();
  const todosData = useAppSelector(selectTodos);
  const todosOffset = useAppSelector(selectTodosOffset);
  const isReachEndOfList = useAppSelector(selectTodosIsReachEndOfList);

  const fetchTodos = useCallback(() => {
    getTodos({
      limit: DEFAULT_PAGE_SIZE,
      skip: 0,
    });
  }, [getTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const renderItem = useCallback(({ item }: { item: TToDo }) => {
    return (
      <Checkboxed
        content={item.todo}
        key={item.id}
        onPress={() => {}}
        selected={item.completed}
      />
    );
  }, []);

  const onEndReached = useCallback(() => {
    if (!isLoading && !isReachEndOfList) {
      getTodos({
        limit: DEFAULT_PAGE_SIZE,
        skip: todosOffset + DEFAULT_PAGE_SIZE,
      });
    }
  }, [getTodos, isLoading, isReachEndOfList, todosOffset]);

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom + 48,
      }}
    >
      <FlatList
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
    </View>
  );
}
