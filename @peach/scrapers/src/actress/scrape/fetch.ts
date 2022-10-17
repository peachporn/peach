import { load } from 'cheerio';
import puppeteer from 'puppeteer';

export const html = async (url: string, readySelector: string = 'body') => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'google-chrome-stable',
  });

  const page = await browser.newPage();
  const response = await page.goto(url);
  if (response.status() === 404) return;
  await page.waitForSelector(readySelector, { timeout: 4000 }).catch(console.error);

  const body = await page.evaluate(() => document.querySelector('body')?.innerHTML ?? '');
  return browser.close().then(() => load(body));
};
