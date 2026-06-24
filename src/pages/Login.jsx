import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-rwanda-blue/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">UD</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Umudugudu Platform</h1>
          <p className="text-gray-500 mt-1">Injira kuri konti yawe</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Izina ry'ukoresha</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="input-field" placeholder="Username" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ijambo banga</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="input-field" placeholder="Password" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50">
            {loading ? 'Injira...' : 'Injira'}
          </button>
          <p className="text-center text-sm text-gray-600">
            No account yet?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
