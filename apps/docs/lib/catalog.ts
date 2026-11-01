import data from './catalog.json';
export const catalog = data;
export const categories = ['Actions', 'Feedback', 'Forms', 'Layout', 'Media', 'Overlays', 'Typography'];
export type CatalogItem = typeof data[number];
