import { Injectable, OnModuleInit } from '@nestjs/common'
import { ethers } from 'ethers'
import { JobsService } from '../jobs/jobs.service'

type JobStatus = 'pending_funding' | 'funded' | 'submitted' | 'completed' | 'cancelled'

const ESCROW_ABI = [
  'event JobFunded(uint256 indexed jobId, uint256 amount)',
  'event FundsReleased(uint256 indexed jobId, address indexed worker, uint256 amount)',
  'event JobCancelled(uint256 indexed jobId)'
]

@Injectable()
export class ContractsListener implements OnModuleInit {
  constructor(private readonly jobs: JobsService) {}

  async onModuleInit() {
    const rpcUrl = process.env.ALCHEMY_RPC_URL
    const contractAddress = process.env.CONTRACT_ADDRESS
    if (!rpcUrl || !contractAddress) return

    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const contract = new ethers.Contract(contractAddress, ESCROW_ABI, provider)

    contract.on('JobFunded', async (onChainJobId: bigint) => {
      // naive: update first job with matching onChainJobId
      this.updateStatus(Number(onChainJobId), 'funded')
    })

    contract.on('FundsReleased', async (onChainJobId: bigint) => {
      this.updateStatus(Number(onChainJobId), 'completed')
    })

    contract.on('JobCancelled', async (onChainJobId: bigint) => {
      this.updateStatus(Number(onChainJobId), 'cancelled')
    })
  }

  private updateStatus(onChainJobId: number, status: JobStatus) {
    this.jobs.updateByOnChainJobId(onChainJobId, { status })
  }
}