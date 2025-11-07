import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const ALCHEMY_TESTNET = process.env.RPC_TESTNET || "";
const ALCHEMY_MAINNET = process.env.RPC_MAINNET || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.20" }]
  },
  networks: {
    hardhat: {},
    monadTestnet: {
      url: ALCHEMY_TESTNET,
      chainId: Number(process.env.CHAIN_ID_TESTNET || 1337),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    monadMainnet: {
      url: ALCHEMY_MAINNET,
      chainId: Number(process.env.CHAIN_ID_MAINNET || 1),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    // Configure if Monad provides a block explorer verification API
    apiKey: process.env.MONAD_EXPLORER_API_KEY || ""
  }
};

export default config;
 