import { useTodolist } from './useTodolist.tsx';

export function TodoList() {
  const { error, cursor, isLoading, todoItems } = useTodolist();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <div className={'max-w-[1200px] p-10 mx-auto'}>
      <h1 className={'text-3xl font-bold underline'}>Todolist</h1>
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
