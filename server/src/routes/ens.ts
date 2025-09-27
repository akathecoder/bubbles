import { Hono } from "hono";
import type { Hex } from "viem";
import {
  getEnsAddressUsingCCIPLookup,
  getName,
  getNames,
  setName,
} from "../services/ens_lookup.js";

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

    const addr = await getEnsAddressUsingCCIPLookup(name as Hex, data as Hex);

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

ensRoutes.get("/get/:name", (c) => {
  const { name } = c.req.param();
  const response = getName(name);
  return c.json({ response });
});

ensRoutes.get("/names", (c) => {
  const res = getNames();
  return c.json({ res });
});

ensRoutes.post("/set", setName);

export default ensRoutes;
