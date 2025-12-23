---
slug: landscape-integration
title: "🏔️ Landscape Integration - Automatic Terrain Sculpting"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, landscape, islands, terrain, brush-effects]
image: /img/landing/oceanology-nextgen.png
---

# Landscape Integration in NextGen 2.0

One of NextGen 2.0's most powerful features is its deep integration with Unreal Engine's Landscape system. This post covers how water bodies interact with terrain through islands, exclusion volumes, and brush effects.

<!-- truncate -->

## The Water Brush System

NextGen 2.0 uses a sophisticated brush system to modify landscapes automatically when water bodies are placed.

### Brush Actor Interface

All actors that can modify terrain implement `IOceanologyWaterBrushActorInterface`:

```cpp
class IOceanologyWaterBrushActorInterface
{
    // Does this actor modify landscape heightmap?
    virtual bool AffectsLandscape() const;
    
    // Does this actor contribute to water mesh?
    virtual bool AffectsWaterMesh() const;
    
    // Can this actor ever affect the water mesh?
    virtual bool CanEverAffectWaterMesh() const;
    
    // Can this actor ever affect water info texture?
    virtual bool CanEverAffectWaterInfo() const;
};
```

### Brush Capabilities by Actor Type

| Actor | Affects Landscape | Affects Water Mesh | Affects Water Info |
|-------|-------------------|--------------------|--------------------|
| Ocean | Yes (optional) | Yes | Yes |
| Lake | Yes (optional) | Yes | Yes |
| River | Yes (optional) | Yes | Yes |
| Island | Yes | No | No |
| Exclusion Volume | No | Yes (removes) | Yes |
| Custom Water | No | No | No |

## Island System

Islands create landmasses within water bodies, carving out the water mesh and optionally modifying terrain.

### Island Actor Features

- **Spline-defined shape**: Draw island boundaries with splines
- **Terrain modification**: Raises landscape within bounds
- **Water mesh exclusion**: Automatically removes water inside
- **Weightmap painting**: Applies landscape layers

### Island Properties

```cpp
// Curve settings for terrain shaping
FOceanologyWaterCurveSettings OceanologyWaterCurveSettings;

// Heightmap modification parameters
FOceanologyWaterBodyHeightmapSettings WaterHeightmapSettings;

// Per-layer weightmap settings
TMap<FName, FOceanologyWaterBodyWeightmapSettings> WaterWeightmapSettings;
```

### Creating an Island

1. Add an **Oceanology Island** actor to your level
2. Edit spline points to define the island boundary
3. Configure heightmap settings for terrain elevation
4. Set up weightmap settings for landscape layers
5. The water mesh automatically excludes the island area

### Island-Water Interaction

Islands automatically notify overlapping water bodies when they change:

```cpp
void UpdateOverlappingOceanologyWaterComponents();
```

This ensures the water mesh updates in real-time as you edit island shapes.

## Exclusion Volumes

Exclusion volumes remove water from specific areas without modifying terrain.

### Use Cases

- Swimming pools with no water on deck
- Underwater caves and tunnels
- Dock areas with no water underneath
- Interior spaces that overlap water zones

### Exclusion Modes

```cpp
enum class EOceanologyWaterExclusionMode
{
    // Only exclude water bodies in the WaterBodies list
    // If list is empty, no exclusion
    AddWaterBodiesListToExclusion,
    
    // Exclude all EXCEPT water bodies in the list
    // If list is empty, exclude all overlapping
    RemoveWaterBodiesListFromExclusion,
};
```

### Exclusion Volume Properties

| Property | Description |
|----------|-------------|
| `ExclusionMode` | How to interpret the water bodies list |
| `WaterBodies` | List of specific water bodies to include/exclude |

### Setting Up Exclusion

1. Add a **Oceanology Water Exclusion Volume** actor
2. Scale the volume to cover the exclusion area
3. Choose the exclusion mode
4. Optionally specify which water bodies to affect

### Exclusion in Queries

Water body queries respect exclusion volumes:

```cpp
// Query flag to ignore exclusion volumes
EOceanologyWaterBodyQueryFlags::IgnoreExclusionVolumes

// Result indicates if point is in exclusion zone
FOceanologyWaterBodyQueryResult::bIsInExclusionVolume
```

## Brush Effects

Water bodies can apply sophisticated effects to the landscape through brush settings.

### Blurring Effect

Softens terrain transitions around water:

```cpp
struct FOceanologyWaterBrushEffectBlurring
{
    bool bBlurShape = true;    // Enable blur
    int32 Radius = 2;          // Blur kernel radius
};
```

### Curl Noise Effect

Adds organic variation to water edges:

```cpp
struct FOceanologyWaterBrushEffectCurlNoise
{
    float Curl1Amount = 0;     // Primary noise strength
    float Curl2Amount = 0;     // Secondary noise strength
    float Curl1Tiling = 16.0;  // Primary noise scale
    float Curl2Tiling = 3.0;   // Secondary noise scale
};
```

### Curve Channel Effect

Uses curves to shape terrain along water bodies:

```cpp
struct FOceanologyWaterBrushEffectCurves
{
    bool bUseCurveChannel = true;
    UCurveFloat* ElevationCurveAsset;  // Custom elevation curve
    float ChannelEdgeOffset = 0.0;
    float ChannelDepth = 0.0;
    float CurveRampWidth = 512.0;
};
```

### Displacement Effect

Applies texture-based displacement:

```cpp
struct FOceanologyWaterBrushEffectDisplacement
{
    float DisplacementHeight = 0;
    float DisplacementTiling = 0;
    UTexture2D* Texture;           // Displacement map
    float Midpoint = -128.0;       // Neutral height
    FLinearColor Channel;          // Which channel to read
    float WeightmapInfluence = 0;  // Affect weightmaps too
};
```

### Smooth Blending Effect

Controls edge smoothing:

```cpp
struct FOceanologyWaterBrushEffectSmoothBlending
{
    float InnerSmoothDistance = 0.01;
    float OuterSmoothDistance = 0.01;
};
```

### Terracing Effect

Creates stepped terrain (great for rice paddies, etc.):

```cpp
struct FOceanologyWaterBrushEffectTerracing
{
    float TerraceAlpha = 0.0;      // Terrace strength
    float TerraceSpacing = 256.0;  // Height between terraces
    float TerraceSmoothness = 0.0; // Edge softness
    float MaskLength = 0.0;        // Fade distance
    float MaskStartOffset = 0.0;   // Fade start
};
```

## Falloff Settings

Water bodies use falloff to blend with surrounding terrain.

### Falloff Modes

```cpp
enum class EOceanologyWaterBrushFalloffMode : uint8
{
    Angle,  // Falloff based on slope angle
    Width,  // Falloff based on distance
};
```

### Falloff Properties

| Property | Mode | Description |
|----------|------|-------------|
| `FalloffAngle` | Angle | Slope angle for falloff |
| `FalloffWidth` | Width | Distance for falloff (min 0.1) |
| `EdgeOffset` | Both | Offset from water edge |
| `ZOffset` | Both | Vertical offset |

## Heightmap Settings

Control how water bodies modify terrain elevation:

```cpp
struct FOceanologyWaterBodyHeightmapSettings
{
    // Blend mode for heightmap modification
    EWaterBrushBlendType BlendMode;
    
    // Whether to invert the effect
    bool bInvertShape;
    
    // Effect priority when multiple bodies overlap
    int32 Priority;
    
    // Additional brush effects
    FOceanologyWaterBrushEffects Effects;
    
    // Falloff configuration
    FOceanologyWaterFalloffSettings FalloffSettings;
};
```

## Weightmap Settings

Control landscape layer painting:

```cpp
struct FOceanologyWaterBodyWeightmapSettings
{
    // Target landscape layer
    FName LayerName;
    
    // Paint strength (0-1)
    float ModulationStrength;
    
    // Whether to paint this layer
    bool bAffectWeightmap;
    
    // Falloff for layer painting
    FOceanologyWaterFalloffSettings FalloffSettings;
};
```

### Per-Layer Configuration

Each water body can affect multiple landscape layers:

```cpp
// In water component
TMap<FName, FOceanologyWaterBodyWeightmapSettings> LayerWeightmapSettings;
```

Common setups:
- **Beach layer**: Sand around ocean edges
- **Riverbed layer**: Mud/gravel along rivers
- **Wetland layer**: Marsh terrain around lakes

## Water Terrain Component

The `UOceanologyWaterTerrainComponent` manages landscape modification:

### Features

- Automatic terrain carving
- Runtime terrain updates
- Landscape edit layer support
- Brush cache management

### Integration with World Partition

NextGen 2.0's terrain system works with World Partition:

```cpp
// Water Subsystem tracks terrain actors
TMultiMap<AActor*, UOceanologyWaterTerrainComponent> WaterTerrainActors;
```

## Jump Flood SDF for Terrain

The Jump Flood algorithm generates signed distance fields used for terrain modification.

### How It Works

1. **Edge Detection**: Find water body boundaries
2. **Jump Flood Propagation**: O(log n) distance computation
3. **Blur Pass**: Smooth the distance field
4. **Gradient Calculation**: Compute direction to nearest edge

### SDF in Terrain Modification

```cpp
// From OceanologyComputeSDFandGradient.ush
float3 ComputeSDFandGradient(
    Texture2D TexJumpFlood,
    float2 UVs,
    int WaterZoneIndex,   
    out float2 OutGradient,
    out float OutGradientX,
    out float OutGradientY,
    out float OutSDF
);
```

The SDF enables:
- Smooth falloff from water edges
- Consistent terrain blending
- Breaking wave shore detection
- Foam distribution

## Editor Workflow

### Setting Up Terrain Integration

1. **Enable landscape affecting** on water bodies that should modify terrain
2. **Configure heightmap settings** for each water body type
3. **Set up weightmap layers** for landscape materials
4. **Adjust brush effects** for desired terrain look
5. **Place islands** to create landmasses

### Best Practices

1. **Use consistent falloff**: Keep falloff settings similar across water bodies
2. **Layer priorities**: Set priorities to handle overlapping bodies
3. **Test incrementally**: Apply brush changes in small batches
4. **Backup landscapes**: Terrain changes are destructive
5. **Use edit layers**: Unreal 5.1+ edit layers allow non-destructive editing

### Common Issues

| Issue | Solution |
|-------|----------|
| Terrain not updating | Rebuild water brush |
| Visible seams at edges | Increase falloff width |
| Weightmap not painting | Check layer name spelling |
| Performance during edit | Disable "Update During Interactive Changes" |

## Runtime Considerations

### Performance

Terrain modification is primarily an editor operation. At runtime:
- Terrain is baked and static
- Water mesh respects pre-computed islands
- Exclusion volumes are evaluated per-query

### Dynamic Terrain

For runtime terrain changes:
1. Use exclusion volumes (can be moved at runtime)
2. Query water bodies with `IgnoreExclusionVolumes` when needed
3. Custom water bodies don't affect terrain

## Material Parameter Collection

NextGen 2.0 uses an MPC for landscape integration:

```cpp
// In UOceanologyWaterEditorSettings
TSoftObjectPtr<UMaterialParameterCollection> LandscapeMaterialParameterCollection;
```

This enables:
- Shared parameters between water and terrain materials
- Consistent shore blending
- Runtime parameter updates

## Summary

Landscape integration in NextGen 2.0 provides:

- **Islands**: Spline-defined landmasses that exclude water
- **Exclusion Volumes**: Runtime-adjustable water removal
- **Brush Effects**: Sophisticated terrain modification
- **Heightmap Control**: Per-water-body elevation settings
- **Weightmap Painting**: Automatic landscape layer application
- **Jump Flood SDF**: Accurate distance-based effects

These systems work together to create seamless transitions between water and terrain, enabling realistic coastal environments, riverbeds, and lake shores.

## Series Conclusion

This completes our NextGen 2.0 technical deep dive series! We've covered:

1. **Announcement** - Overview of all new features
2. **Spectral Gerstner Waves** - Physically-based ocean simulation
3. **Breaking Waves** - Coastal wave physics
4. **Wave Forge Integration** - Custom wave profiles
5. **Technical Architecture** - GPU systems and rendering
6. **Migration Guide** - Upgrading from 1.x
7. **Additional Features** - Niagara, HLOD, Caustics, and more
8. **Buoyancy & River Forces** - Advanced physics
9. **Water Bodies** - Rivers, lakes, and oceans
10. **Editor Tools** - Debugging and visualization
11. **Landscape Integration** - Terrain interaction

Thank you for following along! For questions and support, join our [Discord community](https://discord.gg/galidar).
