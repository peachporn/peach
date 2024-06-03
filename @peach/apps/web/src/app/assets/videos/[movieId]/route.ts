import { moviePathForId } from "@/lib/db/movies/path";
import { nodeStreamToReadableStream } from "@/lib/stream";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

export const dynamic = "force-dynamic";

const mime: Map<string, string> = new Map();
mime.set("mp4", "video/mp4");
mime.set("wmv", "video/x-ms-wmv");
mime.set("avi", "video/x-msvideo");

const getPositions = (range: string = "0-", fileSize: number) => {
  const positions = range.replace(/bytes=/, "").split("-");
  const start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;

  return { start, end, chunkSize: end - start + 1 };
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const movieId = parseInt(req.nextUrl.pathname.split("/")[3], 10);
  const moviePath = await moviePathForId(movieId);

  if (!moviePath) {
    return new Response("Not found", { status: 404 });
  }

  const exists = await stat(moviePath).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return undefined;
    throw error;
  });
  if (!exists) {
    return new Response("Not found", { status: 404 });
  }

  const stats = await stat(moviePath).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return undefined;
    throw error;
  });

  if (!stats) {
    return new Response("Not found", { status: 404 });
  }

  const range = req.headers.get("range") ?? "0-";
  const { start, end, chunkSize } = getPositions(range, stats.size);
  const contentType = mime.get(moviePath.split(".")[1] ?? "mp4") ?? "video/mp4";

  return new Response(nodeStreamToReadableStream(createReadStream(moviePath, { start, end })), {
    status: 206,
    headers: new Headers({
      "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": `${chunkSize}`,
      "Content-Type": contentType,
    }),
  });
};
