import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import { useIntersection } from '../../shared/hooks/useIntersection.ts';

export const useTodolist = () => {
  const {
    error,
    data: todoItems,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodolistInfiniteQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className={'flex gap-2 mt-4'} ref={cursorRef}>
      {!hasNextPage && <div>No data</div>}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );

  return {
    cursor,
    error,
    todoItems,
    isLoading,
  };
};
