import type { ActionFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

interface ITaskItem {
  id: string,
  title: string,
  completed: boolean,
  date: Date
}

export async function loader() {
  const tasks = await new Promise((resolve) => {
    return resolve([{
      id: 1,
      title: 'Task 1',
      completed: false,
      date: new Date(),
    }])
  })
  return tasks
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData()
  let { _action, ...values } = Object.fromEntries(formData)

  if (_action === 'create') {
    return createTask(values.task)
  }
  if (_action === 'delete') {
    return deleteTask(values.id)
  }
}

export default function Index() {
  const tasks = useLoaderData()
  return <main>
    <section>
      <h1>Task List</h1>
      <Form method="post">
        <input type="text" name="task" id="task" placeholder='Eg. Buy vegetables...' />
        <button type="submit" name='_action' value='create'>Add to list</button>
      </Form>
    </section>
    <section>
      <ul>
        {tasks.map((task: ITaskItem) => {
          return <>
            <li key={task.id}>
              <p>
                {task.title}
                <Form method='post'>
                  <input type="hidden" name="id" value={task.id} />
                  <button type="submit" aria-label='delete' name='_action' value='delete'>x</button>
                </Form>
              </p>
              <p><span>{task.date}</span></p>
            </li>
          </>
        })}
      </ul>
    </section>
  </main>
}
