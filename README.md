# singularity

Quick start:

1. Install deps
   - Root: `npm install`
   - Bot: `cd bot && npm install`

2. Copy `.env.example` to `.env` and fill RPC URLs, PRIVATE_KEY, BOT_PRIVATE_KEY, TRADE_EXECUTOR_ADDRESS after deploy.

3. Compile contracts:
   npm run compile

4. Deploy to testnet:
   npm run deploy:testnet

5. Copy deployed TradeExecutor address into `.env` as TRADE_EXECUTOR_ADDRESS.

6. Run bot (in dev):
   npm run bot:start
 