import Fetch from './utils/fetch';
import ParseHTML from './utils/parse';

export default class NewsScraper {
  private current_page: number = 0;

  constructor(private config: any) {}

  private async getData(type: string, url?: string): Promise<any> {
    if (!this.config.resolvers[type]) throw new Error(`No resolvers for the type ${type}`);
    url = url || this.config.base_url;

    try {
      const html = await Fetch(url);
      const data = await ParseHTML(html, type, this.config.resolvers, this.config.base_url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getNextPage(): Promise<any> {
    return this.getData('list');
  }

  public async getSingle(url): Promise<any> {
    return this.getData('single', url);
  }
}
