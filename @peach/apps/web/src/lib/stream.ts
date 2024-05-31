import type { ReadStream } from "node:fs";

export async function* nodeStreamToIterator(stream: ReadStream) {
  // eslint-disable-next-line functional/no-loop-statements
  for await (const chunk of stream) {
    yield chunk;
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function iteratorToStream(iterator: AsyncGenerator<ArrayBufferLike, void, unknown>) {
  return new ReadableStream({
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    async pull(controller) {
      const { value, done } = await iterator.next();

      // eslint-disable-next-line functional/no-conditional-statements
      if (done) {
        controller.close();
        // eslint-disable-next-line functional/no-conditional-statements
      } else {
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}

export const nodeStreamToReadableStream = (stream: ReadStream) =>
  iteratorToStream(nodeStreamToIterator(stream));
