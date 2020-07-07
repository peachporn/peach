export const diffYears = (a: Date, b: Date) => a.getFullYear() - b.getFullYear();

export const age = (dateOfBirth: Date) => diffYears(new Date(), dateOfBirth);

export const format = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);

export const formatValue = (date: Date) =>
  [
    new Intl.DateTimeFormat('default', { year: 'numeric' }).format(date),
    new Intl.DateTimeFormat('default', { month: '2-digit' }).format(date),
    new Intl.DateTimeFormat('default', { day: '2-digit' }).format(date),
  ].join('-');
