---
title: Buoyancy
sidebar_label: Buoyancy
---

# Oceanology Legacy — Buoyancy

_Last updated: 2025-10-17_

Oceanology Legacy supports floating props, boats, and characters. Use Unreal Engine’s **Water Buoyancy Component** for fast, reliable results, or your own physics if you need bespoke control. See the official UE docs for the component and Water System overview. 

:::info References
- Water System overview (UE 5.6) — *Water Body Actors, Single Layer Water, Buoyancy*  
  https://dev.epicgames.com/documentation/en-us/unreal-engine/water-system-in-unreal-engine
- Water Buoyancy Component — *step-by-step Blueprint setup*  
  https://dev.epicgames.com/documentation/en-us/unreal-engine/water-buoyancy-component-in-unreal-engine
:::

## Requirements
- Unreal Engine 5.6 or newer.
- **Water** plugin enabled. Restart after enabling.
- A **Water Body** in the level (Ocean, Lake, or River).

## Approach A — UE Water Buoyancy Component (recommended)
1. **Enable Water plugin**: *Edit → Plugins → Water* → Enable → Restart.  
2. **Add a water body**: Place **WaterBodyOcean**, **WaterBodyLake**, or **WaterBodyRiver** in the level. A **WaterZone** volume is added automatically.
3. **Create a floating Actor**: Make a Blueprint Actor with a **Static Mesh** set to **Simulate Physics**. Add **Water Buoyancy Component**.
4. **Configure Buoyancy**: Author a few **Buoyancy Data** points along the hull or object base. Start simple: center + bow + stern. Tune **Density**, **Linear/Angular Damping**, and **Mass**.
5. **Test**: PIE and nudge values until the object rests at a believable waterline. Use a lower **Wave Amplitude** when debugging.

:::tip Tuning checklist
- Increase **Angular Damping** if the object rolls excessively.  
- Lower **Density** or raise **Buoyancy Coefficients** if it sinks.  
- Verify the static mesh **Collision** is set to block/overlap water as intended.  
- Keep the object’s **Center of Mass** slightly below the waterline for stability.
:::

## Approach B — Custom forces (advanced)
If you implement custom buoyancy, sample the water height at multiple points and apply **Add Force (world)** and **Add Torque** proportional to submersion. Use COM offsets and per‑point springs for stability.

:::note Plugin‑specific notes
- **Oceanology Legacy** demo maps include water surfaces suitable for buoyancy testing.  
- If a **Buoyancy Volume** or **Displacement Physics Volume** is provided in this plugin, prefer it for tighter integration. Otherwise use UE’s Water Buoyancy Component.
:::

## Troubleshooting
- **It sinks to the bottom**: In UE 5.1/5.2 some projects lacked the right water collision profile. Re‑create the water body or fix collision channels.  
  https://www.versluis.com/2023/05/making-things-float-on-water-in-unreal-engine-5-1-and-5-2/
- **Boat won’t steer**: Use forces at offset or apply local‑space input to a physics‑enabled pawn.  
  https://forums.unrealengine.com/t/how-do-i-make-a-physics-object-controllable-buoyancy-boat-on-water/264825
- **General setup**: Follow the official **Buoyancy Component** guide step‑by‑step.  
  https://dev.epicgames.com/documentation/en-us/unreal-engine/water-buoyancy-component-in-unreal-engine
