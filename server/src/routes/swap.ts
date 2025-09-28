import { Hono } from "hono";

const swapRoutes = new Hono();

swapRoutes.get("/", (c) => {
  return c.json({ message: "Swap Route" });
});

swapRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default swapRoutes;
