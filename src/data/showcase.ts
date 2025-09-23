export type ShowcaseItem = {
  title: string;
  description: string;
  url: string;
  image: string;
  tags?: string[];   // ['plugin'] | ['environment']
  docsPath?: string; // optional for internal docs
};

export const SHOWCASE: ShowcaseItem[] = [
  {
    title: 'Oceanology NextGen',
    description: 'Hybrid spectral waves (Gerstner+FFT), coastline & real-time shallow water, and C++ quadtree tessellation — built for high-end GPUs.',
    url: 'https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab',
    image: '/img/landing/oceanology-nextgen.jpg',
    tags: ['plugin', 'fab', 'ocean'],
    docsPath: '/oceanology-nextgen/'
  },
  {
    title: 'Oceanology Legacy',
    description: 'Game‑focused ocean with Gerstner waves and infinite/local water — optimized for mid‑range GPUs.',
    url: 'https://www.fab.com/listings/1cd1f62e-0fa3-48bf-bc60-f0e06010fce3',
    image: '/img/landing/oceanology-legacy.jpg',
    tags: ['plugin', 'fab', 'ocean'],
    docsPath: '/oceanology-legacy/'
  },
  {
    title: 'Riverology',
    description: 'Spline‑based rivers with flow physics, buoyancy and real‑time shallow water — designed for open worlds.',
    url: 'https://www.fab.com/listings/36933ae4-eb48-4395-951b-6357e0ff2c17',
    image: '/img/landing/riverology.jpg',
    tags: ['plugin', 'fab', 'river'],
    docsPath: '/riverology/'
  },
  {
    title: 'Cretaceous',
    description: 'Photogrammetry redwood forests for UE5 open worlds — trees, undergrowth and rocks. (Dinosaur not included.)',
    url: 'https://www.fab.com/listings/79a9eff3-e874-42dc-a11f-f1f4f4555d9a',
    image: '/img/landing/cretaceous.jpg',
    tags: ['environment', 'fab']
  },
  {
    title: 'Forest Blizzard',
    description: 'Aleppo pine forests with World Partition, Nanite and Snow Generator — cinematic winter vistas.',
    url: 'https://www.fab.com/listings/e8f0438b-4c2e-41a7-817e-14402f2b2b04',
    image: '/img/landing/forest-blizzard.jpg',
    tags: ['environment', 'fab']
  }
];
