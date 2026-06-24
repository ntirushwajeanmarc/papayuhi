import React, { createContext, useState, useContext, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      setUser({
        id: localStorage.getItem('user_id'),
        role: localStorage.getItem('role')
      })
    }
    setLoading(false)
  }, [token])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    const data = res.data
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user_id', data.user_id)
    localStorage.setItem('role', data.role)
    setToken(data.access_token)
    setUser({ id: data.user_id, role: data.role })
    return data
  }

  const register = async (payload) => {
    await api.post('/auth/register', payload)
    return login(payload.username, payload.password)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('role')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
