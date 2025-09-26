import { Hono } from "hono";

const ensRoutes = new Hono();

ensRoutes.get("/", (c) => {
  return c.json({ message: "ENS Route" });
});

ensRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default ensRoutes;
