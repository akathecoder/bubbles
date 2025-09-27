import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import routes from "./routes/index.js";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (c) => {
  return c.json({ message: "🫧🫧🫧" });
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.route("/api", routes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
