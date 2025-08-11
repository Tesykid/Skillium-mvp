import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from './profile/profile.module'
import { JobsModule } from './jobs/jobs.module'
import { RatingsModule } from './ratings/ratings.module'

@Module({
  imports: [AuthModule, ProfileModule, JobsModule, RatingsModule],
})
export class AppModule {}