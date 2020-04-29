import { ResolversBundle } from './ResolversBundle'

export interface INewsScraperConfig {
  name: String;
  base_url: String;
  resolvers: ResolversBundle;
  paginator: any;
}
