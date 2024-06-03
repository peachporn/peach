import { getScreencapPath } from "@/lib/db/settings";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const dynamic = "force-dynamic";

const app = new Hono();

app.use("/assets/screencaps/:movieId/:screencap", async (c, next) => {
  const basePath = await getScreencapPath();

  if (!basePath) {
    c.status(400);
    return c.body("No screencap path configured!");
  }

  return serveStatic({ root: basePath })(c, next);
});

export const GET = handle(app);
