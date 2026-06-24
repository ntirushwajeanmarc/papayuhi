import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Documents() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', description: '', category: '', file_url: '', file_type: 'PDF', file_size_kb: '' })
  const [search, setSearch] = useState('')

  useEffect(() => { api.get('/documents/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/documents/', {
      ...form,
      file_size_kb: form.file_size_kb === '' ? null : Number(form.file_size_kb)
    })
    api.get('/documents/').then(r => setItems(r.data))
  }

  const filtered = search ? items.filter(d => d.title.toLowerCase().includes(search.toLowerCase())) : items

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Inyandiko</h2>
      <input className="input-field mb-4" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} />
        <div className="flex gap-3">
          <input className="input-field" placeholder="File URL" value={form.file_url} onChange={e => setForm({...form, file_url: e.target.value})} required />
          <input className="input-field max-w-[150px]" placeholder="Type" value={form.file_type} onChange={e => setForm({...form, file_type: e.target.value})} />
          <input className="input-field max-w-[120px]" placeholder="Size KB" type="number" value={form.file_size_kb} onChange={e => setForm({...form, file_size_kb: e.target.value})} />
        </div>
        <button type="submit" className="btn-primary">Upload Document</button>
      </form>
      <div className="grid gap-3">{filtered.map(d => <div key={d.id} className="card flex items-center justify-between"><div><span className="font-medium">{d.title}</span><span className="text-xs text-gray-400 ml-2">({d.file_type})</span></div><div className="flex gap-2 text-xs"><span className="text-gray-400">{d.file_size_kb}KB</span><span className="text-gray-400">{d.category}</span></div></div>)}</div>
    </div>
  )
}