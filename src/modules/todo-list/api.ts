import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';

type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export const todoListApi = {
  getTodolistQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) =>
        jsonApiInstance(`/tasks?_page=${page}&_per_page=10`, {
          signal: meta.signal,
        }),
    });
  },

  getTodolistInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (res) => res.next,
      select: (result) => result.pages.map((page) => page.data).flat(),
    });
  },
};
