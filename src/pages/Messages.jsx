import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Messages() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ content: '', subject: '', group_type: 'individual' })

  useEffect(() => { api.get('/messages/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/messages/', form)
    api.get('/messages/').then(r => setItems(r.data))
    setForm({ content: '', subject: '', group_type: 'individual' })
  }

  const flow = ['Akagari', 'Umudugudu', 'Mutwarasibo', 'Abaturage']

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Communication</h2>
      <p className="text-sm text-gray-500 mb-4">{flow.join(' → ')}</p>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <div className="flex gap-3">
          <input className="input-field" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
          <select className="input-field max-w-[200px]" value={form.group_type} onChange={e => setForm({...form, group_type: e.target.value})}>
            <option value="individual">Individual</option>
            <option value="village">Village</option>
            <option value="cell">Cell</option>
            <option value="sector">Sector</option>
          </select>
        </div>
        <textarea className="input-field" placeholder="Message" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required rows={3} />
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
      <div className="space-y-3">{items.map(m => <div key={m.id} className={`card ${m.is_read ? 'opacity-75' : 'border-l-4 border-l-primary-500'}`}><div className="flex justify-between"><span className="font-semibold">{m.subject || 'Message'}</span><span className="text-xs text-gray-400">{m.group_type}</span></div><p className="text-sm text-gray-600 mt-1">{m.content}</p><span className="text-xs text-gray-400">{new Date(m.sent_at).toLocaleString()}</span></div>)}</div>
    </div>
  )
}