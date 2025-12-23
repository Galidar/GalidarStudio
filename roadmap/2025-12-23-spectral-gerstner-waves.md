---
slug: spectral-gerstner-waves-explained
title: "🌊 Spectral Gerstner Waves - The Science Behind NextGen 2.0"
authors: [galidar]
tags: [nextgen, waves, technical, physics, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Spectral Gerstner Waves: Oceanographic Accuracy Meets Real-Time Performance

One of the headline features of **NextGen 2.0** is the new **Spectral Gerstner Wave System**. In this deep-dive, we'll explore the science behind this system and how it delivers unprecedented realism while maintaining excellent performance.

<!--truncate-->

## 🌊 The Problem with Traditional Approaches

In NextGen 1.x (and most game engines), ocean waves are created by manually stacking 4-8 individual Gerstner waves. While effective, this approach has limitations:

- **Tedious tuning**: Getting realistic results requires careful parameter adjustment
- **Repetitive patterns**: Limited wave count creates visible tiling
- **Unrealistic behavior**: Waves don't respond naturally to conditions
- **No energy spectrum**: Real oceans have complex frequency distributions

## 🔬 The Spectral Solution

Real ocean surfaces are the result of **wind energy distributed across a spectrum of frequencies**. Our Spectral Gerstner system simulates this by:

1. **Generating many wave components** (up to 128) across the frequency spectrum
2. **Distributing energy** according to oceanographic models
3. **Aligning waves** around the wind direction with natural spreading
4. **Using proper dispersion** for physically correct wave speeds

### The Beaufort Scale

Instead of abstract parameters, you now control the ocean using the **Beaufort Wind Force Scale** (0-12):

| Beaufort | Description | Wave Height | Sea State |
|----------|-------------|-------------|-----------|
| 0 | Calm | 0 m | Mirror-like |
| 3 | Gentle Breeze | 0.6 m | Large wavelets |
| 5 | Fresh Breeze | 2.0 m | Moderate waves |
| 7 | Near Gale | 4.0 m | Sea heaps up |
| 9 | Strong Gale | 7.0 m | High waves |
| 12 | Hurricane | 14+ m | Air filled with foam |

Simply set `BeaufortScale = 5` and the entire wave spectrum adjusts accordingly!

## 📐 Technical Implementation

### Deep Water Dispersion

Our waves follow the **deep water dispersion relation**:

```
ω = √(g × k)
```

Where:
- ω = angular frequency (wave speed)
- g = gravity (981 cm/s²)
- k = wave number (2π/λ)

This ensures longer waves travel faster than shorter waves - exactly like real oceans.

### Energy Distribution

Wave amplitudes follow an exponential energy distribution:

```hlsl
const float energy = pow(waveT, WaveEnergyDistribution);
float lambda = lerp(adjMaxL, adjMinL, energy);
const float A = lerp(adjMaxH, adjMinH, energy);
```

This creates the characteristic ocean spectrum with dominant swells and diminishing high-frequency components.

### Directional Spreading

Waves spread naturally around the wind direction:

```hlsl
const float spreadAngle = DirectionalVariance * HALF_PI;
const float angOff = sign(rand.x - 0.5) * pow(rand.y, 0.8) * spreadAngle;
```

Set `DirectionalVariance = 30` for realistic spreading, or increase for more chaotic seas.

### Detail Band

To capture high-frequency ripples without excessive wave count, we add a **detail band** at 5x the base frequency:

```hlsl
#define DETAIL_FACTOR 5.0f    // frequency multiplier
#define AMPLITUDE_SCALE 0.1f  // relative amplitude
```

This adds realistic surface texture without additional computational cost.

## ⚙️ Parameters Reference

```cpp
USTRUCT(BlueprintType)
struct FOceanologySpectralGerstner
{
    // Master enable
    bool SpectralGerstnerWaves = true;
    
    // Wind conditions
    float BeaufortScale = 5.0;           // 0-12 wind force
    float DirectionalVariance = 30.0;    // 3-90 degrees
    FVector2D WindDirection = (1, 1);    // Normalized direction
    
    // Wave spectrum
    float WaveComponentCount = 128.0;    // 4-128 waves
    float WaveSpectrumResolution = 1.0;  // 0.5-1.0 quality
    float WaveEnergyDistribution = 1.0;  // Energy falloff
    
    // Wave bounds
    float MaxWaveHeight = 13.7;          // Tallest swell (cm)
    float MinWaveHeight = 0.25;          // Smallest ripple (cm)
    float MaxWaveLength = 13312.0;       // Longest wave (cm)
    float MinWaveLength = 128.0;         // Shortest wave (cm)
    
    // Foam generation
    float FoamThresholdLow = -0.2;       // Calm foam bias
    float FoamThresholdHigh = -0.525;    // Storm foam bias
    float SmallWaveThreshold = 0.25;     // Capillary cutoff
};
```

## 🎨 Artistic Control

While physically-based, the system offers full artistic control:

### For Realistic Oceans
```
BeaufortScale: 4-6
DirectionalVariance: 25-35
WaveComponentCount: 64-128
```

### For Stylized Water
```
BeaufortScale: 2-3
DirectionalVariance: 10-20
WaveComponentCount: 16-32
WaveEnergyDistribution: 2.0 (more uniform)
```

### For Stormy Seas
```
BeaufortScale: 8-10
DirectionalVariance: 45-60
FoamThresholdHigh: -0.7
```

## 📊 Performance Considerations

The spectral system is highly optimized:

- **Loop unrolling** where beneficial
- **SIMD-friendly** operations (sincos pairs)
- **RCP intrinsics** for divisions
- **Early Beaufort scaling** to reduce per-wave work

**Benchmark** (RTX 4070, 1080p):
- 32 waves: ~0.3ms
- 64 waves: ~0.5ms
- 128 waves: ~0.9ms

For most projects, **64 waves** provides excellent quality with minimal overhead.

## 🔀 Combining with Breaking Waves

Spectral waves blend seamlessly with the new Breaking Wave system:

```hlsl
// Ocean provides base motion
OutDisplacement = SpectralWaves.WPO;
OutNormal = SpectralWaves.Normal;

// Breaking waves override near shore
OutNormal = lerp(BreakingNormal, OceanNormal, OceanBlend);
OutFoam = lerp(ShoreFoam, OceanFoam, OceanBlend);
```

The `OceanBlend` factor ensures smooth transitions from deep water to surf zone.

## 🚀 Getting Started

When NextGen 2.0 releases, migrating to Spectral waves is simple:

1. Set `WaveSystemSelector = SpectralGerstnerWaves`
2. Configure `BeaufortScale` for your conditions
3. Adjust `WindDirection` to match your scene
4. Fine-tune foam thresholds for your art style

That's it! The system handles the rest.

## 📚 Further Reading

- [Original Gerstner Paper (1804)](https://en.wikipedia.org/wiki/Gerstner_wave)
- [Tessendorf's "Simulating Ocean Water"](https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2004.pdf)
- [Beaufort Scale (Wikipedia)](https://en.wikipedia.org/wiki/Beaufort_scale)

---

*Questions about Spectral Waves? Join our [Discord](https://discord.gg/s9TSBBX3Rh) and ask!*
