---
title: Replication & Multiplayer
sidebar_label: Replication
---

# Oceanology NextGen - Replication & Multiplayer

<div className="doc-badge doc-badge-violet">🌐 Multiplayer</div>
<div className="doc-badge doc-badge-cyan">🔄 Push-Based</div>
<div className="doc-badge doc-badge-emerald">🎮 Server Authority</div>

Configure Oceanology NextGen for multiplayer projects with server-authoritative replication for vessels, swimming, and water interactions.

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Engine** | UE5.x (latest release) |
| **Plugin** | Oceanology NextGen installed and configured |
| **Scene** | Ocean actor + Oceanology Water Volume |
| **Networking** | Basic understanding of UE5 replication (Actors, RPCs, Authority) |

:::info How Replication Works
Oceanology uses **Push-Based replication** for optimal network performance. Instead of polling all properties each frame, the system only sends data when properties actually change. This is handled via `MARK_PROPERTY_DIRTY` internally, reducing bandwidth usage significantly in large multiplayer sessions.
:::

---

## Architecture Overview

Oceanology's multiplayer architecture follows a **server-authoritative** model:

```
Client Input (Keyboard/Mouse)
    ↓
Server RPC (Client → Server)
    ↓
Server Validates & Applies Changes
    ↓
Push-Based Replication (Server → All Clients)
    ↓
OnRep Callbacks on Clients (visual updates, effects)
```

### Replicated Components

| Component | Role | Replicated Properties |
|-----------|------|----------------------|
| **OceanInteractorComponent** | Base water detection | Water reference, Volume reference, EnteredWaterVolume |
| **OceanBuoyancyComponent** | Vessel floating physics | Flow spline, flow speed, spline width, force multiplier |
| **OceanSwimmingComponent** | Character swimming | 30+ properties including swim state, controls, drowning |
| **OceanologyUnderwaterComponent** | Underwater effects | Fog, distortion, volumetric, bubbles settings |
| **OceanologyWaterParent** | Water body config | 20+ visual properties (caustics, foam, surface, etc.) |

---

## Setting Up Vessels for Multiplayer

Vessels require specific Actor settings for replication to function. Missing any of these causes the most common multiplayer issues.

:::note 1. Enable Actor Replication
Select your vessel Blueprint actor (e.g., `BP_FishingBoat_BoxCollision`). In the **Details** panel, locate the **Replication** category.

**Required Settings:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Replicates** | `✓` | **Critical.** The actor must be marked as replicated for any networking to work. |
| **Replicate Movement** | `✓` | **Critical.** Enables position and rotation synchronization across clients. |

For **StaticMeshActor** vessels, there is an additional requirement:

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Static Mesh Replicate Movement** | `✓` | **Critical for StaticMeshActors only.** Without this, movement replication is silently ignored. |

:::warning Common Pitfall
The plugin runs a `VerifySetup()` check that validates these flags. If you see warnings in the Output Log about replication, check these three settings first. This is the most frequent cause of multiplayer issues with vessels.
:::
:::

:::note 2. Configure Physics Replication
In the root component's **Physics** category, configure the network physics settings.

**Required Physics Network Settings:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Replicate Physics to Autonomous Proxy** | `✓` | Sends physics state to the owning client. Required for smooth local prediction. |

**How Physics Replication Works:**

The server runs the authoritative physics simulation. Buoyancy forces, wave sampling, and pontoon calculations all happen on the server. The resulting position, rotation, and velocity are then replicated to all clients.

Clients receive the replicated transform and interpolate smoothly between updates. This ensures all players see the same vessel position regardless of their local wave calculations.
:::

:::note 3. Verify setup with the built-in validator
The OceanBuoyancy component includes a **VerifySetup** button in the Details panel under the Buoyancy category.

Click **VerifySetup** to check for:
- ✅ Actor has `bReplicates = true`
- ✅ Actor has `bReplicateMovement = true`
- ✅ StaticMeshActors have `bStaticMeshReplicateMovement = true`
- ✅ Physics is properly configured

Any failures will appear as warnings in the **Output Log** with clear descriptions of what needs to be fixed.
:::

---

## Swimming Replication

Swimming uses a combination of **Server RPCs** and **NetMulticast RPCs** for responsive multiplayer gameplay.

### RPC Flow

```
Player presses Swim key
    ↓
Client calls Server_SwimFast(true)        [Server RPC]
    ↓
Server validates: HasAuthority() check
    ↓
Server updates: SwimFast = true
    ↓
Server marks property dirty (push-based)
    ↓
All clients receive replicated SwimFast
    ↓
Server calls NetMulticast_SwimFast()      [Visual sync]
    ↓
All clients play swim animation/effects
```

### Server RPCs (Client → Server)

These are called by the owning client to request state changes:

| RPC | Purpose |
|-----|---------|
| `Server_SurfaceLockedSwimming` | Toggle surface-locked swimming mode |
| `Server_SwimFast` | Toggle fast swimming |
| `Server_SwimUpOrDown` | Vertical swimming input |
| `Server_LookUp` | Vertical look axis |
| `Server_MoveForwardBackward` | Forward/backward movement input |
| `Server_MoveLeftRight` | Lateral movement input |

All Server RPCs are marked as **Unreliable** for performance, since swimming input is sent every frame and occasional packet loss is acceptable.

### Replicated Swimming State

These properties are automatically synchronized to all clients:

| Property | Type | Description |
|----------|------|-------------|
| **EnteredWater** | `bool` (OnRep) | Player has entered a water body |
| **Swimming** | `bool` (OnRep) | Player is actively swimming |
| **Submerged** | `bool` | Player is fully underwater |
| **WaterWalk** | `bool` (OnRep) | Player is walking on water surface |
| **SwimFast** | `bool` | Sprint swimming active |
| **UnderwaterTimeCounter** | `int32` (OnRep) | Time spent underwater (for breath system) |
| **DrowningTimeCounter** | `int32` (OnRep) | Drowning timer |
| **DrownedToDeath** | `bool` (OnRep) | Player has drowned |

Properties marked **(OnRep)** trigger callback functions on clients when they change, allowing visual effects, UI updates, and gameplay responses to stay synchronized.

---

## Buoyancy Replication

The OceanBuoyancyComponent replicates flow control properties for river and current-based movement.

### Replicated Properties

| Property | Default | Description |
|----------|---------|-------------|
| **FlowControlSpline** | `nullptr` | Spline component defining the flow path |
| **FlowControlSpeed** | `100.0` | Speed along the flow spline |
| **UnscaledSplineWidth** | `75.0` | Width of the flow influence area |
| **CharacterMovementForceMultiplier** | `1.0` | Force applied to characters in flow |

### Authority Control

All buoyancy property changes require **server authority**. Attempting to modify these from a client will be silently ignored:

```
// Internal behavior:
void SetFlowControlSpeed(float InSpeed)
{
    if (!GetOwner()->HasAuthority()) return;  // Ignored on clients

    FlowControlSpeed = InSpeed;
    // Marked dirty → pushed to all clients
}
```

This means flow control changes (river currents, water flow paths) must be driven by server-side logic, such as Blueprints running on the server or gameplay events triggered with authority.

---

## Water Body Replication

The water actor itself (`OceanologyWaterParent`) replicates 20+ visual configuration properties including:

- Surface scattering and caustics settings
- Refraction and horizon correction
- Foam and procedural settings
- RVT (Runtime Virtual Texture) configuration
- Fluid simulation and wetness parameters
- Flipbook animation settings

This ensures all clients see identical water appearance. When you change water properties at runtime through Blueprints, the changes automatically propagate to all connected clients.

---

## Important Notes

:::warning Events Are NOT Replicated
The following events fire **only on the local machine** and are NOT replicated by design:

- `OnEnteredWater` (OceanBuoyancyComponent)
- `OnExitedWater` (OceanBuoyancyComponent)

If you need to respond to these events on all clients, you must implement your own replication logic using RPCs or replicated variables in your game code.
:::

:::info Deterministic Waves
Oceanology's wave calculations are **deterministic**. Given the same time and position, all clients compute identical wave heights independently. This means the water surface itself does not need to be replicated per-frame. Each client runs the same wave math locally, ensuring visual consistency without network overhead.
:::

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| Vessel doesn't move on clients | `bReplicates` disabled | Enable **Replicates** on the actor |
| Vessel position desyncs | `bReplicateMovement` disabled | Enable **Replicate Movement** on the actor |
| StaticMesh vessel is stuck on clients | Missing static mesh flag | Enable **Static Mesh Replicate Movement** |
| Swimming doesn't sync | OceanSwimmingComponent missing | Ensure the component is attached to the character |
| Swim animations don't play on others | NetMulticast not reaching clients | Verify the character actor has **Replicates** enabled |
| Vessel jitters on clients | Physics interpolation issues | Increase **Net Update Frequency** on the actor |
| Flow control changes ignored on client | Authority check blocking | Ensure flow changes are made on the server |
| Water looks different per client | Water actor not replicating | Ensure the water actor has **Replicates** enabled |
| OnEnteredWater not firing on clients | By design (not replicated) | Implement custom RPC for cross-client notification |
| High bandwidth usage | Too many replicated actors | Reduce **Net Update Frequency** for distant vessels |

---

## Performance Tips

| Tip | Description |
|-----|-------------|
| **Net Update Frequency** | Lower this value for vessels far from gameplay action. Default is fine for player-controlled boats. |
| **Relevancy Distance** | Set **Net Cull Distance** on vessel actors to stop replicating them when too far from any player. |
| **Buoyancy Update Interval** | On clients, buoyancy calculations are cosmetic. Consider a higher update interval for non-authority vessels. |
| **Deterministic Waves** | Waves are computed locally on each client. No wave data is sent over the network. |
| **Push-Based System** | Properties only send updates when they change. Static vessels on calm water consume near-zero bandwidth. |

---

## Summary

In this guide, you learned how to:

1. **Enable actor replication** - Configure the three critical replication flags on vessel actors.
2. **Configure physics replication** - Set up physics state synchronization for smooth multiplayer.
3. **Validate setup** - Use the built-in VerifySetup tool to catch configuration errors.
4. **Understand swimming replication** - Server RPCs, NetMulticast, and replicated swim state.
5. **Configure buoyancy replication** - Flow control and authority-based property updates.
6. **Handle water body replication** - Automatic visual synchronization across clients.
7. **Troubleshoot common issues** - Diagnose and fix the most frequent multiplayer problems.

With proper replication configured, your multiplayer project will have synchronized vessels, swimming characters, and consistent water behavior across all connected clients.
