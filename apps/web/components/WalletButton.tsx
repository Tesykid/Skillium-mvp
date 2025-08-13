'use client'
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'

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