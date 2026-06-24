import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Requests() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ request_type: 'General Support', title: '', description: '' })
  const [filter, setFilter] = useState('')
  const types = ['Mituweli', 'Irembo', 'Certificate Request', 'Complaint', 'General Support']
  const statuses = ['Pending', 'In Progress', 'Resolved', 'Rejected']

  useEffect(() => { api.get(`/requests/${filter ? '?status='+filter : ''}`).then(r => setItems(r.data)).catch(()=>{}) }, [filter])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/requests/', form)
    api.get('/requests/').then(r => setItems(r.data))
  }

  const handleStatus = async (id, status) => {
    await api.put(`/requests/${id}`, { status })
    api.get('/requests/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Ibyifuzo by'Abaturage</h2>
      <div className="flex gap-2 mb-4">
        {statuses.map(s => <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded text-sm ${filter===s ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>{s}</button>)}
      </div>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <select className="input-field" value={form.request_type} onChange={e => setForm({...form, request_type: e.target.value})}>{types.map(t => <option key={t}>{t}</option>)}</select>
        <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
        <button type="submit" className="btn-primary">Ohereza</button>
      </form>
      <div className="space-y-3">
        {items.map(r => (
          <div key={r.id} className="card flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-gray-500">{r.description}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-1 inline-block">{r.request_type}</span>
            </div>
            <div className="flex flex-col gap-1">
              <select value={r.status} onChange={e => handleStatus(r.id, e.target.value)} className="text-xs border rounded px-2 py-1">
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}