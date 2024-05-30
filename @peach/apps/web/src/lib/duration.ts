export const formatDuration = (durationSeconds: number) =>
  `${Math.floor(durationSeconds / 60)}:${durationSeconds % 60 < 10 ? `0${durationSeconds % 60}` : durationSeconds % 60}`;
