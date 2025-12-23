---
slug: breaking-waves-deep-dive
title: "🏄 Breaking Waves - Realistic Surf Zone Simulation in NextGen 2.0"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, coastal, breaking-waves, surf, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Breaking Waves: The Most Requested Feature Finally Arrives

For years, the #1 feature request from our community has been **realistic breaking waves**. With NextGen 2.0, we're delivering a complete **Coastal Wave System** that simulates the entire lifecycle of waves as they approach and break on your shores.

<!--truncate-->

## 🌊 Understanding Wave Breaking

When ocean waves approach a coastline, they undergo a dramatic transformation:

1. **Shoaling**: Waves slow down and increase in height
2. **Steepening**: Wave faces become asymmetric
3. **Breaking**: The crest collapses forward
4. **Surf**: Chaotic white water rushes shoreward
5. **Swash**: Water runs up the beach
6. **Backwash**: Water retreats to sea

Our Breaking Wave system simulates **all six phases** in real-time.

## 🔬 SDF-Driven Simulation

The system is powered by **Signed Distance Fields (SDF)** that encode your shoreline geometry:

- **Positive values**: Distance from shore (deep water)
- **Zero**: The shoreline itself
- **Negative values**: Distance inland

The SDF gradient provides the **perpendicular direction to shore**, guiding waves toward beaches naturally.

```hlsl
// SDF gradient normalization with fallback
float2 SlopeDirRaw = SDFGradient;
float  SlopeLen = length(SlopeDirRaw);
float2 SlopeDirection = (SlopeLen > 1e-4f) 
    ? (SlopeDirRaw / SlopeLen) 
    : float2(1.0f, 0.0f);
```

## 📊 Wave Lifecycle Parameters

Control every aspect of the wave lifecycle:

```cpp
struct FOceanologyShoreWaves
{
    bool CoastalWaves = true;        // Enable system
    
    // Wave geometry
    float BreakerStrength = 1000.0f; // Wave height
    float WaveLength = 4000.0f;      // Distance between waves
    float GlobalWaveScale = 0.5f;    // Overall scale
    
    // Wave motion
    float WavePhaseSpeed = 1.0f;     // Cycle speed
    float DirectionWaveSpeed = 512.0f; // Shore approach speed
    
    // Wave sway (lateral wobble)
    float SwayFrequency = 8192.0f;   // Sway wavelength
    float WaveSwayAmplitude = 300.0f; // Sway amount
    
    // Zone control
    float ShoreSlopeRange = 1000.0f; // Transition width
    float SurfZoneWidth = -1000.0f;  // Surf zone extent
    
    // Effects
    float ShorelineFoam = 1000.0f;   // Foam band width
    float FlowStrength = 1.0f;       // Water flow intensity
};
```

## 🎬 The Breaking Animation

Waves progress through timed **lifecycle windows**:

```hlsl
// Phase clock from 0 to CYCLETIME (4.5 seconds default)
float PhaseClock = fmod(TimeWrapped - DepthProjection/LocalWaveLength, CYCLETIME);
float TimeRatio = PhaseClock / CYCLETIME;

// Lifecycle windows
float WindowForm = 1.0 - smoothstep(0.00, 0.30, TimeRatio);      // Building
float WindowBreak = smoothstep(0.10, 0.40, TimeRatio) * 
                    (1.0 - smoothstep(0.40, 0.70, TimeRatio));   // Breaking
float WindowDissipate = smoothstep(0.50, 0.80, TimeRatio);       // Dissipating
```

Each window controls different aspects of geometry, foam, and motion.

## 🌀 Barrel Formation

The system creates realistic **barrel/tube** shapes during the breaking phase:

```hlsl
// Roll geometry
float2 RollBreak = float2(
    lerp(4.0, 16.0, LateralBreak),  // Roll tightness
    0.2 * (4.0 + BreakRamp)          // Vertical scale
);

// Crest curl calculation
float RollAngle = RollFactor * CrestRight * HALF_PI;
float CosRoll, SinRoll;
sincos(RollAngle, SinRoll, CosRoll);
```

The `RollFactor` increases through the breaking phase, creating the characteristic curling motion.

## 💨 Dynamic Foam Generation

Foam is generated based on wave physics:

```hlsl
// Foam factors
float WaveSlope = abs(CrestHeightDeriv) * EffectiveHeight;
float SlopeFactor = saturate((WaveSlope - 0.04) / 0.18);
float CrestFactor = saturate((CrestRight - 0.60) / 0.25);
float StageBoost = WindowBreak * (1.0 - WindowDissipate);

// Combined foam
float BaseFoam = saturate(0.6 * SlopeFactor + 0.4 * CrestFactor);
float BreakingFoam = BaseFoam * exp2(-DissipateRamp * 2.2) * DepthAtten;
```

Foam appears on steep wave faces and persists through the dissipation phase.

## 🏖️ Shoreline Foam Band

A separate foam band follows the water's edge:

```hlsl
float ShoreBand = 1.0 - saturate(abs(SDF) / ShorelineFoam);
float ShoreFoam = saturate(max(FoamPhase * 1.3 - 0.5, -0.1) + ShoreBand);
```

This creates the characteristic white foam line at the water's edge.

## 🌊 Wave Sway

Waves don't approach perfectly perpendicular - they sway laterally:

```hlsl
// World-space sway calculation
float2 SwayBasisWS = normalize(float2(1.0, 1.0));
float SwayOmega = TWO_PI / SwayFrequency;
float SwayCoord = dot(WorldPosition, SwayBasisWS);
float SwayShift = sin(SwayOmega * SwayCoord) * WaveSwayAmplitude;
```

This breaks up the artificial regularity of perfectly aligned waves.

## 🔀 Ocean Blending

Breaking waves smoothly blend with the deep ocean system:

```hlsl
// Surf zone factor
float SurfZoneRaw = saturate((SDF + SurfZoneWidth) / SURFZONE_SCALE);
float OceanBlend = pow(SurfZoneRaw, SURFZONE_GATE_POWER);

// Final outputs blend ocean and breaking
OutNormal = normalize(lerp(BreakingNormal, OceanNormal, OceanBlend));
OutFoam = lerp(ShoreFoam, OceanFoam, OceanBlend);
```

No harsh transitions - just smooth blending from deep water to surf zone.

## 🎨 Wave Forge Integration

For ultimate artistic control, use **Wave Forge Studio** to create custom wave profiles:

- **21 Hermite splines** define the complete wave shape
- **Procedural mode**: Real-time spline evaluation
- **Baked mode**: Texture-based for maximum performance

```hlsl
// Baked profile sampling
float2 Projection2D = Texture2DSample(
    BakeProjection2D, 
    BakeProjection2DSampler, 
    UVs
).rg;

// Convert to world displacement
float3 worldOffset = float3(
    Gradient * projectedDisplacement.x, 
    projectedDisplacement.y
);
```

## ⚙️ Best Practices

### For Realistic Surf
```
BreakerStrength: 800-1200
WaveLength: 3000-5000
SurfZoneWidth: -800 to -1200
ShorelineFoam: 800-1200
```

### For Gentle Beaches
```
BreakerStrength: 400-600
WaveLength: 5000-8000
SwayAmplitude: 150-200
ShorelineFoam: 500-800
```

### For Dramatic Coastlines
```
BreakerStrength: 1500-2000
WaveLength: 2000-3000
GlobalWaveScale: 0.7-1.0
FlowStrength: 1.5-2.0
```

## 📊 Performance

Breaking waves only compute in the surf zone:

```hlsl
if (!WaveParams.CoastalWaves)
{
    // Skip computation, pass through ocean data
    OutWaves.WPO = WaterDisplacement;
    OutWaves.Normal = WaterNormal;
    OutWaves.Foam = WaterFoam;
    return OutWaves;
}
```

Outside the surf zone, there's **zero overhead**.

**Benchmark** (RTX 4070, 1080p, 500m coastline):
- Breaking waves: ~0.4ms
- With foam: ~0.5ms
- Full system: ~0.6ms

## 🎮 Use Cases

- **Tropical beaches**: Gentle rollers with clear barrels
- **Rocky coasts**: Dramatic plunging breakers
- **River mouths**: Complex wave interference
- **Harbors**: Calm protected waters with distant breaking

## 🚀 Coming in 2.0

Breaking Waves will be available as a **free update** for all NextGen customers. Start planning your coastlines now!

---

*Questions about Breaking Waves? Join our [Discord](https://discord.gg/s9TSBBX3Rh)!*
