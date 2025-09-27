import { Hono } from "hono";
import { decodeFunctionData, type Hex } from "viem";

const ensRoutes = new Hono();

ensRoutes.get("/", (c) => {
  return c.json({ message: "ENS Route" });
});

ensRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

const RESOLVE_ABI = [
  {
    inputs: [
      { internalType: "bytes", name: "name", type: "bytes" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "resolve",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
];

ensRoutes.get("/lookup/:name/:data", (c) => {
  const { name, data } = c.req.param();

  console.log(`Looking up ENS name: ${name} with data: ${data}`);

  try {
    const decoded = decodeFunctionData({
      abi: RESOLVE_ABI,
      data: data as Hex,
    });
    console.log(`Decoded function data: ${JSON.stringify(decoded)}`);
  } catch (error) {
    console.error(`Error decoding function data: ${error}`);
    return c.json(
      {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "0xadr",
          },
        },
      },
      400
    );
  }

  return c.json({
    type: "object",
    properties: {
      data: {
        type: "string",
        description: "0xfoundme",
      },
    },
  });
});

export default ensRoutes;
