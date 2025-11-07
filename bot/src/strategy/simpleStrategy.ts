export type Signal = {
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  metadata?: string;
};

export function generateSignal(): Signal {
  // Example: in production read from indicators / backtests / orderbook
  return {
    tokenIn: "0x0000000000000000000000000000000000000000",
    tokenOut: "0x0000000000000000000000000000000000000000",
    amountIn: 1n * 10n ** 18n,
    metadata: "simple test"
  };
}
 