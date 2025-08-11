import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthController {
  @Get()
  get() {
    return {
      ok: true,
      env: process.env.NODE_ENV || 'development',
      contract: Boolean(process.env.CONTRACT_ADDRESS),
      rpc: Boolean(process.env.ALCHEMY_RPC_URL),
    }
  }
}