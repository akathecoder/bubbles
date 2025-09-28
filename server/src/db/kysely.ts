import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { NameInKysely, TxnInKysely } from "../models.js";

export interface Database {
  names: NameInKysely;
  txns: TxnInKysely;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
    password: process.env.PG_PASSWORD,
    max: process.env.PG_MAX_CONNECTIONS
      ? parseInt(process.env.PG_MAX_CONNECTIONS)
      : 10,
  }),
});

export function createKysely(): Kysely<Database> {
  return new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });
}
