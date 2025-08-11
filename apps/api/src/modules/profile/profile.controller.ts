import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  upsert(@Body() body: any) {
    return this.profileService.upsert(body)
  }

  @Get(':wallet')
  get(@Param('wallet') wallet: string) {
    return this.profileService.get(wallet)
  }
}