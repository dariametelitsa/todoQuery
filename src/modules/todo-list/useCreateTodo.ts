import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import * as React from 'react';
import { nanoid } from 'nanoid';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: todoListApi.createTodo,
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
  });

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = String(formData.get('title') ?? '');
    createTodo.mutate({ id: nanoid(), done: false, userId: '1', text: title });
    e.currentTarget.reset();
  };

  return { onCreate, isPending: createTodo.isPending };
};
