# Skillium Monorepo

Apps and packages:
- apps/web: Next.js + Tailwind + WalletConnect/Ethers
- apps/api: NestJS API (Auth, Profiles, Jobs, Ratings)
- packages/contracts: Hardhat + Escrow.sol

## Prerequisites
- Node 18+
- npm 9+

## Setup
1. Copy env file
```bash
cp .env.example .env
```

2. Install deps (workspace root)
```bash
npm install
```

3. Start dev
```bash
npm run dev
```

### Envs
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: WalletConnect v2 project id
- NEXT_PUBLIC_RPC_URL: Polygon Mumbai RPC URL
- DATABASE_URL: Postgres connection string (Supabase)
- JWT_SECRET: backend JWT secret
- ALCHEMY_RPC_URL / PRIVATE_KEY: Hardhat deploy

### Pipelines
- dev: turbo run dev (parallel)
- build: turbo run build
- lint: turbo run lint
