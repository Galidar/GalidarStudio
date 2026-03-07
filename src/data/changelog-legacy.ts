import type { ProductChangelog } from './changelog-types';

let legacyChangelog: ProductChangelog = {
  product: 'Oceanology Legacy',
  icon: '🏖️',
  accent: '#22d3ee',
  entries: [
    {
      version: '5.9.0',
      date: 'October 24, 2025',
      title: 'Niagara Heightmap, Surface Debugger & UE 5.7 Support',
      tag: 'latest',
      highlights: [
        'New Niagara-based heightmap system replaces legacy RVT baker',
        'New Water Surface Debugger actor for development and debugging',
        'UE 5.5, 5.6, and 5.7 compatibility updates',
      ],
      sections: [
        {
          heading: 'New Features',
          items: [
            'New Niagara-based heightmap system with auto-configuration on BeginPlay',
            'New Water Surface Debugger actor for in-editor development',
            'Distance Field system re-enabled',
            'Gerstner wave solver updated to match material-side equations',
            'RVT World Position system with HeightmapLocation and TerrainMask',
          ],
        },
        {
          heading: 'Fixes',
          items: [
            'Black artifacts on high-amplitude waves — normal calculation fix ported from NextGen',
            'RVT Fixed: missing parameters and scale corrections',
            'Normal solution improvements',
            'Water Z min/max auto-setup',
            'Niagara wave integration corrections',
          ],
        },
        {
          heading: 'Compatibility',
          items: [
            'UE 5.5 compatibility update',
            'UE 5.6 compatibility update',
            'UE 5.7 compatibility update',
            'C++ standard compatibility fixes',
            'Packaging error fixes for source-built engines',
            'Epic Games fake compile error fixes',
          ],
        },
        {
          heading: 'Changes',
          items: [
            'Old RVT Baker removed and replaced with Niagara heightmap system',
            'Heightmap component major rework with new sampling logic',
            'Gerstner wave solver simplified and aligned with material implementation',
            'Multiple struct parameter additions (Underwater, SurfaceScattering, Wetness, Foam, Folding)',
            'QuadTree mesh scene proxy improvements',
          ],
        },
      ],
    },
    {
      version: '5.7.0',
      date: 'April 29, 2024',
      title: 'UE 5.4 Support',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Manager class renaming (OceanologyRVTHeightmapActor to OceanologyManager)',
            'Enum renaming for collision avoidance',
            'Code maintenance and deprecation warning fixes',
            'UE 5.4 compatibility changes',
          ],
        },
      ],
    },
    {
      version: '5.6.0',
      date: 'March 25, 2024',
      title: 'Niagara Waves & Struct Refactoring',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Niagara wave system improvements',
            'Struct refactoring with "Oceanology" prefix',
            'Material parameter comment transportation',
            'Plugin-based redirectors',
            'Flow physics spline demonstration',
            '16-bit heightmap data feature',
          ],
        },
      ],
    },
    {
      version: '5.5.5',
      date: 'March 10, 2024',
      title: 'Performance & Lakes',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Live-reload performance optimizations',
            'Experimental Niagara waves',
            'Improved lake presets',
            'Game time foam flow fixes',
            'SDF system refinements',
          ],
        },
      ],
    },
    {
      version: '5.4.0',
      date: 'February 21, 2024',
      title: 'GGX & HLSL Gerstner',
      sections: [
        {
          heading: 'Changes',
          items: [
            'GetMinWaveHeight support',
            'SDF texture up to 16K/32K heightmap support',
            'GGX lighting system',
            'Live-reload preset functionality',
            'HLSL Gerstner waves',
            'Flow foam additions',
          ],
        },
      ],
    },
    {
      version: '5.3.0',
      date: 'February 14, 2024',
      title: 'Swimming & Volume Rework',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Swimming/buoyancy customization functions',
            'Water volume rework to single OceanologyWaterVolume',
            'Priority support for overlapping volumes',
            'Quadtree engine integration with tessellation support',
            'Wave solver improvements',
          ],
        },
      ],
    },
    {
      version: '5.2.0',
      date: 'January 24, 2024',
      title: 'RVT Improvements & Bubble System',
      sections: [
        {
          heading: 'General',
          items: [
            'Swimming logic improved and fixed',
            'New bubble interaction mode for lakes',
            'New actor height structure added',
            'User-friendly editor messages added',
            'Soft references used for bubble presets to prevent crashes',
          ],
        },
        {
          heading: 'RVT Improvements',
          items: [
            'RVT texture accuracy improved in relation to Build Levels',
            'Re-opening level no longer required after baking',
            'WaterZ min/max values automatized',
            'Bake SDF texture button added',
            'Coastal foam and light dispersion improved',
            'New option to configure coast color',
          ],
        },
      ],
    },
    {
      version: '5.1.9',
      date: 'January 15, 2024',
      title: 'WaveSolver Runtime & Preset System v2',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Preset system now has 2 modes',
            'BubbleSettings added to presets',
            'New WaveSolver system — runtime wave manipulation now supported',
            'Demo map showcasing runtime wave manipulation',
            'Lerping between Oceanology structs and presets',
            'InfiniteComponent reworked with configurable follow interval',
            'Force Follow button added',
            'Bubbles Niagara component fixed',
          ],
        },
      ],
    },
    {
      version: '5.1.8',
      date: 'January 5, 2024',
      title: 'Fixes & Water Preset System',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Water preset system added',
            'Minor fix with water volumes for Standalone & Packaged mode',
            'Virtual Texture / RVT fixes and object height fixes',
            'Ship/Boat collision redesign for packaged mode',
            'RVT actor redesigned to save heightmap to static texture',
            'New RVT visual options for shore foam',
            'Flipbook normals included in underwater post process',
            'IK Rig provided for animation retargeting',
            'New Reload Settings button added',
            'Shoreline Surface Scattering option added',
          ],
        },
      ],
    },
    {
      version: '5.1.7',
      date: 'December 25, 2023',
      title: 'Ship Navigation & Underwater Visuals',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Ship Navigation system implemented',
            'Horizon_Map redesigned with tropical aesthetic',
            'New underwater visual parameters in Actor Panels',
            'Underwater visuals now consider atmospheric light',
            'WaterVolume can now be duplicated via CTRL+D without bugs',
            'Disabled spatial loading for Oceanology actors',
            'Fixed WaterVolume and Swimming relation in packaged/standalone mode',
            'Surface scattering on the coast',
          ],
        },
      ],
    },
    {
      version: '5.1.6',
      date: 'November 21, 2023',
      title: 'Complete C++ Rewrite',
      tag: 'major',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Complete C++ codebase rewrite from Blueprints',
            'Wrapper blueprint classes (BP_OceanologyInfiniteOcean, BP_OceanologyLake)',
            'Factory default settings',
            'Water parent class for shared logic',
            'Multiplayer replication support',
            'Buoyancy/swimming components in C++',
            'Underwater bubbles integration',
          ],
        },
      ],
    },
    {
      version: '5.1.5',
      date: 'May 22, 2023',
      title: 'UE 5.2 Support & Sound System',
      sections: [
        {
          heading: 'Changes',
          items: [
            'UE 5.2 compatibility',
            'New Quality Modifier (Game Ready / Simulation / Render)',
            'New sound system with occlusion effects natively integrated',
            'New procedural foam effect with enhanced appearance',
            'New landscape system with bake texture support',
            'Refraction, distortion and blur added underwater',
            'God Rays system improved',
            'Quadtree artifacts fixed',
            'Infinite component bug fixed',
            'Distance field errors fixed',
          ],
        },
      ],
    },
    {
      version: '5.1.4',
      date: 'September 16, 2022',
      title: 'Lake Swimming & Foam Overhaul',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Swimming system integrated into the lake',
            'Lake is now globally scalable',
            'New wave effect for the lake',
            'Decal-based caustics for the lake',
            'Lake material reconstructed',
            'New foam system for ocean and lake',
            'Moisture effect on the coast',
            'Better interaction on the coast',
            'UE5 infinity issue fixed',
            'Strange wave artifacts fixed',
            'Improved overall performance',
          ],
        },
      ],
    },
    {
      version: '5.1.3 Patch',
      date: 'April 9, 2022',
      title: 'Caustics & UE5 Patch',
      sections: [
        {
          heading: 'Fixes',
          items: [
            'Fixed bugs caused by material parameter collection',
            'Main wave material fixed',
            'Volumetric fog effect rebuilt',
            'Displacement Adapted Caustics',
            'UE5 compatibility bug fixed',
            'Better UDS compatibility',
          ],
        },
      ],
    },
    {
      version: '5.1.2',
      date: 'March 23, 2022',
      title: 'Volumetric Fog & God Rays',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Scroll-based God Rays system',
            'Displacement Based Caustics system',
            '100% volumetric fog — optional post process fog',
            'Volumetric mist compatible with Ultra Dynamic Sky',
            'Darkness effect underwater',
            'Water line effect corrected to 99.5%',
            'Performance improvements and physics corrections',
            'Fixed artifacts and caustics projection',
          ],
        },
      ],
    },
    {
      version: '5.1.1',
      date: 'January 22, 2022',
      title: 'UE5 Universal Material & New Systems',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Universal material compatible with UE4 and UE5 (tessellation-free)',
            'New God Ray system',
            'New QuadTree system',
            'New swimming, surface events, and buoyancy systems',
            'Swimming/buoyancy/events components added',
            'New distance field system',
            'Improved masking and landscape system',
            'Ship physics rebuilt',
            'Can now be masked under landscape',
            'New underwater fog system',
          ],
        },
      ],
    },
    {
      version: '5.1.0 Patch',
      date: 'November 11, 2021',
      title: 'Illumination & Wave Equation Fixes',
      sections: [
        {
          heading: 'Fixes',
          items: [
            'Illumination error in fog fixed',
            'Smoother transitions in infinity',
            'Strange wave artifacts fixed',
            'Physics equation modified',
            'Waterline effect bug fixed',
            'Lake lighting bugs fixed',
            'Chromatic effect added underwater',
            'New fog parameters: Measure Object Volume, Mask Fog, Light Absorption, Water Opacity Mask Offset',
          ],
        },
      ],
    },
    {
      version: '5.1.0',
      date: 'October 10, 2021',
      title: 'C++ Swimming Volume & Procedural Foam',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New volume-based swim system in C++',
            'Swimming performance improved',
            'Oceanology now supports voxel',
            'Shoreline supports voxel',
            'Maps rebuilt with built-in Shoreline features',
            'Foam system rebuilt — new procedural foam',
            'Fixed phantom waves in swimming',
            'Underwater sound effects',
            'Strange artifacts fixed',
          ],
        },
      ],
    },
    {
      version: '5.0.0',
      date: 'March 31, 2021',
      title: 'Quadtree & Buoyancy 2.0',
      tag: 'major',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Version 3 swimming system',
            'Quadtree C++ system implementation',
            'New tessellation system',
            'Infinity mesh replacement',
            'Material optimization',
            'Advanced refraction',
            'Buoyancy system 2.0',
          ],
        },
      ],
    },
    {
      version: '5.0.9',
      date: 'October 1, 2021',
      title: 'FFT Ocean & Heightmap Support',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Procedural FFT Ocean Texture',
            'Heightmap and distance field support',
            'Shoreline interaction based on Texture and Distance Field',
            'New foam system with FFT appearance and foam textures',
            'New fog system with day/night correction and height meter',
            'New normal system and distance field modifiers',
            'Quadtree correction and values change',
            'Enhanced transparencies',
            'RayTracing bugs fixed',
          ],
        },
      ],
    },
    {
      version: '5.0.8',
      date: 'July 27, 2021',
      title: 'Lake Buoyancy & ALS Compatibility',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Character can now swim in the lake',
            'Lake optimized with new scale system',
            'New map: Map_Lake_Buoyancy',
            'New point light material for caustics',
            'Character interaction with buoyancy volumes',
            'Swimming now compliant with ALS V4',
            'UE5 swimming bug fixed',
            'New zoom control for character',
          ],
        },
      ],
    },
    {
      version: '5.0.7',
      date: 'July 10, 2021',
      title: 'Buoyancy Events & Lake Integration',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New buoyancy system with events (up/down wave detection for particles, sounds, etc.)',
            'New swimming system with smoother animations',
            'Jump on surface, dive, and surface controls',
            'Object mass detection',
            'Lake integrated with local physics system',
            'New normal detail settings',
            'QuadTree C++ and Infinite C++ systems reconfigured',
            'Strange plant movements in UE5 fixed',
            'Post-process priority in ocean fixed',
          ],
        },
      ],
    },
    {
      version: '5.0.6',
      date: 'June 13, 2021',
      title: 'UE4/UE5 Material & New Foam',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Material structure rebuilt from scratch',
            'New materials adapted for UE4 and UE5',
            'New foam adapted to lighting',
            'New Distance Field system',
            'Wave equation reconstructed',
            'New selective Shoreline systems',
            'SHADING MODE to switch between UE4/UE5',
            'New refraction system',
            'Performance increased',
            'Buoyancy bugs near shore fixed',
          ],
        },
      ],
    },
    {
      version: '5.0.5',
      date: 'April 26, 2021',
      title: 'Replication Alpha & Local Ocean v2',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Replication integrated — Experimental Alpha 0.0.1',
            'Infinite ocean and local ocean separated',
            'Local ocean v2 — no longer affects caustics height',
            'New Oceanology Master for calling Infinite or Local without values',
            'New fog structure with 100% local fog working',
            'New height system',
            'Swimming system reconfigured',
            'Performance bugs and code warnings fixed',
          ],
        },
      ],
    },
    {
      version: '5.0.4',
      date: 'April 7, 2021',
      title: 'Ocean Line & Fog Fixes',
      sections: [
        {
          heading: 'Fixes',
          items: [
            'Ocean line effect now 80% more accurate',
            'Full fog correction — works in simulation mode',
            'Caustics now work in simulation mode',
            'Editor mode correction',
            'Quadtree warning fixed',
            'Code reconstruction',
          ],
        },
      ],
    },
    {
      version: '5.0.3',
      date: 'April 5, 2021',
      title: 'Compile Fixes',
      sections: [
        {
          heading: 'Fixes',
          items: [
            'Fog now visible when compiling',
            'Infinity keeps working on compiling fixed',
            'New variables configured',
            'Base corrections',
          ],
        },
      ],
    },
    {
      version: '5.0.2',
      date: 'April 4, 2021',
      title: 'Fog Depth',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Custom caustics height modifier',
            'Fog is now much deeper',
            'Boolean to activate fog',
            'Height method and variables corrected',
          ],
        },
      ],
    },
    {
      version: '5.0.1',
      date: 'April 3, 2021',
      title: 'General Fixes',
      sections: [
        {
          heading: 'Fixes',
          items: [
            'Fog localization bug fixed',
            'Mist correction',
            'Dithering LOD transition',
            'Caustics height bug fixed',
            'Basic replica variables integrated',
          ],
        },
      ],
    },
    {
      version: '4.0.0',
      date: 'October 8, 2020',
      title: 'Complete System Overhaul',
      tag: 'major',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New swimming, water leakage effects, shore waves',
            'Experimental river system',
            'New buoyancy and infinity systems',
            'Volumetric fog integration',
            'Procedural foam and virtual texture implementation',
            'Biome system and advanced SSS integration',
          ],
        },
      ],
    },
    {
      version: '3.0.0',
      date: 'April 1, 2020',
      title: 'Landscape Modulation',
      tag: 'major',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Landscape modulation system',
            'Distance field optimization',
            'Modular landscape materials',
            'Scanned rock/tree assets',
            'Infinite ocean optimization',
          ],
        },
      ],
    },
    {
      version: '3.0.3',
      date: 'May 21, 2020',
      title: 'Transparency Priority & Alpha Fixes',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New Experimental material capturing all transparent objects (volumetric clouds, particles, etc.)',
            'New MF_Sea_Foam function with Computer Graphics alpha fixes',
            'Normal artifacts fixed',
            'BDF parameters modified — no more artifacts',
            'Sharpen10 textures integrated for performance improvement',
            'New T_FoamF1Alpha textures by Computer Graphics',
            'Refraction and chromatic effect underwater corrected',
          ],
        },
      ],
    },
    {
      version: '3.0.2',
      date: 'May 9, 2020',
      title: 'Storm Waves & Caustics',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New storm waves',
            'Dynamic height caustics based on directional light',
            'Moisture from sand integrated',
            'New caustics map',
            'Chromatic effect in ocean mist and waves',
            'Depth-based refraction reconfigured',
            'Underwater error fixed',
          ],
        },
      ],
    },
    {
      version: '3.0.1',
      date: 'April 9, 2020',
      title: 'Local Position System',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Local Position System integrated (for users without infinite ocean, requires Tessellation)',
            'Masking fix corrected',
            'New parameters adjusted',
          ],
        },
      ],
    },
    {
      version: '2.0',
      date: 'December 12, 2019',
      title: 'Advanced Buoyancy & Infinite Ocean',
      tag: 'major',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Advanced buoyancy system',
            'Dual caustics types',
            'Infinite ocean system',
            'Transparent materials with subsurface scattering',
            'Foam generation and LOD meshes',
            'Shore lines and droplets',
          ],
        },
      ],
    },
    {
      version: '2.9.5',
      date: 'March 5, 2020',
      title: 'Swimming System Rebuilt',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Swimming system rebuilt from scratch',
            'Character interprets ocean depth using buoyancy point system',
            'Force Movement integrated (Force At Location removed)',
            'Integrated diving system with CTRL to dive, Space to surface',
            'Swimming animations included',
            'Camera zoom and rotation system for swimming',
            'Surface interpretation correction',
            'Enemy and Main characters rebuilt with new swimming system',
          ],
        },
      ],
    },
    {
      version: '2.9.3',
      date: 'February 24, 2020',
      title: 'Buoyancy Rebuilt & Swimming System',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Buoyancy system rebuilt from scratch using scene components',
            'New height system for buoyancy',
            'Physics administrator integrated',
            'Swimming system integrated',
            'Grade 4 detail system (more detail without tessellation)',
            'Coast system based on distance field (enabled via Ocean Mode)',
            'Mask-based foam system configured',
            'Ship, boat, and box physics reconfigured',
          ],
        },
      ],
    },
    {
      version: '2.9.1',
      date: 'February 12, 2020',
      title: 'Particles, Boat & Lake',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Particle-based foam system',
            'New caustics system based on Ryan Brucks',
            'Lake map integrated',
            'Boat actor with character boarding',
            'Ship modular system with damage volume',
            'New big waves and foam parameters',
            'Infinity code reconfigured',
            'Performance improved',
          ],
        },
      ],
    },
    {
      version: '2.9.0',
      date: 'January 15, 2020',
      title: 'Pirate Ship, AI & Stylized Mode',
      sections: [
        {
          heading: 'Features',
          items: [
            'Pirate ship with movement system and AI',
            'NavMeshBoundsVolume compatible',
            'Stylized version of Oceanology',
            'Realistic or animated ocean picker',
            'Planar reflection (optional)',
            'New foam system with steering controller',
            'Commands to obtain ship location',
          ],
        },
      ],
    },
    {
      version: '2.8.1',
      date: 'December 29, 2019',
      title: 'SSS & UE 4.24 Fixes',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New surface scattering (BP_SurfaceScattering)',
            'Light corrections for Unreal Engine 4.24',
            'New mesh system with far view system',
            'Optimized tessellation',
            'New infinite ocean improvements',
            'Multiple refraction errors corrected',
            'Vector light error in ocean corrected',
          ],
        },
      ],
    },
    {
      version: '2.8',
      date: 'December 25, 2019',
      title: 'Performance & Experimental Coastal',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New mesh integrated — high polygon mesh removed',
            'Performance increased',
            'Transparency error corrected',
            'Depth glow artifacts fixed',
            'Coastal effect (Experimental v0.1)',
            'Landscape Modulation (Experimental v0.1)',
          ],
        },
      ],
    },
    {
      version: '2.7',
      date: 'December 22, 2019',
      title: 'Custom Refraction v2',
      sections: [
        {
          heading: 'Changes',
          items: [
            'New custom refraction v2 (Epic refraction removed)',
            'New caustics v2 system',
            'Tessellation correction',
            'Transparency and reflection corrections',
            'Modified depth distance',
            'Unnecessary BP removed',
          ],
        },
      ],
    },
    {
      version: '2.6',
      date: 'December 17, 2019',
      title: 'Keyframe & Performance',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Keyframe system to control ocean state',
            'Performance improvement',
            'Blend color bug fixed',
            'New big waves map',
            'New parameters integrated',
          ],
        },
      ],
    },
    {
      version: '2.5',
      date: 'December 12, 2019',
      title: 'Multiplayer & Infinite Ocean v2',
      sections: [
        {
          heading: 'Changes',
          items: [
            'Replication system adapted for multiplayer',
            'New real-time infinity system (old infinity removed)',
            'Tessellation Distance integrated',
            'New integrated functions',
            'Foam generator values modified',
          ],
        },
      ],
    },
    {
      version: '1.0',
      date: 'December 12, 2019',
      title: 'First Release',
      tag: 'major',
      sections: [
        {
          heading: 'Initial Features',
          items: [
            'Wave system with wind integration',
            'Lighting settings and parameters',
            'Opaque material with surface integration',
            'Basic ocean simulation for UE 4.23',
          ],
        },
      ],
    },
  ],
};

export default legacyChangelog;
