---
title: "Performance Optimization: Getting 60+ FPS with Beautiful Water"
slug: performance-optimization
date: 2025-12-10
tags:
  - performance
  - optimization
  - tips
description: "Learn how to optimize your water simulation for smooth gameplay while maintaining stunning visuals."
image: /img/landing/oceanology-legacy.png
authors: [galidar]
---

Beautiful water shouldn't mean sacrificing performance. This guide shows you how to achieve both.

<!-- truncate -->

## 🎯 Performance Goals

Before optimizing, define your targets:

| Platform | Target FPS | GPU Budget |
|----------|------------|------------|
| PC High-End | 60-144 | 8-12ms |
| PC Mid-Range | 60 | 12-16ms |
| Console | 30-60 | 16-33ms |
| VR | 90 | 11ms |

:::tip Golden Rule
**Profile first, optimize second.** Never guess — measure actual bottlenecks.
:::

---

## 📊 Profiling Your Water

### Essential Console Commands

```cpp
stat gpu              // GPU timing breakdown
stat unit             // Frame timing overview
stat scenerendering   // Render thread details
profilegpu            // Detailed GPU profiler
stat memory           // Memory usage
```

### What to Look For

| Stat | Target | If Too High |
|------|--------|-------------|
| GPU Time | Under 12ms | Reduce visual quality |
| Game Thread | Under 8ms | Optimize BP logic |
| Draw Calls | Under 2000 | Enable instancing |
| Triangles | Under 5M | Adjust QuadTree |

---

## 🌊 Wave System Optimization

### FFT Resolution (NextGen)

The FFT grid resolution has the biggest performance impact:

| Resolution | Quality | Performance Cost |
|------------|---------|------------------|
| 512x512 | Best | High |
| 256x256 | Great | Medium |
| 128x128 | Good | Low |

**How to adjust:**
1. Select your Ocean actor
2. Find **FFT Settings** category
3. Lower **Resolution** value

### Wave Layers (Legacy)

Legacy uses layered Gerstner waves:

| Layers | Quality | Cost |
|--------|---------|------|
| 4 | Full detail | 1.0x |
| 3 | Very good | 0.75x |
| 2 | Acceptable | 0.5x |
| 1 | Minimal | 0.25x |

**Recommendation:** Start with 2 layers, add more only if needed.

---

## 🔲 QuadTree LOD Settings

The QuadTree mesh system is key to performance:

### Distance-Based LOD

Adjust how quickly detail reduces with distance:

```
Near LOD Distance: 1000     // Full detail within 10m
Mid LOD Distance: 5000      // Medium detail 10-50m
Far LOD Distance: 20000     // Low detail 50-200m
```

### Tessellation Settings

| Setting | Performance Impact | Visual Impact |
|---------|-------------------|---------------|
| Max Tessellation | High | Wave detail |
| LOD Multiplier | Medium | Distance quality |
| Screen Size Threshold | Medium | Mesh density |

**Quick optimization:**
- Halve `Max Tessellation` → 2x performance gain
- Double `LOD Distances` → Significant FPS boost

---

## 🏖️ Shore Effects Optimization

Shore effects can be expensive. Here's how to optimize:

### Foam

| Setting | Value | Impact |
|---------|-------|--------|
| Foam Samples | 8→4 | -30% GPU |
| Foam Resolution | 512→256 | -40% memory |
| Update Frequency | Every frame→Every 2 frames | -50% cost |

### Shore Waves

- **Disable** if your scene doesn't have beaches
- **Reduce wave segments** from 32 to 16
- **Limit shore wave distance** to nearby camera areas

---

## 🏊 Buoyancy Optimization

### Pontoon Count

More pontoons = more accurate floating = more CPU cost

| Object Type | Recommended Pontoons |
|-------------|---------------------|
| Small debris | 1 |
| Barrels/crates | 3-4 |
| Boats | 5-8 |
| Ships | 8-12 |

### Query Optimization

```cpp
// In your buoyancy component
Buoyancy Update Frequency: 0.02  // Every 20ms instead of every frame
Use Async Queries: true          // Non-blocking water height queries
```

### Culling

Disable buoyancy for off-screen objects:
```cpp
// In your game mode or manager
OnActorOutOfRange → Disable Buoyancy Component
OnActorInRange → Re-enable Buoyancy Component
```

---

## 🌅 Visual Quality Settings

### Reflection Settings

| Mode | Quality | Cost |
|------|---------|------|
| Lumen | Best | High |
| Screen Space | Good | Medium |
| Planar | Great | Medium-High |
| Cubemap Only | Acceptable | Low |

**Recommendation:** Use Screen Space for most games.

### Refraction

| Setting | Impact |
|---------|--------|
| Refraction Quality | Medium → Low saves 1-2ms |
| Depth Sampling | Half-res saves 20% |

---

## 📱 Platform-Specific Tips

### PC Scalability

Create multiple quality presets:

```cpp
// UltraQuality
FFT_Resolution: 512
WaveLayers: 4
MaxTessellation: 64
ReflectionMode: Lumen

// HighQuality  
FFT_Resolution: 256
WaveLayers: 3
MaxTessellation: 32
ReflectionMode: ScreenSpace

// MediumQuality
FFT_Resolution: 128
WaveLayers: 2
MaxTessellation: 16
ReflectionMode: Cubemap

// LowQuality
Use Oceanology Legacy instead
```

### Console Optimization

For PS5/Xbox Series X:
- Use **NextGen** with Medium settings
- Enable **Variable Rate Shading** (VRS)
- Use **Async Compute** for FFT

For PS4/Xbox One:
- Use **Oceanology Legacy**
- Limit to 2 wave layers
- Reduce QuadTree density

### VR Optimization

VR is demanding — every millisecond counts:

1. **Use Oceanology Legacy** (not NextGen)
2. **Disable post-processing** underwater effects
3. **Reduce all distances** by 50%
4. **Use fixed foveated rendering** if available
5. **Target 90 FPS minimum**

---

## ⚡ Quick Optimization Checklist

### Immediate Wins (Big Impact, Easy)

- [ ] Lower FFT resolution (512→256)
- [ ] Reduce wave layers (4→2)
- [ ] Increase LOD distances
- [ ] Disable unused shore effects

### Medium Effort

- [ ] Optimize QuadTree settings
- [ ] Reduce pontoon counts
- [ ] Enable async buoyancy queries
- [ ] Cull off-screen water interaction

### Advanced

- [ ] Profile GPU to find exact bottlenecks
- [ ] Create scalability presets
- [ ] Implement distance-based quality switching
- [ ] Custom LOD for different water bodies

---

## 📈 Expected Performance Gains

Following this guide, expect:

| Change | FPS Gain |
|--------|----------|
| FFT 512→256 | +20-30% |
| Wave layers 4→2 | +15-25% |
| QuadTree optimization | +10-20% |
| Buoyancy async | +5-10% |
| Combined | **+50-80%** |

---

## 🔧 Debugging Performance

If still having issues:

1. **Isolate the water**
   - Create empty level with only ocean
   - Measure baseline FPS
   - Add elements one by one

2. **Check for conflicts**
   - Other water plugins?
   - Heavy post-processing?
   - Particle systems?

3. **GPU vs CPU bound**
   - `stat unit` shows which is limiting
   - GPU: reduce visual quality
   - CPU: reduce complexity/queries

---

## 📚 More Resources

- [QuadTree Documentation](/oceanology-nextgen/NextGenQuadTree)
- [Presets Guide](/oceanology-nextgen/NextGenPreset)
- [Community Discord](https://discord.gg/VHJGBDR2as) — #optimization channel

Performance optimization is iterative. Start with the biggest wins and work down. Your players will thank you for smooth, beautiful water!
