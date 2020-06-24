export const formatMeasurements = (measurements: Measurements, delimiter: string = '-') =>
  [measurements.bust, measurements.hips, measurements.waist].join(delimiter);
