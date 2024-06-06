import { screencapPath } from "@/lib/env/library";
import { readFile, stat } from "fs/promises";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const pathParts = req.nextUrl.pathname.split("/");
  const movieId = parseInt(pathParts[3], 10);
  const screencap = req.nextUrl.pathname.split("/")[4];

  const path = [screencapPath, movieId, screencap].join("/").replaceAll("//", "/");

  const stats = await stat(path).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return undefined;
    throw error;
  });

  if (!stats) {
    return new Response("Not found", { status: 404 });
  }

  const contents = await readFile(path);

  return new Response(contents, {
    status: 200,
    headers: new Headers({
      "Content-Type": "image/jpeg",
    }),
  });
};
