---
sidebar_position: 5
title: FAQ
---

# Frequently Asked Questions

---

### Which AI clients are compatible?

ClaudeBridge uses the **Model Context Protocol (MCP)**, an open standard. It works with:
- **Claude** (Desktop & Code)
- **ChatGPT** (via MCP plugins)
- **Cursor IDE**
- **Windsurf**
- **Any MCP-compatible client**

You are not locked into any single AI provider.

---

### Does it require a subscription or API keys?

**No.** ClaudeBridge is a one-time purchase. It runs 100% locally on your machine — no cloud services, no API keys, no recurring fees. Your AI client may have its own costs, but ClaudeBridge itself has zero ongoing charges.

---

### Which Unreal Engine versions are supported?

ClaudeBridge is developed and tested on **UE 5.7**. It is compatible with **UE 5.4+** and supports **Windows, macOS, and Linux**.

---

### Is the full C++ source code included?

**Yes.** You get the complete source code for the entire plugin — all 40+ manager classes, the MCP server, the router, the dashboard UI, and all tool schemas. You can extend, modify, or learn from it freely.

---

### What can ClaudeBridge actually do?

ClaudeBridge provides **422+ tools** across 25+ domains:

- **Blueprints**: Create nodes, variables, functions, wire graphs, compile
- **Materials**: Create materials, expressions, instances, compile
- **Actors**: Spawn, transform, configure properties and components
- **Niagara**: Build VFX systems, emitters, modules, renderers
- **Widgets**: Create UMG UI, set properties, bind events
- **Sequencer**: Create cinematics, add tracks, control playback
- **Procedural Mesh**: Generate geometry, boolean operations, sculpting
- **MetaSound**: Build procedural audio graphs
- **And much more**: Animation, Physics, Landscape, Audio, Navigation, Data Tables, MVVM...

---

### How is it different from other AI editor plugins?

| Feature | ClaudeBridge | Typical Competitors |
|---------|-------------|-------------------|
| **Protocol** | Open MCP standard | Proprietary |
| **AI Client Lock-in** | None — use any MCP client | Often locked to one |
| **Tool Count** | 422+ | 20-50 typical |
| **Architecture** | 100% local, no cloud | Often requires cloud |
| **Source Code** | Full C++ source included | Usually closed |
| **Pricing** | One-time purchase | Often subscription |

---

### Is my data sent to the cloud?

**No.** ClaudeBridge communicates only over `localhost`. Your project data never leaves your machine through ClaudeBridge. The AI client you use may have its own data handling policies.

---

### Can I extend ClaudeBridge with custom tools?

**Yes.** The architecture is designed for extensibility:
1. Create a new Manager class (C++)
2. Register commands in `ClaudeBridgeModule.cpp`
3. Add tool metadata in `Resources/tool_schemas/`
4. Recompile — your new tools appear automatically

See the [Architecture section](./getting-started/connecting) for details.

---

### Does it work in packaged/shipping builds?

**No.** ClaudeBridge is an **Editor-only** plugin (Module Type: Editor). It is not included in packaged builds and has zero impact on your game's runtime performance or shipping size.

---

### What port does it use?

The MCP server runs on **port 3000** by default. You can change this in **Project Settings > Plugins > ClaudeBridge**.

---

### Can multiple AI clients connect simultaneously?

The MCP server handles one session at a time. If you need to switch AI clients, simply connect the new one — it will take over the session.
