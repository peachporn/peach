export const slugifyActressName = (name: string, aliases?: string[]): string =>
  `${name.replace(/\W/g, '').toLowerCase()}${
    !aliases?.filter(a => a !== '').length
      ? ''
      : `-${aliases.map(a => slugifyActressName(a)).join('-')}`
  }`;
