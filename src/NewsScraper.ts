import Fetch from './utils/fetch';
import ParseHTML from './utils/parse';
import { INewsScraperConfig } from './typings/NewsScraper';

export default class NewsScraper {
  private current_page: number = 0;
  private nextListURL: string;

  constructor(private config: INewsScraperConfig) {
    this.nextListURL = this.config.list_base_url;
  }

  /**
   * Get the name of the scraper
   *
   * @returns {string} conifg.name
   * @memberof NewsScraper
   */
  public getName(): string {
    return this.config.name;
  }

  /**
   * Get the base url of the scraper
   *
   * @returns {string} config.base_url
   * @memberof NewsScraper
   */
  public getBaseUrl(): string {
    return this.config.base_url;
  }

  /**
   * Get the url for the next list page
   *
   * @private
   * @returns {string}
   * @memberof NewsScraper
   */
  private paginateListUrl(): void {
    const { list_base_url } = this.config;
    this.nextListURL = this.config.paginator(this.current_page, list_base_url);
    this.current_page++;
  }

  /**
   * Fetchs a page and returns parsing data
   *
   * @private
   * @param {string} type
   * @param {string} [url]
   * @returns {Promise<any>}
   * @memberof NewsScraper
   */
  private async getData(type: string, url: string): Promise<any> {
    if (!this.config.resolvers[type]) throw new Error(`No resolvers for the type ${type}`);

    try {
      const html = await Fetch(url);
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
    this.paginateListUrl();
    return this.getData('list', this.nextListURL);
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
