import { ethers } from "hardhat";

async function main() {
  console.log("Deploying to testnet...");
  const TradeExecutor = await ethers.getContractFactory("TradeExecutor");
  const trade = await TradeExecutor.deploy();
  await trade.deployed();
  console.log("TradeExecutor deployed to:", trade.address);

  const OrderBook = await ethers.getContractFactory("SimpleOrderBook");
  const book = await OrderBook.deploy();
  await book.deployed();
  console.log("OrderBook deployed to:", book.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
 