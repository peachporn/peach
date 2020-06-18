import fetch from 'node-fetch';
import cheerio from 'cheerio';

export const html = (url: string) =>
  fetch(url)
    .then(res => res.text())
    .then(dom => cheerio.load(dom));
