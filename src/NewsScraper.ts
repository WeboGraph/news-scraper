import Fetch from './utils/fetch';
import ParseHTML from './utils/parse';

export default class NewsScraper {
  private current_page: number = 0;

  constructor(private config: any) {}

  /**
   * Fetchs a page and returns parsing data
   *
   * @private
   * @param {string} type
   * @param {string} [url]
   * @returns {Promise<any>}
   * @memberof NewsScraper
   */
  private async getData(type: string, url?: string): Promise<any> {
    if (!this.config.resolvers[type]) throw new Error(`No resolvers for the type ${type}`);

    // ToDo: remove after pagination is added
    const sourceURL: string = url || this.config.base_url;

    try {
      const html = await Fetch(sourceURL);
      const data = await ParseHTML(html, type, this.config.resolvers, this.config.base_url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get the next list page data
   *
   * @returns {Promise<any>}
   * @memberof NewsScraper
   */
  public async getNextPage(): Promise<any> {
     // ToDo: adding logic to paginate list pages
    return this.getData('list');
  }


  /**
   *  Get the data for a single article
   *
   * @param {string} url
   * @returns {Promise<any>}
   * @memberof NewsScraper
   */
  public async getSingle(url: string): Promise<any> {
    return this.getData('single', url);
  }

  /**
   * Reset the pagination process
   *
   * @memberof NewsScraper
   */
  public resetPagination(): void {
    this.current_page = 0;
  }
}
