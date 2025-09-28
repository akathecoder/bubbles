import { Hono } from "hono";
import type { Selectable } from "kysely";

import { createKysely } from "../db/kysely.js";
import type { Txn, TxnInKysely } from "../models.js";

const txnRoutes = new Hono();

const ALLOWED_FILTERS = new Set<keyof TxnInKysely>([
  "id",
  "fromEns",
  "toEns",
  "bubbleAmount",
  "usdAmount",
  "message",
  "createdAt",
]);

txnRoutes.get("/read", async (c) => {
  try {
    const db = createKysely();
    const queryParams = c.req.query();

    let query = db.selectFrom("txns").selectAll();

    for (const [key, rawValue] of Object.entries(queryParams)) {
      if (!ALLOWED_FILTERS.has(key as keyof TxnInKysely)) {
        return c.json(
          { message: `Unsupported filter: ${key}` },
          400
        );
      }

      if (rawValue == null || rawValue.trim() === "") {
        continue;
      }

      const value = rawValue.trim();

      switch (key as keyof TxnInKysely) {
        case "id": {
          const parsed = Number(value);
          if (!Number.isInteger(parsed)) {
            return c.json({ message: "Invalid id filter" }, 400);
          }
          query = query.where("id", "=", parsed);
          break;
        }
        case "bubbleAmount": {
          const parsed = Number(value);
          if (!Number.isFinite(parsed)) {
            return c.json({ message: "Invalid bubbleAmount filter" }, 400);
          }
          query = query.where("bubbleAmount", "=", parsed);
          break;
        }
        case "usdAmount": {
          const parsed = Number(value);
          if (!Number.isFinite(parsed) || parsed <= 0) {
            return c.json({ message: "Invalid usdAmount filter" }, 400);
          }
          query = query.where("usdAmount", "=", value);
          break;
        }
        case "createdAt": {
          const parsed = new Date(value);
          if (Number.isNaN(parsed.getTime())) {
            return c.json({ message: "Invalid createdAt filter" }, 400);
          }
          query = query.where("createdAt", "=", parsed);
          break;
        }
        case "fromEns": {
          query = query.where("fromEns", "=", value);
          break;
        }
        case "toEns": {
          query = query.where("toEns", "=", value);
          break;
        }
        case "message": {
          query = query.where("message", "=", value);
          break;
        }
        default: {
          return c.json({ message: `Unsupported filter: ${key}` }, 400);
        }
      }
    }

    const rows = await query.orderBy("createdAt", "desc").execute();
    const txns = rows.map(transformTxn);

    return c.json({ data: txns });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch transactions";
    return c.json({ message }, 500);
  }
});

function transformTxn(record: Selectable<TxnInKysely>): Txn {
  return {
    id: record.id,
    fromEns: record.fromEns,
    toEns: record.toEns,
    bubbleAmount: record.bubbleAmount,
    usdAmount: record.usdAmount,
    message: record.message ?? undefined,
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : new Date(record.createdAt).toISOString(),
  };
}

export default txnRoutes;
