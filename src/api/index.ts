import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { client, graphql } from "ponder";
import { gameRequests, gameCompletions, gameTies } from "ponder:schema";

// Helper to convert BigInt to string for JSON serialization
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      result[key] = serializeBigInt(obj[key]);
    }
    return result;
  }
  return obj;
}

const app = new Hono();

app.use("/sql/*", client({ db, schema }));

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

// REST endpoints for VRF-based game tracking
app.get("/api/games", async (c) => {
  const lastId = c.req.query("lastId");
  const limit = parseInt(c.req.query("limit") || "100", 10);

  let allResults = await db.select().from(gameRequests).orderBy(gameRequests.id);

  if (lastId) {
    allResults = allResults.filter((row: any) => {
      return BigInt(row.id.toString()) > BigInt(lastId);
    });
  }

  const results = allResults.slice(0, limit);
  return c.json(serializeBigInt(results));
});

app.get("/api/completions", async (c) => {
  const lastId = c.req.query("lastId");
  const limit = parseInt(c.req.query("limit") || "100", 10);

  let allResults = await db.select().from(gameCompletions).orderBy(gameCompletions.id);

  if (lastId) {
    allResults = allResults.filter((row: any) => {
      return BigInt(row.id.toString()) > BigInt(lastId);
    });
  }

  const results = allResults.slice(0, limit);
  return c.json(serializeBigInt(results));
});

app.get("/api/ties", async (c) => {
  const lastId = c.req.query("lastId");
  const limit = parseInt(c.req.query("limit") || "100", 10);

  let allResults = await db.select().from(gameTies).orderBy(gameTies.id);

  if (lastId) {
    allResults = allResults.filter((row: any) => {
      return BigInt(row.id.toString()) > BigInt(lastId);
    });
  }

  const results = allResults.slice(0, limit);
  return c.json(serializeBigInt(results));
});

export default app;
