import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api.ts';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled: () =>
      queryClient.invalidateQueries(todoListApi.getTodolistQueryOptions()),
    async onSuccess(_, deletedId) {
      const todos = queryClient.getQueryData(
        todoListApi.getTodolistQueryOptions().queryKey
      );
      if (todos) {
        const updatedTodos = todos.filter((item) => item.id !== deletedId);
        queryClient.setQueryData(
          todoListApi.getTodolistQueryOptions().queryKey,
          updatedTodos.reverse()
        );
      }
    },
  });

  return { onDelete: deleteTodo.mutate, isPending: deleteTodo.isPending };
};
