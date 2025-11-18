import { createConfig } from "ponder";

import { ExampleContractAbi } from "./abis/ExampleContractAbi";

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL_1!,
    },
    rise: {
      id: 11155931,
      rpc: process.env.INDEXER_RPC_URL!,
    },
  },
  contracts: {
    ExampleContract: {
      chain: "rise",
      abi: ExampleContractAbi,
      address: process.env.CONTRACT_ADDRESS! as `0x${string}`,
      startBlock: 26493436,
      includeTransactionReceipts: true,
    },
  },
});
