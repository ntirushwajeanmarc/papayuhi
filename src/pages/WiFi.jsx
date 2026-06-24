import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function WiFi() {
  const [sessions, setSessions] = useState([])
  const [hotspots, setHotspots] = useState([])
  const [form, setForm] = useState({ name: '', location: '', village: '' })
  const [tab, setTab] = useState('sessions')

  useEffect(() => {
    api.get('/wifi/sessions/').then(r => setSessions(r.data)).catch(()=>{})
    api.get('/wifi/hotspots/').then(r => setHotspots(r.data)).catch(()=>{})
  }, [])

  const handleCreate = async e => {
    e.preventDefault()
    await api.post('/wifi/hotspots/', form)
    api.get('/wifi/hotspots/').then(r => setHotspots(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Public WiFi Management</h2>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('sessions')} className={`px-4 py-2 rounded-lg ${tab==='sessions' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>Usage Sessions</button>
        <button onClick={() => setTab('hotspots')} className={`px-4 py-2 rounded-lg ${tab==='hotspots' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>Hotspots</button>
      </div>
      {tab === 'sessions' ? (
        <div className="card">
          <table className="w-full text-sm"><thead><tr className="border-b"><th className="text-left py-3 px-4">User ID</th><th className="text-left py-3 px-4">Data Used (MB)</th><th className="text-left py-3 px-4">Status</th><th className="text-left py-3 px-4">Started</th></tr></thead>
            <tbody>{sessions.map(s => <tr key={s.id} className="border-b"><td className="py-2 px-4">{s.user_id}</td><td className="py-2 px-4">{s.data_used_mb}</td><td className="py-2 px-4">{s.is_active ? <span className="text-green-600">Active</span> : <span className="text-gray-400">Ended</span>}</td><td className="py-2 px-4">{new Date(s.session_start).toLocaleString()}</td></tr>)}</tbody>
          </table>
        </div>
      ) : (
        <div>
          <form onSubmit={handleCreate} className="card mb-4 space-y-3">
            <input className="input-field" placeholder="Hotspot Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <div className="flex gap-3"><input className="input-field" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /><input className="input-field" placeholder="Village" value={form.village} onChange={e => setForm({...form, village: e.target.value})} /></div>
            <button type="submit" className="btn-primary">Add Hotspot</button>
          </form>
          <div className="grid grid-cols-2 gap-3">{hotspots.map(h => <div key={h.id} className="card"><div className="flex items-center gap-2"><svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415z" clipRule="evenodd" /></svg><span className="font-semibold">{h.name}</span></div><p className="text-xs text-gray-500 mt-1">{h.location} | {h.village}</p></div>)}</div>
        </div>
      )}
    </div>
  )
}