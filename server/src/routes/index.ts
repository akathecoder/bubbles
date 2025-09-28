import { Hono } from "hono";
import ensRoutes from "./ens.js";
import swapRoutes from "./swap.js";
import txnRoutes from "./txn.js";

const apiRoutes = new Hono();

apiRoutes.route("/ens", ensRoutes);
apiRoutes.route("/swap", swapRoutes);
apiRoutes.route("/txn", txnRoutes);

apiRoutes.get("/", (c) => {
  return c.json({ message: "API Root" });
});

apiRoutes.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default apiRoutes;
