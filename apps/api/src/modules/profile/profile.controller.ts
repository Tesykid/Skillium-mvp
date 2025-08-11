import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProfileService } from './profile.service'

interface ProfileBody {
  walletAddress: string
  displayName?: string
  bio?: string
  skills?: string[]
  rates?: string
  portfolio?: string[]
}

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  upsert(@Body() body: ProfileBody) {
    return this.profileService.upsert(body)
  }

  @Get(':wallet')
  get(@Param('wallet') wallet: string) {
    return this.profileService.get(wallet)
  }
}