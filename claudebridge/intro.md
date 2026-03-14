---
sidebar_position: 1
title: Introduction
slug: /
---

# ClaudeBridge

<div className="doc-badge doc-badge-violet">🤖 422+ AI Tools</div>
<div className="doc-badge doc-badge-cyan">🔌 MCP Protocol</div>
<div className="doc-badge doc-badge-emerald">🏗️ 25+ Domains</div>
<div className="doc-badge doc-badge-orange">🔒 100% Local</div>

**ClaudeBridge** is an AI-powered Unreal Engine 5 editor plugin that exposes **422+ tools** for controlling UE Editor in real-time via the **Model Context Protocol (MCP)**. Any MCP-compatible AI client — Claude, ChatGPT, Cursor, Windsurf, and more — can connect and manipulate the editor autonomously.

From Blueprint scripting to Material creation, Actor management to Niagara VFX, ClaudeBridge turns natural language into editor actions.

---

## Who It's For

| Target | Use Case |
|--------|----------|
| **Solo Developers** | Accelerate prototyping by describing what you want instead of clicking through menus |
| **Studios & Teams** | Automate repetitive editor tasks, batch operations, and pipeline workflows |
| **Technical Artists** | Scriptable Material and Niagara workflows via AI commands |
| **Educators & Students** | Learn UE5 concepts with AI-guided, interactive exploration |

---

## Key Features

- **422+ Tools** across 25+ domains (Blueprints, Materials, Actors, Niagara, Widgets, Sequencer, Animation, Mesh, Audio, Physics, and more)
- **Open Protocol** — Works with any MCP-compatible AI client, not locked to one vendor
- **100% Local** — No cloud, no API keys, no subscriptions. One-time purchase, runs entirely on your machine
- **Full C++ Source** — Complete source code included, fully extensible
- **Real-Time Dashboard** — Monitor connections, session stats, recent activity, and server status from within the editor
- **Undo/Redo Support** — Transaction-based operations with full editor undo integration
- **Cross-Platform** — Windows, macOS, and Linux support

---

## How It Works

```
AI Client (Claude, GPT, Cursor, etc.)
    |
    | HTTP POST /mcp (JSON-RPC 2.0)
    v
ClaudeBridge MCP Server (Port 3000)
    |
    | Routes commands to 40+ Manager classes
    v
Unreal Engine Editor API
    |
    | Executes on GameThread
    v
Your Project (Blueprints, Materials, Actors...)
```

1. **You describe** what you want in natural language to your AI client
2. **The AI translates** your request into MCP tool calls
3. **ClaudeBridge executes** the commands in the Unreal Editor
4. **You see results** instantly in the viewport, Blueprint editor, or Material graph

---

## Quick Example

> "Create a Blueprint actor with a BeginPlay event that prints 'Hello World' after a 2-second delay"

The AI will automatically:
1. Call `read_blueprint` to inspect the target
2. Call `add_event_node` to add BeginPlay
3. Call `add_node` to create a Delay node and PrintString
4. Call `connect_pins` to wire the execution flow
5. Call `compile_blueprint` to validate

All without you touching the editor.

---

## Supported Domains

| Domain | Tools | Description |
|--------|-------|-------------|
| Blueprint Nodes | 18 | Add, delete, configure graph nodes |
| Pin Connections | 3 | Wire execution and data flow |
| Events | 2 | Standard and custom Blueprint events |
| Variables | 3 | Create, delete, configure variables |
| Functions | 5 | Create functions with inputs/outputs |
| Inspection | 7 | Read Blueprint structure, analyze graphs |
| Actors | 20 | Spawn, transform, configure actors |
| Assets | 16 | Find, duplicate, rename, delete assets |
| Materials | 28 | Create materials, expressions, instances |
| Editor | 25 | Viewport control, PIE, screenshots |
| World | 9 | Levels, lights, physics |
| Niagara | 25 | Particle systems, emitters, renderers |
| Widgets | 17 | UMG UI creation and manipulation |
| Sequencer | 12 | Cinematics and animation tracks |
| Procedural Mesh | 38 | Runtime geometry creation and CSG |
| MetaSound | 15 | Procedural audio graphs |
| And 10+ more... | 179+ | Animation, Physics, Landscape, etc. |

---

## Next Steps

- [Installation & Setup](/claudebridge/getting-started/installation) — Get ClaudeBridge running in 5 minutes
- [Connecting Your AI Client](/claudebridge/getting-started/connecting) — Configure Claude, Cursor, or any MCP client
- [Your First Commands](/claudebridge/getting-started/first-commands) — Hands-on tutorial
- [Tools Reference](/claudebridge/tools-reference/overview) — Complete reference for all 422+ tools
