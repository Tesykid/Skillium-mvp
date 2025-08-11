import { Injectable } from '@nestjs/common'

export interface Rating {
  id: number
  fromAddress: string
  toAddress: string
  jobId: number
  score: number
  comment?: string
}

let ratingIdSeq = 1
const ratings: Rating[] = []

@Injectable()
export class RatingsService {
  create(r: Omit<Rating, 'id'>): Rating {
    const created: Rating = { id: ratingIdSeq++, ...r }
    ratings.push(created)
    return created
  }
}