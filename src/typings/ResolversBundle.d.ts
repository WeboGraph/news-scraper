type SelectorsObject = {
  [key: string]: string;
}

export type Selectors = {
  list?: SelectorsObject;
  single?: SelectorsObject;
}

type ResolversObject = {
  [key: string]: Function;
}

export type Resolvers = {
  list?: ResolversObject;
  single?: ResolversObject;
}

export type ResolverBundle = [String, String, Function];

export type ResolversBundle = {
  list_item: string;
  list: ResolverBundle[];
  single: ResolverBundle[];
}
