---
title: Setup
sidebar_label: Setup
---

# Riverology — Setup

_Last updated: 2025-10-16_

## Prerequisites
- Unreal Engine 5.6 or newer.
- Windows with **DirectX 12** capable GPU.
- **Shader Model 6** support recommended for advanced features.
- Optional: Mesh Distance Fields for shoreline effects.

## Notes
- Use the spline points to shape the river. Adjust flow, width, and foam per-segment if available.

## Step-by-step

:::note 1. Install the plugin
- Install from Marketplace into your Engine, or copy the plugin folder into `<Project>/Plugins/`.
- Restart the editor if you manually copied files.

![Install the plugin](setup/RiverologySetup_01.png)
:::

:::note 2. Enable the plugin
- Open **Edit → Plugins**, search for **Riverology**, enable it, and accept the restart prompt.
- After restart, confirm there are no missing dependencies in the Output Log.

![Enable the plugin](setup/RiverologySetup_02.png)
:::

:::note 3. Project Settings essentials
- **Platforms → Windows**: set **Default RHI** to **DirectX 12** and enable **D3D12 Shader Model 6**.
- **Engine → Rendering**: toggle **Generate Mesh Distance Fields** for shoreline foam and interactions.
- Optional: **Global Illumination = Lumen**, **Reflections = Lumen**, **Shadow Map Method = Virtual Shadow Maps**.

![Project Settings essentials](setup/RiverologySetup_03.png)
:::

:::note 4. Open a demo map
- In **Content Drawer → Plugins → Riverology → Maps**, open **Riverology Demo Map** to let shaders compile and verify assets.

![Open a demo map](setup/RiverologySetup_04.png)
:::

:::note 5. Place the Riverology Spline
- In **Place Actors**, drag **Riverology Spline** into the level.
- Scale/position to cover your playable area. For large worlds, prefer World Partition.

![Place the Riverology Spline](setup/RiverologySetup_05.png)
:::

:::note 6. Assign a starter Material Instance
- Use the provided material instance from the plugin content.
- Tweak wave height/length, foam thresholds, normals, and water color.

![Assign a starter Material Instance](setup/RiverologySetup_06.png)
:::

:::note 7. Interaction and effects
- Enable collision if gameplay requires it.
- Optionally add Niagara splash/foam systems and audio cues.

![Interaction and effects](setup/RiverologySetup_07.png)
:::

:::note 8. Save and test
- Save your level and **Play In Editor**.
- If performance is low: disable debug views, reduce wave layers, update GPU drivers.

![Save and test](setup/RiverologySetup_08.png)
:::

## Troubleshooting

:::warning Common issues
**Pink/preview materials**: shaders are compiling; wait.

**No shoreline foam**: enable **Generate Mesh Distance Fields** and ensure distance fields are built for landscape/meshes.

**DX12/SM6 errors**: verify Project Settings and restart the editor.

**Low performance**: disable expensive debug views, reduce wave/spectrum layers, and profile GPU.
:::