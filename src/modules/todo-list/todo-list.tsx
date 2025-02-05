import { useInfiniteQuery } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import { useState } from 'react';
import { useIntersection } from '../../shared/hooks/useIntersection.ts';

export function TodoList() {
  const [enabled, setEnabled] = useState(false);

  const {
    error,
    data: todoItems,
    isPlaceholderData,
    status,
    fetchStatus,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodolistInfiniteQueryOptions(),
    enabled: enabled,
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  console.log({ status, fetchStatus });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <div className={'max-w-[1200px] p-10 mx-auto'}>
      <h1 className={'text-3xl font-bold underline'}>Todolist</h1>
      <button
        className={'p-3 border border-amber-400 rounded my-3'}
        onClick={() => setEnabled((prev) => !prev)}
      >
        Toggle Enabled = {enabled ? 'true' : 'false'}
      </button>
      <div
        className={
          'm-4 flex flex-col gap-4' + (isPlaceholderData ? ' opacity-50' : '')
        }
      >
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
      <div className={'flex gap-2 mt-4'} ref={cursorRef}>
        {!hasNextPage && <div>No data</div>}
        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </div>
  );
}
