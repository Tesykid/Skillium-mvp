'use client'
import { useState } from 'react'
import { getSignerContract, toWei } from '../lib/contracts'
import { apiPatch } from '../lib/api'

export default function JobActions({ job }: { job: any }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [workerAddress, setWorkerAddress] = useState<string>(job.workerAddress || '')

  async function ensureOnChainJobId(): Promise<number> {
    if (job.onChainJobId && Number(job.onChainJobId) > 0) return Number(job.onChainJobId)
    if (!workerAddress) throw new Error('Worker address required')
    const { contract } = await getSignerContract()
    const nextId: bigint = await contract.nextJobId()
    const expectedId = Number(nextId + 1n)
    const tx = await contract.createJob(workerAddress, toWei(job.budget))
    await tx.wait()
    await apiPatch(`/jobs/${job.id}`, { onChainJobId: expectedId, workerAddress })
    return expectedId
  }

  async function fund() {
    setLoading('fund')
    try {
      const onChainId = await ensureOnChainJobId()
      const { contract } = await getSignerContract()
      const tx = await contract.fundJob(onChainId, { value: toWei(job.budget) })
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
      const onChainId = job.onChainJobId || (await ensureOnChainJobId())
      const { contract } = await getSignerContract()
      const tx = await contract.releaseFunds(onChainId)
      await tx.wait()
      await apiPatch(`/jobs/${job.id}`, { status: 'completed' })
      window.location.reload()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-3">
      {!job.onChainJobId && (
        <div className="flex gap-2 items-center">
          <input
            className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded w-[420px]"
            placeholder="Worker wallet address (0x...)"
            value={workerAddress}
            onChange={(e) => setWorkerAddress(e.target.value)}
          />
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={fund} className="px-4 py-2 rounded bg-indigo-600 disabled:opacity-50" disabled={loading !== null}>
          {loading === 'fund' ? 'Funding…' : job.onChainJobId ? 'Fund' : 'Create & Fund'}
        </button>
        <button onClick={release} className="px-4 py-2 rounded bg-emerald-600 disabled:opacity-50" disabled={loading !== null}>
          {loading === 'release' ? 'Releasing…' : 'Release Funds'}
        </button>
      </div>
    </div>
  )
}