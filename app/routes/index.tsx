import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { createTask, deleteTask, doneTask, getTasks } from '~/server/db/tasks.db';

interface ITaskItem {
  id?: number,
  title?: string,
  description: string,
  completed: boolean,
  date: Date;
}

export const loader: LoaderFunction = async () => {
  const tasks: ITaskItem[] = await getTasks();

  return tasks.map(task => {
    return {
      ...task,
      date: format(task.date as Date, 'dd/MM/yyyy HH:mm'),
      title: `Task ${task.id}`
    };
  });
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    const task: ITaskItem = {
      description: values.task.toString(),
      completed: false,
      date: new Date()
    };
    await createTask(task);
  }
  if (_action === 'delete') {
    const id = Number(values.id);
    await deleteTask(id);
  }
  if (_action === 'done') {
    const id = Number(values.id);
    await doneTask(id);
  }
  return redirect('/');
};

export default function Index() {
  let tasks = useLoaderData();

  const { state, submission } = useTransition();
  let isAdding = state === "submitting" && submission.formData.get("_action") === "create";
  let isDeleting = state === "submitting" && submission.formData.get("_action") === "delete";
  let isDoing = state === "submitting" && submission.formData.get("_action") === "done";

  const addingFormRef = useRef<any>();
  const taskRef = useRef<any>();
  console.log({ isAdding, isDeleting, isDoing });
  useEffect(() => {
    if (!isAdding) {
      addingFormRef.current?.reset();
      taskRef.current?.focus();
    }
    if (isDeleting) {
      tasks = tasks.filter((task: ITaskItem) => task.id !== Number(submission?.formData.get("id")));
    }
  }, [isAdding, isDeleting, submission?.formData, tasks]);


  return <main className="flex flex-col justify-start h-full gap-2 text-gray-800 bg-white dark:bg-slate-800 dark:text-white sm:h-screen">
    <section className="flex flex-col items-center justify-center w-full gap-4 p-4">
      <h1 className="font-sans text-4xl font-medium w-100">Task List</h1>
      <Form ref={addingFormRef} method="post" className="flex flex-row items-center justify-center w-full gap-2 md:w-1/2">
        <input ref={taskRef} className="w-2/4 p-3 border rounded-sm md:w-3/4 border-slate-400 dark:border-white focus:outline-slate-900 active:outline-slate-900 dark:text-gray-800" type="text" name="task" id="task" placeholder='Eg. Buy vegetables...' />
        <button className="w-auto px-3 py-3 text-white border rounded-sm cursor-pointer border-slate-800 dark:border-white md:w-1/4 bg-slate-800 hover:bg-slate-900" type="submit" name='_action' value='create' disabled={isAdding}>Add to list</button>
      </Form>
    </section>
    <section className='w-full p-8'>
      <ul className="grid items-start justify-start grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((task: ITaskItem) => {
          return <ListItem key={task.id} isDeleting={isDeleting} isDoing={isDoing} task={task} />;
        })}
        {submission && isAdding && <ListItem key={Number.MAX_SAFE_INTEGER} isDeleting={isDeleting} isDoing={isDoing} task={
          {
            id: tasks[tasks.length - 1].id + 1,
            title: `Title ${tasks[tasks.length - 1].id + 1}`,
            description: (submission.formData.get('task') as string).toString(),
            completed: false,
            date: new Date()
          }
        } />}
      </ul>
    </section>
  </main>;
}

const ListItem = ({ task, isDeleting, isDoing }: { task: ITaskItem, isDeleting: boolean, isDoing: boolean; }) => {
  return <li key={task.id} className={`flex flex-col gap-2 p-4 border border-slate-400 rounded-md min-h-full justify-between items-between ${task.completed && 'border-l-4 border-l-purple-500'}`}>
    <div className="flex flex-row items-end justify-between mb-4 text-justify">
      <span className="font-sans text-xl font-medium">{task.title}</span>
      <Form method='post'>
        <input type="hidden" name="id" value={task.id} />
        <button className="font-sans text-3xl font-medium w-25 h-25" type="submit" aria-label='delete' name='_action' value='delete' disabled={isDeleting}>&times;</button>
      </Form>
    </div>
    <p className="flex flex-row items-center justify-between gap-2 font-sans font-medium text-justify">{task.description}</p>
    <div className="flex flex-row items-center justify-between gap-2 mt-4 font-sans font-medium">
      <span>{format(new Date(task.date), 'dd/MM/yyyy HH:mm')}</span>
      <Form method='post'>
        <input type="hidden" name="id" value={task.id} />
        <button className="w-auto px-2 py-2 text-white bg-purple-700 border border-purple-700 rounded-sm cursor-pointer hover:bg-purple-800" type="submit" name='_action' value='done' disabled={isDoing}>{task.completed ? "Todo" : `Done ${isDoing && !task.completed ? "..." : ""}`}</button>
      </Form>
    </div>
  </li>;
};

