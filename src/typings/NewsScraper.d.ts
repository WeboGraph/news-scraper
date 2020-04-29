import { IResolversBundle } from './ResolversBundle'

export interface INewsScraperConfig {
  name: String;
  base_url: String;
  resolvers: IResolversBundle;
  paginator: any;
}
