import Link from 'next/link'

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome to Skillium</h1>
      <p className="text-neutral-300">Post jobs, hire talent, and pay via on-chain escrow.</p>
      <div className="flex gap-3">
        <Link href="/jobs/new" className="px-4 py-2 rounded bg-indigo-600">Post a job</Link>
        <Link href="/jobs" className="px-4 py-2 rounded bg-neutral-800">Browse jobs</Link>
      </div>
    </div>
  )
}