import { useTodolist } from './useTodolist.tsx';
import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import { nanoid } from 'nanoid';

export function TodoList() {
  const { error, cursor, isLoading, todoItems } = useTodolist();

  const createTodo = useMutation({
    mutationFn: todoListApi.createTodo,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    const title = String(formData.get('title') ?? '');
    createTodo.mutate({ id: nanoid(), done: false, userId: '1', text: title });
    e.currentTarget.reset();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <div className={'max-w-[1200px] p-10 mx-auto'}>
      <h1 className={'text-3xl font-bold underline'}>Todolist</h1>

      <form className={'flex gap-2 my-3'} onSubmit={handleSubmit}>
        <input
          type={'text'}
          name={'title'}
          className={'rounded p-2 border border-amber-300 mb-5'}
        />
        <button className={'rounded p-2 border border-amber-300 mb-5'}>
          Create
        </button>
      </form>

      <div className={'m-4 flex flex-col gap-4'}>
        {todoItems?.map((task) => (
          <div key={task.id} className={'border border-slate-300 rounded p-3'}>
            <input
              type={'checkbox'}
              defaultChecked={task.done}
              className={'mr-3'}
            />
            {task.text}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
}
