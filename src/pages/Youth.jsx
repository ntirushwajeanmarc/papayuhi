import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Youth() {
  const [trainings, setTrainings] = useState([])
  const [registrations, setRegs] = useState([])
  const [form, setForm] = useState({ title: '', description: '', category: 'Coding', instructor: '', capacity: '', location: '' })
  const [tab, setTab] = useState('trainings')
  const cats = ['Computer Skills', 'Coding', 'AI Training', 'Robotics']

  useEffect(() => { api.get('/youth/trainings/').then(r => setTrainings(r.data)).catch(()=>{}) }, [])

  const handleCreate = async e => {
    e.preventDefault()
    await api.post('/youth/trainings/', {
      ...form,
      capacity: form.capacity === '' ? null : Number(form.capacity)
    })
    api.get('/youth/trainings/').then(r => setTrainings(r.data))
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Urubyiruko Hub</h2>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('trainings')} className={`px-4 py-2 rounded-lg ${tab==='trainings' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>Trainings</button>
        <button onClick={() => setTab('add')} className={`px-4 py-2 rounded-lg ${tab==='add' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>+ Add Training</button>
      </div>
      {tab === 'trainings' ? (
        <div className="grid gap-4">{trainings.map(t => <div key={t.id} className="card"><h3 className="font-semibold">{t.title}</h3><p className="text-sm text-gray-500">{t.description}</p><div className="flex gap-2 mt-3">{t.category && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{t.category}</span>}<span className="text-xs text-gray-400">{t.instructor && `Instructor: ${t.instructor}`}</span><span className="text-xs text-gray-400">{t.location}</span></div></div>)}</div>
      ) : (
        <form onSubmit={handleCreate} className="card space-y-4">
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <textarea className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} />
          <div className="flex gap-3">
            <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>{cats.map(c => <option key={c}>{c}</option>)}</select>
            <input className="input-field" placeholder="Instructor" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} />
          </div>
          <div className="flex gap-3"><input className="input-field" placeholder="Capacity" type="number" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} /><input className="input-field" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
          <button type="submit" className="btn-primary">Create Training</button>
        </form>
      )}
    </div>
  )
}