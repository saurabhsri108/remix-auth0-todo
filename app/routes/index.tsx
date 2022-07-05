import type { ActionFunction } from '@remix-run/node';
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

export async function loader() {
  const tasks: ITaskItem[] = await getTasks();

  return tasks.map(task => {
    return {
      ...task,
      date: format(task.date, 'dd/MM/yyyy HH:mm'),
      title: `Task ${task.id}`
    };
  });
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    const task: ITaskItem = {
      description: values.task.toString(),
      completed: false,
      date: new Date()
    };
    return createTask(task);
  }
  if (_action === 'delete') {
    const id = Number(values.id);
    return deleteTask(id);
  }
  if (_action === 'done') {
    const id = Number(values.id);
    return doneTask(id);
  }
};

export default function Index() {
  const tasks = useLoaderData();

  const transition = useTransition();
  let isAdding = transition.state === "submitting" && transition.submission.formData.get("_action") === "create";
  let isDeleting = transition.state === "submitting" && transition.submission.formData.get("_action") === "delete";
  let isDoing = transition.state === "submitting" && transition.submission.formData.get("_action") === "done";

  const addingFormRef = useRef<any>();
  const taskRef = useRef<any>();

  useEffect(() => {
    if (!isAdding) {
      addingFormRef.current?.reset();
      taskRef.current?.focus();
    }
  }, [isAdding]);

  return <main className="bg-white text-gray-800 dark:bg-slate-800  dark:text-white flex flex-col justify-start gap-2 min-h-100 h-screen">
    <section className="flex flex-col justify-center items-center gap-4 w-full p-4">
      <h1 className="w-100 font-sans font-medium text-4xl">Task List</h1>
      <Form ref={addingFormRef} method="post" className="flex flex-row gap-2 w-1/2 justify-center items-center">
        <input ref={taskRef} className="w-5/6 p-3 border border-slate-400 dark:border-white focus:outline-slate-900 active:outline-slate-900 dark:text-gray-800 rounded-sm" type="text" name="task" id="task" placeholder='Eg. Buy vegetables...' />
        <button className="border border-slate-800 dark:border-white rounded-sm py-3 px-3 cursor-pointer w-auto bg-slate-800 text-white hover:bg-slate-900" type="submit" name='_action' value='create' disabled={isAdding}>Add to list</button>
      </Form>
    </section>
    <section className='w-full p-8'>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start items-start gap-2">
        {tasks.map((task: ITaskItem) => {
          return <li key={task.id} className={`flex flex-col gap-2 p-4 border border-slate-400 rounded-md ${task.completed && 'border-l-4 border-l-purple-500'}`}>
            <div className="flex flex-row justify-between items-end mb-4 text-justify">
              <span className="text-xl font-sans font-medium">{task.title}</span>
              <Form method='post'>
                <input type="hidden" name="id" value={task.id} />
                <button className="font-sans text-3xl font-medium w-25 h-25" type="submit" aria-label='delete' name='_action' value='delete' disabled={isDeleting}>&times;</button>
              </Form>
            </div>
            <p className="text-justify font-sans font-medium flex flex-row gap-2 justify-between items-center">{task.description}</p>
            <div className="font-sans font-medium flex flex-row gap-2 justify-between items-center">
              <span>{task.date}</span>
              <Form method='post'>
                <input type="hidden" name="id" value={task.id} />
                <button className="border border-purple-700 rounded-sm py-2 px-2 cursor-pointer w-auto bg-purple-700 text-white hover:bg-purple-800" type="submit" name='_action' value='done' disabled={isDoing}>{task.completed ? "Not Done" : "Done"}</button>
              </Form>
            </div>
          </li>;
        })}
      </ul>
    </section>
  </main>;
}
