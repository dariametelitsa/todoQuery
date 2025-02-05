import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import * as React from 'react';
import { nanoid } from 'nanoid';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: todoListApi.createTodo,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = String(formData.get('title') ?? '');
    createTodo.mutate(
      { id: nanoid(), done: false, userId: '1', text: title },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
      }
    );
    e.currentTarget.reset();
  };

  return { handleSubmit };
};
