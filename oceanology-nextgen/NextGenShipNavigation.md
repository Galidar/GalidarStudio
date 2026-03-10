---
title: Ship Navigation
sidebar_label: Ship Navigation
---

# Oceanology NextGen - Ship Navigation

<div className="doc-badge doc-badge-violet">🚢 C++ Physics</div>
<div className="doc-badge doc-badge-cyan">🛤️ Spline Flow</div>
<div className="doc-badge doc-badge-emerald">🎮 Force-Based</div>

Configure ship movement with spline-based flow currents, force-based propulsion, and the ready-to-use BattleShip C++ actors.

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Engine** | UE5.x (latest release) |
| **Plugin** | Oceanology NextGen v1.3.0+ |
| **Scene** | Water body with Oceanology Water Volume and buoyancy configured |
| **Skills** | Basic familiarity with Blueprints, Physics, and Splines |

:::info About Ship Navigation
Starting in v1.3.0, Oceanology includes a **complete C++ ship navigation system** with two flow modes, a spline-based FlowController actor, and ready-to-use BattleShip actors. The system is fully multiplayer-aware with server-authoritative physics.
:::

---

## Architecture Overview

The ship navigation system consists of three layers:

```
FlowController (Actor)
    ↓  Assigns spline to tagged actors
OceanBuoyancyComponent (Flow System)
    ↓  Applies forces based on spline position
Physics Engine (UE5 Chaos)
    ↓  Integrates forces with buoyancy
Visual Result: Natural ship movement along currents
```

---

## FlowController Actor

The `OceanologyFlowController` is a C++ actor that defines water currents using a spline component. It automatically assigns itself to all actors with a matching tag.

:::note 1. Place a FlowController in your level
Use the **Quick Add** menu and search for `OceanologyFlowController`. Drag it into your level near your water body.

The FlowController contains a **Spline Component** that defines the flow path. Edit the spline points in the viewport to create your desired current path.

**FlowController Properties:**

| Property | Default | Description |
|----------|---------|-------------|
| **Actor Tag Filter** | `ExampleShip` | Only actors with this tag receive flow forces. Change this to match your vessel's tag. |
| **Flow Control Speed** | `500.0` | Speed of the current in cm/s. Higher values push vessels faster. |
| **Unscaled Spline Width** | `1000.0` | Width of the current channel in cm. Vessels outside this width are less affected. |

**How Assignment Works:**
1. On BeginPlay, the FlowController waits 1 second for actors to initialize.
2. It searches for all actors with the matching **Actor Tag Filter**.
3. For each matching actor, it finds their `OceanBuoyancyComponent`.
4. It calls `SetFlowControlSpline()` to assign the spline, speed, and width.

:::tip
Add the tag to your vessel actor in the **Details → Actor → Tags** array. The tag must match the FlowController's **Actor Tag Filter** exactly.
:::
:::

:::note 2. Edit the spline path
Select the FlowController and enter spline editing mode. Add, move, and adjust spline points to create the desired navigation path.

**Spline Editing Tips:**
- **Add points** by Alt+clicking on the spline.
- **Curve the path** by adjusting tangent handles.
- **Close the loop** by connecting the last point near the first for circular routes.
- **Width visualization** scales with the FlowController actor's X scale in editor.

**Spline Design Guidelines:**

| Guideline | Reason |
|-----------|--------|
| Avoid sharp 90° turns | Ships need space to turn — use wide curves |
| Keep spline above water surface | The Z position is used for direction only, not height |
| Match width to vessel size | Width should be at least 2× the vessel length for comfortable navigation |
| Use gentle curves for large ships | Large vessels need longer turning radius |
:::

---

## Flow Modes

The OceanBuoyancyComponent supports two distinct flow modes that control how vessels respond to spline currents.

:::note 3. Choose a flow mode
In the OceanBuoyancy component, locate the **Flow** category. The **Flow Mode** property determines the physics behavior:

| Mode | Best For | Behavior |
|------|----------|----------|
| **Force (Legacy)** | Simple currents, rivers, environmental drift | Applies a directional force push. Ship slides along the current. |
| **Navigation (Natural)** | Controlled ship movement, patrol routes, cinematic paths | Three-phase system: steering, propulsion, and lateral drag. Ship turns into curves naturally. |

:::

### Force Mode (Legacy)

Force mode applies a simple directional push based on the spline direction at the vessel's position.

:::note 4. Configure Force mode
Set **Flow Mode** to `Force (Legacy)` for simple current-based movement.

**Force Mode Properties:**

| Property | Default | Range | Description |
|----------|---------|-------|-------------|
| **Angle Adjusted Force Strength** | `35.0` | 0-200 | Strength of the directional push |
| **Flow Mass Norm** | `1000.0` | 100-100000 | Reference mass for scaling. A 1000kg ship gets base force; heavier ships get proportionally more. |
| **Orient Mesh Rotation Yaw** | `☐` | Boolean | When enabled, gradually rotates the vessel to face the flow direction. |

**How Force Mode Works:**
1. Finds the vessel's position on the spline.
2. Calculates the flow direction at that point.
3. Computes an angle-adjusted force based on the vessel's offset from the spline center.
4. Applies `AddForceAtLocation()` scaled by mass: `Force × Strength × (BodyMass / FlowMassNorm)`.

**Mass Scaling:**
Force mode scales forces proportionally to vessel mass:
- 1,000 kg vessel → 1× force (base)
- 10,000 kg vessel → 10× force
- 100,000 kg vessel → 100× force

This ensures vessels of any size respond naturally to the same current.
:::

### Navigation Mode (Natural)

Navigation mode provides realistic ship-like movement with three-phase control: steering, propulsion, and lateral drag.

:::note 5. Configure Navigation mode
Set **Flow Mode** to `Navigation (Natural)` for natural ship-like movement.

**Navigation Mode Properties:**

| Property | Default | Range | Description |
|----------|---------|-------|-------------|
| **Flow Max Speed** | `2000.0` | 100-10000 | Maximum speed in cm/s. Ships won't exceed this speed. |
| **Flow Acceleration Smoothing** | `3.0` | 0.5-10 | Propulsion responsiveness. Higher = faster speed changes. |
| **Flow Turn Rate** | `45.0` | 5-120 | Maximum turn rate in degrees/second. |
| **Flow Steering Smoothing** | `4.0` | 0.5-10 | Steering responsiveness. Higher = snappier turns. |
| **Flow Lateral Drag Coeff** | `3.0` | 0-10 | Sideslip resistance. Higher = less sideways sliding during turns. |

:::

:::note 6. Understand the three-phase control system
Navigation mode uses a three-phase control system that mimics real ship handling:

**Phase 1 — Steering (Yaw Control via Torque):**
- Calculates yaw error between the ship's forward direction and a **look-ahead point** on the spline.
- The look-ahead distance is speed-dependent: `Speed × 1.5 seconds` (minimum 500cm).
- Applies `AddTorqueInDegrees()` to rotate the ship naturally.
- Speed-dependent turn rate: faster ships turn more gently.

**Phase 2 — Propulsion (Forward Force):**
- Uses a proportional controller: `Force = Mass × VelocityError × AccelerationSmoothing`.
- Only applies force in the horizontal plane (buoyancy controls vertical).
- Alignment factor: reduces speed during sharp turns to prevent overshooting.

**Phase 3 — Lateral Drag (Sideslip Prevention):**
- Applies a counter-force against sideways velocity.
- Formula: `-RightDirection × LateralSpeed × LateralDragCoeff × Mass`.
- Prevents the ship from skidding sideways during turns.

**Why AddTorque Instead of SetAngularVelocity?**
Navigation mode uses `AddTorqueInDegrees()` because it lets the physics solver integrate torque through the buoyancy pontoons. This prevents capsizing — direct angular velocity would bypass buoyancy's roll stabilization.

**Why Look-Ahead?**
Ships look ahead by `Speed × 1.5s` (minimum 500cm) on the spline. This mimics a helmsman reading ahead — the ship starts turning BEFORE reaching a curve, producing natural cornering behavior.
:::

### Flow Mode Comparison

| Aspect | Force (Legacy) | Navigation (Natural) |
|--------|---------------|---------------------|
| **Physics** | `AddForceAtLocation` | `AddTorqueInDegrees` + `AddForce` |
| **Turning** | Optional yaw orientation | Speed-dependent look-ahead steering |
| **Sideslip** | None | Lateral drag coefficient |
| **Speed Control** | None (force determines speed) | Velocity-capped with smooth acceleration |
| **Best Use** | River currents, ambient drift | Ship patrols, cinematic routes, gameplay navigation |
| **Complexity** | Simple, 1 parameter | Rich, 5 parameters for fine-tuning |

---

## BattleShip C++ Actors

Oceanology v1.3.0 includes ready-to-use C++ ship actors that demonstrate the complete navigation pipeline.

:::note 7. Available BattleShip classes
The plugin provides several BattleShip variants as C++ actors:

| Class | Description |
|-------|-------------|
| **OceanologyBattleShipPawn** | Full-featured Pawn with camera, input, and player control. Use for player-driven ships. |
| **OceanologyBattleShipBase** | Non-pawn base class with buoyancy. Use for AI or flow-driven ships. |
| **OceanologyBattleShipBox** | Box collision variant for simple physics. |
| **OceanologyBattleShipCustom** | Custom collision variant for accurate hull physics. |
| **OceanologyBattleShipGameMode** | Game mode for battle ship scenarios. |

**BattleShipPawn Component Hierarchy:**
```
OceanologyBattleShipPawn (Self)
├── CustomCollision         ← Root: invisible physics body (5000 kg)
│   └── VisualSmoothRoot    ← Smoothing parent for client interpolation
│       ├── ShipMesh         ← Main hull visual
│       ├── RopesMesh        ← Rope details
│       ├── RudderMesh       ← Rudder visual
│       ├── SkeletalShipMesh ← Animated skeletal mesh
│       └── MaskingObjects   ← Underwater masking
├── ShipCameraBoom           ← Spring arm for camera
│   └── ShipCamera           ← Player camera
├── OceanBuoyancy            ← Buoyancy + flow physics
└── InteractionVolume        ← Box trigger at helm position
```
:::

:::note 8. Player-controlled navigation
The BattleShipPawn supports direct player input for ship control:

**Input Controls:**

| Input | Action | Physics |
|-------|--------|---------|
| **W / S** | Forward / Reverse | `SetPhysicsLinearVelocity()` with smooth interpolation |
| **A / D** | Rudder left / right | `SetPhysicsAngularVelocityInDegrees()` speed-dependent |

**Navigation Properties:**

| Property | Default | Description |
|----------|---------|-------------|
| **Max Speed** | `3500.0` cm/s | Maximum forward/reverse speed |
| **Max Turn Rate** | `60.0` deg/s | Maximum rudder turn rate |
| **Acceleration Smoothing** | `3.0` | Speed ramp responsiveness |

**Speed-Dependent Steering:**
Turn rate scales with current speed — faster ships turn more gently, stationary ships don't turn at all. This prevents unrealistic spinning in place.

**Lateral Drag:**
An automatic lateral drag force prevents sideways sliding during turns, keeping the ship's movement aligned with its forward direction.
:::

---

## AutoConfigureBuoyancy

The BattleShipPawn includes automatic buoyancy configuration that analyzes the physics body and sets optimal pontoon positions.

:::note 9. How AutoConfigureBuoyancy works
When `bAutoConfigureBuoyancy` is enabled (default), the ship automatically configures itself on BeginPlay:

**Pontoon Layout (6 points):**

| Position | Count | Density | Purpose |
|----------|-------|---------|---------|
| Bow | 2 | 250 | Front stability, wave riding |
| Midship | 2 | 360 | Primary flotation |
| Stern | 2 | 300 | Rear stability, prevents nose-diving |

**Mass-Proportional Tuning:**
All damping values scale with vessel mass:
- **Linear Damping:** `Clamp(MassFactor × 0.25, 0.5, 1.5)`
- **Angular Damping:** `Clamp(MassFactor × 0.8, 1.0, 3.0)`
- **Default Mesh Density:** 620 kg/m³
- **Water Fluid Density:** 1030 kg/m³

This means a 5,000 kg ship and a 50,000 kg ship both float naturally without manual parameter adjustment.
:::

---

## Multiplayer Support

All ship navigation features are fully multiplayer-aware.

| Feature | Server | Client |
|---------|--------|--------|
| **Flow Forces** | ✅ Calculated and applied | ❌ Not applied (server-authoritative) |
| **Spline Assignment** | ✅ Assigned via FlowController | ✅ Replicated via push-based networking |
| **Player Input** | ✅ Received via Server RPC | ✅ Sent to server |
| **Position** | ✅ Authoritative | ✅ PredictiveInterpolation (smooth) |
| **Visual Smoothing** | ❌ Not needed | ✅ VisualSmoothRoot with frame interpolation |

Flow properties (`FlowControlSpline`, `FlowControlSpeed`, `UnscaledSplineWidth`) are replicated with push-based networking. Changes on the server automatically propagate to all clients.

---

## Preset Configurations

| Vessel Type | Flow Mode | Max Speed | Turn Rate | Accel. Smoothing | Lateral Drag | Notes |
|-------------|-----------|-----------|-----------|------------------|--------------|-------|
| **Patrol Boat** | Navigation | 2000 | 60 | 4.0 | 3.0 | Fast, agile, tight turns |
| **Cargo Ship** | Navigation | 800 | 15 | 1.5 | 5.0 | Slow, wide turns, stable |
| **Fishing Boat** | Force | - | - | - | - | Drifts with current |
| **Battleship** | Navigation | 3500 | 45 | 3.0 | 3.0 | Balanced power and handling |
| **River Raft** | Force | - | - | - | - | Pushed by river flow |
| **Cinematic Ship** | Navigation | 1500 | 30 | 2.0 | 4.0 | Smooth, predictable path |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| Ship doesn't follow spline | Tag mismatch | Ensure vessel actor has the tag matching FlowController's **Actor Tag Filter** |
| Ship overshoots curves | Turn rate too low or speed too high | Increase **Flow Turn Rate** or reduce **Flow Max Speed** |
| Ship slides sideways in turns | Low lateral drag | Increase **Flow Lateral Drag Coeff** (3-5 recommended) |
| Ship capsizes during turns | Using SetAngularVelocity instead of Torque | Ensure **Flow Mode** is set to `Navigation` which uses AddTorque |
| Flow forces feel weak | Mass scaling mismatch | Adjust **Flow Mass Norm** to match your vessel's mass range |
| Ship doesn't move at all | FlowController not assigned | Check Output Log for assignment messages, verify tag filter |
| Jerky movement on clients | Missing PredictiveInterpolation | Ensure **bDisableClientPhysicsSimulation** is enabled and NetUpdateFrequency ≥ 30 |
| Ship spins in place | Zero forward speed | Navigation mode prevents turning at zero speed by design |

---

## Summary

In this guide, you learned how to:

1. **Place a FlowController** - Define spline-based water currents with configurable speed and width.
2. **Edit spline paths** - Create navigation routes with curves and loops.
3. **Choose a flow mode** - Select between Force (simple push) and Navigation (natural ship handling).
4. **Configure Force mode** - Set up simple current-driven movement with mass-proportional forces.
5. **Configure Navigation mode** - Fine-tune the three-phase control system for realistic ship movement.
6. **Understand the control phases** - Steering, propulsion, and lateral drag working together.
7. **Use BattleShip actors** - Leverage ready-to-use C++ ship actors with complete navigation pipelines.
8. **Enable player control** - Configure input-driven ship movement with speed-dependent steering.
9. **Auto-configure buoyancy** - Let the system optimize pontoon layout based on vessel physics.

With these tools, you can create any ship navigation scenario from simple river currents to complex patrol routes with natural cornering behavior.
