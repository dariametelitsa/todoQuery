import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance.ts';

type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
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
  baseKey: 'tasks',
  getTodolistQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, 'list'],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks`, {
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

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>(`/tasks`, {
      method: 'POST',
      json: data,
    });
  },

  updateTodo: (id: string, data: Partial<TodoDto>) => {
    return jsonApiInstance<TodoDto>(`/tasks${id}`, {
      method: 'PATCH',
      json: data,
    });
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
