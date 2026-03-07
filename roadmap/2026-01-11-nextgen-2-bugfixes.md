---
slug: nextgen-2-bugfixes
title: "🐛 Bug Fixes & Visual Polish - Oceanology Pro 2.0"
date: 2026-01-11
authors: [galidar]
tags: [oceanology-pro, bugfix, lod, underwater, fog, masking, godrays, 2]
image: /img/landing/oceanology-nextgen.png
---

# 🐛 Bug Fixes & Visual Polish - Oceanology Pro 2.0

We've been listening closely to community feedback, and Oceanology Pro 2.0 will bring meaningful fixes to some of the most frequently reported visual issues.

<!--truncate-->

---

## 🌊 LOD System — White Gradient Artifact

A visual glitch causes a white gradient to appear on the water surface during rapid camera altitude changes. This artifact becomes more noticeable when adjusting QuadTree Tile Size values and interacts unexpectedly with foam rendering.

**NextGen 2.0** introduces stabilized LOD transitions that eliminate this artifact across all camera movement speeds and tile configurations.

---

## 🚢 Water Masking — Enclosed Spaces

Water currently renders inside enclosed geometry like boat hulls and interior cabins. The existing `MI_MaskingObjects` approach struggles with complex multi-room structures and thin-wall geometry, sometimes producing erratic camera behavior.

**NextGen 2.0** delivers an improved masking system with reliable interior detection, ensuring water stays outside where it belongs.

---

## 🎨 Underwater Visuals — Independent Controls

The current underwater rendering ties several visual parameters together, limiting artistic flexibility. Specifically: underside visibility is locked to fog density, underwater color cannot change at runtime, and bright skies cause overly white refraction.

**NextGen 2.0** separates these controls, adding independent underside blend, runtime-adjustable underwater color for biome transitions, and improved refraction handling under various lighting conditions.

---

## ☀️ Godrays — World-Space Anchoring

Underwater godrays currently move with the camera, which breaks the sense of being in a real underwater environment. Additionally, they only appear within fogged areas, limiting their use in clear shallow water.

**NextGen 2.0** anchors godrays in world-space so they remain stationary as the camera moves, creating a natural parallax effect and proper underwater immersion.

---

## 🌫️ Fog System — Visibility Corrections

Several fog-related visual bugs have been reported: distant objects sometimes remain visible through dense fog, transparent materials bleed through incorrectly, and a hard line artifact appears at the water surface intersection.

**NextGen 2.0** addresses all three issues with proper depth handling, corrected render order for transparent geometry, and smooth gradient blending at surface boundaries.

---

## 💬 Community Driven

These improvements come directly from detailed community reports and feedback. Thank you to everyone who took the time to document issues and share suggestions — your input shapes the future of Oceanology.

[Join our Discord](https://discord.gg/s9TSBBX3Rh)
