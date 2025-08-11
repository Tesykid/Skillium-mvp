import { Body, Controller, Post } from '@nestjs/common'
import { RatingsService } from './ratings.service'

@Controller('rating')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() body: any) {
    return this.ratingsService.create(body)
  }
}