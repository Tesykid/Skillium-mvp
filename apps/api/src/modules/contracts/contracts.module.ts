import { Module } from '@nestjs/common'
import { ContractsController } from './contracts.controller'
import { ContractsListener } from './contractsListener.service'
import { JobsModule } from '../jobs/jobs.module'

@Module({
  imports: [JobsModule],
  controllers: [ContractsController],
  providers: [ContractsListener],
})
export class ContractsModule {}