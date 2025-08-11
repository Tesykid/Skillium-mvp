import '../styles/globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const WalletButton = dynamic(() => import('../components/WalletButton').then(m => m.WalletButton), { ssr: false })
const Web3ModalProvider = dynamic(() => import('../components/Web3ModalProvider'), { ssr: false })

export const metadata: Metadata = {
  title: 'Skillium',
  description: 'Crypto-native P2P skill marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider>
          <nav className="flex items-center justify-between p-4 border-b border-neutral-800">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-semibold text-lg">Skillium</Link>
              <Link href="/jobs" className="text-sm text-neutral-300">Jobs</Link>
              <Link href="/profile" className="text-sm text-neutral-300">Profile</Link>
            </div>
            <WalletButton />
          </nav>
          <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  )
}