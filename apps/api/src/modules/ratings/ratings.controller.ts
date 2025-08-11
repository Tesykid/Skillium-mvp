import { Body, Controller, Post } from '@nestjs/common'
import { RatingsService } from './ratings.service'

interface RatingBody {
  fromAddress: string
  toAddress: string
  jobId: number
  score: number
  comment?: string
}

@Controller('rating')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() body: RatingBody) {
    return this.ratingsService.create(body)
  }
}