import { ponder } from "ponder:registry";
import { gameRequests, gameCompletions, gameTies } from "ponder:schema";

// VRF-based event handlers (new contract)
ponder.on("ExampleContract:GameRequested", async ({ event, context }) => {
  await context.db.insert(gameRequests).values({
    id: event.args.gameId,
    player: event.args.player,
    requestId: event.args.requestId,
    betAmount: event.args.betAmount,
    requestTimestamp: BigInt(event.block.timestamp),
    gasUsed: event.transactionReceipt.gasUsed,
  });
});

ponder.on("ExampleContract:GameCompleted", async ({ event, context }) => {
  await context.db.insert(gameCompletions).values({
    id: event.args.gameId,
    player: event.args.player,
    playerCard: event.args.playerCard,
    houseCard: event.args.houseCard,
    winner: event.args.winner,
    payout: event.args.payout,
    completedTimestamp: BigInt(event.block.timestamp),
    gasUsed: event.transactionReceipt.gasUsed,
  });
});

ponder.on("ExampleContract:GameTied", async ({ event, context }) => {
  await context.db.insert(gameTies).values({
    id: event.args.gameId,
    player: event.args.player,
    playerCard: event.args.playerCard,
    houseCard: event.args.houseCard,
    tieReward: event.args.tieReward,
    gasUsed: event.transactionReceipt.gasUsed,
  });
});
