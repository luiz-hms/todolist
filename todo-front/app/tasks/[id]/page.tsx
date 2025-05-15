'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/lib/api'
import { Task } from '@/lib/types/task'
import TaskCard from '@/components/cards/TaskCard'
import { Button } from '@/components/ui/button'

export default function TaskListPage() {
  const { id } = useParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  const fetchTasks = async () => {
    const res = await api.get(`/todos/${id}`)
    setTitle(res.data.title)
    setTasks(res.data.tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    await api.post(`/todos/${id}/tasks`, { title: 'Nova tarefa' })
    fetchTasks()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={handleAddTask}>Nova Tarefa</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} todoId={String(id)} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  )
}
