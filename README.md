# Singularity

A decentralized trading bot system built on Ethereum, featuring smart contract-based trade execution and an automated trading bot. Designed for deployment on Monad network.

## Overview

Singularity consists of two main components:
- **Smart Contracts**: Secure on-chain trade execution with access controls
- **Trading Bot**: Automated off-chain bot that monitors opportunities and executes trades

## Features

- **TradeExecutor Contract**: Permissioned trade execution with pause functionality and reentrancy protection
- **SimpleOrderBook Contract**: On-chain order book for managing buy/sell orders
- **Automated Trading Bot**: Configurable bot that executes trades based on market signals
- **Security**: Built with OpenZeppelin contracts, includes access control and safety checks


## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Ethereum wallet
- RPC endpoint for Monad network

## Installation

### 1. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install bot dependencies:
```bash
cd bot && npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory with the following variables:

```bash
# Network RPC URLs
MONAD_TESTNET_RPC_URL=your_monad_testnet_rpc_url
MONAD_MAINNET_RPC_URL=your_monad_mainnet_rpc_url

# Deployment wallet private key
PRIVATE_KEY=your_deployer_private_key

# Bot wallet private key
BOT_PRIVATE_KEY=your_bot_private_key

# Contract address (filled after deployment)
TRADE_EXECUTOR_ADDRESS=
```

## Deployment

### Compile Contracts

```bash
npm run compile
```

### Deploy to Testnet

```bash
npm run deploy:testnet
```

### Deploy to Mainnet

```bash
npm run deploy:mainnet
```

After deployment, copy the `TradeExecutor` contract address and add it to your `.env` file as `TRADE_EXECUTOR_ADDRESS`.

## Running the Bot

### Development Mode

```bash
npm run bot:start
```

The bot will start monitoring for trading opportunities and execute trades automatically.


## Smart Contracts

### TradeExecutor

The main contract for executing trades with the following features:
- Executor permission management (only authorized addresses can execute)
- Emergency pause functionality
- Reentrancy protection
- Event logging for all trades

### SimpleOrderBook

A simple order book implementation:
- Place limit orders
- Cancel orders
- Query order status
- View all orders

## Testing

Run the test suite:
```bash
npm test
```



