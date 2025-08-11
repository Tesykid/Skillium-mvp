'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '../lib/api'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

export default function NewJobForm() {
  const { address } = useWeb3ModalAccount()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    try {
      const job = await apiPost<any>('/jobs', {
        clientAddress: address,
        title,
        description,
        budget,
        deadline,
      })
      router.push(`/jobs/${job.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <input className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="flex gap-3">
        <input className="w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Budget (MATIC)" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <input className="w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Deadline (YYYY-MM-DD)" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <button onClick={submit} disabled={loading || !address} className="px-4 py-2 rounded bg-indigo-600 disabled:opacity-50">{loading ? 'Creating…' : 'Create'}</button>
      {!address && <div className="text-sm text-red-400">Connect wallet to create a job.</div>}
    </div>
  )
}