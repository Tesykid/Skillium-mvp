import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { JobsService } from './jobs.service'

interface ListQuery { skill?: string; budgetMin?: string; budgetMax?: string }

type JobStatus = 'pending_funding' | 'funded' | 'submitted' | 'completed' | 'cancelled'
interface UpdateBody { status?: JobStatus; workerAddress?: string; onChainJobId?: number }

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.jobsService.create(body as any)
  }

  @Get()
  list(@Query() query: ListQuery) {
    return this.jobsService.list(query)
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.jobsService.get(Number(id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBody) {
    return this.jobsService.update(Number(id), body as any)
  }
}