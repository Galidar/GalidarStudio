---
slug: debug-tools-console-variables
title: "🔧 Debug Tools & Console Variables - Complete Reference"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, debug, console, performance, tools, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Debug Tools & Console Variables in NextGen 2.0

NextGen 2.0 provides an extensive set of debug tools and console variables for troubleshooting, optimization, and visualization. This comprehensive reference covers every command available for mastering your water simulation.

<!-- truncate -->

## Core System Controls

These fundamental commands control the entire Oceanology system:

### Master Enable/Disable

```
r.Oceanology.Enabled [0/1]
```
Master switch for the entire water system. Disabling this completely turns off all water rendering and simulation.

```
r.Oceanology.WaterMesh.Enabled [0/1]
```
Controls the water mesh rendering specifically. Useful for testing water logic without rendering overhead.

```
r.Oceanology.WaterMesh.EnableRendering [0/1]
```
Enables/disables the actual draw calls while keeping the mesh system active.

### Wave Time Control

```
r.Oceanology.FreezeWaves [0/1]
```
Freezes all wave animation at the current time. Perfect for:
- Screenshot capture
- Debugging specific wave states
- Performance profiling without animation

```
r.Oceanology.OverrideWavesTime [float]
```
Sets a specific time value for wave evaluation. Use -1 to return to real-time.

## Water Mesh System

### LOD Configuration

```
r.Oceanology.WaterMesh.LODCountBias [int]
```
Adjusts the number of LOD levels. Positive values add LODs (better quality), negative removes them (better performance).

```
r.Oceanology.WaterMesh.LODScaleBias [float]
```
Scales the distance at which LOD transitions occur. Higher values push transitions further.

```
r.Oceanology.WaterMesh.TessFactorBias [int]
```
Adjusts tessellation factor. Range: -6 to +6.

```
r.Oceanology.WaterMesh.LODMorphEnabled [0/1]
```
Enables smooth morphing between LOD levels to prevent popping.

### Tile Configuration

```
r.Oceanology.WaterMesh.MaxDimensionInTiles [int]
```
Maximum extent of the water mesh in tiles.

```
r.Oceanology.WaterMesh.MaxWidthInTiles [int]
```
Maximum width of the water mesh in tiles.

```
r.Oceanology.WaterMesh.ForceRebuildMeshPerFrame [0/1]
```
Forces complete mesh rebuild every frame. Useful for debugging but expensive.

## GPU QuadTree System

The GPU-driven QuadTree is the heart of NextGen 2.0's rendering:

### Core QuadTree

```
r.Oceanology.WaterMesh.GPUQuadTree [0/1]
```
Enables the GPU-driven QuadTree system (default: 1).

```
r.Oceanology.WaterMesh.GPUQuadTree.ParallelPrefixSum [0/1]
```
Uses parallel prefix sum algorithm for indirect draw calls.

```
r.Oceanology.WaterMesh.GPUQuadTree.NumQuadsPerTileSide [int]
```
Number of quads per tile side. Higher = more detail but more draw calls.

### Rasterization Quality

```
r.Oceanology.WaterMesh.GPUQuadTree.SuperSampling [int]
```
Super-sampling factor for QuadTree generation. 1 = no supersampling, 2 = 2x, 4 = 4x.

```
r.Oceanology.WaterMesh.GPUQuadTree.MultiSampling [int]
```
MSAA sample count: 1, 2, 4, or 8.

```
r.Oceanology.WaterMesh.GPUQuadTree.ConservativeRasterization [0/1]
```
Uses conservative rasterization for more accurate QuadTree building.

```
r.Oceanology.BuildConservativeRasterizationMesh [0/1]
```
Builds meshes suitable for conservative rasterization.

### Jitter Anti-Aliasing

```
r.Oceanology.WaterMesh.GPUQuadTree.NumJitterSamples [int]
```
Number of jittered samples for edge anti-aliasing.

```
r.Oceanology.WaterMesh.GPUQuadTree.JitterPattern [int]
```
Jitter pattern type: 0 = Halton, 1 = Blue Noise.

```
r.Oceanology.WaterMesh.GPUQuadTree.JitterSampleFootprint [float]
```
Size of the jitter sample footprint.

### Bounds and Padding

```
r.Oceanology.WaterMesh.GPUQuadTree.ZBoundsPadding [float]
```
Padding for Z bounds of each QuadTree node (default: 200.0). Important for sloped rivers.

```
r.Oceanology.WaterMesh.GPUQuadTree.InstanceDataAllocMult [float]
```
Multiplier for instance data buffer allocation.

## Occlusion Culling

### GPU QuadTree Occlusion

```
r.Oceanology.WaterMesh.GPUQuadTree.OcclusionCulling [0-3]
```
Occlusion culling mode:
- 0: Disabled
- 1: HZB Occlusion Queries
- 2: Pixel Precise Raster Queries
- 3: HZB + Pixel Precise (default)

### General Occlusion

```
r.Oceanology.WaterMesh.OcclusionCulling [0/1]
```
General occlusion culling toggle.

```
r.Oceanology.WaterMesh.OcclusionCulling.MaxQueries [int]
```
Maximum number of occlusion queries per frame.

```
r.Oceanology.WaterMesh.OcclusionCulling.IncludeFarMesh [0/1]
```
Include far distance mesh in occlusion tests.

```
r.Oceanology.WaterMesh.OcclusionCullExpandBoundsAmountXY [float]
```
Expand bounds for occlusion tests.

## Local Tessellation

```
r.Oceanology.WaterMesh.LocalTessellation.Freeze [0/1]
```
Freezes local tessellation updates.

```
r.Oceanology.WaterMesh.LocalTessellation.UpdateMargin [float]
```
Margin before triggering tessellation update when camera moves.

## Debug Visualization

### Tile Visualization

```
r.Oceanology.WaterMesh.ShowTileBounds [0/1]
```
Shows bounding boxes for each water tile.

```
r.Oceanology.WaterMesh.ShowTileBounds.DrawForeground [0/1]
```
Draw tile bounds in foreground (ignores depth).

```
r.Oceanology.WaterMesh.ShowTileGenerationGeometry [0/1]
```
Shows the geometry used for tile generation.

### LOD Visualization

```
r.Oceanology.WaterMesh.ShowLODLevels [0/1]
```
Color-codes tiles by LOD level.

### Wireframe

```
r.Oceanology.WaterMesh.ShowWireframe [0/1]
```
Renders water mesh as wireframe.

```
r.Oceanology.WaterMesh.ShowWireframeAtBaseHeight [0/1]
```
Shows wireframe at base water height (ignores waves).

## Water Info Texture System

### Rendering

```
r.Oceanology.WaterInfo.RenderMethod [0-2]
```
Render method for water info texture:
- 0: Scene capture
- 1: Custom render pass
- 2: Hybrid

```
r.Oceanology.WaterInfo.LandscapeMinimumMipLevel [int]
```
Minimum mip level for landscape when rendering water info.

```
r.Oceanology.WaterInfo.ForceUpdateWaterInfoNextFrames [int]
```
Forces water info texture update for N frames.

```
r.Oceanology.SkipWaterInfoTextureRenderWhenWorldRenderingDisabled [0/1]
```
Skip water info rendering when world rendering is disabled.

### Dilation

```
r.Oceanology.WaterInfo.DilationOverwriteMinimumDistance [float]
```
Minimum distance before dilation overwrites existing data.

```
r.Oceanology.WaterInfo.UndergroundDilationDepthOffset [float]
```
Depth offset for underground dilation.

### Debug

```
r.Oceanology.WaterInfo.DrawPerViewDebugInfo [0/1]
```
Draws debug info for each view's water info texture.

```
r.Oceanology.WaterInfo.ShowSceneProxies [0/1]
```
Shows scene proxies for water info rendering.

```
r.Oceanology.WaterInfo.RenderCaptureNextWaterInfoDraws [int]
```
Captures the next N water info draw calls for debugging.

## Buoyancy System

### Debug Visualization

```
r.Oceanology.DebugBuoyancy [0-2]
```
Buoyancy debug mode:
- 0: Disabled
- 1: Show pontoon spheres
- 2: Show forces and velocities

```
r.Oceanology.BuoyancyDebugPoints [int]
```
Number of debug points to display.

```
r.Oceanology.BuoyancyDebugSize [int]
```
Size of debug visualization elements.

```
r.Oceanology.BuoyancyDebugAttenuationFactor [0/1]
```
Show wave attenuation factor.

```
r.Oceanology.BuoyancyDebugNearestSplinePoint [0/1]
```
Show nearest spline point for rivers.

### Async Simulation

```
r.Oceanology.UseBuoyancyAsyncPath [0/1]
```
Use async physics path for buoyancy simulation.

### Optimization

```
r.Oceanology.UseSplineKeyOptimization [0/1]
```
Optimize spline key lookups for buoyancy.

## Shallow Water Simulation

```
r.Oceanology.EnableShallowWaterSimulation [0/1]
```
Enables shallow water simulation for waves near shores.

```
r.Oceanology.ShallowWaterRenderTargetSize [int]
```
Resolution of shallow water render target.

```
r.Oceanology.ShallowWaterMaxDynamicForces [int]
```
Maximum number of dynamic forces affecting shallow water.

```
r.Oceanology.ShallowWaterMaxImpulseForces [int]
```
Maximum number of impulse forces per frame.

## Underwater Effects

```
r.Oceanology.EnableUnderwaterPostProcess [0/1]
```
Enables underwater post-processing effects.

```
r.Oceanology.VisualizeActiveUnderwaterPostProcess [0/1]
```
Shows which underwater post-process is currently active.

## Miscellaneous

### Flow Velocity

```
r.Oceanology.MaxFlowVelocity [float]
```
Maximum flow velocity for rivers and currents.

### Fallback Values

```
r.Oceanology.FallbackDepth [float]
```
Default water depth when actual depth is unknown.

```
r.Oceanology.OceanFallbackDepth [float]
```
Specific fallback depth for oceans.

### Water Zones

```
r.Oceanology.OceanologyWaterZone.OverrideNewOceanologyWaterZoneScale [float]
```
Override scale for new water zones (0 = no override).

```
r.Oceanology.OceanologyWaterZone.OverrideNewOceanologyWaterZoneMinimumMargin [float]
```
Override minimum margin for new water zones.

### Splines

```
r.Oceanology.WaterSplineResampleMaxDistance [float]
```
Maximum distance between spline resample points.

## The Water Surface Debugger

For visual debugging, NextGen 2.0 includes a dedicated debug actor:

```cpp
UCLASS()
class AOceanologyWaterSurfaceDebugger : public AActor
{
    // Reference to water body to debug
    UPROPERTY(EditAnywhere)
    TObjectPtr<AOceanologyWater> OceanologyWater;
    
    // Grid configuration
    UPROPERTY(EditAnywhere)
    int DebugWaterSurfaceGridCount = 16;
    
    UPROPERTY(EditAnywhere)
    float DebugWaterSurfaceGridSize = 1000.0f;
    
    // Visualization settings
    UPROPERTY(EditAnywhere)
    int DebugWaterSurfaceSphereSegments = 12;
    
    UPROPERTY(EditAnywhere)
    float DebugWaterSurfaceSphereRadius = 100.0f;
    
    UPROPERTY(EditAnywhere)
    FLinearColor DebugWaterSurfaceSphereColor = FLinearColor::Red;
};
```

This actor:
- Samples water height at grid points
- Visualizes surface normals
- Shows wave amplitude
- Works in editor and runtime

## Performance Profiling Commands

For GPU profiling, use these stat commands:

```
stat GPU
stat InitViews
stat SceneRendering
```

Oceanology-specific GPU stats:
```
DECLARE_GPU_STAT(FOceanologyWaterQuadTreeGPU_Init);
DECLARE_GPU_STAT(FOceanologyWaterQuadTreeGPU_Traverse);
```

## Quick Reference Card

### Optimization Checklist

| Issue | Command | Recommended Value |
|-------|---------|-------------------|
| Low FPS | `r.Oceanology.WaterMesh.LODCountBias` | -1 or -2 |
| Popping | `r.Oceanology.WaterMesh.LODMorphEnabled` | 1 |
| Draw call overhead | `r.Oceanology.WaterMesh.GPUQuadTree` | 1 |
| Memory usage | `r.Oceanology.WaterInfo.LandscapeMinimumMipLevel` | 1-2 |
| Jittery water | `r.Oceanology.WaterMesh.GPUQuadTree.NumJitterSamples` | 4-8 |

### Debug Visualization Presets

**Full Debug Mode:**
```
r.Oceanology.WaterMesh.ShowTileBounds 1
r.Oceanology.WaterMesh.ShowLODLevels 1
r.Oceanology.DebugBuoyancy 2
r.Oceanology.WaterInfo.DrawPerViewDebugInfo 1
```

**Performance Debug:**
```
r.Oceanology.WaterMesh.ShowWireframe 1
r.Oceanology.WaterMesh.GPUQuadTree.OcclusionCulling 0
stat GPU
```

**Wave Debug:**
```
r.Oceanology.FreezeWaves 1
r.Oceanology.OverrideWavesTime 0.5
```

## Creating Custom Debug Tools

You can extend the debug system in Blueprints:

```cpp
// Query water surface at any point
FVector SurfaceLocation;
FVector SurfaceNormal;
float WaveHeight;

bool bSuccess = UOceanologyWaterSubsystem::GetWaterSurfaceInfoAtLocation(
    WorldLocation,
    SurfaceLocation,
    SurfaceNormal,
    WaveHeight
);
```

## What's Next?

This completes our NextGen 2.0 technical deep-dive series! We've covered:
- Spectral Gerstner Waves
- Breaking Waves
- Wave Forge Integration
- Technical Architecture
- Migration Guide
- Additional Features
- Buoyancy & River Forces
- River Transitions
- Landscape Integration
- Debug Tools (this post)

Stay tuned for more tutorials, tips, and feature announcements!

---

*Need help debugging? Join our [Discord community](https://discord.gg/galidar) for support!*
