---
slug: nextgen-2-technical-architecture
title: "⚙️ Under the Hood - NextGen 2.0 Technical Architecture"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, technical, architecture, gpu, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# NextGen 2.0 Technical Architecture: A Deep Dive

For developers who want to understand the engineering behind NextGen 2.0, this article explores the **GPU data architecture**, **shader organization**, and **rendering pipeline** changes that make the new features possible.

<!--truncate-->

## 🏗️ Architectural Overview

NextGen 2.0 introduces a significantly expanded data pipeline:

```
Water Body → View Extension → GPU Buffers → Shaders → Output
                   ↓
            Wave System Selector
                   ↓
     ┌─────────────┼─────────────┐
     ↓             ↓             ↓
  Spectral     Legacy      Breaking
  Gerstner    Gerstner      Waves
```

Each system operates independently but shares common infrastructure.

## 📊 GPU Data Structures

### Water Body Data (Per Body)

```cpp
struct FOceanologyWaterBodyData
{
    float WaterZoneIndex;        // Zone assignment
    float WaveDataIndex;         // Into wave buffer
    float NumWaves;              // Legacy wave count
    float TargetWaveMaskDepth;   // Attenuation depth
    
    float FixedVelocityXY;       // Packed flow vector
    float FixedVelocityZ;        // Vertical flow
    float FixedZHeight;          // Surface height
    float FixedWaterDepth;       // Fixed depth mode
    
    float WaveSystemSelector;    // 0=None, 1=Spectral, 2=Legacy
    float Unused_Y;
    float Unused_Z;
    float Unused_W;
};
```

The `WaveSystemSelector` field is new in 2.0, enabling per-body wave type selection.

### Wave Data (15 Float4 Blocks)

2.0 expands wave data from 4 to **15 float4 blocks** per water body:

```cpp
struct FOceanologyWaveData
{
    // Blocks 0-2: Shore/Breaking Waves
    float4 DataBlock0;  // CoastalWaves, BreakerStrength, WaveLength, GlobalWaveScale
    float4 DataBlock1;  // WavePhaseSpeed, DirectionWaveSpeed, SwayFrequency, SwayAmplitude
    float4 DataBlock2;  // ShoreSlopeRange, SurfZoneWidth, ShorelineFoam, FlowStrength
    
    // Blocks 3-6: Spectral Gerstner
    float4 DataBlock3;  // SpectralEnabled, BeaufortScale, DirectionalVariance, FoamThresholdHigh
    float4 DataBlock4;  // FoamThresholdLow, MaxWaveHeight, MaxWaveLength, MinWaveHeight
    float4 DataBlock5;  // MinWaveLength, SmallWaveThreshold, WaveComponentCount, EnergyDistribution
    float4 DataBlock6;  // SpectrumResolution, WindDirection.X, WindDirection.Y, unused
    
    // Blocks 7-14: Legacy Gerstner (unchanged from 1.x)
    float4 DataBlock7;  // GlobalDisplacement...
    float4 DataBlock8;  // BaseOffset...
    // ... etc
};
```

### Zone Data

```cpp
struct FOceanologyWaterZoneData
{
    FVector2f Extent;           // Zone dimensions
    FVector2f HeightExtent;     // Vertical bounds
    
    float GroundZMin;           // Terrain floor
    float bIsLocalOnlyTessellation;
    
    float _Padding[2];
};
```

## 🎯 Wave System Selector

The selector routes wave computation at the shader level:

```hlsl
// OceanologyWaveSystemSelector.ush
float3 GetWaves(
    in int WaterBodyIndex,
    in float2 WorldPosition,
    in float Time,
    out float3 OutDisplacement,
    out float3 OutNormal,
    out float OutFoam)
{
    const float WaveSystemSelector = GetWaterBodyData(WaterBodyIndex).WaveSystemSelector;

    WaveOutput OceanWaves;

    if (WaveSystemSelector == 1)  // Spectral
    {
        OceanWaves = GetSpectralGerstnerWaves(WaterBodyIndex, WorldPosition, Time);
    }
    else if (WaveSystemSelector == 2)  // Legacy
    {
        OceanWaves = GetGerstnerWaves(WaterBodyIndex, WorldPosition, Time);
    }
    else  // None
    {
        OceanWaves = (WaveOutput)0;
        OceanWaves.Normal = float3(0, 0, 1);
    }

    OutDisplacement = OceanWaves.WPO;
    OutNormal = OceanWaves.Normal;
    OutFoam = OceanWaves.Foam;

    return 0;
}
```

Note that **Breaking Waves are handled separately** - they process the output of the base wave system.

## 🔧 Shader File Organization

```
Private/Shaders/
├── OceanologyWaveSystemSelector.ush      # Wave routing
├── OceanologySpectralGerstnerWaves.ush   # NEW: Spectral system
├── OceanologyLegacyGerstnerWaves.ush     # Refactored legacy
├── OceanologyBreakingWaves.ush           # NEW: Coastal waves
├── OceanologyBreakingWaveProfilesProcedural.ush  # NEW: Spline eval
├── OceanologyBreakingWaveProfilesBaked.ush       # NEW: Texture lookup
├── OceanologyWaterDataFunctions.ush      # Data access utilities
├── OceanologyComputeSDFandGradient.ush   # SDF utilities
└── ...
```

### Include Order

```hlsl
#include "OceanologyWaterDataFunctions.ush"  // First: data access

// Then wave systems (mutually exclusive runtime):
#include "OceanologySpectralGerstnerWaves.ush"
#include "OceanologyLegacyGerstnerWaves.ush"

// Finally breaking waves (composites on top):
#include "OceanologyBreakingWaves.ush"
```

## 📡 View Extension Pipeline

The `FOceanologyWaterViewExtension` manages GPU buffer updates:

```cpp
void FOceanologyWaterViewExtension::UpdateGPUBuffers()
{
    // 1. Gather all water bodies
    TArray<AOceanologyWater*> WaterBodies = GetVisibleWaterBodies();
    
    // 2. Build data arrays
    TArray<FOceanologyWaterBodyData> BodyData;
    TArray<FOceanologyWaveData> WaveData;
    
    for (AOceanologyWater* Body : WaterBodies)
    {
        // Pack shore waves + spectral OR legacy data
        if (Body->UsesSpectralWaves())
        {
            WaveData.Add(FOceanologyWaveData(
                Body->GetShoreWaves(),
                Body->GetSpectralGerstner()
            ));
        }
        else
        {
            WaveData.Add(FOceanologyWaveData(
                Body->GetShoreWaves(),
                Body->GetLegacyGerstner()
            ));
        }
    }
    
    // 3. Upload to GPU
    View.WaterData = CreateStructuredBuffer(WaveData);
}
```

## 🌊 Breaking Wave Data Flow

Breaking waves require additional inputs:

```
SDF Texture → Compute SDF & Gradient → Breaking Wave Shader
                                            ↓
                                      Ocean Wave Output
                                            ↓
                                      Blended Final Output
```

### SDF Sampling

```hlsl
float SignedDistanceFields = SampleSDF(WorldPosition);
float2 SDFGradient = ComputeSDFGradient(WorldPosition);
```

### Composition

```hlsl
WaveOutput GetBreakingWaves(
    in int WaterBodyIndex,
    in float2 WorldPosition,
    in float Time,
    in float WaveAttenuationFactor,
    in float SignedDistanceFields,
    in float2 SDFGradient,
    in float3 WaterDisplacement,   // From base wave system
    in float3 WaterNormal,          // From base wave system
    in float WaterFoam              // From base wave system
)
{
    // Breaking waves modify/blend with base ocean
    // ...
}
```

## 🖥️ GPU QuadTree Improvements

The GPU tessellation system gains new capabilities:

```cpp
struct FOceanologyWaterBodyRenderDataGPU
{
    uint32_t WaterBodyIndex;
    uint32_t MaterialIndex;
    uint32_t RiverToLakeMaterialIndex;   // Transition materials
    uint32_t RiverToOceanMaterialIndex;  // Transition materials
    uint32_t WaterBodyType;
    uint32_t HitProxyColorAndIsSelected;
    float SurfaceBaseHeight;
    float MinZ;
    float MaxZ;
    float MaxWaveHeight;
};
```

### Occlusion Query Modes

```cpp
enum class EOceanologyOcclusionQueryMode
{
    Disabled = 0,
    HZB = 1,              // Hierarchical Z-Buffer
    PixelPrecise = 2,     // Conservative rasterization
    HZBAndPixelPrecise = 3
};
```

Conservative rasterization support improves culling accuracy for complex coastlines.

## 📊 Memory Layout

### Per-Frame GPU Buffers

| Buffer | Size | Contents |
|--------|------|----------|
| WaterBodyData | N × 48B | Body metadata |
| WaveData | N × 240B | Wave parameters (15 × float4) |
| ZoneData | M × 32B | Zone boundaries |
| InstanceData | Variable | Tessellation instances |

### Texture Resources

| Texture | Format | Resolution | Purpose |
|---------|--------|------------|---------|
| QuadTreeTexture | R32_UINT | 2048² | Tile occupancy |
| WaterZBoundsTexture | RG16F | 2048² | Z bounds per tile |
| SDFTexture | R16F | Per zone | Distance field |
| BakedProjection | RG16F | 2K-8K | Wave profile |
| BakedDerivatives | RGBA16F | 2K-8K | Normal data |

## ⚡ Performance Optimizations

### Branch-Free Wave Selection

```hlsl
// Avoid branching in hot path
float spectralMask = step(0.5, WaveSystemSelector) * step(WaveSystemSelector, 1.5);
float legacyMask = step(1.5, WaveSystemSelector);
float noneMask = 1.0 - spectralMask - legacyMask;

WaveOutput result = 
    spectralMask * GetSpectralWaves() +
    legacyMask * GetLegacyWaves() +
    noneMask * GetFlatWater();
```

### Spectral Loop Optimization

```hlsl
// Unrolled for small counts
[unroll] for (int i = 0; i < 16; ++i) { ... }

// Loop for larger counts
[loop] for (int i = 16; i < totalWaves; ++i) { ... }
```

### SDF Gradient Caching

```hlsl
// Compute once, reuse
float2 SDFGradient = ComputeSDFGradient(WorldPosition);
// Used by breaking waves, foam, flow, etc.
```

## 🔮 Extension Points

2.0 architecture supports future expansion:

```cpp
// Reserved wave systems
enum class EOceanologyWaveSystemSelector : uint8
{
    None = 0,
    SpectralGerstnerWaves = 1,
    GerstnerWaves = 2,
    // Reserved for future:
    // FFTOcean = 3,
    // Tessendorf = 4,
    // Custom = 255
};
```

DataBlocks 7-14 remain available for additional parameters.

## 📚 For Plugin Developers

If you're extending NextGen 2.0:

1. **Adding wave systems**: Implement `GetXXXWaves()` function, add to selector
2. **Adding parameters**: Extend appropriate DataBlock, update encode/decode
3. **Custom breaking profiles**: Implement `IOceanologyBreakingWaveProfile` interface
4. **GPU resources**: Use `FOceanologyWaterViewExtension::RegisterResource()`

---

*Technical questions? Our [Discord](https://discord.gg/s9TSBBX3Rh) has a #dev-talk channel for in-depth discussions!*
