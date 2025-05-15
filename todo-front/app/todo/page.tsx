'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Todo } from '@/lib/types/todo'
import TodoCard from '@/components/cards/TodoCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const router = useRouter()
  const { user } = useAuth()

  const fetchTodos = async () => {
    const res = await api.get('/todos')
    setTodos(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCreate = async () => {
    const res = await api.post('/todos', { title: 'Nova Lista' })
    fetchTodos()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Olá, {user?.name}</h1>
        <Button onClick={handleCreate}>Criar Lista</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {todos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}
