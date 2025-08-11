import { Injectable } from '@nestjs/common'

export interface Profile {
  walletAddress: string
  displayName?: string
  bio?: string
  skills?: string[]
  rates?: string
  portfolio?: string[]
}

const profiles = new Map<string, Profile>()

@Injectable()
export class ProfileService {
  upsert(profile: Profile) {
    profiles.set(profile.walletAddress.toLowerCase(), profile)
    return profile
  }

  get(wallet: string) {
    return profiles.get(wallet.toLowerCase()) || null
  }
}