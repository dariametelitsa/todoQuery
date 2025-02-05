import { useTodolist } from './useTodolist.tsx';
import { useCreateTodo } from './useCreateTodo.ts';
import { useDeleteTodo } from './useDeleteTodo.ts';

export function TodoList() {
  const { error, isLoading, todoItems } = useTodolist();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <div className={'max-w-[1200px] p-10 mx-auto'}>
      <h1 className={'text-3xl font-bold underline'}>Todolist</h1>

      <form className={'flex gap-2 my-3'} onSubmit={createTodo.onCreate}>
        <input
          type={'text'}
          name={'title'}
          className={'rounded p-2 border border-amber-300 mb-5'}
        />
        <button
          disabled={createTodo.isPending}
          className={
            'rounded p-2 border border-amber-300 mb-5 disabled:opacity-50'
          }
        >
          Create
        </button>
      </form>

      <div className={'m-4 flex flex-col gap-4'}>
        {todoItems?.map((task) => (
          <div
            key={task.id}
            className={
              'border border-slate-300 rounded p-3 flex justify-between'
            }
          >
            <span>
              <input
                type={'checkbox'}
                defaultChecked={task.done}
                className={'mr-3'}
              />
              {task.text}
            </span>
            <button
              disabled={deleteTodo.getIsPending(task.id)}
              onClick={() => deleteTodo.onDelete(task.id)}
              className={
                'text-rose-500 font-bold px-1 rounded border border-pink-300 disabled:text-rose-300'
              }
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
