import { notFound } from 'next/navigation'
import { apiGet } from '../../../lib/api'
import JobActions from '../../../components/JobActions'

async function getJob(id: string) {
  const job = await apiGet<any>(`/jobs/${id}`)
  if (!job) notFound()
  return job
}

export default async function JobDetail({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-neutral-300">{job.description}</p>
      <div>Budget: {job.budget} MATIC</div>
      <div>Status: {job.status}</div>
      <JobActions job={job} />
    </div>
  )
}