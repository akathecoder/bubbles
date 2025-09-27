import { createKysely } from "../../db/kysely.js";
import type { Name } from "../../models.js";
import { parseNameFromDb } from "./utils.js";

export async function get(name: string): Promise<Name | null> {
  const db = createKysely();
  const record = await db
    .selectFrom("names")
    .selectAll()
    .where("name", "=", name)
    .executeTakeFirst();

  if (!record) {
    return null;
  }

  return parseNameFromDb(record);
}
