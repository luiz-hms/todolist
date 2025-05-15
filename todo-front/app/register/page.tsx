import { RegisterForm } from '@/components/forms/RegisterForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-1/2 m-auto items-center  justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <RegisterForm />
      </div>
    </div>
  )
}
