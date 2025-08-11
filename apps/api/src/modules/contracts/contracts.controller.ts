import { Controller, Get } from '@nestjs/common'

@Controller('contracts')
export class ContractsController {
  @Get()
  info() {
    return {
      network: 'polygon-amoy',
      chainId: 80002,
      contractAddress: process.env.CONTRACT_ADDRESS || '',
      rpcUrl: process.env.ALCHEMY_RPC_URL || '',
    }
  }
}