import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';

const BASE_URL = 'http://localhost:3000';

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
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    // const res = await fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
    const res = await fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
      signal,
    });
    return (await res.json()) as Promise<PaginatedResult<TodoDto>>;
  },

  getTodolistQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: jsonApiInstance(`/tasks?_page=${page}&_per_page=10`),
    });
  },

  getTodolistInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) =>
        todoListApi.getTodoList({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: (res) => res.next,
      select: (result) => result.pages.map((page) => page.data).flat(),
    });
  },
};
