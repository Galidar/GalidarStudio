---
title: "Getting Started: Your First Ocean in 5 Minutes"
slug: getting-started-ocean
date: 2025-11-01
tags:
  - tutorial
  - beginner
  - oceanology
description: "A quick-start guide to creating your first ocean environment with Oceanology NextGen in Unreal Engine 5."
image: /img/landing/oceanology-legacy.png
authors:
  - name: Galidar
    title: Founder, Galidar Studio
    url: https://www.fab.com/sellers/galidar
    image_url: /img/logo.svg
---

New to Oceanology? This quick tutorial will have you rendering beautiful ocean water in just 5 minutes.

<!-- truncate -->

## Prerequisites

Before we start, make sure you have:

- Unreal Engine 5.3 or later
- Oceanology NextGen from the [FAB Store](https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab)
- A new or existing UE5 project

## Step 1: Enable the Plugin

1. Open your project in UE5
2. Go to **Edit → Plugins**
3. Search for "Oceanology"
4. Enable the plugin and restart

## Step 2: Add the Ocean Actor

1. Open the **Content Browser**
2. Navigate to `Oceanology/Blueprints/`
3. Drag `BP_Ocean_NextGen` into your level
4. Position it at your desired water level

## Step 3: Configure Basic Settings

Select the Ocean actor and adjust these key settings:

```
Wave Settings:
├── Wave Height: 1.5
├── Wave Speed: 0.8
└── Wave Direction: (1, 0, 0)

Visual Settings:
├── Water Color: Deep Blue
├── Foam Amount: 0.3
└── Transparency: 0.7
```

## Step 4: Add Post-Processing

For underwater effects:

1. Add a **Post Process Volume** to your level
2. Set it to **Infinite Extent**
3. The ocean will automatically handle underwater rendering

## Result

You should now see a beautiful, animated ocean surface with:

- ✅ Realistic wave motion
- ✅ Dynamic foam
- ✅ Proper lighting and reflections
- ✅ Underwater effects when submerged

:::tip Pro Tip
Use the included presets for quick configurations: Ocean, Lake, River, and Storm modes are available out of the box.
:::

## Next Steps

Now that you have a basic ocean, explore these features:

- [Buoyancy System](/oceanology-nextgen/NextGenBuoyancy) — Make objects float
- [Swimming](/oceanology-nextgen/NextGenSwimming) — Player water interaction
- [Coastlines](/oceanology-nextgen/NextGenShoreWaves) — Beach wave breaking

---

Need help? Check our [FAQ](/faq) or join the [Discord](https://discord.gg/VHJGBDR2as)!
