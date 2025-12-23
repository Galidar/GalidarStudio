---
slug: migration-guide-1x-to-2
title: "📦 Migration Guide - Upgrading from NextGen 1.x to 2.0"
authors: [galidar]
tags: [nextgen, migration, upgrade, guide, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Migrating from NextGen 1.x to 2.0

Ready to upgrade? This guide covers everything you need to know about migrating your project from **Oceanology NextGen 1.2.5** (or earlier) to the new **NextGen 2.0**.

<!--truncate-->

## ✅ Good News First

**NextGen 2.0 is designed for backward compatibility.** Your existing water setups will continue to work without modification. The new features are **additive** - you opt into them when ready.

## 📋 Pre-Migration Checklist

Before upgrading:

- [ ] Backup your project
- [ ] Note your current wave settings (screenshot Details panels)
- [ ] Document any custom material modifications
- [ ] Update Unreal Engine to 5.4+ (recommended for 2.0)

## 🔄 What Changes Automatically

### Wave System Assignment

Existing water bodies receive:

```cpp
WaveSystemSelector = EOceanologyWaveSystemSelector::GerstnerWaves;
```

Your current **Legacy Gerstner** settings continue to work unchanged.

### Shore Waves Defaults

New shore wave parameters initialize to **disabled**:

```cpp
ShoreWaves.CoastalWaves = false;  // Won't affect existing setups
```

### Material Compatibility

Water materials from 1.x remain valid. New material functions are **added**, not replaced.

## 🆕 Enabling New Features

### Option 1: Keep Legacy Waves

If you're happy with your current wave appearance, no changes needed. Your water will look identical to 1.x.

### Option 2: Switch to Spectral Waves

For more realistic ocean behavior:

1. Select your Ocean/Lake actor
2. In Details panel, find **Wave System**
3. Set **Wave System Selector** to `SpectralGerstnerWaves`
4. Configure new parameters:

```cpp
SpectralGerstner.BeaufortScale = 5.0f;      // Wind strength
SpectralGerstner.WindDirection = (1, 1);    // Wind vector
SpectralGerstner.WaveComponentCount = 64;   // Quality
```

### Option 3: Enable Breaking Waves

For realistic coastlines:

1. Ensure your terrain has valid **SDF data** (generated automatically)
2. Select your Ocean actor
3. Enable **Coastal Waves**:

```cpp
ShoreWaves.CoastalWaves = true;
ShoreWaves.BreakerStrength = 1000.0f;
ShoreWaves.SurfZoneWidth = -1000.0f;
```

## ⚙️ Parameter Mapping

If you want to approximate your 1.x settings in Spectral mode:

| Legacy Parameter | Spectral Equivalent | Notes |
|------------------|---------------------|-------|
| GlobalAmplitude | BeaufortScale | ~Amplitude/100 |
| GlobalSpeed | (automatic) | Derived from Beaufort |
| Choppiness | WaveEnergyDistribution | Inverse relationship |
| GlobalWaveDirection | WindDirection | Same concept |
| Individual Waves | WaveComponentCount | Many small vs few large |

### Example Conversion

**Legacy 1.x settings:**
```cpp
GlobalAmplitude = 500
GlobalSpeed = 1.0
Choppiness = 0.8
GlobalWaveDirection = 45
```

**Approximate Spectral 2.0:**
```cpp
BeaufortScale = 5
WindDirection = (0.707, 0.707)  // 45 degrees
WaveEnergyDistribution = 1.2
WaveComponentCount = 64
```

## 🎨 Material Updates

### New Material Functions

2.0 adds new material functions (existing ones unchanged):

```
MF_OceanologySpectralWaves      # New spectral evaluation
MF_OceanologyBreakingWaves      # New coastal system
MF_OceanologyWaveSelector       # Routes between systems
```

### Custom Materials

If you've modified water materials:

1. **No changes required** if using standard wave nodes
2. **Optional upgrade** to use new WaveSelector node for flexibility
3. **Breaking waves require** SDF input connection

### Material Migration Example

**1.x approach:**
```
GetGerstnerWaves → WPO
```

**2.0 recommended:**
```
GetWaves (Selector) → GetBreakingWaves (optional) → WPO
```

## 🗃️ Data Asset Updates

### Wave Presets

Existing `UOceanologyWaterWavesPreset` assets work unchanged. New fields initialize to defaults:

```cpp
// Auto-added with safe defaults
SpectralGerstner = FOceanologySpectralGerstner();  // Disabled
ShoreWaves = FOceanologyShoreWaves();              // Disabled
```

### Creating New Presets

New preset wizard includes all wave systems:

1. Right-click Content Browser
2. **Oceanology → Water Waves Preset**
3. Choose template: Legacy, Spectral, or Coastal

## 🔧 Blueprint Updates

### New Blueprint Functions

```cpp
// Get/Set wave system at runtime
SetWaveSystemSelector(EOceanologyWaveSystemSelector NewSelector)
EOceanologyWaveSystemSelector GetWaveSystemSelector()

// Spectral wave control
SetBeaufortScale(float Scale)
SetWindDirection(FVector2D Direction)

// Breaking wave control
SetCoastalWavesEnabled(bool bEnabled)
SetBreakerStrength(float Strength)
```

### Existing Functions

All 1.x Blueprint functions remain valid:

```cpp
// Still work as before
GetWaveHeightAtLocation()
GetWaterSurfaceNormal()
IsUnderwater()
// etc.
```

## ⚠️ Breaking Changes

### Minimal Breaking Changes

We've worked hard to minimize disruption. The only breaking changes:

1. **Renamed Enum**: `EWaveType` → `EOceanologyWaveSystemSelector`
2. **Moved Header**: `OceanologyGerstner.h` → `Structs/OceanologyLegacyGerstnerWaves.h`

### If You Get Compile Errors

```cpp
// Old (1.x)
#include "OceanologyGerstner.h"

// New (2.0)
#include "Structs/OceanologyLegacyGerstnerWaves.h"
```

## 📊 Performance Comparison

| Scenario | 1.2.5 | 2.0 (Legacy) | 2.0 (Spectral 64) | 2.0 (Full Coastal) |
|----------|-------|--------------|-------------------|-------------------|
| Open Ocean | 0.8ms | 0.8ms | 1.2ms | 1.2ms |
| With Coastline | 0.8ms | 0.8ms | 1.2ms | 1.8ms |
| Complex Scene | 1.2ms | 1.2ms | 1.6ms | 2.2ms |

*RTX 4070, 1080p, 10km² water area*

New features have **zero overhead** when disabled.

## 🎯 Recommended Migration Path

### For Shipped Games
1. Install 2.0
2. Test existing levels
3. Verify visual parity
4. Ship with confidence

### For Games in Development
1. Install 2.0
2. Test existing water
3. Enable Spectral for open ocean
4. Enable Breaking Waves for key coastlines
5. Fine-tune new parameters
6. Profile and optimize

### For New Projects
Start with Spectral + Coastal from day one!

## ❓ FAQ

**Q: Will my saved games break?**  
A: No. Water state is not serialized; it regenerates from settings.

**Q: Can I mix wave systems in one level?**  
A: Yes! Each water body has independent settings.

**Q: Do I need new SDF data for breaking waves?**  
A: SDF generates automatically from landscape. Just enable coastal waves.

**Q: What about multiplayer?**  
A: Wave simulation is deterministic. Same settings = same waves on all clients.

**Q: Can I go back to 1.x?**  
A: Yes, but you'll lose 2.0 settings. Keep backups!

## 🆘 Getting Help

Stuck during migration?

- **Documentation**: [docs.galidar.studio](https://docs.galidar.studio)
- **Discord**: [discord.gg/s9TSBBX3Rh](https://discord.gg/s9TSBBX3Rh) - #migration-help channel
- **Email**: support@galidar.studio

---

*Happy migrating! The new ocean awaits.* 🌊
