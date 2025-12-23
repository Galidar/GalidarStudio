---
slug: wave-forge-integration
title: "🔨 Wave Forge Studio - Custom Wave Profiles for NextGen 2.0"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, wave-forge, tools, procedural, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Wave Forge Studio: The Ultimate Wave Design Tool

**Wave Forge Studio** is our companion WebGPU application for designing custom breaking wave profiles. In NextGen 2.0, these profiles integrate directly with the engine for unprecedented control over wave shapes.

<!--truncate-->

## 🎯 What is Wave Forge?

Wave Forge Studio is a **browser-based spline editor** that lets you:

- Design complete wave lifecycle profiles visually
- Preview waves in real-time 3D
- Export directly to HLSL shaders
- Bake high-resolution textures for optimal performance

Think of it as a wave shape designer - you control exactly how waves form, break, and dissipate.

## 📐 The 21-Spline System

Wave profiles are defined using **21 Hermite splines**, each representing a stage in the wave's lateral evolution:

| Splines | Phase | Description |
|---------|-------|-------------|
| 0-1 | Swell | Deep water approaching |
| 2-4 | Rise | Wave steepening |
| 5-13 | Barrel | Breaking with curl (9 splines for detail) |
| 14-17 | Collapse | Barrel falling |
| 18-20 | Wash | Foam rushing to shore |

Each spline maps X position (0-1000) to height (Z), with Hermite tangents for smooth interpolation.

## 🌊 The Coordinate Space

Waves exist in a normalized space:

```hlsl
static const float MaxSplineHeight  = 176.2;    // Max wave height
static const float MaxSplineLengthX = 1000.0;   // Wave profile length
static const float LateralRange     = 2000.0;   // Cross-shore extent
```

The **21 splines** span Z from -1000 to +1000, representing the wave's evolution from formation to wash.

## 🔧 Spline Data Structure

Each spline has variable control points:

```hlsl
// Control point counts per spline
static const int SCount[21] = { 
    6, 6, 8, 8, 8, 8, 8, 8, 9,  // Swell → Barrel
    9, 9, 9, 9, 9, 9, 9, 9, 9,  // Barrel → Collapse
    5, 3, 3                      // Wash
};

// Offset into position/tangent arrays
static const int SOffset[21] = { 
    0, 6, 12, 20, 28, 36, 44, 52, 60,
    69, 78, 87, 96, 105, 114, 123, 132, 141,
    150, 155, 158 
};
```

The barrel phase uses more points (9 per spline) for detailed curl geometry.

## 📊 Control Point Format

Positions and tangents are stored as float3 arrays:

```hlsl
// Example: Spline 8 (peak of barrel)
float3(0.0, 0.0, -200.0),           // Start at shore
float3(363.6, 152.2, -200.0),       // Rising face
float3(549.2, 171.0, -200.0),       // Peak crest
float3(643.2, 75.3, -200.0),        // Curl over
float3(660.5, 22.6, -200.0),        // Falling curl
float3(626.9, -5.2, -200.0),        // Below water!
float3(663.9, 7.2, -200.0),         // Recovery
float3(768.6, 28.7, -200.0),        // Foam zone
float3(1000.0, 0.0, -200.0)         // End at water level
```

Notice how the curl actually goes **below zero** - creating the hollow barrel shape.

## 🎨 Hermite Interpolation

Smooth curves use Hermite interpolation with Catmull-Rom tangents:

```hlsl
// Hermite basis functions
float t2 = t * t;
float t3 = t2 * t;
float h00 = 2*t3 - 3*t2 + 1;
float h10 = t3 - 2*t2 + t;
float h01 = -2*t3 + 3*t2;
float h11 = t3 - t2;

// Interpolated position
float3 pos = h00*P0 + h10*T0 + h01*P1 + h11*T1;
```

This creates smooth, continuous curves without the oscillation of polynomial interpolation.

## 🖥️ Procedural vs Baked

Wave Forge supports two integration modes:

### Procedural Mode

Real-time spline evaluation in the shader:

**Pros:**
- Infinite resolution
- Dynamic parameter changes
- Lower memory usage

**Cons:**
- Higher GPU cost per pixel
- Complex shader code

### Baked Mode

Pre-computed textures:

**Pros:**
- Fast texture lookups
- Simple shader integration
- Consistent performance

**Cons:**
- Fixed resolution (up to 8K)
- Larger memory footprint
- Requires re-bake for changes

For most projects, we recommend **baked mode** with 2K-4K textures.

## 📦 Baked Texture Format

Wave Forge exports two textures:

### Projection2D (RG16F)
- **R**: Horizontal displacement
- **G**: Vertical displacement

### Derivatives (RGBA16F)
- **R**: dProjX/dU
- **G**: dProjY/dU
- **B**: dProjX/dV
- **A**: dProjY/dV

Derivatives enable **dynamic normal reconstruction** from static textures:

```hlsl
// Decode derivatives
float4 derivRaw = Texture2DSample(BakeDerivatives, Sampler, UVs);
float dProjX_dU = (derivRaw.r * 2.0 - 1.0) * DERIVATIVE_SCALE;
float dProjY_dU = (derivRaw.g * 2.0 - 1.0) * DERIVATIVE_SCALE;

// Reconstruct normal
float3 TanU = TanU_base + dD_dU;
float3 TanV = TanV_base + dD_dV;
float3 N_world = normalize(cross(TanU, TanV));
```

## 🔨 Wave Forge UI

The web application provides:

### Spline Editor
- Click-drag control points
- Tangent handles for curves
- Real-time preview

### 3D Viewport
- Rotate/zoom wave preview
- Toggle wireframe
- Animation playback

### Export Panel
- HLSL code generation
- Texture baking (PNG/EXR)
- Resolution selection

### Preset Library
- Plunging breaker
- Spilling breaker
- Surging wave
- Collapsing wave

## 🎮 Integration Example

Using baked profiles in your material:

```hlsl
// Sample baked data
float2 Projection2D = BakeProjection2D.Sample(Sampler, UVs).rg;

// Apply displacement
float2 DisplacementEffective = float2(
    DisplacementHorizontal / 100.0,
    DisplacementVertical / 800.0
);
float3 worldOffset = float3(
    Gradient * Projection2D.x * DisplacementEffective.x * BreakerStrength * 100.0,
    Projection2D.y * DisplacementEffective.y * BreakerStrength * 100.0
);
```

## 🌐 Accessing Wave Forge

Wave Forge Studio will be available at:

**[waveforge.galidar.studio](https://waveforge.galidar.studio)** *(Coming with 2.0)*

Free for all NextGen 2.0 customers.

## 📚 Workflow Tips

### Creating Realistic Barrels
1. Start with the "Plunging Breaker" preset
2. Adjust barrel splines (5-13) for tube size
3. Lower control points below zero for hollow effect
4. Smooth tangents for clean curves

### Matching Reference Video
1. Import reference frame as background
2. Trace wave profile with spline points
3. Repeat for multiple frames/stages
4. Interpolate between stages

### Performance Optimization
1. Use 2K textures for distant waves
2. Use 4K for hero coastlines
3. Enable mipmapping
4. Consider LOD texture sets

## 🎯 Best Practices

- **Start with presets** - they're based on real wave physics
- **Keep tangents smooth** - avoid sudden direction changes
- **Test at multiple scales** - zoom out to check overall shape
- **Bake at 2x final resolution** - allows for detail loss
- **Name your presets** - you'll want to reuse them!

---

*Ready to forge your perfect waves? The studio awaits!* 🌊

*Questions? Join our [Discord](https://discord.gg/s9TSBBX3Rh) #wave-forge channel!*
