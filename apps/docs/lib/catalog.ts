import data from './catalog.json';
export const catalog = data;
export const categories = ['Actions', 'Feedback', 'Forms', 'Layout', 'Media', 'Overlays', 'Typography'];
export type CatalogItem = typeof data[number];
export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  return q
    ? catalog.filter((c) =>
        `${c.title} ${c.name} ${c.category} ${c.description}`
          .toLowerCase()
          .includes(q),
      )
    : catalog;
}
