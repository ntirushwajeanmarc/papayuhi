import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function SMS() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ recipient_phone: '', message: '', notification_type: 'Inama' })
  const types = ['Inama', 'Umuganda', 'Mituweli', 'Emergency']

  useEffect(() => { api.get('/sms/').then(r => setItems(r.data)).catch(()=>{}) }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await api.post('/sms/', form)
    api.get('/sms/').then(r => setItems(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">SMS Notifications</h2>
      <form onSubmit={handleSubmit} className="card mb-6 space-y-4">
        <input className="input-field" placeholder="Phone (+250...)" value={form.recipient_phone} onChange={e => setForm({...form, recipient_phone: e.target.value})} required />
        <textarea className="input-field" placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={3} />
        <select className="input-field" value={form.notification_type} onChange={e => setForm({...form, notification_type: e.target.value})}>{types.map(t => <option key={t}>{t}</option>)}</select>
        <button type="submit" className="btn-primary">Send SMS</button>
      </form>
      <div className="space-y-2">{items.map(s => <div key={s.id} className="card"><div className="flex justify-between"><span className="font-medium">{s.recipient_phone}</span><span className="text-xs bg-gray-100 px-2 py-1 rounded">{s.notification_type || 'SMS'}</span></div><p className="text-sm text-gray-600 mt-1">{s.message}</p><span className="text-xs text-gray-400">{new Date(s.sent_at).toLocaleString()}</span></div>)}</div>
    </div>
  )
}