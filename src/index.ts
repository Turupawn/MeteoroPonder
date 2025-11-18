import { ponder } from "ponder:registry";
import { games, randomnessPosts, gameReveals } from "ponder:schema";

ponder.on("ExampleContract:GameCreated", async ({ event, context }) => {
  await context.db.insert(games).values({
    id: event.args.gameId,
    player: event.args.player,
    commitHash: event.args.commitHash,
    betAmount: event.args.betAmount,
    gasUsed: event.transactionReceipt.gasUsed,
  });
});

ponder.on("ExampleContract:HouseRandomnessPosted", async ({ event, context }) => {
  await context.db.insert(randomnessPosts).values({
    id: event.args.gameId,
    randomness: event.args.randomness,
    timestamp: event.args.timestamp,
    gasUsed: event.transactionReceipt.gasUsed,
  });
});

ponder.on("ExampleContract:GameRevealed", async ({ event, context }) => {
  await context.db.insert(gameReveals).values({
    id: event.args.gameId,
    player: event.args.player,
    playerCard: event.args.playerCard,
    houseCard: event.args.houseCard,
    winner: event.args.winner,
    gasUsed: event.transactionReceipt.gasUsed,
  });
});
