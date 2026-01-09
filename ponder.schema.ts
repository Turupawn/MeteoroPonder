import { onchainTable } from "ponder";

// VRF-based game tracking (new contract)
export const gameRequests = onchainTable("gameRequests", (t) => ({
  id: t.bigint().primaryKey(), // gameId
  player: t.text().notNull(),
  requestId: t.bigint().notNull(),
  betAmount: t.bigint().notNull(),
  requestTimestamp: t.bigint().notNull(),
  gasUsed: t.bigint(),
}));

export const gameCompletions = onchainTable("gameCompletions", (t) => ({
  id: t.bigint().primaryKey(), // gameId
  player: t.text().notNull(),
  playerCard: t.bigint().notNull(),
  houseCard: t.bigint().notNull(),
  winner: t.text().notNull(), // player address, contract address, or 0x0 for tie
  payout: t.bigint().notNull(),
  completedTimestamp: t.bigint().notNull(),
  gasUsed: t.bigint(),
}));

export const gameTies = onchainTable("gameTies", (t) => ({
  id: t.bigint().primaryKey(), // gameId
  player: t.text().notNull(),
  playerCard: t.bigint().notNull(),
  houseCard: t.bigint().notNull(),
  tieReward: t.bigint().notNull(),
  gasUsed: t.bigint(),
}));
