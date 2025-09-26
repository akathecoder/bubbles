import { Hono } from "hono";
import ensRoutes from "./ens.js";
import swapRoutes from "./swap.js";

const apiRoutes = new Hono();

apiRoutes.route("/ens", ensRoutes);
apiRoutes.route("/swap", swapRoutes);

apiRoutes.get("/", (c) => {
  return c.json({ message: "API Root" });
});

apiRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default apiRoutes;
