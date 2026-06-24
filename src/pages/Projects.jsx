import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Projects() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', description: '', budget_total: '', status: 'Planned', village: '', cell: '' })
  const [filter, setFilter] = useState('')
  const statuses = ['Planned', 'In Progress', 'Completed', 'On Hold']
  const sc = { 'Planned': 'bg-blue-100 text-blue-700', 'In Progress': 'bg-yellow-100 text-yellow-700', 'Completed': 'bg-green-100 text-green-700', 'On Hold': 'bg-red-100 text-red-700' }

  useEffect(() => { api.get(`/projects/${filter ? '?status='+filter : ''}`).then(r => setItems(r.data)).catch(()=>{}) }, [filter])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/projects/', {
      ...form,
      budget_total: form.budget_total === '' ? null : Number(form.budget_total)
    })
    api.get('/projects/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Imishinga y'Iterambere</h2>
      <div className="flex gap-2 mb-4">{statuses.map(s => <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded text-sm ${filter===s ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>{s}</button>)}</div>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <input className="input-field" placeholder="Project Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} />
        <div className="flex gap-3">
          <input className="input-field" placeholder="Budget (RWF)" type="number" value={form.budget_total} onChange={e => setForm({...form, budget_total: e.target.value})} />
          <select className="input-field" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
        </div>
        <div className="flex gap-3"><input className="input-field" placeholder="Village" value={form.village} onChange={e => setForm({...form, village: e.target.value})} /><input className="input-field" placeholder="Cell" value={form.cell} onChange={e => setForm({...form, cell: e.target.value})} /></div>
        <button type="submit" className="btn-primary">Register Project</button>
      </form>
      <div className="grid gap-4">{items.map(p => <div key={p.id} className="card"><div className="flex justify-between"><h3 className="font-semibold">{p.name}</h3><span className={`text-xs px-2 py-1 rounded ${sc[p.status] || 'bg-gray-100'}`}>{p.status}</span></div><p className="text-sm text-gray-500 mt-1">{p.description}</p><div className="flex gap-4 mt-2 text-xs text-gray-400"><span>Budget: {p.budget_total?.toLocaleString()} RWF</span><span>Spent: {p.budget_spent?.toLocaleString()} RWF</span><span>{p.village} / {p.cell}</span></div></div>)}</div>
    </div>
  )
}