import type { ProductChangelog } from './changelog-types';

let riverologyChangelog: ProductChangelog = {
  product: 'Riverology',
  icon: '🏞️',
  accent: '#38bdf8',
  entries: [
    {
      version: '2.3.0',
      date: 'March 30, 2025',
      title: 'UE 5.5 Compatibility & Landscape Deformation',
      tag: 'latest',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Restored/rolledback the pre-directory refactor state for stability',
            'UE 5.5.0 compatibility updates',
            'Landscape deformation via "Editor Apply Spline" button',
            'New Input System controls integration',
          ],
        },
      ],
    },
    {
      version: '2.2.0',
      date: 'March 25, 2024',
      title: 'Wind & Nanite Support',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Wind support for open world environments',
            'Nanite support for trees and objects',
            'Spline LOD corrections',
            'Distant wave artifact fixes',
            'Wave shifting corrections',
            'Normal calculation improvements',
            'Normal artifact fixes',
          ],
        },
      ],
    },
    {
      version: '2.1.0',
      date: 'July 7, 2022',
      title: 'Landscape Paint & Waterfalls',
      sections: [
        {
          heading: 'Features',
          items: [
            'New Landscape Paint Layers feature',
            'Real-time spline updates',
            'Cascade parameter integration',
            'Virtual texture support',
            'Mountain assets included',
            'Oceanology compatibility fixes',
          ],
        },
        {
          heading: 'Fixes',
          items: [
            'Compilation fixes and C++/Blueprint restructuring',
            'Waterfall artifact corrections',
            'Foam issues resolved',
            'Normal artifact fixes',
            'Asset optimization and performance gains',
          ],
        },
      ],
    },
    {
      version: '2.0.0',
      date: 'June 17, 2022',
      title: 'Complete C++ Reconstruction',
      tag: 'major',
      highlights: [
        'Full C++ reconstruction from Blueprints',
        'New flow system with adapted normals',
        'Swimming and underwater audio systems',
      ],
      sections: [
        {
          heading: 'Features',
          items: [
            'New flow system with Flow Adapted Normals',
            'New distortion system integration',
            'Swimming system for rivers',
            'Underwater audio system',
            'Advanced foam generation with Flow Based Foam',
            'Warp system implementation',
            'Fog system for underwater',
            'New demonstration maps',
            'Rock generator',
          ],
        },
        {
          heading: 'Improvements',
          items: [
            'Complete C++ reconstruction from Blueprints',
            'Performance enhancements across the board',
            'Normal map corrections',
            'Physics improvements for water flow',
            'Distance field upgrades',
            'Transparency adjustments',
            'Blueprint deformation removal in favor of C++',
          ],
        },
        {
          heading: 'Fixes',
          items: [
            'Scrolling fixes',
            'Wind corrections',
            'Waterfall deformation fixes',
            'Animation error corrections',
            'Flow modifier fixes',
          ],
        },
      ],
    },
  ],
};

export default riverologyChangelog;
