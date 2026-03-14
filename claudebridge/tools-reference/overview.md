---
sidebar_position: 1
title: Tools Overview
---

# Tools Reference — Overview

ClaudeBridge exposes **422+ tools** organized into **25+ categories**. Each tool is a callable MCP function that executes an action in the Unreal Editor.

---

## Categories at a Glance

| Category | Tools | Description |
|----------|-------|-------------|
| **Blueprint Nodes** | 18 | Add, delete, configure, batch edit, auto-layout graph nodes |
| **Pin Connections** | 3 | Connect, disconnect, disconnect all pins |
| **Events** | 2 | Standard events (BeginPlay, Tick) and custom events |
| **Variables** | 3 | Create, delete, set properties on Blueprint variables |
| **Functions** | 5 | Create, delete, rename functions; add inputs/outputs |
| **Inspection** | 7 | Read Blueprints, analyze graphs, compile, describe, reparent |
| **Actors** | 20 | Spawn, delete, transform, properties, components, line trace |
| **Assets** | 16 | Find, duplicate, rename, delete, import, export assets |
| **Materials** | 28 | Create materials, expressions, instances; connect, compile |
| **Editor** | 25 | Viewport, PIE, screenshots, console, live compile |
| **World** | 9 | Levels, lights, physics, gravity |
| **Validation** | 5 | Validate Blueprints, search across BPs, find unused vars |
| **Behavior Trees** | 9 | Create, inspect, modify AI behavior trees and blackboards |
| **Input** | 6 | Enhanced Input actions, mapping contexts, key bindings |
| **Utilities** | 9 | Output log, Python exec, undo/redo, transactions |
| **Snapshots** | 4 | Create, restore, list, delete backup snapshots |
| **Data Types** | 6 | Create structs, enums; add fields/entries |
| **Animation** | 10 | Sequences, notifies, curves, bones, montages, blend spaces |
| **Mesh** | 12 | Static/skeletal mesh info, Nanite, collision, LODs, materials |
| **Audio** | 8 | List sounds, play/stop, spawn audio components |
| **Widgets** | 17 | Create UMG widgets, set properties, bindings, animations |
| **Sequencer** | 12 | Level sequences, bindings, tracks, keyframes, playback |
| **Gameplay** | 8 | Gameplay tags, navigation mesh, pathfinding |
| **Physics** | 8 | Physics assets, collision, mass, forces, impulses |
| **Level** | 10 | Sublevels, streaming, build all, save, dirty packages |
| **Source Control** | 8 | Status, checkout, checkin, revert, history |
| **Landscape** | 11 | Terrain info, layers, foliage, heightmap, resolution |
| **Media** | 6 | Media players, playback control, state |
| **Processes** | 7 | Launch servers/clients, multiplayer PIE, process management |
| **Runtime Inspector** | 5 | Inspect actors and components during PIE gameplay |
| **Performance** | 3 | FPS snapshots, continuous monitoring |
| **Test Runner** | 4 | Automated PIE testing with condition checks |
| **Niagara** | 25 | Particle systems, emitters, modules, renderers, parameters |
| **MetaSound** | 15 | Procedural audio nodes, connections, preview |
| **DataTable** | 4 | Schema, rows, add/delete entries |
| **MVVM** | 8 | ViewModel bindings for UMG widgets |
| **Procedural Mesh** | 38 | Create geometry, booleans, extrude, sculpt, fracture |
| **Widget Tree** | 5 | Wrap, unwrap, reparent, slot properties, compile |
| **Asset Import** | 9 | Import textures, FBX; export; set properties |
| **BlueprintLisp** | 4 | Text-based Blueprint authoring language |
| **Editor Events** | 2 | Poll and subscribe to editor events |
| **Components** | 4 | Static mesh, physics, transform properties on BP components |

---

## How to Discover Tools

### From Your AI Client

Ask: *"What tools are available for materials?"* — The AI will call `tools/list` and filter relevant tools.

### From the Dashboard

Click **Managers (44)** in the ClaudeBridge panel to see all categories with their tool counts.

### Programmatically

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

### ClaudeBridge Guide Tool

Call `claudebridge_guide` to get a categorized reference of all tools with descriptions.

---

## Tool Naming Convention

Tools follow a consistent naming pattern:

| Pattern | Examples |
|---------|----------|
| `list_*` | `list_actors`, `list_materials`, `list_blueprints` |
| `get_*` | `get_actor_details`, `get_material_graph` |
| `set_*` | `set_actor_property`, `set_light_properties` |
| `create_*` | `create_material`, `create_variable` |
| `delete_*` | `delete_actor`, `delete_node` |
| `add_*` | `add_node`, `add_component`, `add_niagara_emitter` |
| `connect_*` | `connect_pins`, `connect_material_expressions` |

---

## Detailed Reference

For parameter-level detail on every tool, use the `claudebridge_guide` tool from your AI client, or check the JSON schema files in `Resources/tool_schemas/` within the plugin folder.
