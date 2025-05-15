import { Task } from '@/lib/types/task'
import { Button } from '../ui/button'
import api from '@/lib/api'

interface Props {
  task: Task
  todoId: string
  refresh: () => void
}

export default function TaskCard({ task, todoId, refresh }: Props) {
  const toggleComplete = async () => {
    await api.put(`/todos/${todoId}/tasks/${task.id}`, {
      completed: !task.is_completed,
    })
    refresh()
  }

  const deleteTask = async () => {
    await api.delete(`/todos/${todoId}/tasks/${task.id}`)
    refresh()
  }

  return (
    <div className="p-4 border rounded-xl shadow space-y-2">
      <div className="flex justify-between">
        <span className={task.is_completed ? 'line-through' : ''}>{task.title}</span>
        <Button onClick={deleteTask} variant="destructive">Excluir</Button>
      </div>
      <Button onClick={toggleComplete}>
        {task.is_completed ? 'Desmarcar' : 'Concluir'}
      </Button>
    </div>
  )
}
