import { createKysely } from "../../db/kysely.js";
import type { Name } from "../../models.js";
import { stringifyNameForDb } from "./utils.js";

export async function set(nameData: Name) {
  const db = createKysely();
  const body = stringifyNameForDb(nameData);

  await db
    .insertInto("names")
    .values(body)
    .onConflict((oc) => oc.column("name").doUpdateSet(body))
    .execute();
}
