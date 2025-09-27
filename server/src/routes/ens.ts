import { Hono } from "hono";
import { getEnsAddressUsingLookup } from "../services/ens_lookup.js";

const ensRoutes = new Hono();

ensRoutes.get("/", (c) => {
  return c.json({ message: "ENS Route" });
});

ensRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

ensRoutes.get("/lookup/:name/:data", (c) => {
  try {
    // fyi, name is the custom ens resolver contract address
    const { name, data } = c.req.param();

    const addr = getEnsAddressUsingLookup(name, data);

    return c.json({
      type: "object",
      properties: {
        data: {
          type: "string",
          description: addr,
        },
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "some error occurred";
    return c.json(
      {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: errorMessage,
          },
        },
      },
      400
    );
  }
});

export default ensRoutes;
