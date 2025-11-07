import { generateSignal } from "./strategy/simpleStrategy";
import { executeSignal } from "./engine";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const executorAddress = process.env.TRADE_EXECUTOR_ADDRESS;
  if (!executorAddress) throw new Error("TRADE_EXECUTOR_ADDRESS missing");

  console.log("Bot starting — executor:", executorAddress);

  // In production run continuously, subscribe to price feeds, etc.
  const sig = generateSignal();
  console.log("Generated signal:", sig);

  // execute with bot wallet as sender
  const recipient = process.env.BOT_WALLET_ADDRESS || (process.env.BOT_PRIVATE_KEY ? "0x" : "0x");
  const receipt = await executeSignal(
    executorAddress,
    sig.tokenIn,
    sig.tokenOut,
    recipient, 
    sig.amountIn,
    sig.metadata
  );
  console.log("Trade executed, tx receipt:", receipt.transactionHash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
