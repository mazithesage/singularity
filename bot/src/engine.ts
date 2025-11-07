import { ethers } from "ethers";
import { getWallet } from "./ethereumClient";
import * as dotenv from "dotenv";
dotenv.config();

const ABI = [
  "function executeTrade(address tokenIn, address tokenOut, address recipient, uint256 amountIn, bytes metadata) external returns (bool)",
  "function setExecutor(address exec, bool allowed) external"
];

export async function executeSignal(
  executorAddress: string,
  tokenIn: string,
  tokenOut: string,
  recipient: string,
  amountIn: bigint, 
  metadataText?: string
) {
  const provider = getWallet().provider as ethers.JsonRpcProvider;
  const wallet = getWallet(provider);
  const contract = new ethers.Contract(executorAddress, ABI, wallet);

  const metadata = metadataText ? ethers.toUtf8Bytes(metadataText) : new Uint8Array();
  const tx = await contract.executeTrade(tokenIn, tokenOut, recipient, amountIn, metadata, {
    // optional overrides (gasLimit, maxPriorityFeePerGas, etc.)
  });
  console.log("Submitted tx:", tx.hash);
  const receipt = await tx.wait();
  console.log("Receipt status:", receipt.status);
  return receipt;
}
