'use client'
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const metadata = {
  name: 'Skillium',
  description: 'Crypto-native P2P skill marketplace',
  url: 'https://skillium.local',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [
  {
    chainId: 80001,
    name: 'Polygon Mumbai',
    currency: 'MATIC',
    explorerUrl: 'https://mumbai.polygonscan.com',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-mumbai.g.alchemy.com/v2/your-key'
  }
]

const ethersConfig = defaultConfig({
  metadata,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
  rpcUrl: chains[0].rpcUrl
})

// Initialize once on the client
if (typeof window !== 'undefined' && projectId) {
  createWeb3Modal({ ethersConfig, chains, projectId })
}

export function WalletButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useWeb3ModalAccount()

  return (
    <button
      onClick={() => open()}
      className="px-3 py-1.5 rounded border border-neutral-700 hover:bg-neutral-800"
    >
      {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  )
}