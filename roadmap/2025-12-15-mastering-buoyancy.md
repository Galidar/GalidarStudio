---
title: "Mastering Buoyancy: From Floating Barrels to Realistic Ships"
slug: mastering-buoyancy
date: 2025-12-15
tags:
  - tutorial
  - buoyancy
  - physics
description: "A complete guide to creating believable floating objects, from simple debris to complex vessels with proper weight distribution."
image: /img/landing/oceanology-nextgen.png
authors: [galidar]
---

Buoyancy is the magic that brings your water to life. Let's master it together.

<!-- truncate -->

## 🎯 Understanding Buoyancy

Our buoyancy system simulates how objects float using **pontoon points** — virtual spheres that push up against the water surface.

Think of it like a boat hull:
- More pontoons = more stability
- Pontoon placement = weight distribution
- Pontoon size = buoyancy force

---

## 📦 Level 1: Simple Floating Objects

Perfect for: debris, barrels, crates, logs

### Setup Steps

1. **Create your actor** (Static Mesh Actor or Blueprint)

2. **Enable physics**
   ```
   Details → Physics → Simulate Physics ✅
   Details → Physics → Mass: 100 kg
   ```

3. **Add OceanBuoyancy component**
   - Add Component → Search "OceanBuoyancy"
   - Attach to root

4. **Configure single pontoon**
   ```
   Pontoons → Add Element
   Location: (0, 0, 0)  // Center of mass
   Radius: 50           // Adjust based on object size
   ```

### Recommended Settings

| Object | Mass | Pontoon Radius |
|--------|------|----------------|
| Barrel | 50-100 kg | 40-60 |
| Crate | 100-200 kg | 50-80 |
| Log | 80-150 kg | 30-50 |
| Beach ball | 0.5 kg | 20 |

:::tip Quick Test
Drop your object into water from above. It should:
- Bob up and down naturally
- Settle at a stable water line
- React to waves
:::

---

## 🚤 Level 2: Small Boats & Kayaks

For stable small vessels, use **5 pontoons** in a cross pattern:

### Pontoon Layout

```
    [Front]
       🔵
       
🔵    🔵    🔵
(Left) (Center) (Right)

       🔵
    [Back]
```

### Configuration

```cpp
// Front pontoon
Location: (150, 0, -20)
Radius: 60

// Left pontoon  
Location: (0, -80, -20)
Radius: 60

// Center pontoon
Location: (0, 0, -30)
Radius: 80

// Right pontoon
Location: (0, 80, -20)
Radius: 60

// Back pontoon
Location: (-150, 0, -20)
Radius: 60
```

### Physics Settings

| Setting | Small Boat |
|---------|------------|
| Mass | 500-1500 kg |
| Linear Damping | 1.0 |
| Angular Damping | 2.0 |
| Center of Mass Z | -50 |

:::warning Common Mistake
Pontoons too high = boat tips easily. Place them **below** the center of mass.
:::

---

## 🚢 Level 3: Large Ships

Ships need **8-12 pontoons** for realistic behavior:

### Hull Pontoon Layout

```
      [Bow]
        🔵
     🔵   🔵
     
  🔵   🔵   🔵
  
     🔵   🔵
        🔵
      [Stern]
```

### Configuration

```cpp
// Bow (front)
(200, 0, -40), Radius: 100

// Front sides
(150, -100, -40), Radius: 80
(150, 100, -40), Radius: 80

// Middle
(0, -120, -50), Radius: 100
(0, 0, -60), Radius: 120      // Main pontoon
(0, 120, -50), Radius: 100

// Rear sides
(-150, -100, -40), Radius: 80
(-150, 100, -40), Radius: 80

// Stern (back)
(-200, 0, -40), Radius: 100
```

### Ship Physics

| Setting | Cargo Ship | Speedboat |
|---------|------------|-----------|
| Mass | 50,000 kg | 2,000 kg |
| Linear Damping | 0.5 | 0.3 |
| Angular Damping | 1.5 | 1.0 |
| Buoyancy Multiplier | 1.0 | 1.2 |

---

## ⚖️ Balancing Weight Distribution

### Problem: Ship Tips to One Side

**Solution:** Adjust pontoon radii

```cpp
// If tipping left, make right pontoons bigger
Right pontoon radius: 100 → 120
// Or make left pontoons smaller
Left pontoon radius: 100 → 80
```

### Problem: Bow Dips Down

**Solution:** Increase front buoyancy

```cpp
// Add front pontoon force
Front pontoon radius: 80 → 120
// Or reduce front weight
Move center of mass backward
```

### Problem: Too Much Rocking

**Solution:** Increase damping

```cpp
Angular Damping: 1.0 → 3.0
Linear Damping: 0.5 → 1.5
```

---

## 🌊 Wave Response

### Making Objects React to Waves

Enable wave height sampling:

```cpp
// In OceanBuoyancy component
Sample Wave Height: true
Wave Height Influence: 1.0
```

### Tuning Wave Response

| Setting | Effect |
|---------|--------|
| Wave Height Influence: 0.5 | Gentle bobbing |
| Wave Height Influence: 1.0 | Normal response |
| Wave Height Influence: 1.5 | Exaggerated |

### Storm Behavior

For dramatic storm scenes:
```cpp
Wave Height Influence: 1.5
Angular Damping: 0.5       // More rolling
Linear Damping: 0.3        // More movement
```

---

## 🏊 Character Buoyancy

For swimming characters, buoyancy works differently:

### Setup

1. Add **OceanSwimming** component (not Buoyancy)
2. Configure swimming movement
3. Optional: Add **Water Interactor Mesh** for splashes

### Settings

```cpp
// OceanSwimming component
Swimming Speed: 300
Vertical Speed: 200
Water Entry Transition: 0.5s
Swim Up Input: Spacebar
Swim Down Input: C
```

See [Swimming documentation](/oceanology-nextgen/NextGenSwimming) for full details.

---

## 🔧 Advanced: Custom Buoyancy Logic

For special requirements, extend the buoyancy system:

### Blueprint Events

| Event | Use Case |
|-------|----------|
| OnEnterWater | Play splash effect |
| OnExitWater | Stop underwater sounds |
| OnSubmerged | Trigger drowning |
| OnWaveImpact | Big wave hit effect |

### Custom Water Queries

```cpp
// Get water height at a point
float WaterHeight = OceanManager->GetWaterHeightAtLocation(Location);

// Get wave velocity
FVector WaveVelocity = OceanManager->GetWaveVelocityAtLocation(Location);

// Check if underwater
bool IsUnderwater = OceanManager->IsLocationUnderwater(Location);
```

---

## 🎮 Multiplayer Buoyancy

For networked games:

### Deterministic Mode

Enable for consistent results across clients:
```cpp
// On Ocean actor
Deterministic Waves: true
Wave Seed: 12345       // Same on all clients
```

### Replication

- Replicate **actor transform** (server authoritative)
- **Don't replicate** individual pontoon states
- Let clients simulate visuals locally

---

## ✅ Buoyancy Checklist

Before shipping, verify:

- [ ] Physics simulation enabled
- [ ] Mass is realistic
- [ ] Pontoons cover hull shape
- [ ] Center of mass is low
- [ ] Damping prevents oscillation
- [ ] Wave response feels natural
- [ ] Works in multiplayer (if applicable)
- [ ] Performance is acceptable

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Object sinks | Increase pontoon radii or count |
| Object flies away | Reduce buoyancy multiplier |
| Violent shaking | Increase damping values |
| Tips over easily | Lower center of mass |
| No wave reaction | Enable wave sampling |
| Jittery movement | Use async queries |

---

## 📚 Related Documentation

- [NextGen Buoyancy](/oceanology-nextgen/NextGenBuoyancy)
- [Legacy Buoyancy](/oceanology-legacy/Buoyancy)
- [Riverology Buoyancy](/riverology/Buoyancy) (flow forces!)
- [Swimming System](/oceanology-nextgen/NextGenSwimming)

---

## 💬 Share Your Creations!

Built something cool with our buoyancy system? Share it in our [Discord](https://discord.gg/VHJGBDR2as)! We love seeing boats, submarines, water toys, and creative uses of the physics system.

Happy floating! 🚢
