import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers'
import { apiGet } from './api'

const ESCROW_ABI = [
  'function nextJobId() view returns (uint256)',
  'function createJob(address worker, uint256 amount) returns (uint256)',
  'function fundJob(uint256 jobId) payable',
  'function releaseFunds(uint256 jobId)',
  'function cancelJob(uint256 jobId)',
  'event JobCreated(uint256 indexed jobId, address indexed client, address indexed worker, uint256 amount)',
  'event JobFunded(uint256 indexed jobId, uint256 amount)',
  'event FundsReleased(uint256 indexed jobId, address indexed worker, uint256 amount)',
  'event JobCancelled(uint256 indexed jobId)'
]

export type ContractInfo = {
  network: string
  chainId: number
  contractAddress: string
  rpcUrl: string
}

export async function getContractInfo(): Promise<ContractInfo> {
  return apiGet<ContractInfo>('/contracts')
}

export async function getSignerContract() {
  const { contractAddress } = await getContractInfo()
  if (!contractAddress) throw new Error('Contract address not configured')
  // Assumes wallet already connected via Web3Modal/WalletButton
  const provider = new BrowserProvider((window as any).ethereum)
  const signer = await provider.getSigner()
  const contract = new Contract(contractAddress, ESCROW_ABI, signer)
  return { contract, signer }
}

export const toEther = (wei: bigint) => formatEther(wei)
export const toWei = (eth: string) => parseEther(eth)