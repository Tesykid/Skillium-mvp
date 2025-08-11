import { Injectable } from '@nestjs/common'

interface Job {
  id: number
  clientAddress: string
  workerAddress?: string
  title: string
  description: string
  budget: string
  deadline?: string
  skillTags?: string[]
  status: 'pending_funding' | 'funded' | 'submitted' | 'completed' | 'cancelled'
  chainTxRefs?: string[]
}

let jobIdSeq = 1
const jobs: Job[] = []

@Injectable()
export class JobsService {
  create(job: Partial<Job>) {
    const created: Job = {
      id: jobIdSeq++,
      clientAddress: (job.clientAddress || '').toLowerCase(),
      workerAddress: job.workerAddress?.toLowerCase(),
      title: job.title || '',
      description: job.description || '',
      budget: job.budget || '0',
      deadline: job.deadline,
      skillTags: job.skillTags || [],
      status: 'pending_funding',
      chainTxRefs: [],
    }
    jobs.push(created)
    return created
  }

  list(query: { skill?: string; budgetMin?: string; budgetMax?: string }) {
    return jobs.filter((j) => {
      const skillOk = query.skill ? (j.skillTags || []).includes(query.skill) : true
      return skillOk
    })
  }

  get(id: number) {
    return jobs.find((j) => j.id === id) || null
  }

  update(id: number, changes: Partial<Job>) {
    const job = jobs.find((j) => j.id === id)
    if (!job) return null
    Object.assign(job, changes)
    return job
  }
}