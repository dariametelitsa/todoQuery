import { useQuery } from '@tanstack/react-query';
import { todoListApi } from './api.ts';

export const useTodolist = () => {
  const {
    error,
    data: todoItems,
    isLoading,
    refetch,
  } = useQuery({
    ...todoListApi.getTodolistQueryOptions(),
    select: (data) => data.reverse(),
  });

  return {
    error,
    todoItems,
    isLoading,
    refetch,
  };
};
