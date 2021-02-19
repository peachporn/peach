export const formatDateForInput = (date: Date | string) =>
  new Date(date).toISOString().split('T')[0];

export const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat('de-DE').format(new Date(date));
