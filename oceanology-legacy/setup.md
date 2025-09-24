---
title: Install & Setup
sidebar_position: 2
---

# Install & Setup

## A. Install the plugin

Use Epic Launcher or copy the plugin into:
```
MyProject/Plugins/
```
Enable **Oceanology Legacy** under **Edit → Plugins** and **Restart**.

## B. Project settings

Add the following under `[/Script/Engine.RendererSettings]` in `Config/DefaultEngine.ini`. These values target stable visuals and compatibility with Legacy materials.

```ini
[/Script/Engine.RendererSettings]
; Core
r.ReflectionMethod=1
r.GenerateMeshDistanceFields=True
r.DynamicGlobalIlluminationMethod=1
r.Lumen.TraceMeshSDFs=0
r.Shadow.Virtual.Enable=1

; Back buffer and anti‑aliasing
r.DefaultBackBufferPixelFormat=4
r.AntiAliasingMethod=4
r.MSAACount=4
r.TSR.AsyncCompute=3

; Motion blur and velocity
r.DefaultFeature.MotionBlur=False
r.VelocityOutputPass=2

; Virtual Textures & housekeeping
r.VirtualTextures=True
r.Shaders.RemoveDeadCode=1
r.GPUScene.ParallelUpdate=1
```

> Merge with your existing settings as needed. If you see artifacts, revisit anti‑aliasing and shadow options first.

## C. Verify

Create a clean Third Person project, enable the plugin, then open the **Oceanology Legacy** sample content from **Plugin Content** and run a quick play test.
