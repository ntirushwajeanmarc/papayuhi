import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full"></div></div>

  const cards = stats ? [
    { label: 'Abaturage', value: stats.total_citizens, color: 'bg-primary-100 text-primary-700' },
    { label: 'Ibyifuzo', value: stats.total_requests, color: 'bg-blue-100 text-blue-700' },
    { label: 'Raporo', value: stats.total_reports, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Urubyiruko', value: stats.youth_trained, color: 'bg-purple-100 text-purple-700' },
    { label: 'WiFi Active', value: stats.active_wifi_sessions, color: 'bg-green-100 text-green-700' },
  ] : []

  const chartData = stats ? [
    { name: 'Abaturage', count: stats.total_citizens },
    { name: 'Ibyifuzo', count: stats.total_requests },
    { name: 'Raporo', count: stats.total_reports },
    { name: 'Urubyiruko', count: stats.youth_trained },
    { name: 'WiFi', count: stats.active_wifi_sessions },
  ] : []

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c, i) => (
          <div key={i} className={`${c.color} rounded-xl p-4`}>
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="text-sm mt-1 opacity-75">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="font-semibold text-gray-700 mb-4">Imibare Rusange</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
