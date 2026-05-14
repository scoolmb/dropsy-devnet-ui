# 🪂 Dropsy Devnet Playground

A developer-focused UI for testing Dropsy token distribution Layer on Solana Devnet.

This interface allows you to experiment with airdrops, merkle-based claims, and advanced distribution logic before deploying to mainnet.

---

## 🧱 Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- @solana/kit
- @dropsy/airdrop

## ⚡ Features

### **Create Airdrop Master**

- Advanced configuration layer
- Fee management (claim / delegate)
- Designed for scalable distribution systems

### **Create Airdrop**

- Create an Airdrop account pda and store configs
- Configure parameters and schedules
- Deposit Tokens to be airdroped
- Create the ClaimMap account ( used to track claimed positions and prevent double claim )

### **Merkle Tree Builder**

A utility built with Dropsy to facilitate merkle-based airdrop distribution workflows on Solana.

This tool helps developers efficiently generate all required data for claim-based airdrops.

- Generate the **Merkle Root** required during airdrop account initialization
- Generate the **Eligibility List** for the airdrop
- Generate **Merkle Proofs** required during on-chain claim validation
- Include each wallet’s:
  - Allocation amount
  - Claim index
  - Merkle proof

Designed to simplify scalable and verifiable token distribution systems.

---

## 🧪 Environment

- Solana **Devnet only**
- No real funds required
- Built for testing, experimentation, and prototyping
- Powered by **@solana/kit** for core Solana interactions  
  and **@dropsy/airdrop** Token distribution Layer on Solana.

---

## Run it on Your Machine

### Clone the repository

```bash
git clone https://github.com/scoolmb/dropsy-devnet-ui.git

```

### Navigate into the project

```bash
cd dropsy-devnet-ui

```

### Install dependencies

```bash
npm install

```

### Start the development server

```bash
npm run dev

```
