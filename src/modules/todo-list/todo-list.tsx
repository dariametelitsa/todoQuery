import { useQuery } from '@tanstack/react-query';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export const getTasks = () => {
  return new Promise<Todo[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: '1',
          text: 'React',
          done: true,
        },
        {
          id: '2',
          text: 'JS',
          done: true,
        },
        {
          id: '3',
          text: 'Tanstack',
          done: false,
        },
      ]);
    }, 1000);
  });
};

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ['tasks', 'list'],
    queryFn: getTasks,
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>;
  }

  return (
    <>
      <h1>Todolist</h1>
      {data?.map((task) => (
        <div key={task.id}>
          <input type={'checkbox'} checked={task.done} />
          {task.text}
        </div>
      ))}
    </>
  );
}
