import { useQuery } from '@tanstack/react-query';
import { todoListApi } from './api.ts';
import { useState } from 'react';

// export const getTasks = () => {
//   return new Promise<TodoDto[]>((res) => {
//     setTimeout(() => {
//       res([
//         {
//           id: '1',
//           text: 'React',
//           done: true,
//         },
//         {
//           id: '2',
//           text: 'JS',
//           done: true,
//         },
//         {
//           id: '3',
//           text: 'Tanstack',
//           done: false,
//         },
//       ]);
//     }, 1000);
//   });
// };

export function TodoList() {
  const [page, setPage] = useState(1);

  const {
    error,
    isPending,
    data: todoItems,
  } = useQuery({
    queryKey: ['tasks', 'list'],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <div className={'max-w-[1200px] p-10 mx-auto'}>
      <h1 className={'text-3xl font-bold underline'}>Todolist</h1>
      <div className={'m-4 flex flex-col gap-4'}>
        {todoItems.data?.map((task) => (
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

      <div className={'flex gap-5 w-full justify-center'}>
        <button
          className={
            'p-3 rounded bg-blue-200 cursor-pointer hover:opacity-90 active:opacity-80'
          }
          onClick={() => {
            setPage((p) => Math.max(p - 1, 1));
          }}
        >
          prev
        </button>
        <button
          className={
            'p-3 rounded bg-blue-200 cursor-pointer hover:opacity-90 active:opacity-80'
          }
          onClick={() => {
            setPage((p) => p + 1);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}
