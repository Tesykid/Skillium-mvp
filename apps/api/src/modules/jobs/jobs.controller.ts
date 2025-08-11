import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { JobsService } from './jobs.service'

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() body: any) {
    return this.jobsService.create(body)
  }

  @Get()
  list(@Query() query: any) {
    return this.jobsService.list(query)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.jobsService.update(Number(id), body)
  }
}