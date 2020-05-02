import { ResolversBundle } from './ResolversBundle'

export interface INewsScraperConfig {
  name: string;
  base_url: string;
  list_base_url: string;
  resolvers: ResolversBundle;
  paginator: (page: number, base_url: string) => string;
}
