import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Announcements() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', category: '' })

  useEffect(() => { api.get('/announcements/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    await api.post('/announcements/', form)
    setShowForm(false)
    api.get('/announcements/').then(r => setItems(r.data))
  }

  const handleDelete = async (id) => {
    await api.delete(`/announcements/${id}`)
    api.get('/announcements/').then(r => setItems(r.data))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Amatangazo</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">{showForm ? 'Cancel' : '+ Tangaza'}</button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="card mb-6 space-y-4">
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <textarea className="input-field" placeholder="Content" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required rows={3} />
          <input className="input-field" placeholder="Category (Inama, Umuganda, Gahunda)" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          <button type="submit" className="btn-primary">Ohereza</button>
        </form>
      )}
      <div className="space-y-4">
        {items.map(a => (
          <div key={a.id} className="card">
            <div className="flex justify-between">
              <h3 className="font-semibold">{a.title}</h3>
              <button onClick={() => handleDelete(a.id)} className="text-red-500 text-sm">Delete</button>
            </div>
            <p className="text-gray-600 mt-2">{a.content}</p>
            <div className="flex gap-2 mt-3">
              {a.category && <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">{a.category}</span>}
              <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}