export default function NewJobPage() {
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Post a new job</h2>
      <form className="space-y-3">
        <input className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Title" />
        <textarea className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Description" rows={5} />
        <div className="flex gap-3">
          <input className="w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Budget (MATIC)" />
          <input className="w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="Deadline (YYYY-MM-DD)" />
        </div>
        <button type="button" className="px-4 py-2 rounded bg-indigo-600">Create</button>
      </form>
    </div>
  )
}