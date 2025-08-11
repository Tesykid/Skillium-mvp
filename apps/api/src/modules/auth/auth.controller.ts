import { Controller, Get, Post, Query, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  getNonce(@Query('address') address: string) {
    return this.authService.issueNonce(address)
  }

  @Post('login')
  async login(@Body() body: { address: string; signature: string }) {
    return this.authService.login(body.address, body.signature)
  }
}