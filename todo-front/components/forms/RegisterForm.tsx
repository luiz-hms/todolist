'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })

      // Redireciona para login após sucesso
      router.push('/login')
    } catch (error) {
      console.error('Erro ao registrar:', error)
    }
  }

  return (
    <div className="flex min-h-screen content-center items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 justify-between">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">CADASTRO</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              {...register('name')}
              placeholder="Seu nome"
              className={cn(errors.name && 'border-red-500')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Seu email"
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Sua senha"
              className={cn(errors.password && 'border-red-500')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
