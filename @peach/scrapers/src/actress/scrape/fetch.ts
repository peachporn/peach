import { load } from 'cheerio';
import puppeteer from 'puppeteer';

export const html = async (url: string, readySelector: string = 'body') => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(readySelector, { timeout: 4000 }).catch(console.error);

  const body = await page.evaluate(() => document.querySelector('body')?.innerHTML ?? '');
  return browser.close().then(() => load(body));
};
