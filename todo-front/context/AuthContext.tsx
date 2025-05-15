'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/lib/types/user'
import {jwtDecode} from 'jwt-decode'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setUser(jwtDecode(storedToken))
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
    setUser(jwtDecode(token))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
