![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Tesykid/Skillium-mvp?utm_source=oss&utm_medium=github&utm_campaign=Tesykid%2FSkillium-mvp&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

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

Also see `apps/web/.env.example` and `apps/api/.env.example` for service-specific variables.

2. Install deps (workspace root)
```bash
npm install
```

3. Start dev
```bash
npm run dev
```

### Envs
- NEXT_PUBLIC_API_BASE: e.g. http://localhost:4000/api
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: WalletConnect v2 project id
- NEXT_PUBLIC_RPC_URL: Polygon Mumbai RPC URL
- DATABASE_URL: Postgres connection string (Supabase)
- JWT_SECRET: backend JWT secret
- ALCHEMY_RPC_URL / PRIVATE_KEY: Hardhat deploy

### Pipelines
- dev: turbo run dev (parallel)
- build: turbo run build
- lint: turbo run lint

## Quick Deploy

### 1) Deploy Escrow (Polygon Mumbai)
- Set in `packages/contracts/.env`:
  - `ALCHEMY_RPC_URL`
  - `PRIVATE_KEY`
- Deploy:
```
cd packages/contracts
npx hardhat run scripts/deploy.ts --network polygon_mumbai
```
- Copy printed address to `apps/api/.env` as `CONTRACT_ADDRESS`.

### 2) Deploy API (Render)
- Use `render.yaml` (root) → New Blueprint in Render
- Set env vars:
  - `PORT=4000`
  - `ALCHEMY_RPC_URL`
  - `CONTRACT_ADDRESS`
  - `JWT_SECRET`
- Health: `/api/health`

### 3) Deploy Web (Vercel)
- Import repo → select `apps/web`
- Set env vars:
  - `NEXT_PUBLIC_API_BASE=https://your-api.onrender.com/api`
  - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
  - `NEXT_PUBLIC_RPC_URL`

## Local Run
- API: `cd apps/api && npm run dev`
- Web: `cd apps/web && npm run dev`

## Notes
- API binds 0.0.0.0:4000 and has `/api/health`
- Contracts listener updates job status from chain events
