---
title: "10 Essential Tips Every Oceanology User Should Know"
slug: essential-tips
date: 2025-11-15
tags:
  - tips
  - beginner
  - oceanology
  - riverology
description: "Master these essential tips to get the most out of your water simulation plugins and create stunning ocean environments."
image: /img/landing/oceanology-nextgen.png
authors: [galidar]
---

After helping thousands of developers create stunning water environments, we've compiled the most valuable tips that will dramatically improve your workflow and results.

<!-- truncate -->

## 🎯 Tip 1: Always Start with Demo Maps

**Don't start from scratch.** Our demo maps contain pre-configured setups that work perfectly out of the box.

**Where to find them:**
- **NextGen:** `Plugins/Oceanology/Content/Maps/DemoMap_NextGen`
- **Legacy:** `Plugins/Oceanology/Content/Maps/DemoMap_Legacy`
- **Riverology:** `Plugins/Riverology/Content/Maps/DemoMap_River`

Copy these maps and modify them instead of building from zero. This saves hours of configuration time.

---

## ⚙️ Tip 2: Enable DirectX 12 First

**This is non-negotiable for NextGen.** Many visual issues stem from using DX11.

**Quick setup:**
1. Go to **Project Settings → Platforms → Windows**
2. Set **Default RHI** to **DirectX 12**
3. Enable **D3D12 Shader Model 6**
4. **Restart the editor**

:::warning Common Mistake
Pink materials usually mean shaders are compiling OR DX12 isn't enabled. Wait 2-3 minutes after first load.
:::

---

## 🌊 Tip 3: Use Presets for Quick Iteration

Don't spend hours tweaking individual parameters. Use our preset system:

| Preset | Best For |
|--------|----------|
| **Calm Ocean** | Peaceful scenes, sailing games |
| **Stormy Seas** | Drama, survival games |
| **Tropical** | Island paradises, bright colors |
| **Arctic** | Cold environments, dark water |
| **Lake** | Inland water bodies |

**Where to find presets:**
- In the Ocean actor's Details panel → **Presets** category
- Or check [Presets Documentation](/oceanology-nextgen/NextGenPreset)

---

## 🚢 Tip 4: Buoyancy Requires Physics Simulation

**The #1 support question:** "My boat won't float!"

**Solution:** Enable physics on your actor:
1. Select your mesh
2. In Details → **Physics** section
3. Check **Simulate Physics** ✅
4. Set **Mass** appropriately (boats: 1000-5000 kg)
5. Add the **OceanBuoyancy** component

See the [complete Buoyancy guide](/oceanology-nextgen/NextGenBuoyancy) for pontoon configuration.

---

## 📍 Tip 5: Place OceanologyManager First

Before adding any water actors, place the **OceanologyManager** in your level.

**Why?** The manager coordinates:
- Wave synchronization
- Buoyancy calculations
- Performance optimization
- Multiplayer sync

**Location:** `Plugins/Oceanology/Blueprints/BP_OceanologyManager`

---

## 🏔️ Tip 6: Enable Mesh Distance Fields for Shorelines

Beautiful foam around rocks and shorelines requires **Mesh Distance Fields**.

**Enable it:**
1. **Project Settings → Engine → Rendering**
2. Find **Generate Mesh Distance Fields**
3. Check it ✅
4. Restart editor

**Rebuild distance fields:**
- Go to **Build → Build All** after adding new static meshes

---

## 🎮 Tip 7: Use Water Interactor Mesh for Splashes

Want splash effects when characters enter water?

Add a **Water Interactor Mesh** component to your character:
1. Open your Character Blueprint
2. Add Component → Search "Water Interactor"
3. Attach it to the character mesh
4. Configure splash radius and intensity

This creates beautiful ripples and splash particles automatically.

---

## 📊 Tip 8: Profile Before Optimizing

Use Unreal's built-in profiler to identify actual bottlenecks:

**Console commands:**
```
stat gpu          // GPU timing breakdown
stat unit         // Frame time analysis  
profilegpu        // Detailed GPU profiler
stat oceanology   // Our custom stats (if available)
```

**Common performance issues:**
- Too many wave layers → Reduce from 4 to 2-3
- QuadTree too dense → Increase LOD distances
- FFT resolution too high → Drop from 512 to 256

---

## 🔄 Tip 9: Deterministic Waves for Multiplayer

For multiplayer games, enable **Deterministic Mode**:

1. Select your Ocean actor
2. In Details → **Waves** category
3. Enable **Deterministic Waves** ✅
4. Set a fixed **Wave Seed** (same on all clients)

This ensures all players see identical wave positions - critical for competitive gameplay.

---

## 📚 Tip 10: Read the Documentation Structure

Our docs are organized to help you find things fast:

| Need Help With... | Go To |
|-------------------|-------|
| First-time setup | [Setup Guide](/oceanology-nextgen/setup) |
| Objects floating | [Buoyancy](/oceanology-nextgen/NextGenBuoyancy) |
| Character swimming | [Swimming](/oceanology-nextgen/NextGenSwimming) |
| Visual quality | [Surface](/oceanology-nextgen/NextGenSurface) |
| Performance issues | [QuadTree](/oceanology-nextgen/NextGenQuadTree) |
| Underwater effects | [Underwater](/oceanology-nextgen/NextGenUnderwater) |
| Beach/shoreline | [Shore Waves](/oceanology-nextgen/NextGenShoreWaves) |

---

## 🚀 Bonus: Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Pink materials | Wait for shader compilation or enable DX12 |
| No foam on shores | Enable Mesh Distance Fields |
| Objects sink | Enable Simulate Physics, add OceanBuoyancy |
| Black underwater | Add Post Process Volume with Infinite Extent |
| Waves not moving | Check OceanologyManager is in level |
| Low FPS | Reduce QuadTree density, lower FFT resolution |

---

## Need More Help?

- 📖 **Full Documentation** — [Browse all guides](/oceanology-nextgen)
- 💬 **Discord Community** — [Join 6000+ developers](https://discord.gg/VHJGBDR2as)
- ❓ **FAQ** — [Common questions answered](/faq)
- 🎫 **Support** — [Get direct help](/support)

These tips come from years of helping developers succeed. Master them and you'll create stunning water environments with ease!
