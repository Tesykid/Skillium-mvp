'use client'
import { useEffect } from 'react'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const chains = [
  {
    chainId: 80002,
    name: 'Polygon Amoy',
    currency: 'MATIC',
    explorerUrl: 'https://amoy.polygonscan.com',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-amoy.g.alchemy.com/v2/your-key'
  }
]

const metadata = {
  name: 'Skillium',
  description: 'Crypto-native P2P skill marketplace',
  url: 'https://skillium.local',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export default function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!projectId) return
    if ((window as any).__w3m_initialized) return

    const ethersConfig = defaultConfig({
      metadata,
      enableInjected: true,
      enableEIP6963: true,
      enableCoinbase: true,
      rpcUrl: chains[0].rpcUrl
    })

    createWeb3Modal({ ethersConfig, chains, projectId })
    ;(window as any).__w3m_initialized = true
  }, [])

  return <>{children}</>
}