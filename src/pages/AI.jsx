import React, { useState } from 'react'
import { api } from '../services/api'

export default function AI() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(null)
  const [history, setHistory] = useState([])

  const handleAsk = async e => {
    e.preventDefault()
    const res = await api.post('/ai/chat', { question })
    setResponse(res.data)
    setHistory(h => [...h, res.data])
    setQuestion('')
  }

  const examples = ['Nishyura nte Mituweli?', 'Nabona nte service ya Irembo?', 'Umuganda ni ryari?']

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">AI Assistant (Future)</h2>
      <div className="card mb-6">
        <p className="text-sm text-gray-500 mb-3">Examples:</p>
        <div className="flex flex-wrap gap-2">{examples.map(e => <button key={e} onClick={() => setQuestion(e)} className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-primary-100">{e}</button>)}</div>
      </div>
      <form onSubmit={handleAsk} className="flex gap-3 mb-6">
        <input className="input-field flex-1" placeholder="Ask something..." value={question} onChange={e => setQuestion(e.target.value)} required />
        <button type="submit" className="btn-primary">Ask AI</button>
      </form>
      {response && (
        <div className="card bg-primary-50 border-primary-200">
          <p className="font-medium text-primary-800">AI Response:</p>
          <p className="mt-2">{response.answer}</p>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-6"><h3 className="font-semibold mb-3">History</h3><div className="space-y-2">{history.map((h, i) => <div key={i} className="card"><p className="text-sm font-medium">{h.question}</p><p className="text-sm text-gray-600 mt-1">{h.answer}</p></div>)}</div></div>
      )}
    </div>
  )
}