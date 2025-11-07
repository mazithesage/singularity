import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

export function getProvider(rpcUrl?: string) {
  const url = rpcUrl || process.env.RPC_TESTNET;
  if (!url) throw new Error("RPC URL required");
  return new ethers.JsonRpcProvider(url);
}

export function getWallet(provider?: ethers.JsonRpcProvider) {
  const key = process.env.BOT_PRIVATE_KEY || process.env.PRIVATE_KEY;
  if (!key) throw new Error("BOT_PRIVATE_KEY or PRIVATE_KEY missing");
  const prov = provider || getProvider();
  return new ethers.Wallet(key, prov);
}
 