---
slug: nextgen-2-buoyancy-river-forces
title: "⚓ Advanced Buoyancy & River Physics in NextGen 2.0"
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
tags: [nextgen, buoyancy, physics, rivers, boats, 2.0]
image: /img/landing/oceanology-nextgen.png
---

# Advanced Buoyancy & River Physics

NextGen 2.0 introduces a completely overhauled buoyancy system with **async physics**, **river-specific forces**, and **downstream rotation**. Perfect for boats, debris, characters, and any floating objects.

<!--truncate-->

## 🎯 What's New in Buoyancy?

| Feature | NextGen 1.x | NextGen 2.0 |
|---------|-------------|-------------|
| Physics Thread | Game thread | **Async physics thread** |
| River Forces | Basic | **Full current simulation** |
| Shore Push | None | **Configurable push/pull** |
| Downstream Rotation | None | **Spring-based alignment** |
| Drag Forces | Limited | **Velocity-based drag** |
| Pontoon Data | Basic | **Full water velocity & normal** |

## ⚓ Pontoon System

Buoyancy is calculated at **pontoon points** - spheres that sample water data:

```cpp
struct FOceanologySphericalPontoon
{
    // Configuration
    FName CenterSocket;        // Attach to skeleton socket
    FVector RelativeLocation;  // Or use relative position
    float Radius;              // Sphere radius
    bool bFXEnabled;           // Enable splash FX
    
    // Runtime - automatically populated
    FVector CenterLocation;    // World position
    FQuat SocketRotation;      // Current rotation
    float WaterHeight;         // Surface Z at pontoon
    float WaterDepth;          // Depth below surface
    float ImmersionDepth;      // How deep pontoon is
    FVector WaterPlaneNormal;  // Surface normal
    FVector WaterVelocity;     // Current at this point
    FVector WaterSurfacePosition;
    bool bIsInWater;           // Submerged state
};
```

### Setting Up Pontoons

For a boat, place pontoons at key buoyancy points:

```cpp
// Bow pontoon
Pontoon_Bow.CenterSocket = "BowSocket";
Pontoon_Bow.Radius = 150.0f;

// Stern pontoons (port/starboard)
Pontoon_SternPort.RelativeLocation = FVector(-200, -100, 0);
Pontoon_SternPort.Radius = 120.0f;

Pontoon_SternStarboard.RelativeLocation = FVector(-200, 100, 0);
Pontoon_SternStarboard.Radius = 120.0f;
```

## 🌊 Core Buoyancy Parameters

```cpp
struct FOceanologyBuoyancyData
{
    // Pontoon configuration
    TArray<FOceanologySphericalPontoon> Pontoons;
    bool bCenterPontoonsOnCOM = true;
    
    // Buoyancy force
    float BuoyancyCoefficient = 0.1f;    // Force multiplier
    float MaxBuoyantForce = 5000000.0f;  // Force cap
    
    // Damping (prevents oscillation)
    float BuoyancyDamp = 1000.0f;        // Linear damping
    float BuoyancyDamp2 = 1.0f;          // Quadratic damping
    
    // Velocity ramping (smoother entry)
    float BuoyancyRampMinVelocity = 20.0f;
    float BuoyancyRampMaxVelocity = 50.0f;
    float BuoyancyRampMax = 1.0f;
};
```

### Tuning Tips

**For Heavy Boats:**
```cpp
BuoyancyCoefficient = 0.15f;
BuoyancyDamp = 2000.0f;
MaxBuoyantForce = 10000000.0f;
```

**For Light Debris:**
```cpp
BuoyancyCoefficient = 0.05f;
BuoyancyDamp = 500.0f;
MaxBuoyantForce = 100000.0f;
```

**For Characters:**
```cpp
BuoyancyCoefficient = 0.08f;
BuoyancyDamp = 800.0f;
BuoyancyRampMax = 0.5f;  // Gentler entry
```

## 💧 Drag Forces

New in 2.0: **velocity-based drag** for realistic water resistance:

```cpp
// Enable drag
bool bApplyDragForcesInWater = true;

// Drag coefficients
float DragCoefficient = 1.0f;         // Linear drag
float DragCoefficient2 = 1.0f;        // Quadratic drag
float AngularDragCoefficient = 1.0f;  // Rotation damping
float MaxDragSpeed = 15.0f;           // Speed cap for drag
```

Drag formula: `F = -v * (Drag + Drag2 * |v|)`

## 🏞️ River Forces

The biggest addition: **river-specific physics**!

```cpp
// Enable river forces
bool bApplyRiverForces = true;
int RiverPontoonIndex = 0;  // Which pontoon samples river

// Shore push (positive = push to shore, negative = center)
float WaterShorePushFactor = 0.3f;
float MaxShorePushForce = 300.0f;

// Traversal path
float RiverTraversalPathWidth = 300.0f;  // Center channel width

// Current strength
float WaterVelocityStrength = 0.01f;
float MaxWaterForce = 10000.0f;

// Behavior flags
bool bAlwaysAllowLateralPush = false;
bool bAllowCurrentWhenMovingFastUpstream = false;
```

### Shore Push Explained

The shore push system keeps objects in a **navigable channel**:

```
River Cross-Section:
         
|--------|========|--------|
  Shore    Path     Shore
  Push    (center)   Push
   →                  ←

WaterShorePushFactor > 0: Push TO shore (debris)
WaterShorePushFactor < 0: Push TO center (boats)
```

### Current Integration

River velocity is sampled at the `RiverPontoonIndex` pontoon and applied as force:

```cpp
// Simplified current calculation
FVector RiverVelocity = Pontoons[RiverPontoonIndex].WaterVelocity;
FVector CurrentForce = RiverVelocity * WaterVelocityStrength * Mass;
CurrentForce = CurrentForce.GetClampedToMaxSize(MaxWaterForce);
```

## 🔄 Downstream Rotation

NEW: Objects can **automatically align with river flow**:

```cpp
bool bApplyDownstreamAngularRotation = true;

// Which axis should point downstream
FVector DownstreamAxisOfRotation = FVector::ForwardVector;

// Spring parameters
float DownstreamRotationStrength = 0.05f;
float DownstreamRotationStiffness = 20.0f;
float DownstreamRotationAngularDamping = 5.0f;
float DownstreamMaxAcceleration = 10.0f;
```

### How It Works

1. Get river flow direction at pontoon
2. Calculate angle between object's axis and flow
3. Apply spring torque to align
4. Damping prevents oscillation

Perfect for logs, kayaks, and passive floating objects!

## ⚡ Async Physics

Buoyancy now runs on the **physics thread**:

```cpp
enum EAsyncOceanologyBuoyancyComponentDataType
{
    AsyncBuoyancyInvalid,
    AsyncBuoyancyBase,      // Standard objects
    AsyncBuoyancyVehicle,   // Player vehicles
    AsyncBuoyancyBoat       // Full boat simulation
};
```

### Benefits:
- **No game thread stalls**
- **Consistent physics tick rate**
- **Better multiplayer sync**
- **Higher pontoon counts**

### Data Flow:

```
Game Thread                    Physics Thread
     │                              │
     │ FOceanologyBuoyancyManagerAsyncInput
     ├────────────────────────────────→
     │                              │
     │                         PreSimulate()
     │                              │
     │ FOceanologyBuoyancyManagerAsyncOutput
     ←────────────────────────────────┤
     │                              │
  Apply Results                     │
```

## 🎮 Blueprint Integration

### Events

```cpp
UENUM()
enum class EOceanologyBuoyancyEvent : uint8
{
    EnteredWaterBody,
    ExitedWaterBody
};
```

### Per-Pontoon Data

Access pontoon state in Blueprints:

```
Get Pontoon Data
├── Is In Water (bool)
├── Water Height (float)
├── Water Depth (float)
├── Immersion Depth (float)
├── Water Velocity (Vector)
├── Water Normal (Vector)
└── Current Water Body (reference)
```

## 📊 Performance

With async physics, buoyancy is essentially "free":

| Pontoons | 1.x (GT ms) | 2.0 (GT ms) |
|----------|-------------|-------------|
| 4 | 0.15 | 0.02 |
| 8 | 0.28 | 0.03 |
| 16 | 0.55 | 0.04 |
| 32 | 1.10 | 0.05 |

Game thread cost is now just data transfer, not calculation.

## 🚤 Complete Boat Setup

Here's a full configuration for a medium boat:

```cpp
FOceanologyBuoyancyData BoatBuoyancy;

// 5 pontoons: bow, stern port/starboard, mid port/starboard
BoatBuoyancy.Pontoons.SetNum(5);
BoatBuoyancy.Pontoons[0] = {TEXT("Bow"), FVector(300,0,0), 150.f};
BoatBuoyancy.Pontoons[1] = {TEXT("SternPort"), FVector(-250,-100,0), 120.f};
BoatBuoyancy.Pontoons[2] = {TEXT("SternStarboard"), FVector(-250,100,0), 120.f};
BoatBuoyancy.Pontoons[3] = {TEXT("MidPort"), FVector(0,-120,0), 100.f};
BoatBuoyancy.Pontoons[4] = {TEXT("MidStarboard"), FVector(0,120,0), 100.f};

// Buoyancy
BoatBuoyancy.BuoyancyCoefficient = 0.12f;
BoatBuoyancy.BuoyancyDamp = 1500.f;
BoatBuoyancy.BuoyancyDamp2 = 2.0f;
BoatBuoyancy.MaxBuoyantForce = 8000000.f;

// Drag
BoatBuoyancy.bApplyDragForcesInWater = true;
BoatBuoyancy.DragCoefficient = 1.5f;
BoatBuoyancy.AngularDragCoefficient = 2.0f;

// Rivers
BoatBuoyancy.bApplyRiverForces = true;
BoatBuoyancy.WaterShorePushFactor = -0.5f;  // Push to center
BoatBuoyancy.RiverTraversalPathWidth = 400.f;
BoatBuoyancy.WaterVelocityStrength = 0.005f;

// No auto-rotation for player boat
BoatBuoyancy.bApplyDownstreamAngularRotation = false;
```

## 🎯 Best Practices

1. **Use sockets** for animated meshes
2. **Start with 4 pontoons** and add more if unstable
3. **Match pontoon radius** to visual hull
4. **Tune damping first** to prevent bouncing
5. **Test in rivers** with bApplyRiverForces enabled
6. **Use debug visualization** (CVarOceanologyDebugBuoyancy)

---

*Need help with buoyancy? Join [Discord](https://discord.gg/s9TSBBX3Rh) #physics channel!*
