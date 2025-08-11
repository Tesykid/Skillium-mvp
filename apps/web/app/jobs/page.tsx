export const dynamic = 'force-dynamic'

import { apiGet } from '../../lib/api'

type Job = {
  id: number
  title: string
  description: string
  budget: string
  status: string
}

export default async function JobsPage() {
  const jobs = await apiGet<Job[]>('/jobs')
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>
      <div className="space-y-3">
        {jobs.map((j) => (
          <a key={j.id} href={`/jobs/${j.id}`} className="block p-4 rounded border border-neutral-800 hover:bg-neutral-900">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{j.title}</h3>
              <span className="text-sm text-neutral-400">{j.status}</span>
            </div>
            <p className="text-neutral-300 text-sm mt-1 line-clamp-2">{j.description}</p>
            <div className="text-sm mt-2">Budget: {j.budget} MATIC</div>
          </a>
        ))}
      </div>
    </div>
  )
}