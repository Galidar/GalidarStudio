---
slug: water-surface-debugger
title: "🔍 Water Surface Debugger - Advanced Visualization & Analysis Tools"
authors: [galidar]
tags: [nextgen, debug, visualization, editor, tools]
image: /img/landing/oceanology-nextgen.png
---

Comprehensive debugging and visualization tools for analyzing water surface behavior, wave calculations, and rendering performance in real-time.

<!-- truncate -->

## Overview

The **Water Surface Debugger** provides editor actors and visualization systems for understanding and optimizing water simulation behavior. Essential for development, troubleshooting, and performance analysis.

---

## Water Surface Debugger Actor

### AOceanologyWaterSurfaceDebugger

Placed in level to visualize water surface calculations:

| Feature | Description |
|---------|-------------|
| **Grid Visualization** | Display sampling grid over water surface |
| **Height Sampling** | Show wave heights at grid points |
| **Normal Vectors** | Visualize surface normals |
| **Flow Vectors** | Display water velocity directions |
| **Depth Coloring** | Color-coded depth visualization |

---

## Visualization Modes

### Grid Overlay

Configure the sampling grid:

| Parameter | Description |
|-----------|-------------|
| **Grid Size** | Total area covered |
| **Grid Resolution** | Points per axis |
| **Grid Height Offset** | Vertical offset from water |
| **Show Grid Lines** | Enable/disable grid rendering |

### Sphere Sampling

Sample water properties at discrete points:

- Place spheres at wave surface
- Color by depth/velocity/height
- Update in real-time
- Show numerical values

---

## Console Variable Debugging

### Core Debug Variables

| CVar | Description |
|------|-------------|
| `r.Oceanology.DebugBuoyancy` | 0=Off, 1=Forces, 2=Detailed |
| `r.Oceanology.ShowTileBounds` | QuadTree tile boundaries |
| `r.Oceanology.ShowLODLevels` | Color tiles by LOD |
| `r.Oceanology.ShowWireframe` | Wireframe water mesh |
| `r.Oceanology.DrawPerViewDebugInfo` | Per-camera debug data |

### Wave Debug Variables

| CVar | Description |
|------|-------------|
| `r.Oceanology.FreezeWaves` | Pause wave simulation |
| `r.Oceanology.OverrideWavesTime` | Set specific wave time |
| `r.Oceanology.VisualizeWaveSpectrum` | Show wave frequency data |

---

## Performance Profiling

### GPU Profiling

Use Unreal's built-in profilers:

```
stat GPU
stat SceneRendering
stat InitViews
```

### Water-Specific Stats

| Stat | Measures |
|------|----------|
| **QuadTree Build** | Tile generation time |
| **Water Mesh Draw** | Rendering time |
| **Wave Calculation** | CPU wave computation |
| **Buoyancy Queries** | Physics query overhead |

---

## Editor Integration

### Texture Utilities

```cpp
UCLASS()
class UOceanologyTextureUtils : public UObject
{
    // Export water info to texture
    UFUNCTION(BlueprintCallable)
    static void ExportWaterInfoTexture(
        UTextureRenderTarget2D* Source,
        const FString& FilePath
    );

    // Analyze texture channels
    UFUNCTION(BlueprintCallable)
    static void AnalyzeTextureChannels(
        UTexture2D* Texture,
        FVector4& OutMinValues,
        FVector4& OutMaxValues
    );
};
```

### Editor Settings

```cpp
UCLASS(config=EditorPerProjectUserSettings)
class UOceanologyWaterEditorSettings : public UObject
{
    UPROPERTY(Config, EditAnywhere)
    bool bShowWaterDebugInEditor = false;

    UPROPERTY(Config, EditAnywhere)
    bool bAutoRefreshWaterInfo = true;

    UPROPERTY(Config, EditAnywhere)
    float DebugUpdateInterval = 0.1f;
};
```

---

## Water Info Visualization

### Render Target Analysis

Visualize Water Info Texture channels:

| Channel | Data | Visualization |
|---------|------|---------------|
| **R** | Flow Velocity X | Red gradient |
| **G** | Flow Velocity Y | Green gradient |
| **B** | Water Height | Blue gradient |
| **A** | Ground Height | Alpha/Gray |

### Debug Rendering

```cpp
void FOceanologyWaterInfoRendering::RenderDebugInfo(
    FRHICommandListImmediate& RHICmdList,
    const FViewInfo& View
);
```

---

## Spline Visualization

### Water Spline Component Visualizer

Editor visualization for water splines:

| Feature | Description |
|---------|-------------|
| **Spline Path** | Colored curve display |
| **Control Points** | Editable handles |
| **Width Visualization** | River width at each point |
| **Depth Coloring** | Depth value display |
| **Velocity Arrows** | Flow direction indicators |

### Metadata Display

Show spline metadata per point:
- Width
- Depth  
- Velocity
- Audio settings

---

## Buoyancy Debugging

### Force Visualization

When `r.Oceanology.DebugBuoyancy` is enabled:

| Level | Visualization |
|-------|---------------|
| 1 | Force vectors on floating actors |
| 2 | Detailed per-pontoon forces |

### Debug Points

```cpp
UPROPERTY()
int32 BuoyancyDebugPoints = 8;
```

Sample buoyancy at multiple points for accuracy analysis.

---

## QuadTree Debugging

### Tile Visualization

| CVar | Effect |
|------|--------|
| `ShowTileBounds` | Draw tile boundaries |
| `ShowLODLevels` | Color by LOD level |
| `ShowWireframe` | Wireframe mesh view |

### LOD Level Colors

| LOD | Color |
|-----|-------|
| 0 | Red (highest detail) |
| 1 | Orange |
| 2 | Yellow |
| 3 | Green |
| 4 | Cyan |
| 5+ | Blue (lowest detail) |

---

## Debug Workflow

### Troubleshooting Steps

1. **Enable Debug Visualization** - Set appropriate CVars
2. **Place Debugger Actor** - Add to level if needed
3. **Configure Grid** - Match area of interest
4. **Analyze Results** - Check heights, normals, flow
5. **Profile Performance** - Use stat commands
6. **Iterate** - Adjust parameters, re-test

### Common Issues

| Symptom | Debug Approach |
|---------|----------------|
| Incorrect wave heights | Enable height sampling grid |
| Buoyancy problems | Enable force visualization |
| Performance issues | Profile with stat GPU |
| LOD popping | Show LOD levels, adjust bias |
| Flow direction wrong | Visualize flow vectors |

---

## Export & Analysis

### Capture Tools

Export debug data for offline analysis:

- Water Info Texture export
- Wave spectrum snapshots
- Performance frame captures
- Spline data export (LUA)

---

## Resources

- **Console Commands**: Full CVar reference in Debug Tools post
- **Discord**: #debugging channel for help
- **Documentation**: Troubleshooting guide

