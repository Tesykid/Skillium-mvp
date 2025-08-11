import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from './profile/profile.module'
import { JobsModule } from './jobs/jobs.module'
import { RatingsModule } from './ratings/ratings.module'
import { ContractsModule } from './contracts/contracts.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [AuthModule, ProfileModule, JobsModule, RatingsModule, ContractsModule, HealthModule],
})
export class AppModule {}