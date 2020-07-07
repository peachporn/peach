export const formatMeasurements = (measurements: Measurements, delimiter: string = '-') =>
  [measurements.bust, measurements.waist, measurements.hips].join(delimiter);
