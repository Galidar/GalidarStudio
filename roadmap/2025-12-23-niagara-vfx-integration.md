---
slug: niagara-vfx-integration
title: "🎆 Niagara VFX Integration - Water-Aware Particle Systems"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, niagara, vfx, particles, integration]
image: /img/landing/oceanology-nextgen.png
---

Deep integration between Oceanology and Unreal Engine's Niagara VFX system enables physically-accurate water-aware particle effects.

<!-- truncate -->

## Overview

The **Niagara Water Data Interface** provides direct access to Oceanology's wave simulation data within Niagara particle systems. This enables VFX artists to create effects that respond naturally to water surface dynamics.

---

## Niagara Data Interface

### UOceanologyNiagaraDataInterfaceWater

The core integration component exposes water simulation data to Niagara:

| Property | Description |
|----------|-------------|
| **bFindWaterBodyOnSpawn** | Automatically locate nearest water body when system spawns |
| **bEvaluateSystemDepth** | Sample water depth at system position |
| **bEvaluateSystemDepthPerFrame** | Update depth sampling every frame |
| **SourceBodyComponent** | Explicit water component reference |

### Available Functions

```cpp
// Get complete water data at world position
void GetWaterDataAtPoint(FVectorVMExternalFunctionContext& Context);

// Access wave parameter lookup table
void GetWaveParamLookupTableOffset(FVectorVMExternalFunctionContext& Context);
```

---

## Water Data Access

### Per-Particle Queries

Each particle can query water state independently:

| Data | Description |
|------|-------------|
| **Wave Height** | Current water surface height at particle XY |
| **Wave Normal** | Surface normal for orientation |
| **Flow Velocity** | Water movement direction and speed |
| **Depth** | Distance from surface to ground |
| **Submersion** | Particle depth below water surface |

### Performance Considerations

- CPU simulation only (ENiagaraSimTarget::CPUSim)
- Supports instance data caching
- Automatic water body change detection via SourceBodyChangeId
- Pre-simulate tick for data preparation

---

## Niagara Function Library

### Blueprint Accessible Functions

```cpp
UCLASS()
class UOceanologyNiagaraWaterFunctionLibrary : public UBlueprintFunctionLibrary
{
    // Set water component for Niagara system
    UFUNCTION(BlueprintCallable, Category = "Oceanology|Niagara")
    static void SetOceanologyWaterComponent(
        UNiagaraComponent* NiagaraComponent,
        UOceanologyWaterComponent* WaterComponent
    );
};
```

---

## Use Cases

### Spray & Splash Effects

Create spray particles that:
- Spawn at wave crests (high curvature areas)
- Orient along wave normals
- Scale intensity with wave height
- Follow flow velocity

### Foam Particles

Dynamic foam that:
- Accumulates in high-turbulence zones
- Dissipates based on water calm areas
- Follows surface flow direction
- Responds to shore proximity

### Underwater Bubbles

Bubble systems that:
- Rise toward water surface
- Account for current wave height
- Respond to depth pressure
- Interact with flow velocity

### Wake Effects

Boat/character wakes that:
- Sample surface at multiple points
- Generate V-shaped spray patterns
- Scale with movement speed
- Fade with distance

---

## Integration Example

### Setting Up Water-Aware Particles

1. **Create Niagara System** with Water Data Interface
2. **Configure Source** - Set SourceBodyComponent or enable auto-find
3. **Add Modules** - Use water data in particle behavior
4. **Sample Per-Particle** - Query wave height, normal, velocity

### Module Setup

```
Particle Spawn:
  - Sample Water Height at Particle.Position.XY
  - Set Particle.Position.Z = WaterHeight + Offset

Particle Update:
  - Sample Flow Velocity
  - Add to Particle.Velocity
  - Orient sprite to Water Normal
```

---

## Debugging

### Editor Visualization

Enable `WITH_NIAGARA_DEBUGGER` for HUD overlays:
- Water body boundaries
- Sample positions
- Flow vectors
- Depth values

---

## Upcoming Enhancements

| Feature | Status |
|---------|--------|
| GPU Simulation Support | Planned |
| Wave Spectrum Access | Planned |
| Shore Distance Queries | Planned |
| Foam Threshold Data | Planned |

---

## Resources

- **Discord**: Join #vfx-integration for community effects
- **Example Systems**: Available in plugin Content folder
- **Documentation**: See Niagara module reference

