---
slug: nextgen-2-additional-features
title: "✨ NextGen 2.0 - Complete Feature Roundup"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, features, niagara, hlod, shallow-water, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# NextGen 2.0: Every New Feature Explained

Beyond the headline features (Spectral Waves, Breaking Waves, Wave Forge), NextGen 2.0 includes **dozens of additional improvements** across every system. Here's the complete feature roundup.

<!--truncate-->

## 🌊 Baked Shallow Water Simulation

A new component for **pre-computed water flow simulation**:

```cpp
struct FOceanologyShallowWaterSimulationGrid
{
    TArray<FVector4> ArrayValues;  // Flow data
    FIntVector2 NumCells;          // Grid resolution
    FVector Position;              // World center
    FVector2D Size;                // Coverage area
    UTexture2D* BakedTexture;      // GPU-ready data
};
```

### Features:
- **Bake once, use forever** - no runtime simulation cost
- **Sample at any position** - interpolated water velocity, height, depth
- **Compute normals** - surface normal from flow data
- **River integration** - perfect for river flow patterns

### Use Cases:
- River currents affecting gameplay
- Waterfall spray patterns
- Lake circulation systems
- Tidal flow baking

---

## 🎆 Niagara Data Interface

Full **Niagara particle system integration**:

```cpp
UCLASS(Category = "Water", meta = (DisplayName = "Water"))
class UOceanologyNiagaraDataInterfaceWater : public UNiagaraDataInterface
{
    // Get water data at particle positions
    void GetWaterDataAtPoint(FVectorVMExternalFunctionContext& Context);
    
    // Wave lookup table for GPU particles
    void GetWaveParamLookupTableOffset(FVectorVMExternalFunctionContext& Context);
};
```

### Capabilities:
- **Spawn particles at water surface**
- **Query water height per-particle**
- **Get wave velocity for particle motion**
- **Automatic water body detection**

### Properties:
```cpp
bool bFindWaterBodyOnSpawn = false;      // Auto-detect water
bool bEvaluateSystemDepth = true;         // Track depth
bool bEvaluateSystemDepthPerFrame = true; // Update each frame
```

Perfect for: spray effects, foam particles, splashes, wakes, underwater bubbles.

---

## 🏗️ HLOD Water Bodies

**Hierarchical LOD support** for massive worlds:

```cpp
class UOceanologyWaterBodyHLODBuilder : public UHLODBuilder
{
    // Generate simplified water meshes for distant viewing
    virtual TArray<UActorComponent*> Build(
        const FHLODBuildContext& InHLODBuildContext,
        const TArray<UActorComponent*>& InSourceComponents
    ) const override;
};
```

### Benefits:
- **World Partition friendly** - streaming compatible
- **Automatic LOD generation** - simplified distant water
- **Material preservation** - maintains visual quality
- **Performance boost** - reduced draw calls at distance

---

## 🌀 Jump Flood SDF Generation

**GPU-accelerated Signed Distance Field** generation:

```cpp
class UOceanologyJumpFloodComponent2D : public UActorComponent
{
    void JumpFlood(UTextureRenderTarget2D* SeedRT, ...);
    UTextureRenderTarget2D* FindEdges(UTextureRenderTarget2D* SeedRT, ...);
    UTextureRenderTarget2D* SingleBlurStep();
};
```

### How It Works:
1. **Seed** - Capture shoreline geometry
2. **Jump Flood** - O(log n) distance propagation
3. **Edge Detection** - Find shoreline contours
4. **Blur** - Smooth SDF gradients

### Materials:
```cpp
UMaterialInterface* JumpStepMaterial;   // Distance propagation
UMaterialInterface* FindEdgesMaterial;  // Edge detection
UMaterialInterface* BlurEdgesMaterial;  // Gradient smoothing
```

This powers Breaking Waves' SDF requirements automatically!

---

## ⚓ Enhanced Buoyancy System

**Massively improved physics simulation**:

### Spherical Pontoons
```cpp
struct FOceanologySphericalPontoon
{
    FName CenterSocket;           // Attach to skeleton
    FVector RelativeLocation;     // Manual position
    float Radius;                 // Pontoon size
    bool bFXEnabled;              // Splash effects
    
    // Runtime data:
    float WaterHeight;
    float WaterDepth;
    float ImmersionDepth;
    FVector WaterVelocity;
    FVector WaterSurfacePosition;
    FVector WaterPlaneNormal;
};
```

### Buoyancy Parameters
```cpp
struct FOceanologyBuoyancyData
{
    // Core physics
    float BuoyancyCoefficient;
    float BuoyancyDamp;
    float BuoyancyDamp2;
    float MaxBuoyantForce;
    
    // Velocity ramping
    float BuoyancyRampMinVelocity;
    float BuoyancyRampMaxVelocity;
    float BuoyancyRampMax;
    
    // Drag forces
    bool bApplyDragForcesInWater;
    float DragCoefficient;
    float AngularDragCoefficient;
    float MaxDragSpeed;
};
```

### River-Specific Behavior
```cpp
// NEW in 2.0: River forces
bool bApplyRiverForces = true;
float WaterShorePushFactor;           // Push to/from shore
float RiverTraversalPathWidth;        // Center path width
float WaterVelocityStrength;          // Current strength
float MaxWaterForce;                  // Force cap

// Downstream rotation
bool bApplyDownstreamAngularRotation;
FVector DownstreamAxisOfRotation;
float DownstreamRotationStrength;
float DownstreamRotationStiffness;
```

---

## 🎨 Caustics Generator

**Real-time underwater caustics**:

```cpp
class AOceanologyCausticsGenerator : public AActor
{
    void SpawnWaterPreviewGrid(HISMC, GridSize, GridTiles);
    void SpawnCausticParticleGrid(HISMC, GridSize, GridTiles);
    
    void EditorTick(float DeltaSeconds); // Preview in editor
};
```

Creates realistic light patterns on underwater surfaces through instanced mesh projection.

---

## 🌐 Water Subsystem

**Central runtime API** for water queries:

```cpp
class UOceanologyWaterSubsystem : public UTickableWorldSubsystem
{
    // Global access
    static UOceanologyWaterSubsystem* GetOceanologyWaterSubsystem(UWorld*);
    
    // Ocean queries
    float GetOceanBaseHeight() const;
    float GetOceanFloodHeight() const;
    float GetOceanTotalHeight() const;
    void SetOceanFloodHeight(float InFloodHeight);
    
    // Time control
    float GetWaterTimeSeconds() const;
    float GetSmoothedWorldTimeSeconds() const;
    void SetShouldPauseWaveTime(bool bPause);
    
    // Camera state
    float GetCameraUnderwaterDepth() const;
    bool IsUnderwaterPostProcessEnabled() const;
    
    // Zone management
    void MarkAllOceanologyWaterZonesForRebuild(EOceanologyWaterZoneRebuildFlags);
    TSoftObjectPtr<AOceanologyWaterZone> FindOceanologyWaterZone(FBox2D Bounds);
};
```

### Events
```cpp
// Blueprint-bindable events
FOnCameraUnderwaterStateChanged OnCameraUnderwaterStateChanged;
FOnWaterScalabilityChanged OnWaterScalabilityChanged;
```

---

## 🏊 Underwater Post-Process

**Automatic underwater effects**:

```cpp
struct FOceanologyUnderwaterPostProcessSettings
{
    bool bEnabled = true;
    float Priority = 0;
    float BlendRadius = 100.f;
    float BlendWeight = 1.0f;
    FPostProcessSettings PostProcessSettings;
};
```

Features:
- **Automatic detection** via collision
- **Smooth blending** at water surface
- **Per-water-body settings**
- **Custom materials** for unique looks

---

## 🗺️ Water Terrain Component

**Landscape integration**:

```cpp
class UOceanologyWaterTerrainComponent : public UPrimitiveComponent
{
    // Automatic terrain modification
    // Shore detection
    // Height blending
};
```

---

## 📊 Async Buoyancy

**Physics thread integration** for performance:

```cpp
enum EAsyncOceanologyBuoyancyComponentDataType : int8
{
    AsyncBuoyancyInvalid,
    AsyncBuoyancyBase,
    AsyncBuoyancyVehicle,
    AsyncBuoyancyBoat
};

struct FOceanologyBuoyancyManagerAsyncInput : public Chaos::FSimCallbackInput
{
    TArray<TUniquePtr<FOceanologyBuoyancyComponentAsyncInput>> Inputs;
    TMap<UOceanologyWaterComponent*, TUniquePtr<FOceanologySolverSafeWaterBodyData>>;
};
```

Buoyancy calculations now run on the physics thread, eliminating game thread stalls.

---

## 📋 Summary

NextGen 2.0 isn't just about waves - it's a complete rewrite:

| System | Improvements |
|--------|-------------|
| **Waves** | Spectral, Breaking, Wave Forge |
| **Rendering** | HLOD, Jump Flood SDF |
| **Physics** | Async Buoyancy, River Forces |
| **VFX** | Niagara DI, Caustics |
| **Simulation** | Baked Shallow Water |
| **Post-Process** | Enhanced Underwater |
| **Architecture** | Water Subsystem, Terrain |

All these features are included in the **free 2.0 update** for existing customers.

---

*Questions? Join our [Discord](https://discord.gg/s9TSBBX3Rh)!*
