/**
 * Shared types for the modular changelog system.
 *
 * Each product (NextGen, Legacy, Riverology, and future Pro/Lite/River 3)
 * has its own data file that exports a single ProductChangelog object.
 * The changelog page imports them all and renders dynamically.
 */

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  tag?: 'latest' | 'major' | 'fix';
  highlights?: string[];
  sections: { heading: string; items: string[] }[];
};

export type ProductChangelog = {
  product: string;
  icon: string;
  accent: string;
  entries: ChangelogEntry[];
};
