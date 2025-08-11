export const dynamic = 'force-dynamic'

import NewJobForm from '../../../components/NewJobForm'

export default function NewJobPage() {
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Post a new job</h2>
      <NewJobForm />
    </div>
  )
}