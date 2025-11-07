import { TradingBot } from "./tradingBot.js";

const bot = new TradingBot();

(async () => {
  console.log("🚀 Starting Monad Trading Bot...");
  await bot.start();
})();
