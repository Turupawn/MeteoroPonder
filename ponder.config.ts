import { createConfig, rateLimit } from "ponder";
import { http } from "viem";

import { ExampleContractAbi } from "./abis/ExampleContractAbi";

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL_1!,
    },
    rise: {
      id: 11155931,
      rpc: rateLimit(http(process.env.INDEXER_RPC_URL!), {
        requestsPerSecond: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_SECOND || "25", 10),
      }),
    },
  },
  contracts: {
    ExampleContract: {
      chain: "rise",
      abi: ExampleContractAbi,
      address: process.env.CONTRACT_ADDRESS! as `0x${string}`,
      startBlock: 32812091,
      includeTransactionReceipts: true,
    },
  },
});
