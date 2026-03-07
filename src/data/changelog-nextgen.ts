import type { ProductChangelog } from './changelog-types';

let nextgenChangelog: ProductChangelog = {
  product: 'Oceanology NextGen',
  icon: '🌊',
  accent: '#8b5cf6',
  entries: [
    {
      version: '1.2.6',
      date: 'March 7, 2026',
      title: 'Dedicated Server & Multiplayer Replication',
      tag: 'latest',
      highlights: [
        'Full dedicated server support — zero crashes on headless servers',
        'Buoyancy replication fix eliminates boat "jumping" in multiplayer',
        'Swimming replication fix eliminates WaterWalk flickering',
      ],
      sections: [
        {
          heading: 'Dedicated Server',
          items: [
            'Fixed fatal crash (check(MPCI != nullptr)) when running on dedicated servers',
            'All rendering code (Materials, PostProcess, Render Targets) safely skipped on headless servers',
            'Water actors remain fully functional for gameplay: buoyancy, swimming, collisions, wave math',
            'Fixed Slate notification crash when running Editor in dedicated server mode (-server -log)',
            'Added dedicated server guard to Niagara wave volume effects',
            'Removed orphaned development files that caused compilation errors on source builds',
          ],
        },
        {
          heading: 'Multiplayer Replication',
          items: [
            'Fixed buoyancy "jumping" on boats — physics forces apply only on authoritative side',
            'Fixed swimming WaterWalk state flickering — state computed server-side only',
            'Fixed MovementMode transition to properly trigger mode change callbacks',
            'Client prediction remains consistent with server-side CMC configuration',
          ],
        },
        {
          heading: 'Compatibility',
          items: [
            'C++ standard compatibility fixes for UE 5.7',
            'Packaging error fixes for source-built engines',
          ],
        },
      ],
    },
    {
      version: '1.1.0',
      date: 'March 30, 2025',
      title: 'Visual Overhaul & Sound System',
      tag: 'major',
      sections: [
        {
          heading: 'Features',
          items: [
            'Redesigned sound system with expanded debug capabilities',
            'New grouped preset system (Color, Detail, Waves) complementing existing presets',
            'Underwater system with God Rays',
            'Enhanced foam system with increased customization',
            '"Shattered Realms" demonstration map showcasing underwater system',
            'Marine animals (Shark, Whale, Fish) for demonstration',
            'Experimental Water Interaction system',
            'Glass container support for lakes',
            'Day/Time blueprint actor for varied lighting scenarios',
            'GGX system implementation with multiple configurations',
          ],
        },
        {
          heading: 'Visual Improvements',
          items: [
            'Water opacity configuration enhancements',
            'Normal map detail refinement and water color adjustments',
            'Breaking waves system redesigned',
            'Spectral Gerstner wave improvements',
            'Bubble system enhancements',
            'Landscape-water edge softening capability',
            'Water depth system refinement',
          ],
        },
        {
          heading: 'Fixes',
          items: [
            'Message flooding from OceanologyMessageUtils resolved',
            'Underwater splash, masking, and wave crest splash corrected',
            'Material performance enhancements',
            'Shoreline wetness functionality restored',
            'Replication logic improvements for shoreline systems',
            'Float/double type consistency corrections',
            'Physics formula refinements for breaking waves and spectral Gerstner',
          ],
        },
      ],
    },
    {
      version: '1.0.0',
      date: 'January 10, 2024',
      title: 'Initial Release',
      tag: 'major',
      sections: [
        {
          heading: 'Launch Features',
          items: [
            'Complete hyper-realistic ocean simulation built from the ground up',
            'Spectral Gerstner wave system for AAA-quality wave rendering',
            'Real-time coastal and shore wave systems',
            'Full buoyancy and swimming systems with multiplayer replication',
            'Manager actor for centralized configuration',
            'Preset system for quick wave and visual configuration',
            'Optimized for 60 FPS (RTX 2080 SUPER) / 120 FPS (RTX 4090)',
          ],
        },
      ],
    },
  ],
};

export default nextgenChangelog;
