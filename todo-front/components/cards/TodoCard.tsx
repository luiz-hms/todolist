import { Todo } from '@/lib/types/todo'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="p-4 border rounded-xl space-y-2 shadow">
      <h2 className="font-semibold">{todo.title}</h2>
      
      <Link href={`/tasks/${todo.id}`}>
        <Button variant="outline">Ver tarefas</Button>
      </Link>
    </div>
  )
}
