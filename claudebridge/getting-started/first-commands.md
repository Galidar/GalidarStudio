---
sidebar_position: 3
title: Your First Commands
---

# Your First Commands

Let's walk through some practical examples to show what ClaudeBridge can do.

---

## 1. Explore Your Project

Start by asking your AI client to explore what's in your project:

> "List all actors in the current level"

> "Show me the Blueprints in this project"

> "What materials are available?"

These read-only commands help you understand your project without making changes.

---

## 2. Spawn an Actor

> "Spawn a point light at position (0, 0, 500) with intensity 50000 and yellow color"

The AI will call `spawn_light` with the appropriate parameters. You'll see the light appear in your viewport instantly.

---

## 3. Modify a Blueprint

> "Open BP_MyActor and add a BeginPlay event that prints 'Hello from AI!'"

The AI will:
1. `read_blueprint` — Inspect the Blueprint structure
2. `analyze_graph` — Check for existing nodes
3. `add_event_node` — Add ReceiveBeginPlay (if not present)
4. `add_node` (Print) — Add a PrintString node
5. `connect_pins` — Wire BeginPlay to PrintString
6. `compile_blueprint` — Compile and validate

---

## 4. Create a Material

> "Create a red metallic material called M_RedMetal with roughness 0.2"

The AI will:
1. `create_material` — Create the base material
2. `create_material_expression` — Add VectorParameter for color
3. `create_material_expression` — Add ScalarParameter for roughness and metallic
4. `connect_material_expressions` — Wire to Base Color, Roughness, Metallic
5. `recompile_material` — Compile the material

---

## 5. Take a Screenshot

> "Take a screenshot of the current viewport"

The AI calls `take_screenshot` and saves the image to disk.

---

## 6. Use Undo/Redo

> "Undo the last change"

All ClaudeBridge operations integrate with UE's undo system. You can also use `begin_transaction` / `end_transaction` to group multiple operations into a single undo step.

---

## Tips for Effective AI Commands

| Tip | Example |
|-----|---------|
| **Be specific** | "Spawn a cube at (100, 200, 50)" instead of "add something" |
| **Name your assets** | "Create material M_GlowBlue" instead of "create a material" |
| **Ask to inspect first** | "Read the Blueprint BP_Player before making changes" |
| **Use undo transactions** | "Group the next operations as a single undo step" |
| **Compile after changes** | "Compile the Blueprint when done" |

---

## What's Next?

- [Tools Reference](/claudebridge/tools-reference/overview) — Browse all 422+ available tools
- [Blueprint Guide](/claudebridge/guides/blueprints) — Deep dive into Blueprint manipulation
- [Material Guide](/claudebridge/guides/materials) — Advanced material creation workflows
