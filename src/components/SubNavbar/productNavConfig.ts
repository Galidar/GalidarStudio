export interface ProductNavItem {
  label: string;
  to: string;
}

export interface ProductNav {
  name: string;
  basePath: string;
  color: string;
  items: ProductNavItem[];
}

const productNavConfig: ProductNav[] = [
  {
    name: 'Oceanology NextGen',
    basePath: '/oceanology-nextgen',
    color: '#22d3ee',
    items: [
      { label: 'Introduction', to: '/oceanology-nextgen' },
      { label: 'QuadTree', to: '/oceanology-nextgen/NextGenQuadTree' },
      { label: 'Buoyancy', to: '/oceanology-nextgen/NextGenBuoyancy' },
      { label: 'Audio', to: '/oceanology-nextgen/NextGenAudio' },
      { label: 'Caustics', to: '/oceanology-nextgen/NextGenCaustics' },
      { label: 'Foam', to: '/oceanology-nextgen/NextGenFoam' },
      { label: 'RVT', to: '/oceanology-nextgen/NextGenRVT' },
      { label: 'Presets', to: '/oceanology-nextgen/NextGenPreset' },
    ],
  },
  {
    name: 'Oceanology Legacy',
    basePath: '/oceanology-legacy',
    color: '#38bdf8',
    items: [
      { label: 'Introduction', to: '/oceanology-legacy' },
    ],
  },
  {
    name: 'Riverology',
    basePath: '/riverology',
    color: '#34d399',
    items: [
      { label: 'Introduction', to: '/riverology' },
      { label: 'Setup', to: '/riverology/setup' },
      { label: 'Buoyancy', to: '/riverology/Buoyancy' },
      { label: 'Caustics', to: '/riverology/Caustics' },
      { label: 'Foam', to: '/riverology/Foam' },
      { label: 'Underwater', to: '/riverology/Underwater' },
      { label: 'Swimming', to: '/riverology/Swimming' },
    ],
  },
  {
    name: 'ClaudeBridge',
    basePath: '/claudebridge',
    color: '#8b5cf6',
    items: [
      { label: 'Introduction', to: '/claudebridge' },
      { label: 'Installation', to: '/claudebridge/getting-started/installation' },
      { label: 'Connecting', to: '/claudebridge/getting-started/connecting' },
      { label: 'First Commands', to: '/claudebridge/getting-started/first-commands' },
      { label: 'Blueprints', to: '/claudebridge/guides/blueprints' },
      { label: 'Materials', to: '/claudebridge/guides/materials' },
      { label: 'Actors & World', to: '/claudebridge/guides/actors-and-world' },
      { label: 'Tools Reference', to: '/claudebridge/tools-reference/overview' },
      { label: 'FAQ', to: '/claudebridge/faq' },
    ],
  },
];

export default productNavConfig;
