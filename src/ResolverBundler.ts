import { Selectors, Resolvers, ResolversObject, ResolverBundle, ResolversBundle} from './typings/ResolversBundle'

export default function CreateResolverBundles(selectors: Selectors, resolvers: Resolvers): ResolversBundle {
  const bundle: ResolversBundle = {
    list_item: '',
    list: [],
    single: []
  };

  for (let [typeName, typeSelectors] of Object.entries(selectors)) {
    if (typeName === 'default') continue;
    const typeResolvers: ResolversObject = resolvers[typeName];
    const typeBundle: ResolverBundle[] = [];

    for (let selectorArr of Object.entries(typeSelectors)) {
      const [name, selector] = selectorArr;
      if (typeName === 'list' && name === 'item') {
        bundle['list_item'] = selector;
        continue;
      }

      if (!(name in typeResolvers)) continue;

      typeBundle.push([name, selector, typeResolvers[name]]);
    }

    bundle[typeName] = typeBundle;
  }

  return bundle;
}
