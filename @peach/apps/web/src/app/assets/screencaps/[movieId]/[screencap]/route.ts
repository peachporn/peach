import { getScreencapPath } from "@/lib/db/settings";
import { nodeStreamToReadableStream } from "@/lib/stream";
import { NextResponse, type NextRequest } from "next/server";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

export const GET = async (
  _request: NextRequest,
  { params: { movieId, screencap } }: { params: { movieId: string; screencap: string } }
) => {
  try {
    const basePath = await getScreencapPath();

    if (!basePath) {
      return new Response("No screencap path configured!", { status: 400 });
    }

    const screencapPath = path.join(basePath, movieId, screencap);

    if (!existsSync(screencapPath)) {
      return new Response("Screencap not found!", { status: 404 });
    }

    return new NextResponse(nodeStreamToReadableStream(createReadStream(screencapPath)), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while fetching the screencap!", {
      status: 500,
    });
  }
};
