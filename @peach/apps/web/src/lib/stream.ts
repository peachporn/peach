import type { ReadStream } from "node:fs";

export async function* nodeStreamToIterator(stream: ReadStream) {
  for await (const chunk of stream) {
    yield chunk;
  }
}

export function iteratorToStream(
  iterator: AsyncGenerator<ArrayBufferLike, void, unknown>
) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}

export const nodeStreamToReadableStream = (stream: ReadStream) =>
  iteratorToStream(nodeStreamToIterator(stream));
