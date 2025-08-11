'use client'
import { useState } from 'react'
import { getSignerContract, toWei } from '../lib/contracts'
import { apiPatch } from '../lib/api'

export default function JobActions({ job }: { job: any }) {
  const [loading, setLoading] = useState<string | null>(null)

  async function fund() {
    setLoading('fund')
    try {
      const { contract } = await getSignerContract()
      const value = toWei(job.budget)
      const tx = await contract.fundJob(job.id, { value })
      await tx.wait()
      await apiPatch(`/jobs/${job.id}`, { status: 'funded' })
      window.location.reload()
    } finally {
      setLoading(null)
    }
  }

  async function release() {
    setLoading('release')
    try {
      const { contract } = await getSignerContract()
      const tx = await contract.releaseFunds(job.id)
      await tx.wait()
      await apiPatch(`/jobs/${job.id}`, { status: 'completed' })
      window.location.reload()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={fund} className="px-4 py-2 rounded bg-indigo-600 disabled:opacity-50" disabled={loading !== null}>
        {loading === 'fund' ? 'Funding…' : 'Hire & Fund'}
      </button>
      <button onClick={release} className="px-4 py-2 rounded bg-emerald-600 disabled:opacity-50" disabled={loading !== null}>
        {loading === 'release' ? 'Releasing…' : 'Release Funds'}
      </button>
    </div>
  )
}