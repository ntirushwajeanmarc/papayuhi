import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function Citizens() {
  const [citizens, setCitizens] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/citizens/')
      .then(res => setCitizens(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Abaturage</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">ID</th>
              <th className="text-left py-3 px-4 font-medium">Amazina</th>
              <th className="text-left py-3 px-4 font-medium">Telefone</th>
              <th className="text-left py-3 px-4 font-medium">Umudugudu</th>
              <th className="text-left py-3 px-4 font-medium">Akagari</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={5} className="py-4 text-center">Loading...</td></tr> :
              citizens.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{c.national_id || c.id}</td>
                  <td className="py-3 px-4">{c.first_name} {c.last_name}</td>
                  <td className="py-3 px-4">{c.phone || '-'}</td>
                  <td className="py-3 px-4">{c.village || '-'}</td>
                  <td className="py-3 px-4">{c.cell || '-'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
