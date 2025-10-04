---
title: Install & Setup
sidebar_position: 2
---

# Install & Setup — Riverology

Follow these steps on a clean test project first. Then merge into your main project.

## 1) Install the plugin to your Engine (Epic Games Launcher)

1. Open **Epic Games Launcher → Library**.
2. In **Fab Library**, click **Refresh**.
3. Search **Riverology** and **Install to Engine**.
4. Choose the UE **5.5+** slot and wait for the download to complete.


![Fab Library — search and Install to Engine](/img/riverology/setup/fab-library-install-to-engine.png)
![Fab Library — download progress](/img/riverology/setup/fab-download-progress.png)
![Select engine version](/img/riverology/setup/fab-choose-engine-version.png)

## 2) Create a test project

- Launch UE → **Games → Third Person**. Target **Desktop**, Quality **Maximum**, **Starter Content** on. Name the project and **Create**.

![UE Project Browser — Third Person template](/img/riverology/setup/ue55-new-project-third-person.png)

## 3) Enable the plugin in your project

1. In UE, open **Edit → Plugins**.
2. Search `Riverology` and enable it.
3. Click **Restart Now** when prompted.

![Open Plugins window](/img/riverology/setup/menu-edit-plugins.png)
![Enable plugin](/img/riverology/setup/plugins-search-oceanology.png)
![Restart to apply](/img/riverology/setup/plugins-enabled-restart-now.png)

## 4) View sample content

1. Open **Content Browser**. Click the gear icon.
2. Enable **Show Engine Content** and **Show Plugin Content**.
3. Navigate to **Engine/Plugins/RIVEROLOGY Content** and open a sample map.

![Show Engine and Plugin Content](/img/riverology/setup/content-browser-settings-show-engine-plugin.png)
![Plugin content folder](/img/riverology/setup/content-browser-oceanology-content-folder.png)

## 5) Project configuration — `DefaultEngine.ini`

> Place this under your project at: `MyProject/Config/DefaultEngine.ini`.  
> Merge with your existing settings. Use source control to track changes.

```ini
[/Script/Engine.RendererSettings]
r.AllowStaticLighting=False
r.GenerateMeshDistanceFields=True
r.DynamicGlobalIlluminationMethod=1
r.ReflectionMethod=1
r.SkinCache.CompileShaders=True
r.RayTracing=True
r.Shadow.Virtual.Enable=1
r.DefaultFeature.AutoExposure.ExtendDefaultLuminanceRange=True
r.DefaultFeature.LocalExposure.HighlightContrastScale=0.8
r.DefaultFeature.LocalExposure.ShadowContrastScale=0.8

;Virtual Textures
r.VirtualTextures=True
r.VT.AnisotropicFiltering=True
bEnableVirtualTexturePostProcessing=True

;Lumen
r.Lumen.ScreenTracingSource=1
r.Lumen.TraceMeshSDFs=0
r.Lumen.Reflections.HardwareRayTracing.Translucent.Refraction.EnableForProject=False

;Shadows
r.Shadow.Virtual.Clipmap.WPODisableDistance=1
r.Shadow.Virtual.Clipmap.WPODisableDistance.LodBias=1

;Lighting
r.MegaLights.EnableForProject=True

;Velocity
r.VelocityOutputPass=1

;Shaders
r.Shaders.RemoveDeadCode=1

;GPU scene
r.GPUScene.ParallelUpdate=1

;Shading Rejection
r.TSR.History.SampleCount=32
r.TSR.ShadingRejection.Flickering.FrameRateCap=30
r.TSR.ShadingRejection.Flickering.MaxParralaxVelocity=2
r.TSR.ShadingRejection.Flickering.Period=3

;NVidia DLSS
r.Streamline.DLSSG.Enable=1
r.NGX.DLSS.WaterReflections.TemporalAA=1

[/Script/DLSS.DLSSSettings]
bEnableDLSSInEditorViewports=True

;Physics
[/Script/Engine.NetworkSettings]
p.EnableMultiplayerWorldOriginRebasing=True

;Physics Setup
[/Script/Engine.PhysicsSettings]
PhysicsPrediction=(bEnablePhysicsPrediction=True,bEnablePhysicsHistoryCapture=False,MaxSupportedLatencyPrediction=1000.000000,ResimulationSettings=(bEnableResimulationErrorPositionThreshold=True,ResimulationErrorPositionThreshold=10.000000,bEnableResimulationErrorRotationThreshold=True,ResimulationErrorRotationThreshold=4.000000,bEnableResimulationErrorLinearVelocityThreshold=False,ResimulationErrorLinearVelocityThreshold=5.000000,bEnableResimulationErrorAngularVelocityThreshold=False,ResimulationErrorAngularVelocityThreshold=2.000000))
bTickPhysicsAsync=True
bSubsteppingAsync=True
bSubstepping=True
```

:::note
Engine variables may change between UE versions. If you see warnings, search the cvar and adjust.
:::

## Troubleshooting

- **Plugin not visible after installing in Launcher**: refresh **Fab Library**, confirm the plugin is installed to the same **UE version** you are running.
- **Config did not apply**: verify you edited the project’s `Config/DefaultEngine.ini`.
- **Editor didn’t prompt to restart**: toggle the plugin off/on in **Edit → Plugins**.
