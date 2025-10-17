---
title: Swimming
sidebar_label: Swimming
---

# Oceanology Legacy — Swimming

_Last updated: 2025-10-17_

Use Unreal’s **Character Movement Component** in **Swimming** mode for player characters, with optional buoyancy for physically reactive swim. The Water System’s **WaterZone** or **Physics Volume** marks regions as water.

:::info References
- Character Movement setup (includes **Swimming** mode)  
  https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-character-movement
- Water System overview (UE 5.6)  
  https://dev.epicgames.com/documentation/en-us/unreal-engine/water-system-in-unreal-engine
:::

## Requirements
- A **Character** using **CharacterMovementComponent**.
- **Can Swim** enabled on the movement component.
- A **Water Body** or a **Physics Volume** set to **Water** covering the swim area.

## Quick setup
1. **Enable Water plugin** and add an ocean/lake/river to your level. The associated **WaterZone** defines where swimming applies.  
2. In your Character BP, select **CharacterMovement** and enable **Can Swim**.  
3. Ensure your character **overlaps** the water volume. On overlap, the movement mode will switch to **Swimming** automatically; if not, you can set it manually with **Set Movement Mode = Swimming**.
4. Optional: Adjust **Buoyancy** and **Swim Speed** on **CharacterMovement → Swimming** to get the desired feel.

:::tip Controls and feel
- **Ascend/Descend**: map keys to **Add Movement Input** on world up/down or camera up/down.  
- **Sprint underwater**: raise **Max Swim Speed**; add stamina if needed.  
- **Camera & Post**: blend underwater fog and LUTs. Leverage this plugin’s underwater effects if included.
:::

## Plugin‑specific notes
- **Oceanology Legacy** provides water surfaces compatible with UE swim volumes. Use the plugin’s demo map to validate animations, buoyancy, and underwater effects together.
- If the plugin includes a prebuilt **Swimming System**, use it; otherwise rely on Character Movement’s **Swimming** mode.

## Troubleshooting
- **Doesn’t switch to Swimming**: verify **Can Swim** is checked and the water region is flagged as **Water**. Consider setting movement mode on **Begin Overlap**.  
- **Character bobs too much**: reduce CharacterMovement **Buoyancy** while in **Swimming** or add gentle damping.  
- **Crouch while swimming** issues: ensure logic checks the **Swimming** movement mode, not only a boolean.  
  https://forums.unrealengine.com/t/crouching-and-swimming/537896
