---
title: "Troubleshooting Guide: Solving the Most Common Issues"
slug: troubleshooting-guide
date: 2025-12-01
tags:
  - troubleshooting
  - help
  - tips
description: "Quick solutions to the most common problems users encounter with Oceanology and Riverology plugins."
image: /img/landing/oceanology-nextgen.png
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
---

Encountering issues? Don't worry — most problems have simple solutions. This guide covers the top issues we see in support and how to fix them fast.

<!-- truncate -->

## 🔴 Visual Issues

### Problem: Pink or Missing Materials

**Symptoms:** Ocean appears pink, purple, or completely invisible

**Solutions:**

1. **Wait for shader compilation** (most common)
   - First load can take 2-5 minutes
   - Check bottom-right corner for "Compiling Shaders..."
   - Don't touch anything until complete

2. **Enable DirectX 12**
   ```
   Project Settings → Platforms → Windows → Default RHI → DirectX 12
   ```

3. **Restart the editor** after enabling DX12

4. **Clear shader cache** if problem persists:
   - Close editor
   - Delete `Saved/ShaderCache` folder
   - Reopen project

:::tip Quick Check
Open the demo map first. If it works there, the issue is in your level configuration.
:::

---

### Problem: No Foam on Shorelines

**Symptoms:** Water meets terrain but no white foam appears

**Solutions:**

1. **Enable Mesh Distance Fields**
   ```
   Project Settings → Engine → Rendering → Generate Mesh Distance Fields ✅
   ```

2. **Rebuild the level**
   - Go to **Build → Build All**
   - Wait for distance fields to generate

3. **Check landscape settings**
   - Ensure your Landscape has distance field generation enabled
   - In Landscape details: **Generate Mesh Distance Field** ✅

4. **Verify foam settings** on Ocean actor
   - Check **Foam Amount** is > 0
   - Check **Shore Foam** is enabled

---

### Problem: Black or Dark Underwater

**Symptoms:** Going underwater shows black screen or no effects

**Solutions:**

1. **Add Post Process Volume**
   - Place a **Post Process Volume** in your level
   - Enable **Infinite Extent (Unbound)** ✅

2. **Check underwater mode**
   - Select Ocean actor
   - Find **Underwater** category
   - Ensure **Enable Underwater Effects** ✅

3. **Verify camera is linked**
   - The system auto-detects the player camera
   - For custom cameras, ensure they have proper tags

---

## 🟡 Physics Issues

### Problem: Objects Don't Float

**Symptoms:** Boats, debris, or characters sink through water

**Solutions:**

1. **Enable physics simulation**
   ```
   Select Actor → Details → Physics → Simulate Physics ✅
   ```

2. **Add OceanBuoyancy component**
   - Select your floating actor
   - Add Component → Search "OceanBuoyancy"
   - Configure pontoon points

3. **Check mass settings**
   - Too heavy = sinks (reduce Mass value)
   - Typical boat: 1000-5000 kg
   - Debris/barrels: 50-200 kg

4. **Verify collision**
   - Actor needs collision enabled
   - Collision should be set to **Physics Actor**

5. **Pontoon configuration** (for boats)
   - Add pontoons at corners and center
   - 5 pontoons minimum for stability
   - See [Buoyancy docs](/oceanology-nextgen/NextGenBuoyancy) for diagrams

---

### Problem: Objects Fly Away or Shake Violently

**Symptoms:** Floating objects launch into the sky or shake uncontrollably

**Solutions:**

1. **Reduce buoyancy force**
   - Lower **Buoyancy Multiplier** (try 0.5-1.0)
   - Increase **Linear Damping** (try 1.0-3.0)
   - Increase **Angular Damping** (try 2.0-5.0)

2. **Check pontoon placement**
   - Pontoons shouldn't overlap
   - Space them evenly
   - Ensure they're at water line level

3. **Mass might be too low**
   - Increase actor mass
   - Heavy objects are more stable

---

### Problem: Character Can't Swim

**Symptoms:** Player falls through water or walking animation plays in water

**Solutions:**

1. **Add Water Volume**
   - Place **Physics Volume** in your level
   - Set volume mode to **Water Physics**
   - Size it to cover your water area

2. **Check Character Movement**
   - Your character needs **CharacterMovementComponent**
   - Enable **Swimming** movement mode

3. **Link volume to water body**
   - Select the Physics Volume
   - In Details, set **Water Body** reference to your Ocean actor

4. **For custom characters:**
   - Override `Swim()` function
   - Handle water entry/exit events

---

## 🟠 Performance Issues

### Problem: Low Frame Rate

**Symptoms:** FPS drops below 30, stuttering

**Solutions:**

1. **Reduce wave complexity**
   - Lower **Wave Layers** from 4 to 2-3
   - Reduce **FFT Resolution** from 512 to 256

2. **Optimize QuadTree**
   - Increase **LOD Distances** 
   - Reduce **Max Tessellation**
   - See [QuadTree docs](/oceanology-nextgen/NextGenQuadTree)

3. **Check other systems**
   - Disable **Volumetric Fog** if not needed
   - Reduce **Reflection Quality**
   - Lower **Shadow Quality**

4. **Profile first**
   ```
   Console: stat gpu
   Console: stat unit
   ```
   Find the actual bottleneck before optimizing.

---

### Problem: Hitches or Stuttering

**Symptoms:** Periodic frame drops, micro-stutters

**Solutions:**

1. **Enable async GPU readback**
   - This prevents buoyancy queries from blocking the main thread
   - Check Ocean actor settings

2. **Reduce buoyancy queries**
   - Only floating objects that need physics should have buoyancy
   - Static decorations don't need it

3. **Check streaming**
   - If using World Partition, ensure water is in persistent level
   - Or configure proper streaming distances

---

## 🟣 Setup Issues

### Problem: Plugin Not Appearing

**Symptoms:** Can't find Oceanology in plugins list

**Solutions:**

1. **Verify installation location**
   - Plugin should be in `Engine/Plugins/` (Engine install)
   - Or `YourProject/Plugins/` (Project install)

2. **Check engine version**
   - NextGen requires UE 5.3+
   - Legacy works with UE 5.0+

3. **Restart editor** after moving files

4. **Check for errors**
   - Look in Output Log for red text
   - Common: missing dependencies

---

### Problem: Demo Map Won't Open

**Symptoms:** Error when trying to open demo map

**Solutions:**

1. **Show plugin content**
   - In Content Browser
   - Click **Settings** (gear icon)
   - Enable **Show Plugin Content** ✅

2. **Navigate to correct path**
   ```
   Content Browser → Plugins → Oceanology → Maps
   ```

3. **Allow shader compilation**
   - First open may take several minutes
   - Let all shaders compile

---

## 🔧 Quick Diagnostic Checklist

Before asking for support, verify:

- [ ] DirectX 12 is enabled
- [ ] Shaders have finished compiling
- [ ] OceanologyManager is in the level
- [ ] Demo map works correctly
- [ ] Physics is enabled on floating actors
- [ ] Post Process Volume exists (for underwater)
- [ ] Mesh Distance Fields are enabled (for foam)

---

## 📞 Still Need Help?

If your issue isn't listed here:

1. **Search Discord** — Someone probably asked before
2. **Check FAQ** — [Frequently asked questions](/faq)
3. **Open Support Ticket** — [Get direct help](/support)
4. **Include these details:**
   - Engine version
   - Plugin version
   - Screenshots/videos
   - Output Log errors
   - Steps to reproduce

**Discord:** [Join 6000+ developers](https://discord.gg/VHJGBDR2as)

We typically respond within 24 hours on weekdays. The community is also incredibly helpful!
