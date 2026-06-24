import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Services() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ service_type: 'Mituweli Assistance', description: '' })
  const types = ['Mituweli Assistance', 'Irembo Services', 'Printing', 'Scanning', 'Internet Access']

  useEffect(() => { api.get('/services/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/services/', form)
    api.get('/services/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Smart Service Center</h2>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <select className="input-field" value={form.service_type} onChange={e => setForm({...form, service_type: e.target.value})}>{types.map(t => <option key={t}>{t}</option>)}</select>
        <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} />
        <button type="submit" className="btn-primary">Request Service</button>
      </form>
      <div className="space-y-3">{items.map(s => <div key={s.id} className="card"><div className="flex justify-between"><span className="font-semibold">{s.service_type}</span><span className={`text-xs px-2 py-1 rounded ${s.status==='Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{s.status}</span></div><p className="text-sm text-gray-500 mt-1">{s.description}</p></div>)}</div>
    </div>
  )
}