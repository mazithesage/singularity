import { ethers } from "ethers";
import { config } from "./config";
import abi from "../artifacts/contracts/TradeExecutor.sol/TradeExecutor.json" assert { type: "json" };

export const provider = new ethers.JsonRpcProvider(config.rpcUrl);
export const wallet = new ethers.Wallet(config.privateKey, provider);
export const tradeExecutor = new ethers.Contract(config.contractAddress, abi.abi, wallet);
