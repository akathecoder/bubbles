import { Hono } from "hono";
import type { Hex } from "viem";
import { getEnsAddressUsingLookup } from "../services/ens_lookup.js";

const ensRoutes = new Hono();

ensRoutes.get("/", (c) => {
  return c.json({ message: "ENS Route" });
});

ensRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

ensRoutes.get("/lookup/:name/:data", async (c) => {
  try {
    // fyi, name is the custom ens resolver contract address
    const { name, data } = c.req.param();

    const addr = await getEnsAddressUsingLookup(name as Hex, data as Hex);

    return c.json({ data: addr });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "some error occurred";
    return c.json(
      {
        message: errorMessage,
      },
      400
    );
  }
});

export default ensRoutes;
