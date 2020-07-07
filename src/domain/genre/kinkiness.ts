export type KinkScoreScale = 'genre' | 'movie';

export type KinkScore =
  | 'SOFTCORE'
  | 'EROTIC'
  | 'JUICY'
  | 'HARDCORE'
  | 'KINKY'
  | 'FETISH'
  | 'EXTREME'
  | 'KINKYNESS';

const movieScale = [0, 50, 100, 150, 200, 250, 300];
const genreScale = [0, 5, 10, 15, 20, 25, 30];

export const kinkinessRating = (value: number, scale: KinkScoreScale): KinkScore => {
  const scaleValues = scale === 'movie' ? movieScale : genreScale;
  if (value < scaleValues[1] && value > scaleValues[0]) {
    return 'SOFTCORE';
  }
  if (value >= scaleValues[1] && value < scaleValues[2]) {
    return 'EROTIC';
  }
  if (value >= scaleValues[2] && value < scaleValues[3]) {
    return 'JUICY';
  }
  if (value >= scaleValues[3] && value < scaleValues[4]) {
    return 'HARDCORE';
  }
  if (value >= scaleValues[4] && value < scaleValues[5]) {
    return 'KINKY';
  }
  if (value >= scaleValues[5] && value < scaleValues[6]) {
    return 'FETISH';
  }
  if (value > scaleValues[6]) {
    return 'EXTREME';
  }
  return 'KINKYNESS';
};
