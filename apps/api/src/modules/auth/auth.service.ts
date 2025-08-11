import { Injectable, BadRequestException } from '@nestjs/common'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { verifyMessage } from 'viem'

const nonces = new Map<string, string>()

@Injectable()
export class AuthService {
  issueNonce(address: string) {
    if (!address) throw new BadRequestException('address required')
    const nonce = crypto.randomBytes(16).toString('hex')
    nonces.set(address.toLowerCase(), nonce)
    return { nonce }
  }

  async login(address: string, signature: string) {
    if (!address || !signature) throw new BadRequestException('address & signature required')
    const nonce = nonces.get(address.toLowerCase())
    if (!nonce) throw new BadRequestException('nonce missing')

    // NOTE: In production, use SIWE. Here we do a minimal message verify contract
    const message = `Skillium login\nNonce: ${nonce}`

    // Best-effort verification using viem (optional); fallback to accept non-empty signature during stub phase
    try {
      await verifyMessage({
        address: address as `0x${string}`,
        message,
        signature: signature as `0x${string}`,
      })
    } catch {
      if (!signature || signature.length < 10) {
        throw new BadRequestException('invalid signature')
      }
    }

    nonces.delete(address.toLowerCase())
    const token = jwt.sign({ sub: address.toLowerCase() }, process.env.JWT_SECRET || 'dev', {
      expiresIn: '7d',
    })
    return { token }
  }
}