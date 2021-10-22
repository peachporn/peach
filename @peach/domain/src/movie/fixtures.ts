export const movieFormats = ['mp4', 'avi', 'wmv', 'mkv'] as const;
export type MovieFormat = typeof movieFormats[number];
export const isFormatSupported = (format: string): format is MovieFormat =>
  (movieFormats as unknown as string[]).includes(format);

export const movieQualities = ['SD', 'HD', 'FullHD', 'UHD'] as const;
export type MovieQuality = typeof movieQualities[number];
