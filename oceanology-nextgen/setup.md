---
title: Install & Setup
sidebar_position: 2
---

# Install & Setup

Follow these steps to install Oceanology NextGen and prepare a clean Unreal project.

## A. Install the plugin

### Option 1 — Epic Launcher
1. Open **Epic Launcher** → **FAB**.
2. Refresh the plugins catalog.
3. Search **“Oceanology”** and **Install** for your Unreal Engine version. Minimum tested version is **UE 5.5**.
4. Launch Unreal.

### Option 2 — Manual
1. Close Unreal.
2. Copy the plugin folder into your project at:
   ```
   MyProject/Plugins/
   ```
3. Reopen Unreal.

> After install, open **Edit → Plugins**, search **Oceanology NextGen**, **Enable**, and **Restart** the editor. Also enable **Show Engine Content** and **Show Plugin Content** to access sample maps.

## B. Project settings

Update your `DefaultEngine.ini` to ensure stable rendering with Oceanology. Add the following under:

```
[/Script/Engine.RendererSettings]
```

**Baseline settings**
```ini
[/Script/Engine.RendererSettings]
; Core
r.AllowStaticLighting=False
r.GenerateMeshDistanceFields=True
r.DynamicGlobalIlluminationMethod=1
r.ReflectionMethod=1
r.Shadow.Virtual.Enable=1

; Virtual Textures & GPU scene
r.VirtualTextures=True
r.GPUScene.ParallelUpdate=1

; TSR stability
r.TSR.History.SampleCount=32
r.TSR.ShadingRejection.Flickering.FrameRateCap=30
r.TSR.ShadingRejection.Flickering.MaxParralaxVelocity=2
r.TSR.ShadingRejection.Flickering.Period=3

; Optional (DLSS)
r.Streamline.DLSSG.Enable=1
r.NGX.DLSS.WaterReflections.TemporalAA=1
```

> Keep your existing project values where they don’t conflict. Renderer options can change between engine versions.

## C. Verify

1. Create a new **Third Person** project to test.
2. Enable the plugin and restart.
3. From the **Content Browser**, enable **Plugin Content** and open the **Oceanology NextGen** sample map.
4. Play‑in‑Editor and confirm waves, underwater, and buoyancy behave as expected.
