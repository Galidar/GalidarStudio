---
slug: river-system-transitions
title: "🌊 Rivers, Lakes & Oceans - Seamless Water Transitions"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, rivers, lakes, transitions, splines, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Seamless Water Body Transitions in NextGen 2.0

One of the most challenging aspects of realistic water simulation is handling the boundaries between different water body types. NextGen 2.0 introduces a sophisticated transition system that makes these boundaries seamless and visually stunning.

<!-- truncate -->

## Water Body Types

NextGen 2.0 supports four distinct water body types:

```cpp
enum class EOceanologyWaterBodyType : uint8
{
    River,      // Spline-based flowing water
    Lake,       // Enclosed body with optional flow
    Ocean,      // Infinite expanse with full wave systems  
    Transition  // Custom/hybrid water bodies
};
```

| Type | Component | Key Features |
|------|-----------|--------------|
| **River** | `UOceanologyRiverComponent` | Spline-based, variable width/depth, flow velocity |
| **Lake** | `UOceanologyLakeComponent` | Enclosed shape, calm waves, shore detection |
| **Ocean** | `UOceanologyOceanComponent` | Infinite extent, full wave systems, collision boxes |
| **Custom** | `UOceanologyCustomWaterComponent` | User-defined behavior |

## The Water Spline System

Rivers are built on a powerful spline system with rich per-point metadata:

```cpp
USTRUCT(BlueprintType)
struct FOceanologyWaterSplineCurveDefaults
{
    float DefaultWidth;      // Width at this point
    float DefaultDepth;      // Depth at this point
    float DefaultVelocity;   // Flow velocity
    float DefaultAudioIntensity;
};
```

### Variable Width and Depth

```cpp
// Query river dimensions at any point
float Width = RiverComponent->GetRiverWidthAtSplineInputKey(InputKey);
float Depth = RiverComponent->GetRiverDepthAtSplineInputKey(InputKey);

// Modify dimensions programmatically
RiverComponent->SetRiverWidthAtSplineInputKey(0.5f, 200.0f);
RiverComponent->SetRiverDepthAtSplineInputKey(0.5f, 50.0f);
```

## River Transition Materials

When rivers meet other water bodies, specialized transition materials blend both:

### River → Lake Transition

```cpp
RiverComponent->SetLakeTransitionMaterial(MyLakeTransitionMat);
```

The transition material handles:
- Gradual wave dampening
- Color blending between river and lake
- Flow velocity reduction
- Foam generation at confluence

### River → Ocean Transition

```cpp
RiverComponent->SetOceanTransitionMaterial(MyOceanTransitionMat);
```

Ocean transitions handle:
- Wave amplitude modulation
- Tidal influence on flow
- Salt/fresh water mixing
- Breaking wave interaction

## GPU QuadTree Material Selection

The GPU QuadTree automatically detects and applies transitions:

```cpp
// From OceanologyWaterQuadTreeDraws.usf
if (WBRenderData.WaterBodyType == WATER_BODY_TYPE_RIVER && 
    Node.TransitionWaterBodyRenderDataIndex > 0)
{
    const FOceanologyWaterBodyRenderData TransitionWBRenderData = 
        WaterBodyRenderData[Node.TransitionWaterBodyRenderDataIndex];
    
    if (TransitionWBRenderData.WaterBodyType == WATER_BODY_TYPE_LAKE)
        MaterialIndex = WBRenderData.RiverToLakeMaterialIndex;
    else if (TransitionWBRenderData.WaterBodyType == WATER_BODY_TYPE_OCEAN)
        MaterialIndex = WBRenderData.RiverToOceanMaterialIndex;
}
```

## Water Info Texture

The Water Info Texture encodes flow and depth information:

| Channel | Content | Usage |
|---------|---------|-------|
| **R** | Flow Velocity X | Horizontal flow |
| **G** | Flow Velocity Y | Vertical flow |
| **B** | Water Height | Surface elevation |
| **A** | Ground Height | Terrain depth |

```cpp
float2 DecodeWaterInfoVelocity(float4 WaterInfoSample, float MaxVelocity)
{
    const float2 NormalizedFlow = WaterInfoSample.xy;
    return (NormalizedFlow - 0.5) * 2.0 * MaxVelocity;
}
```

## Islands and Exclusion Volumes

### Islands

Islands create holes in water bodies:

```cpp
UCLASS()
class AOceanologyIsland : public AActor, public IOceanologyWaterBrushActorInterface
{
    virtual bool AffectsLandscape() const override { return true; }
    virtual bool AffectsWaterMesh() const override { return false; }
    
    UPROPERTY()
    TObjectPtr<UOceanologyWaterSplineComponent> SplineComp;
};
```

### Exclusion Volumes

Prevent water in specific areas:

```cpp
enum class EOceanologyWaterExclusionMode
{
    AddWaterBodiesListToExclusion,      // Only listed excluded
    RemoveWaterBodiesListFromExclusion, // All except listed excluded
};
```

## Practical Setup: River to Ocean

### Step 1: Create the Ocean

```cpp
AOceanologyOcean* Ocean = GetWorld()->SpawnActor<AOceanologyOcean>();
OceanComp->WaveSystemSelector = EOceanologyWaveSystemSelector::SpectralGerstnerWaves;
OceanComp->SpectralGerstner.BeaufortScale = 5;
```

### Step 2: Create the River

```cpp
AOceanologyRiver* River = GetWorld()->SpawnActor<AOceanologyRiver>();
RiverComp->SetRiverWidthAtSplineInputKey(0.0f, 100.0f);  // Narrow upstream
RiverComp->SetRiverWidthAtSplineInputKey(1.0f, 300.0f);  // Wide at mouth
```

### Step 3: Apply Transition Material

```cpp
RiverComp->SetOceanTransitionMaterial(MyRiverToOceanMaterial);
```

### Step 4: Connect

Extend the river spline to overlap with the ocean - the system handles the rest automatically!

## Tips for Beautiful Transitions

1. **Match Water Heights**: River endpoint should match ocean base height
2. **Gradual Width Changes**: Avoid sudden changes near transitions
3. **Flow Direction**: River flow should point toward the ocean
4. **Transition Zone**: Allow 50-100 units for smooth blending

## Debug Commands

```
r.Oceanology.WaterMesh.ShowTileBounds 1
r.Oceanology.WaterInfo.DrawPerViewDebugInfo 1
r.Oceanology.WaterSplineResampleMaxDistance 50
```

---

*Questions about water transitions? Join our [Discord community](https://discord.gg/galidar) for support!*
