---
title: Caustics
sidebar_label: Caustics
---

# Oceanology NextGen - Caustics

<div className="doc-badge doc-badge-violet">💡 Light Projection</div>
<div className="doc-badge doc-badge-cyan">🎨 Ground Effects</div>
<div className="doc-badge doc-badge-emerald">🔧 Modular</div>

Add realistic caustic light patterns projected onto terrain and objects beneath the water surface.

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Engine** | UE5.x (latest release) |
| **Plugin** | Oceanology NextGen installed and configured |
| **Scene** | Water body (Infinite Ocean or Lake) + Directional Light |
| **Skills** | Basic familiarity with lighting and materials |

:::info Two Caustics Systems
Oceanology has two separate caustics systems depending on the water body type:
- **Infinite Ocean** uses **Light Functions** projected through the Directional Light via the **Oceanology Light Source Controller** actor.
- **Lake** uses a built-in **Decal Component** that projects caustics directly onto geometry below the water.

Both systems are controlled from the **Caustics** category on the water actor, but the Infinite Ocean requires an additional actor to be placed in your scene.
:::

---

## Infinite Ocean - Light Function Caustics

For the Infinite Ocean, ground caustics are projected through your scene's Directional Light using a Light Function material. This approach is efficient for infinite worlds since it doesn't require a physical decal volume.

:::note 1. Place the Oceanology Light Source Controller
Open your level and use the **Quickly Add to the Project** menu (the `+` button in the toolbar). Search for `Oceanology Light Source Controller` and drag it into your scene.

This actor is **required** for ground caustics to work with the Infinite Ocean. Without it, enabling caustics on the water actor will have no visible effect on the ground.

![Placing Light Source Controller](NextGenCaustics/NextGenCaustics_01.png)
:::

:::note 2. Configure the Light Source Controller
Select the **OceanologyLightSourceController** in your level. In the **Details** panel, configure the **Settings** category:

| Parameter | Description |
|-----------|-------------|
| **Oceanology Water** | Reference to your water body (e.g., `OceanologyInfiniteOcean`). The controller reads caustic parameters from this actor. |
| **Directional Light** | Reference to the Directional Light in your scene. The controller assigns the caustics Light Function material to this light. |
| **Light Function Materials** | Array of light function materials to apply. By default, the plugin provides Directional Light and Point Light caustics materials. |

The controller automatically:
1. Creates a Dynamic Material Instance from the Light Function material
2. Passes all water parameters (wave data, caustics settings) to the material
3. Assigns the material as the Light Function on the Directional Light

![Light Source Controller settings](NextGenCaustics/NextGenCaustics_02.png)
:::

:::note 3. Configure Caustics parameters on the water actor
Select the **OceanologyInfiniteOcean** actor. In the **Details** panel, expand the **Caustics** category:

**Toggle:**
- **EnableCausticsOnGround** - `✅ Enabled`. Master toggle for the ground caustics system.

**Ground Caustics Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| **DarknessExposure** | `2.5` | Controls how strongly caustics are visible. Higher values make caustics brighter and more defined. |
| **MaximumDarkness** | `-4000.0` | Maximum depth at which caustics are still visible. Beyond this depth, caustics fade out completely. |
| **MinimumDarkness** | `-10.0` | Depth at which caustics begin to appear. Adjusts the shallow water threshold. |
| **WetAlpha** | `10.0` | Alpha intensity for the wet surface effect around caustics. |

**Surface Caustics Parameters (under Surface > Caustics):**

| Parameter | Default | Description |
|-----------|---------|-------------|
| **FadeDistance** | `1.0` | Distance over which surface caustics fade out. |
| **MultiplyRefraction** | `1.333` | Multiplier for caustic refraction intensity on the water surface. |

![Water actor Caustics settings](NextGenCaustics/NextGenCaustics_03.png)
:::

:::warning Common Issue: No Caustics Visible
If you enable caustics on the water actor but see no effect on the ground, the most likely cause is a missing **Oceanology Light Source Controller** in your scene. The Infinite Ocean does not project caustics on its own. You must place the controller and link it to both the water body and your Directional Light.
:::

---

## Lake - Decal Caustics

Lakes have a built-in `CausticsComponent` (Decal) that projects caustics directly onto geometry beneath the water. No additional actor is needed.

:::note Configure Lake Caustics
Select your **OceanologyLake** actor. In the **Details** panel, find the **Caustics** category:

1. Ensure **EnableCausticsOnGround** is checked.
2. Adjust the **GroundCaustics** parameters (DarknessExposure, MaximumDarkness, MinimumDarkness, WetAlpha) to your liking.

The Lake actor automatically:
- Creates a Decal Component positioned below the water surface
- Loads the default caustics material (`M_Caustics_Decal_Inst`)
- Creates a Dynamic Material Instance and applies your parameters
- Projects caustics onto any geometry within the decal volume

**Decal Coverage:**
The default decal scale covers a `30x30` area relative to the lake mesh. For larger lakes, you may need to increase the scale of the `CausticsComponent` in the Details panel under the component hierarchy.

![Lake caustics decal](NextGenCaustics/NextGenCaustics_04.png)
:::

---

## Light Function Materials

The plugin provides three caustics materials for different lighting scenarios:

| Material | Location | Purpose |
|----------|----------|---------|
| **M_Caustics_Decal_Inst** | `Materials/Decal/CausticsDL/` | Ground projection for Lakes (Decal) |
| **M_CausticsDireccional_LightInst** | `Materials/LightFunction/CausticsDL/` | Directional Light caustics (Infinite Ocean) |
| **M_CausticsPointLight_Inst** | `Materials/LightFunction/CausticsPL/` | Point Light caustics (local lights underwater) |

### Material Functions

| Function | Purpose |
|----------|---------|
| **MF_CausticFrames** | Controls flipbook animation timing for caustic patterns |
| **MF_OceanCaustics_SubUVAnimation** | Sub-UV animation for caustic texture playback |
| **MF_Oceanology_CausticsDirectionalLight** | Core caustics calculation for directional light projection |

---

## Presets

Caustics settings can be saved and loaded via **Data Asset presets**:

1. In the Content Browser, right-click and select **Miscellaneous > Data Asset**
2. Choose **OceanologyWaterCausticsPreset**
3. Configure the preset with your desired Caustics, EnableCausticsOnGround, and GroundCaustics values
4. Apply the preset to any water actor at runtime or in the editor

An example preset is available at: `Plugins > Oceanology NextGen > Presets > Grouped > Caustics > DA_Caustics_Example`

---

## Parameter Reference

### Ground Caustics

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **DarknessExposure** | `0.5` - `10.0` | `2.5` | Caustic brightness and definition |
| **MaximumDarkness** | `-10000.0` - `0.0` | `-4000.0` | Maximum depth for caustics visibility |
| **MinimumDarkness** | `-100.0` - `0.0` | `-10.0` | Shallow water caustics threshold |
| **WetAlpha** | `0.0` - `50.0` | `10.0` | Wet surface alpha intensity |

### Surface Caustics

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **FadeDistance** | `0.1` - `10.0` | `1.0` | Caustics fade distance |
| **MultiplyRefraction** | `0.5` - `3.0` | `1.333` | Refraction intensity multiplier |

---

## Configuration Guidelines

| Scenario | Key Settings |
|----------|-------------|
| **Bright tropical shallows** | DarknessExposure: `4.0`, MinimumDarkness: `-5.0`, WetAlpha: `15.0` |
| **Deep ocean subtle** | DarknessExposure: `1.5`, MaximumDarkness: `-2000.0` |
| **Indoor pool** | DarknessExposure: `3.0`, MaximumDarkness: `-500.0`, MinimumDarkness: `-2.0` |
| **Disable ground caustics** | EnableCausticsOnGround: `☐` Disabled |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| No caustics on ground (Infinite Ocean) | Missing Light Source Controller | Place **Oceanology Light Source Controller** and link it to water + Directional Light |
| No caustics on ground (Lake) | EnableCausticsOnGround disabled | Check the **EnableCausticsOnGround** toggle on the Lake actor |
| Caustics too faint | DarknessExposure too low | Increase **DarknessExposure** value |
| Caustics visible at wrong depth | MinimumDarkness/MaximumDarkness range | Adjust depth range to match your scene |
| Caustics flicker | Light Function conflict | Ensure only one Light Source Controller references the same Directional Light |
| Caustics don't animate | Material not properly assigned | Verify the Light Source Controller has the correct material references |
| Caustics appear on wrong surfaces | Decal scale too large (Lake) | Reduce the CausticsComponent scale |

---

## Summary

In this guide, you learned how to:

1. **Understand the two caustics systems** - Light Functions for Infinite Ocean and Decals for Lakes.
2. **Place the Light Source Controller** - Required actor for Infinite Ocean ground caustics.
3. **Configure caustics parameters** - DarknessExposure, depth range, and wet alpha for realistic light patterns.
4. **Set up Lake caustics** - Built-in decal system with automatic configuration.
5. **Use caustics materials** - Directional Light, Point Light, and Decal material options.
6. **Save presets** - Store and share caustics configurations across levels.

With caustics properly configured, your water environments will display realistic light patterns on the terrain and objects beneath the surface, adding significant visual depth to both ocean and lake scenes.
