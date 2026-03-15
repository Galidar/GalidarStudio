import type { ProductChangelog } from './changelog-types';

let claudebridgeChangelog: ProductChangelog = {
  product: 'ClaudeBridge',
  icon: '🤖',
  accent: '#22d3ee',
  entries: [
    {
      version: '0.2.0',
      date: 'March 15, 2026',
      title: 'FAB Store Release, Multi-Arch Compatibility & Offline Tools',
      tag: 'latest',
      highlights: [
        'First public release on FAB Store — ClaudeBridge available for all UE5 developers',
        'Fixed multi-architecture (arm64+x64) build failure caused by LiveCoding module',
        'New offline tools for full rebuild workflows without editor running',
      ],
      sections: [
        {
          heading: 'FAB Store Compatibility',
          items: [
            'Fixed fatal build error: LiveCoding module does not support multi-arch compilation (arm64+x64) required by FAB Store',
            'LiveCoding dependency moved to Win64-only conditional in Build.cs',
            'Added #if PLATFORM_WINDOWS guards around ILiveCodingModule.h include and LiveCompile function body',
            'Non-Windows platforms return graceful error message instead of failing to compile',
            'Plugin verified to compile cleanly on Win64, Mac, and Linux target platforms',
          ],
        },
        {
          heading: 'Offline Build Tools',
          items: [
            'New clean_project() tool — cleans Intermediate/Binaries of ALL plugins + project without editor',
            'New regenerate_project_files() tool — regenerates .sln and IntelliSense files offline',
            'New compile_project() tool — compiles with UnrealBuildTool directly',
            'New launch_editor() tool — opens editor and waits for ClaudeBridge MCP to respond',
            'New kill_editor() tool — safely terminates editor process',
            'full_build() improved: now cleans ALL plugins (not just ClaudeBridge) and regenerates project files',
          ],
        },
        {
          heading: 'MCP Tool Expansion',
          items: [
            '422+ MCP tools across 25+ domains and 40+ managers',
            'Auto-counted tool registry via mcp_version.py',
            'Self-documenting plugin via MCP instructions, enriched tool descriptions, and 6 MCP Resources',
            'All UE5 work consolidated into single plugin — eliminated redundant unreal-engine-dev plugin',
          ],
        },
        {
          heading: 'Architecture',
          items: [
            'Cross-platform support: Win64, Mac, Linux declared in .uplugin',
            '100% C++ source plugin — no Blueprint dependencies',
            'MCP Protocol compliance for compatibility with Claude, ChatGPT, Cursor, Windsurf, and other AI tools',
            'Embedded HTTP server for local MCP communication (zero cloud dependency)',
          ],
        },
      ],
    },
    {
      version: '0.1.0',
      date: 'February 20, 2026',
      title: 'Initial Development — MCP Foundation & Core Managers',
      tag: 'major',
      highlights: [
        'First functional MCP bridge between AI assistants and Unreal Engine 5',
        'Core manager architecture with 40+ specialized managers',
        'Complete Blueprint manipulation, actor spawning, and material editing via AI',
      ],
      sections: [
        {
          heading: 'MCP Server',
          items: [
            'Embedded HTTP server using UE5 HTTPServer module — runs locally on configurable port',
            'Full MCP Protocol implementation: tools, resources, and instructions',
            'JSON-RPC request/response handling with structured error reporting',
            'Automatic tool registration from C++ command handlers',
            'stdio-free architecture — no Python dependency required for core functionality',
          ],
        },
        {
          heading: 'Blueprint Domain',
          items: [
            'Create, open, compile, and delete Blueprint assets programmatically',
            'Add/remove components with full property configuration',
            'Create and wire Blueprint nodes (functions, events, variables)',
            'Blueprint graph manipulation: add nodes, connect pins, set defaults',
            'Variable creation with type support (bool, int, float, string, vector, rotator, transform)',
            'Event dispatcher creation and binding',
          ],
        },
        {
          heading: 'Actor & World Domain',
          items: [
            'Spawn any actor class into the level with transform and property configuration',
            'Query and modify actors by name, class, or tag',
            'Actor hierarchy manipulation: attach, detach, reparent',
            'World outliner integration for actor discovery and selection',
            'Level streaming support and sub-level management',
          ],
        },
        {
          heading: 'Material Domain',
          items: [
            'Create and edit Material assets and Material Instances',
            'Add material expression nodes and connect them',
            'Set scalar, vector, and texture parameters',
            'Material function support and layer blending',
            'Dynamic Material Instance creation at runtime',
          ],
        },
        {
          heading: 'Asset Management',
          items: [
            'Asset creation: Static Meshes, Textures, Data Tables, Curves, and more',
            'Asset import from external files (FBX, PNG, WAV, etc.)',
            'Asset registry queries by path, class, or tag',
            'Content Browser integration for asset discovery',
            'Asset duplication, renaming, and deletion',
          ],
        },
        {
          heading: 'Editor Integration',
          items: [
            'Editor viewport camera control (position, rotation, focus)',
            'Play In Editor (PIE) start/stop control',
            'Editor notifications and message logging',
            'Project settings read/write access',
            'Live Coding compilation trigger (Windows only)',
            'Console command execution from AI',
          ],
        },
        {
          heading: 'Niagara & VFX',
          items: [
            'Niagara System and Emitter asset creation',
            'Parameter manipulation on Niagara components',
            'Niagara module configuration support',
          ],
        },
        {
          heading: 'MetaSound & Audio',
          items: [
            'MetaSound asset creation and graph editing',
            'Audio parameter configuration',
            'Sound class and mix management',
          ],
        },
        {
          heading: 'Animation',
          items: [
            'Animation Blueprint node manipulation',
            'AnimGraph state machine support',
            'Animation Montage and Sequence access',
          ],
        },
        {
          heading: 'Navigation & AI',
          items: [
            'Navigation mesh configuration and queries',
            'AI Controller and Behavior Tree support',
            'Gameplay Tags read/write access',
          ],
        },
        {
          heading: 'Geometry & Mesh',
          items: [
            'Procedural mesh generation from vertex/triangle data',
            'Static Mesh creation from raw geometry (MeshDescription)',
            'Dynamic Mesh component support',
            'Geometry Script integration for mesh operations',
          ],
        },
        {
          heading: 'Source Control & Sequencer',
          items: [
            'Source control status queries and file operations',
            'Level Sequence (Cinematic) track and keyframe manipulation',
            'MovieScene integration for programmatic cinematics',
          ],
        },
        {
          heading: 'UI (UMG)',
          items: [
            'Widget Blueprint creation and editing',
            'UMG component hierarchy manipulation',
            'Widget property configuration',
          ],
        },
        {
          heading: 'Landscape & Foliage',
          items: [
            'Landscape actor queries and configuration',
            'Foliage instance placement and removal',
            'Terrain data access for height and layer information',
          ],
        },
      ],
    },
  ],
};

export default claudebridgeChangelog;
