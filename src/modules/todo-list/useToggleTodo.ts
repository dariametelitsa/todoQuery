import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api.ts';

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodo = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] });
      const prevTodos = queryClient.getQueryData(
        todoListApi.getTodolistQueryOptions().queryKey
      );
      queryClient.setQueryData(
        todoListApi.getTodolistQueryOptions().queryKey,
        (todo) =>
          todo
            ?.map((task) =>
              task.id === newTodo.id ? { ...task, ...newTodo } : task
            )
            .reverse()
      );
      return { prevTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todoListApi.getTodolistQueryOptions().queryKey,
          context.prevTodos
        );
      }
    },

    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodo.mutate({ id, done: !done });
  };

  return { toggleTodo };
};
