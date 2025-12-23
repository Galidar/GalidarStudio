---
slug: caustics-generator-system
title: "✨ Caustics Generator - Dynamic Underwater Light Patterns"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, caustics, underwater, lighting, visual-effects]
image: /img/landing/oceanology-nextgen.png
---

Real-time caustics generation using GPU-accelerated particle grids for physically-accurate underwater light refraction patterns.

<!-- truncate -->

## Overview

Caustics are the light patterns visible underwater and on submerged surfaces, created by light refraction through the water surface. The Caustics Generator provides a flexible system for creating these effects using Hierarchical Instanced Static Meshes (HISMC).

---

## Caustics Generator Actor

### AOceanologyCausticsGenerator

```cpp
UCLASS(Blueprintable)
class AOceanologyCausticsGenerator : public AActor
{
    // Generate water preview mesh grid
    UFUNCTION(BlueprintCallable)
    void SpawnWaterPreviewGrid(
        UHierarchicalInstancedStaticMeshComponent* HISMC,
        float GridSize,
        int GridTiles
    );

    // Generate caustic particle grid
    UFUNCTION(BlueprintCallable)
    void SpawnCausticParticleGrid(
        UHierarchicalInstancedStaticMeshComponent* HISMC,
        float GridSize,
        int GridTiles
    );

    // Editor tick for real-time preview
    UFUNCTION(BlueprintNativeEvent, CallInEditor)
    void EditorTick(float DeltaSeconds);
};
```

---

## Grid Systems

### Water Preview Grid

Visualizes the water surface mesh for caustic ray calculation:

| Parameter | Description |
|-----------|-------------|
| **GridSize** | Total area covered in world units |
| **GridTiles** | Subdivision count per axis |
| **HISMC** | Target instanced mesh component |

### Caustic Particle Grid

Generates light ray particles that project caustic patterns:

| Parameter | Description |
|-----------|-------------|
| **GridSize** | Coverage area matching water preview |
| **GridTiles** | Particle density (tiles × tiles) |
| **HISMC** | Particle mesh instances |

---

## How It Works

### Ray Tracing Approach

1. **Surface Sampling**: Sample wave heights across grid
2. **Normal Calculation**: Compute surface normals
3. **Ray Refraction**: Calculate light ray bending
4. **Projection**: Project caustic intensity to surfaces

### Physical Accuracy

The system accounts for:
- Snell's Law refraction
- Wave-based normal variation
- Depth attenuation
- Light source direction

---

## Editor Integration

### Real-Time Preview

```cpp
virtual bool ShouldTickIfViewportsOnly() const override;
virtual void Tick(float DeltaSeconds) override;

UFUNCTION(BlueprintCallable)
void SetEditorTickEnabled(bool bEnabled);
```

Enable `EditorTickIsEnabled` for live caustic preview in editor viewport.

---

## Configuration

### Grid Density

| Quality | GridTiles | Particles | Performance |
|---------|-----------|-----------|-------------|
| Low | 32 | 1,024 | Excellent |
| Medium | 64 | 4,096 | Good |
| High | 128 | 16,384 | Moderate |
| Ultra | 256 | 65,536 | Demanding |

### Optimization Tips

- Reduce grid density for distant water
- Use LOD system for particle meshes
- Limit update frequency for static scenes
- Bake caustics for fixed sun angle

---

## Integration with Underwater

Caustics work with the underwater post-process system:

| Component | Caustics Role |
|-----------|---------------|
| **Underwater Volume** | Defines caustic visible zone |
| **Water Material** | Receives caustic projection |
| **Sun Direction** | Primary light source for rays |
| **Wave Amplitude** | Caustic intensity variation |

---

## Visual Parameters

### Caustic Appearance

| Parameter | Effect |
|-----------|--------|
| **Intensity** | Overall brightness |
| **Scale** | Pattern size |
| **Speed** | Animation rate |
| **Chromatic Aberration** | RGB separation |

### Depth-Based Falloff

- Near surface: High contrast patterns
- Mid depth: Softer, blended patterns
- Deep water: Minimal visibility

---

## Blueprint Integration

### Setting Up Caustics

1. **Add Generator Actor** to level
2. **Configure Grid** size and density
3. **Assign HISMC** components
4. **Enable Editor Tick** for preview
5. **Adjust Parameters** for desired look

### Runtime Control

```cpp
// Toggle caustics at runtime
CausticsGenerator->SetEditorTickEnabled(bEnableCaustics);
```

---

## Performance Considerations

### GPU Instancing

HISMC provides efficient GPU instancing:
- Single draw call per grid
- Hardware instancing support
- Automatic LOD management

### Update Frequency

| Mode | Update Rate | Use Case |
|------|-------------|----------|
| Every Frame | 60 Hz | Dynamic scenes |
| Fixed Interval | 10-30 Hz | Performance mode |
| Baked | Static | Cinematic |

---

## Future Enhancements

| Feature | Status |
|---------|--------|
| Ray Marching Caustics | Planned |
| Screen-Space Caustics | Research |
| Volumetric Caustics | Planned |
| Compute Shader Path | Planned |

---

## Resources

- **Example Levels**: See `Maps/CausticsDemo`
- **Material Functions**: `MF_CausticProjection`
- **Documentation**: Underwater rendering guide

