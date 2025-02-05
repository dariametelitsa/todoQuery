import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api.ts';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
    async onSuccess(_, deletedId) {
      queryClient.setQueryData(
        todoListApi.getTodolistQueryOptions().queryKey,
        (todo) => todo?.filter((item) => item.id !== deletedId).reverse()
      );
    },
  });

  return {
    onDelete: deleteTodo.mutate,
    getIsPending: (id: string) =>
      deleteTodo.isPending && deleteTodo.variables === id,
  };
};
