import fetch from 'node-fetch';

function randomUserAgent(): string {
  const userAgents: string[] = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0'
  ];
  const pos: number = Math.floor(Math.random() * userAgents.length);

  return userAgents[pos];
}

export default async function (url: string): Promise<string> {
  try {
    const headers = { 'User-Agent': randomUserAgent() };
    const response = await fetch(url, { headers });
    const text: string = await response.text();
    return text;
  } catch (error) {
    throw new Error(error);
  }
}
