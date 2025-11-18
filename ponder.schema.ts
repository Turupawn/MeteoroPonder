import { onchainTable } from "ponder";

export const games = onchainTable("games", (t) => ({
  id: t.bigint().primaryKey(), // gameId as bigint
  player: t.text().notNull(),
  commitHash: t.text().notNull(),
  betAmount: t.bigint().notNull(),
  gasUsed: t.bigint(),
}));

export const randomnessPosts = onchainTable("randomnessPosts", (t) => ({
  id: t.bigint().primaryKey(), // gameId as bigint
  randomness: t.text().notNull(),
  timestamp: t.bigint().notNull(),
  gasUsed: t.bigint(),
}));

export const gameReveals = onchainTable("gameReveals", (t) => ({
  id: t.bigint().primaryKey(), // gameId as bigint
  player: t.text().notNull(),
  playerCard: t.bigint().notNull(),
  houseCard: t.bigint().notNull(),
  winner: t.text().notNull(),
  gasUsed: t.bigint(),
}));
