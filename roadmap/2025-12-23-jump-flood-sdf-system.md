---
slug: jump-flood-sdf-system
title: "📐 Jump Flood SDF - Real-Time Distance Field Computation"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, sdf, jump-flood, algorithm, shore-detection]
image: /img/landing/oceanology-nextgen.png
---

The Jump Flood Algorithm (JFA) provides GPU-accelerated Signed Distance Field computation for shore detection, breaking waves, and foam generation.

<!-- truncate -->

## Overview

Traditional distance field computation requires O(n²) operations. The Jump Flood Algorithm reduces this to O(n log n) by using a series of passes with decreasing step sizes, making real-time SDF computation practical for water simulation.

---

## Algorithm Fundamentals

### How Jump Flood Works

1. **Seed Pass**: Initialize pixels with shore/edge positions
2. **Jump Passes**: Each pass propagates distance information with halving step sizes
3. **Final Pass**: Complete distance field with sub-pixel accuracy

### Complexity

| Method | Complexity | Real-Time Viable |
|--------|------------|------------------|
| Brute Force | O(n²) | ❌ No |
| Jump Flood | O(n log n) | ✅ Yes |
| Approximation | O(n) | ⚠️ Low Quality |

---

## Implementation

### UOceanologyJumpFloodComponent2D

Core component for 2D distance field computation:

```cpp
UCLASS(Blueprintable, BlueprintType)
class UOceanologyJumpFloodComponent2D : public UActorComponent
{
    // Execute complete Jump Flood algorithm
    UFUNCTION(BlueprintCallable)
    void JumpFlood(
        UTextureRenderTarget2D* SeedRT,
        float SceneCaptureZ,
        FLinearColor Curl,
        bool UseDepth,
        float ZxLocationT
    );

    // Single jump step for custom pipelines
    UFUNCTION(BlueprintCallable)
    UTextureRenderTarget2D* SingleJumpStep();

    // Edge detection from seed texture
    UFUNCTION(BlueprintCallable)
    UTextureRenderTarget2D* FindEdges(
        UTextureRenderTarget2D* SeedRT,
        float CaptureZ,
        FLinearColor Curl,
        bool UseDepth,
        float ZxLocationT
    );
};
```

### Material Pipeline

| Material | Purpose |
|----------|---------|
| **JumpStepMaterial** | Single propagation pass |
| **FindEdgesMaterial** | Edge detection from seed |
| **BlurEdgesMaterial** | Optional smoothing pass |

---

## Render Target Configuration

### Ping-Pong Buffers

The algorithm uses two render targets (RTA, RTB) for ping-pong rendering:

```cpp
void AssignRenderTargets(
    UTextureRenderTarget2D* InRTA,
    UTextureRenderTarget2D* InRTB
);
```

### Pass Calculation

Required passes = ceil(log2(max(width, height)))

For a 1024×1024 texture: 10 passes

---

## Use Cases

### Shore Detection

Generate distance-to-shore for:
- Breaking wave positioning
- Foam intensity gradients
- Shallow water effects
- Shoreline wetness

### Wave Breaking Zones

SDF enables accurate surf zone identification:
- Detect approaching shore
- Trigger wave transformation
- Scale breaking intensity
- Position foam generation

### Flow Field Generation

Combine SDF with gradient computation:
- Water flow toward shore
- Current direction fields
- Velocity magnitude mapping

---

## Water Textures Component

### UOceanologyWaterTexturesComponent

Integrates Jump Flood with the water rendering pipeline:

```cpp
UPROPERTY(VisibleAnywhere, Transient)
UTextureRenderTarget2D* RT_JumpFlood = nullptr;

UPROPERTY(VisibleAnywhere, Transient)
UTextureRenderTarget2D* RT_SDF_Gradient = nullptr;

UPROPERTY(EditAnywhere, BlueprintReadOnly)
TEnumAsByte<EOceanologyWaterTexturesMode> WaterTexturesMode;
```

### Capture Modes

| Mode | Description |
|------|-------------|
| **RenderTarget** | Real-time updates each frame |
| **Baked** | Pre-computed for static shorelines |

### Auto-Capture

```cpp
UPROPERTY(EditAnywhere)
bool bAutoCaptureWithRenderTargets = true;

UPROPERTY(EditAnywhere)
float AutoCaptureDelay = 0.1f;
```

---

## Optional Blur Pass

Enable blur for smoother distance fields:

```cpp
UPROPERTY(EditAnywhere)
bool UseBlur = false;

UPROPERTY(EditAnywhere)
int32 BlurPasses = 1;
```

---

## Performance

### GPU Optimized

- All computation on GPU via material draws
- Minimal CPU overhead
- Supports dynamic resolution scaling

### Optimization Tips

| Technique | Benefit |
|-----------|---------|
| Lower Resolution | Faster computation |
| Baked Mode | Zero runtime cost |
| Reduced Blur | Fewer passes |
| Async Capture | Non-blocking updates |

---

## Debug Visualization

```cpp
UFUNCTION(BlueprintCallable)
void FindEdges_Debug(
    UTextureRenderTarget2D* SeedRT,
    float CaptureZ,
    FLinearColor Curl,
    UTextureRenderTarget2D* DestRT,
    float ZOffset
);
```

Visualize:
- Seed points
- Distance gradients
- Edge detection results
- Completed SDF

---

## Integration with Breaking Waves

The SDF provides critical data for breaking wave simulation:

1. **Shore Distance** → Wave transformation trigger
2. **Gradient Direction** → Wave approach angle
3. **Depth Estimation** → Breaking intensity
4. **Surf Zone Width** → Foam spread area

---

## Resources

- **Console Variables**: `r.Oceanology.JumpFlood.*`
- **Debug Mode**: Enable visualization in editor
- **Documentation**: Technical deep-dive in docs

