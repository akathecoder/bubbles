import { serve } from "@hono/node-server";
import { Hono } from "hono";
import routes from "./routes/index.js";

const app = new Hono();

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
