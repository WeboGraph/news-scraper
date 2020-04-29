import $ from 'cheerio'

async function resolveData (html, resolvers, base_url) {
  const result = {};

  for (let [name, selector, resolver] of resolvers) {
    const element = await $(selector, html);

    if (element) {
      result[name] = await resolver(element, $, base_url);
    }
  }

  return result;
}

export default async function ParseHTML (html, type, resolvers, base_url) {
  if (type === 'list') {
    const { list_item, list } = resolvers;
    const items = Array.from($(list_item, html));
    const promises = items.map(item => resolveData(item, list, base_url));
    return Promise.all(promises);
  } else {
    const { single } = resolvers;
    return resolveData(html, single, base_url);
  }
}
