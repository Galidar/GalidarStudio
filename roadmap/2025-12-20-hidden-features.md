---
title: "Hidden Gems: Features You Might Not Know About"
slug: hidden-features
date: 2025-12-20
tags:
  - tips
  - advanced
  - features
description: "Discover powerful features in Oceanology and Riverology that many users overlook. Level up your water simulation game!"
image: /img/landing/riverology.png
authors: [galidar]
---

Our plugins have many features that even experienced users sometimes miss. Let's uncover them!

<!-- truncate -->

## 🔮 Hidden Gem #1: Blueprint Wave Access

You can query wave data from anywhere in your game!

### Get Water Height

```cpp
// In any Blueprint
float Height = OceanologyManager->GetWaterHeightAtLocation(MyLocation);
```

**Use cases:**
- AI navigation around water
- Spawning objects at water level
- Camera clipping prevention
- Dynamic audio (splash sounds)

### Get Wave Direction & Velocity

```cpp
FVector WaveVelocity = OceanologyManager->GetWaveVelocityAtLocation(Location);
FVector FlowDirection = WaveVelocity.GetSafeNormal();
float WaveSpeed = WaveVelocity.Size();
```

**Use cases:**
- Align boat wakes with waves
- Particle system directions
- Floating debris movement

---

## 🎨 Hidden Gem #2: Dynamic Water Colors

Change water color in real-time for gameplay effects!

### Blueprint Method

```cpp
// Reference your Ocean actor
OceanActor->SetWaterColor(FLinearColor(0.1, 0.3, 0.8, 1.0));
OceanActor->SetFoamColor(FLinearColor(1.0, 1.0, 1.0, 1.0));
```

**Ideas:**
- 🩸 Blood red during combat
- 🧪 Toxic green for pollution
- 🌅 Golden during sunset
- 🌊 Stormy dark during events

### Smooth Transitions

```cpp
// Lerp between colors over time
CurrentColor = FMath::Lerp(CurrentColor, TargetColor, DeltaTime * TransitionSpeed);
OceanActor->SetWaterColor(CurrentColor);
```

---

## 🌧️ Hidden Gem #3: Weather Integration

Link weather systems to water behavior:

### Storm Mode

```cpp
// Gradually increase wave intensity
OceanActor->SetWaveScale(FMath::Lerp(1.0, 2.5, StormIntensity));
OceanActor->SetWindSpeed(FMath::Lerp(5.0, 25.0, StormIntensity));
OceanActor->SetFoamAmount(FMath::Lerp(0.2, 0.8, StormIntensity));
```

### Rain Ripples

```cpp
// Enable rain ripples effect
OceanActor->SetRainIntensity(RainAmount);  // 0.0 to 1.0
```

---

## 🔊 Hidden Gem #4: Spatial Audio Hooks

Our audio system provides events you can hook into:

### Available Events

| Event | Trigger |
|-------|---------|
| `OnWaveCrest` | Wave peak passes location |
| `OnEnterWater` | Actor enters water |
| `OnExitWater` | Actor exits water |
| `OnSubmerge` | Actor fully underwater |
| `OnSurface` | Actor emerges |

### Example: Dynamic Ocean Sounds

```cpp
// In your audio manager
OnWaveCrest -> Play(WaveCrashSound, WaveLocation);
OnEnterWater -> Play(SplashSound, ActorLocation);
```

---

## 🗺️ Hidden Gem #5: Level Streaming Support

Our plugins work with World Partition!

### Setup

1. Place **OceanologyManager** in **Persistent Level**
2. Ocean actor can be in any streaming level
3. Water queries work across level boundaries

### Best Practice

```
Persistent Level:
├── OceanologyManager
├── Lighting
└── Global Systems

Streaming Levels:
├── Level_Ocean_North (contains ocean chunk)
├── Level_Ocean_South (contains ocean chunk)
└── Level_Island_1 (no water)
```

---

## 📸 Hidden Gem #6: Screenshot Mode

Get cinematic-quality captures:

### Enable High Quality Mode

```cpp
// Console command
Oceanology.HighQualityMode 1

// Or in Blueprint
OceanActor->SetHighQualityScreenshotMode(true);
```

**What it does:**
- Maximum FFT resolution
- Full tessellation
- Enhanced reflections
- No LOD reduction

:::warning Performance
Only use for screenshots/cinematics. Not for gameplay!
:::

---

## 🔬 Hidden Gem #7: Debug Visualization

See what's happening under the hood:

### Console Commands

```cpp
Oceanology.ShowPontoons 1       // Visualize buoyancy points
Oceanology.ShowWaveVectors 1    // Show wave directions
Oceanology.ShowQuadTree 1       // Display LOD grid
Oceanology.ShowWaterPlane 1     // Show water height plane
```

### In Editor

- Select Ocean actor
- Check **Debug** category in Details
- Enable visualizations you need

---

## 🎭 Hidden Gem #8: Custom Surface Materials

Override the default water material per-area:

### Material Zones

```cpp
// Create water zone with custom material
WaterZone->SetOverrideMaterial(SwampMaterial);
WaterZone->SetBounds(SwampBounds);
```

**Examples:**
- Swamp areas (murky, green)
- Hot springs (steamy, blue)
- Oil spills (black, less reflective)
- Magical water (glowing, particles)

---

## 🌊 Hidden Gem #9: Riverology Flow Painting

Paint flow directions directly in editor!

### How to Use

1. Select your river spline
2. Enable **Flow Painting Mode**
3. Use brush to paint flow vectors
4. Adjust strength and direction

**Use cases:**
- Whirlpools
- Split currents around rocks
- Eddies behind obstacles
- Custom waterfalls

---

## ⚡ Hidden Gem #10: Async Everything

Enable async operations for better performance:

### Async Water Queries

```cpp
// In your game settings
OceanologyManager->SetAsyncQueries(true);
OceanologyManager->SetQueryBatchSize(100);
```

### Async Buoyancy

```cpp
// Per buoyancy component
BuoyancyComponent->SetAsyncMode(true);
BuoyancyComponent->SetUpdateFrequency(0.02f); // 50Hz instead of every frame
```

---

## 🎮 Hidden Gem #11: Preset Interpolation

Smoothly blend between presets:

### Transition Between Presets

```cpp
// Calm to Storm transition
OceanActor->InterpolateToPreset("Storm", 5.0f);  // 5 second transition
```

### Time-of-Day Integration

```cpp
// In your day/night cycle
if (TimeOfDay == Dawn)
    OceanActor->InterpolateToPreset("CalmMorning", 60.0f);
else if (TimeOfDay == Dusk)  
    OceanActor->InterpolateToPreset("GoldenHour", 60.0f);
```

---

## 🔗 Hidden Gem #12: Actor Interaction Tags

Mark actors for special water behavior:

### Available Tags

| Tag | Behavior |
|-----|----------|
| `OceanFloater` | Auto-adds buoyancy |
| `OceanIgnore` | No water interaction |
| `OceanRipple` | Creates surface ripples |
| `OceanSplash` | Spawns splash effects |

### Usage

```cpp
// In your actor's construction
Tags.Add("OceanFloater");
Tags.Add("OceanSplash");
```

---

## 💡 Bonus Tips

### Quick Preset Switch (Runtime)

```cpp
// Number keys for testing (development only)
1 → Calm Ocean
2 → Moderate Waves
3 → Storm
4 → Tsunami (extreme)
```

### Water Volume Query

```cpp
// Check if location is in water
bool InWater = OceanologyManager->IsInWaterVolume(Location);
float Depth = OceanologyManager->GetWaterDepth(Location);
```

### Network Optimization

```cpp
// Only sync essential data
Deterministic: true
SyncPrecision: Low (for large games)
LocalSimulation: true (clients simulate visuals)
```

---

## 📚 Where to Learn More

- **Full API Reference:** Check the plugin's `Documentation/` folder
- **Example Blueprints:** `Plugins/Oceanology/Examples/`
- **Discord Community:** Share discoveries in #tips-tricks

---

## 🤝 Share Your Discoveries!

Found a hidden feature we didn't cover? Share it in our [Discord](https://discord.gg/VHJGBDR2as)!

The community frequently discovers creative uses we never anticipated. Your tip might end up in a future roadmap post!

Happy exploring! 🔍
