import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Reports() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', content: '', report_type: 'Daily', level: 'Mutwarasibo' })
  const [filter, setFilter] = useState('')

  const types = ['Daily', 'Weekly', 'Monthly', 'Security', 'Community Development']
  const levels = ['Mutwarasibo', 'Umudugudu', 'Akagari']

  useEffect(() => { api.get(`/reports/${filter ? '?report_type='+filter : ''}`).then(r => setItems(r.data)).catch(()=>{}) }, [filter])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/reports/', form)
    api.get('/reports/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Raporo</h2>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('')} className={`px-3 py-1 rounded text-sm ${!filter ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>All</button>
        {types.map(t => <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded text-sm ${filter===t ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>{t}</button>)}
      </div>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <textarea className="input-field" placeholder="Content" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required rows={3} />
        <div className="flex gap-4">
          <select className="input-field" value={form.report_type} onChange={e => setForm({...form, report_type: e.target.value})}>{types.map(t => <option key={t}>{t}</option>)}</select>
          <select className="input-field" value={form.level} onChange={e => setForm({...form, level: e.target.value})}>{levels.map(l => <option key={l}>{l}</option>)}</select>
        </div>
        <button type="submit" className="btn-primary">Ohereza Raporo</button>
      </form>
      <p className="text-sm text-gray-500 mb-4">Mutwarasibo → Umudugudu → Akagari</p>
      <div className="space-y-4">
        {items.map(r => (
          <div key={r.id} className="card">
            <div className="flex justify-between">
              <h3 className="font-semibold">{r.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${r.report_type==='Daily' ? 'bg-blue-100 text-blue-700' : r.report_type==='Weekly' ? 'bg-green-100 text-green-700' : r.report_type==='Security' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{r.report_type}</span>
            </div>
            <p className="text-gray-600 mt-2">{r.content}</p>
            <div className="flex gap-2 mt-2 text-xs text-gray-400">
              <span>Level: {r.level}</span>
              <span>{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}