import { screencapPath } from "@/lib/env/library";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const dynamic = "force-dynamic";

const app = new Hono();

app.use("/assets/screencaps/:movieId/:screencap", async (c, next) =>
  serveStatic({ root: screencapPath })(c, next)
);

export const GET = handle(app);
