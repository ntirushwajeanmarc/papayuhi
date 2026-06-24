import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Emergencies() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ alert_type: 'Security', title: '', description: '', severity: 'Medium', location: '' })
  const types = ['Fire', 'Security', 'Health', 'Disaster']
  const severities = ['Low', 'Medium', 'High', 'Critical']
  const severityColors = { Low: 'bg-blue-100 text-blue-700', Medium: 'bg-yellow-100 text-yellow-700', High: 'bg-orange-100 text-orange-700', Critical: 'bg-red-100 text-red-700' }

  useEffect(() => { api.get('/emergencies/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/emergencies/', form)
    api.get('/emergencies/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Amakuba - Emergency Alerts</h2>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <div className="flex gap-4">
          <select className="input-field" value={form.alert_type} onChange={e => setForm({...form, alert_type: e.target.value})}>{types.map(t => <option key={t}>{t}</option>)}</select>
          <select className="input-field" value={form.severity} onChange={e => setForm({...form, severity: e.target.value})}>{severities.map(s => <option key={s}>{s}</option>)}</select>
        </div>
        <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
        <input className="input-field" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
        <button type="submit" className="btn-primary bg-red-600 hover:bg-red-700">Send Alert</button>
      </form>
      <div className="space-y-3">{items.map(a => <div key={a.id} className="card border-l-4 border-l-red-500"><div className="flex justify-between"><span className="font-semibold">{a.title}</span><span className={`text-xs px-2 py-1 rounded ${severityColors[a.severity] || 'bg-gray-100'}`}>{a.severity}</span></div><p className="text-sm text-gray-500 mt-1">{a.description}</p><div className="flex gap-2 mt-2 text-xs text-gray-400"><span>{a.alert_type}</span>{a.location && <span>📍 {a.location}</span>}</div></div>)}</div>
    </div>
  )
}