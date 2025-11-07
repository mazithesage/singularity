import { ethers } from "ethers";
import { tradeExecutor } from "./client";

interface Trade {
  tokenIn: string;
  tokenOut: string;
  recipient: string;
  amountIn: string;
  metadata: string;
}

export class TradingBot {
  private isRunning = false;

  constructor() {}

  async executeTrade(trade: Trade) {
    console.log(`[BOT] Executing trade: ${trade.metadata}`);
    try {
      const tx = await tradeExecutor.executeTrade(
        trade.tokenIn,
        trade.tokenOut,
        trade.recipient,
        ethers.parseEther(trade.amountIn),
        ethers.toUtf8Bytes(trade.metadata)
      );

      const receipt = await tx.wait();
      console.log(`[BOT] ✅ Trade executed: ${receipt.transactionHash}`);
    } catch (err) {
      console.error(`[BOT] ❌ Trade failed: ${err}`);
    }
  }

  async start() {
    this.isRunning = true;
    console.log("[BOT] Started. Listening for trading opportunities...");

    // Example loop (replace with real logic later)
    while (this.isRunning) {
      const simulatedSignal = Math.random() > 0.8; // 20% chance trigger
      if (simulatedSignal) {
        await this.executeTrade({
          tokenIn: "0x0000000000000000000000000000000000000000",
          tokenOut: "0x0000000000000000000000000000000000000000",
          recipient: "0xYourWalletAddress",
          amountIn: "0.01",
          metadata: "Test Trade"
        });
      }

      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  stop() {
    this.isRunning = false;
    console.log("[BOT] Stopped.");
  }
}
