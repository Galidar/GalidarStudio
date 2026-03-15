import type { ProductChangelog } from './changelog-types';

let nextgenChangelog: ProductChangelog = {
  product: 'Oceanology NextGen',
  icon: '🌊',
  accent: '#8b5cf6',
  entries: [
    {
      version: '1.3.1',
      date: 'March 15, 2026',
      title: 'Packaging Fix & Volumetric Fog Material Correction',
      tag: 'latest',
      highlights: [
        'Fixed fatal CDO construction crash that prevented project packaging on source builds',
        'Fixed VolumetricFog underwater material not rendering (incorrect Shading Model)',
      ],
      sections: [
        {
          heading: 'Bug Fixes',
          items: [
            'Fixed CDO construction crash (GEngine not initialized) in OceanologyBattleShipPawn — SetPhysMaterialOverride now guarded with RF_ClassDefaultObject check to prevent physics material queries during CDO creation',
            'Fixed VolumetricFog underwater material (M_UnderOcean_VolumetricFog) not rendering — Shading Model corrected from Unlit to DefaultLit',
            'Fixed Fab Store build: added missing TimerManager.h and LocalPlayer.h includes',
          ],
        },
      ],
    },
    {
      version: '1.3.0',
      date: 'March 10, 2026',
      title: 'Ship Navigation, PredictiveInterpolation & Standalone Game Support',
      highlights: [
        'Complete C++ ship navigation system with spline-based FlowController and two flow modes',
        'PredictiveInterpolation with CubicInterp for butter-smooth vessel replication at 30Hz',
        'Standalone Game & Dedicated Server buoyancy fully operational without rendering',
      ],
      sections: [
        {
          heading: 'Ship Navigation System',
          items: [
            'New OceanologyFlowController C++ actor — defines water currents via spline with configurable speed and width',
            'Two flow modes: Force (Legacy) for simple current push, Navigation (Natural) for realistic ship handling',
            'Navigation mode three-phase control: steering via AddTorque, propulsion via AddForce, lateral drag for sideslip prevention',
            'Speed-dependent look-ahead steering — ships begin turning before reaching curves for natural cornering',
            'Force mode mass-proportional scaling — vessels of any size respond naturally to the same current',
            'FlowController automatic tag-based assignment to vessels on BeginPlay',
          ],
        },
        {
          heading: 'BattleShip C++ Actors',
          items: [
            'Migrated BattleShip from Blueprint to pure C++ for performance and reliability',
            'OceanologyBattleShipPawn — full-featured Pawn with camera, input, and player control',
            'OceanologyBattleShipBase, Box, and Custom variants for AI and flow-driven ships',
            'Player input: W/S for forward/reverse, A/D for rudder with speed-dependent steering',
            'VisualSmoothRoot for client-side frame interpolation without double smoothing',
            'Force-based propulsion replaces SetVelocity — works correctly with physics and buoyancy',
          ],
        },
        {
          heading: 'AutoConfigure Systems',
          items: [
            'Shape-aware AutoConfigurePontoons — detects collision geometry and places pontoons accordingly',
            'AutoConfigureBuoyancy — 6-pontoon layout (Bow, Midship, Stern) with mass-proportional tuning',
            'Automatic linear/angular damping: scales with MassFactor for vessels of any weight',
            'Default mesh density (620 kg/m³) and water fluid density (1030 kg/m³) for realistic floating',
          ],
        },
        {
          heading: 'PredictiveInterpolation',
          items: [
            'Temporal CubicInterp using server state buffer for smooth vessel movement on clients',
            'Override PostNetReceiveLocationAndRotation to prevent UE5 snap-to-server competing with interpolation',
            'ETeleportType::TeleportPhysics for zero physics overhead on interpolated clients',
            '30Hz NetUpdateFrequency provides equivalent smoothness to 60Hz with linear interpolation at half bandwidth',
            'InterpolationBackTime auto-calculated: >= 3x server send interval (0.1s at 30Hz)',
          ],
        },
        {
          heading: 'Standalone Game & Dedicated Server',
          items: [
            'Fixed wave time frozen at 0 on dedicated servers — automatic fallback to GetWorld()->GetTimeSeconds()',
            'Buoyancy activation via fallback timer with OverlapComponent check when overlap events fail',
            'Water Volume SetGenerateOverlapEvents(true) ensures overlap detection in Standalone Game',
            'Works correctly in PIE, Standalone Game, and Packaged Builds without configuration changes',
          ],
        },
        {
          heading: 'Multiplayer',
          items: [
            'bDisableClientPhysicsSimulation enabled by default — eliminates client gravity fighting server corrections',
            'Flow properties (spline, speed, width) replicated with push-based networking',
            'Server-authoritative flow forces — client changes silently ignored for security',
            'VerifySetup validator checks NetUpdateFrequency and MinNetUpdateFrequency on replicated actors',
          ],
        },
        {
          heading: 'Rendering & Waves',
          items: [
            'Removed hardcoded distance culling from wave shaders for user-controlled LOD',
            'Fixed underwater waterline — removed unused Underwater param from wave shaders',
          ],
        },
      ],
    },
    {
      version: '1.2.6',
      date: 'March 7, 2026',
      title: 'Dedicated Server, Multiplayer Replication & Wave Performance',
      highlights: [
        'Full dedicated server support — zero crashes on headless servers',
        'Buoyancy replication fix eliminates boat "jumping" in multiplayer',
        'Distance-based wave culling — major GPU and CPU savings at range',
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
            'Fixed dedicated server crash in ShipNavigation_Map',
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
          heading: 'Performance',
          items: [
            'HLSL shader optimization across ocean and shore wave materials',
            'Distance-based wave disabling — waves beyond render range skipped entirely on CPU and GPU',
            'Smooth distance blending for seamless wave LOD transitions',
            'Breaking waves underwater culling — skips geometry outside camera frustum',
            'Underwater wave culling system for occluded geometry',
            'Far distance material optimized — unnecessary wave calculations removed',
          ],
        },
        {
          heading: 'Audio',
          items: [
            'Restored original audio system after experimental changes',
          ],
        },
        {
          heading: 'Compatibility',
          items: [
            'UE 5.7 material and shader compatibility updates',
            'C++ standard compatibility fixes for UE 5.7',
            'Packaging error fixes for source-built engines',
            'Epic Games marketplace fake compile error fixes',
            'Scene proxy and light function material header corrections',
          ],
        },
      ],
    },
    {
      version: '1.2.0',
      date: 'June 11, 2025',
      title: 'Breaking Waves Rework, Lake Mask 2D, Presets & UE 5.6',
      highlights: [
        'Breaking waves formula completely reworked for realistic wave collapse',
        'New Lake Mask 2D system for precise water boundary control',
        'New preset library including 8K-optimized and shore wave configurations',
      ],
      sections: [
        {
          heading: 'Features',
          items: [
            'New Lake Mask 2D system for precise water boundary masking',
            'WaterBoxScale parameter for flexible water volume sizing across Ocean and Lake actors',
            'Surface Scattering system for realistic light dispersion through water',
            'Shore waves now have their own dedicated preset group',
            'New breaking wave presets for varied coastal configurations',
            'New presets optimized for 8K resolution maps',
            'Updated preset library with refined default values',
          ],
        },
        {
          heading: 'Wave Physics',
          items: [
            'Breaking waves formula completely reworked for more realistic wave collapse behavior',
            'Spectral Gerstner wave solver finalized with improved accuracy',
            'CalculateWaveOffset corrected — eliminates wave position drift across all water bodies',
            'Foam flow direction fixed for proper current-aligned foam rendering',
            'Visual artifact reduction on wave crests and shore edges',
            'Realistic ocean simulation improvements across all water types',
          ],
        },
        {
          heading: 'Quality & Optimization',
          items: [
            'Exposure bug fixed — prevents overblown highlights in HDR scenarios',
            'QuadTree mesh scaling fix for proper LOD at world scale',
            'Manual scaler fix for consistent water mesh behavior',
            'Lake tile size adjustments for better tessellation',
          ],
        },
        {
          heading: 'Compatibility',
          items: [
            'UE 5.6 full compatibility update (materials, shaders, and APIs)',
            'Niagara WaterDepth compile error fixed',
            'Deprecation warnings resolved for modern UE APIs',
          ],
        },
      ],
    },
    {
      version: '1.1.0',
      date: 'March 30, 2025',
      title: 'Visual Overhaul, Sound Redesign & Water Interaction',
      tag: 'major',
      highlights: [
        'Complete sound system redesigned from scratch with debug, underwater, and attenuation controls',
        'New underwater system with God Rays, volumetric fog, distortion and glass containers',
        'Experimental Water Interaction system with fluid simulation and wave propagation',
      ],
      sections: [
        {
          heading: 'Sound System',
          items: [
            'Sound system completely redesigned from scratch with new architecture',
            'Underwater sound support with depth-based attenuation',
            'Adaptive Water Audio System for dynamic environmental soundscapes',
            'Wave Audio Actor for spatial audio placement',
            'Sound fading system for smooth audio transitions',
            'Attenuation shape configuration for underwater and surface sounds',
            'Debug visualization tools for audio overlap events and activation',
            'Actor scaling support for audio system proportional to water body size',
            'Sound override support for custom audio assets',
            'Dedicated server guard — sound does not tick or play on headless servers',
          ],
        },
        {
          heading: 'Preset System',
          items: [
            'Preset system rebuilt from scratch with factory-based generation',
            'New grouped preset system (Color, Detail, Waves) complementing existing presets',
            'Preset factory parsing with automatic class generation',
            'Preset apply logic reworked for reliable application',
            'Preset category reorganization — presets moved to top of Actor Panel',
            'New preset icons (PNG to JPG — image size reduced ~77%)',
            'Example presets included for quick configuration',
            'Stylized foam preset with enhanced contrast',
            'Preset lerping exposed to Blueprints for smooth transitions',
          ],
        },
        {
          heading: 'Underwater System',
          items: [
            'God Rays (Ambient Fog) system for underwater light shafts',
            'Volumetric Fog mesh component for underwater atmosphere',
            'Underwater glass / DomeFX support for contained water volumes',
            'Underwater distortion and refraction corrections',
            'Underwater fog opacity bug fixed',
            'Post-process enable/disable support for underwater effects',
            'Atmosphere correction for underwater fog blending',
            'Underwater distance improvements for far-field rendering',
          ],
        },
        {
          heading: 'Bubble System',
          items: [
            'New Niagara-based bubble system (NS_OceanologyBubbles)',
            'Infinite and local bubble volume support',
            'Bubble height fixed with C++ constraints',
            'Bubble color customization',
            'Exposed Niagara parameters for fine-tuning',
            'Bubble relative location and actor height support',
          ],
        },
        {
          heading: 'Water Interaction',
          items: [
            'Experimental Water Interaction system with fluid simulation',
            'Wave propagation from interactive objects',
            'Fluid displacement interaction via Niagara',
            'Water Interactor actor for overlap-based interaction',
            'Grid 2D resolution configuration for interaction fidelity',
            'Managed orthographic width for interaction capture',
            'Natural foam generation at interaction points',
            'Improved box mask for interaction boundaries',
          ],
        },
        {
          heading: 'Wave Systems',
          items: [
            'Spectral Gerstner wave system completely reworked — fixed physics, optimization (Normal, Foam), time synchronization',
            'Spectral Gerstner now compatible with Niagara for GPU-driven waves',
            'Breaking Waves physics rewritten — SDF, gradient computing, C++ mirroring of shader code',
            'New WaterDepth and CalculateWaveOffset calculations for accurate beach interaction',
            'Shore waves redesigned — global and local modes, soft edge mask, world height limiter',
            'World Height SDF system (Niagara-based) for terrain-aware wave behavior',
            'Surf Waves side break for more natural coastal foam patterns',
            'Wave Crest Splash with exposed parameters for customization',
            'Blend Wave Offsets utility for multi-wave composition',
          ],
        },
        {
          heading: 'Visual Quality',
          items: [
            'Water opacity configuration enhancements',
            'Normal map detail refinement and water color adjustments',
            'TSR + WPO ghosting fixed — eliminates temporal artifacts',
            'Waterline effect corrected for accurate water-air boundary',
            'Ground caustics system with replication fixes',
            'Wave and Foam improvements (contrast, spread, transitions)',
            'Landscape-water edge softening capability',
            'Water depth system refinement',
            'Foam interaction improvements and transitions',
            'Advanced lighting system integration',
            'Sky coordinates and landscape artifact corrections',
          ],
        },
        {
          heading: 'Demo Content',
          items: [
            '"Shattered Realms" map — underwater showcase with corals, ruins, and interactive plants',
            'Marine animals for demonstration: Shark mesh, Titan Whale blueprint, Fish',
            'Underwater Glass map updated with DomeFX configurations',
            'Beach Ball physics object for interaction testing',
            'Day/Time blueprint actor for varied lighting scenarios',
            'New sound effects for underwater and surface environments',
            'Landscape with Nanite and HLOD compilation support',
          ],
        },
        {
          heading: 'Technical',
          items: [
            'GGX Specular computation fixed and integrated',
            'Niagara InfiniteTimeJump spawner for continuous particle effects',
            'Niagara render target and capture depth corrections',
            'Flow physics buoyancy with proper force-at-location application',
            'Fluid simulation replication warning fixes',
            'Float/double type consistency corrections (MPC and physics)',
            'Ray tracing specific warning fixes in QuadTree',
            'Blueprint compile error fixes and deprecated BP cleanup',
            'Static mesh collision and shadow corrections',
            'Shore Waves HLSL module removed — replaced by Niagara implementation',
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
            'Splash optimization and improvement',
            'Transparency priority fix for correct render order',
            'Swimming activation registration order fixed',
            'Random crash fixes in Niagara and component initialization',
            'Multiple compile error fixes across the codebase',
          ],
        },
      ],
    },
    {
      version: '1.0.0',
      date: 'January 10, 2024',
      title: 'Initial Release',
      tag: 'major',
      highlights: [
        'Complete hyper-realistic ocean simulation built from the ground up in C++',
        'Spectral Gerstner wave system for AAA-quality wave rendering',
        'Full buoyancy and swimming systems with multiplayer replication',
      ],
      sections: [
        {
          heading: 'Core Systems',
          items: [
            'Complete hyper-realistic ocean simulation built from the ground up',
            'Spectral Gerstner wave system for AAA-quality wave rendering',
            'Real-time coastal and shore wave systems',
            'Full buoyancy system with physics-driven floating objects',
            'Swimming system with multiplayer replication',
            'Manager actor for centralized ocean configuration',
          ],
        },
        {
          heading: 'Configuration',
          items: [
            'Preset system for quick wave and visual configuration',
            'Material Parameter Collection (MPC) driven architecture',
            'Customizable wave parameters exposed to Blueprints and Editor',
          ],
        },
        {
          heading: 'Performance',
          items: [
            'QuadTree-based ocean mesh for efficient LOD rendering',
            'Optimized for 60 FPS (RTX 2080 SUPER) / 120 FPS (RTX 4090)',
          ],
        },
      ],
    },
  ],
};

export default nextgenChangelog;
