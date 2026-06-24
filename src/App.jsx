import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Citizens from './pages/Citizens'
import Announcements from './pages/Announcements'
import Reports from './pages/Reports'
import Requests from './pages/Requests'
import Services from './pages/Services'
import Emergencies from './pages/Emergencies'
import WiFi from './pages/WiFi'
import Youth from './pages/Youth'
import Projects from './pages/Projects'
import Messages from './pages/Messages'
import Documents from './pages/Documents'
import SMS from './pages/SMS'
import AI from './pages/AI'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"></div></div>
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="citizens" element={<Citizens />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="requests" element={<Requests />} />
            <Route path="services" element={<Services />} />
            <Route path="emergencies" element={<Emergencies />} />
            <Route path="wifi" element={<WiFi />} />
            <Route path="youth" element={<Youth />} />
            <Route path="projects" element={<Projects />} />
            <Route path="messages" element={<Messages />} />
            <Route path="documents" element={<Documents />} />
            <Route path="sms" element={<SMS />} />
            <Route path="ai" element={<AI />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
