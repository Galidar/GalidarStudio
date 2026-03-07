---
slug: wave-forge-studio-announcement
title: "🚀 Introducing Wave Forge Studio - Professional Breaking Wave Editor"
authors: [galidar]
tags: [announcement, wave-forge, tool, breaking-waves, subscription]
image: /img/landing/wave-forge-studio.png
---

We're excited to announce **Wave Forge Studio** — a professional WebGPU-powered breaking wave profile editor designed for **Oceanology Pro 2.0** and compatible water simulation plugins.

**[Launch Wave Forge Studio →](https://waveforgestudio.galidarreset.workers.dev)**

<!-- truncate -->

## What is Wave Forge Studio?

Wave Forge Studio is a browser-based professional tool that enables developers, artists, and studios to create custom breaking wave animations with physics-accurate precision. Design unique surf wave profiles and export them directly to Unreal Engine for use in your commercial projects.

![Wave Forge Studio Interface](/img/landing/wave-forge-studio.png)

---

## Key Features

### 🌊 21-Spline Animation System

Create complete wave lifecycles using our proprietary 21-spline system:

| Phase | Splines | Description |
|-------|---------|-------------|
| **Swell** | 1-4 | Deep water wave approaching shore |
| **Rise** | 5-7 | Wave steepening as depth decreases |
| **Barrel** | 8-16 | Tube formation and curl development |
| **Collapse** | 17-19 | Breaking and energy dissipation |
| **Wash** | 20-21 | Foam rush and shore interaction |

### ⚡ WebGPU-Powered Rendering

Experience real-time 3D visualization with cutting-edge WebGPU technology:

- **16-bit Float HDR** rendering precision
- **Real-time preview** of wave animations
- **Multiple projection modes** for different use cases
- **Light table system** for comparing spline variations

### 🎛️ Professional Editing Tools

| Tool | Function |
|------|----------|
| **Spline Editor** | Hermite curve manipulation with tangent controls |
| **Phase Offset** | Cycle shift for animation timing |
| **Auto Dissipation** | Physics-based energy falloff preview |
| **Light Table** | Overlay multiple frames for comparison |
| **Frame Selection** | Navigate through wave progression |

### 📤 Multiple Export Formats

Export your custom wave profiles in formats compatible with various workflows:

| Format | Use Case |
|--------|----------|
| **16-bit HDR Textures** | Direct import to Unreal Engine materials |
| **HLSL Code** | Custom shader integration |
| **LUA Scripts** | Runtime wave generation |
| **JSON Data** | Asset pipeline integration |
| **C++ Headers** | Native engine code generation |

---

## Subscription Plans

Wave Forge Studio operates on a subscription model, providing continuous access to all features and future updates.

### What's Included

- ✅ **Unlimited wave profile creation**
- ✅ **All export formats** (HDR, HLSL, LUA, JSON, C++)
- ✅ **Cloud project storage**
- ✅ **Priority support**
- ✅ **Access to preset library**
- ✅ **Future feature updates**

### Commercial License

Your subscription includes a **full commercial license** for all exported content:

| ✅ Permitted Uses | ❌ Not Permitted |
|------------------|------------------|
| Video games (indie to AAA) | Resale on FAB Store |
| Film & cinematics | Resale on asset marketplaces |
| Architectural visualization | Redistribution as standalone assets |
| Simulation & training | Sub-licensing to third parties |
| VR/AR experiences | |
| Advertisements & media | |

**You own your creations** — use them freely in any commercial project without royalties or attribution requirements.

---

## Integration with NextGen 2.0

Wave Forge Studio is designed as the companion tool for **Oceanology NextGen 2.0**:

### Seamless Workflow

```
Wave Forge Studio → Export HDR Texture → Import to UE5 → NextGen Breaking Waves
```

### Direct Compatibility

- Exported textures match NextGen 2.0 breaking wave input format
- Spline data compatible with `OceanologySplineDataGenerator`
- HLSL exports integrate with NextGen material system
- LUA exports work with runtime wave configuration

### Also Compatible With

Wave Forge Studio exports work with any plugin or custom system that uses texture-based wave profiles:

- Third-party water plugins on FAB Store
- Custom ocean shader implementations
- Proprietary studio water systems
- Academic and research projects

---

## Technical Specifications

### Browser Requirements

| Requirement | Specification |
|-------------|---------------|
| **WebGPU Support** | Chrome 113+, Edge 113+, Firefox (flag) |
| **Recommended GPU** | Dedicated GPU with WebGPU drivers |
| **Screen Resolution** | 1920×1080 minimum recommended |
| **Memory** | 8GB+ RAM recommended |

### Export Specifications

| Output | Specification |
|--------|---------------|
| **Texture Resolution** | Up to 8K (8192×8192) |
| **Bit Depth** | 16-bit floating point HDR |
| **Color Channels** | RGB (height, normal, foam) + Alpha |
| **Spline Points** | 8-20 points per spline, configurable |

---

## Getting Started

### 1. Access the Tool

Visit [waveforgestudio.galidarreset.workers.dev](https://waveforgestudio.galidarreset.workers.dev) and create your account.

### 2. Choose a Starting Point

- **Blank Project** — Start from scratch
- **Preset Library** — Begin with professionally-designed templates
- **Import** — Load existing LUA or JSON spline data

### 3. Design Your Wave

Use the spline editor to craft your perfect breaking wave:
- Adjust control points for wave shape
- Modify tangents for smooth transitions
- Use the light table to compare variations
- Preview animation in real-time

### 4. Export & Integrate

Export your wave profile and import directly into Unreal Engine:
- HDR textures for material input
- HLSL for custom shader integration
- Full spline data for runtime systems

---

## Why Wave Forge Studio?

### For Game Developers

Create signature wave styles that define your game's visual identity. From gentle beach waves to powerful surf breaks, craft the perfect ocean aesthetic for your project.

### For Film & VFX Studios

Achieve physically-accurate wave behavior for cinematic sequences. Export high-resolution profiles for detailed close-up shots and wide ocean vistas.

### For Architectural Visualization

Design calming water features or dramatic coastal scenes. Wave Forge Studio provides the precision needed for client presentations and marketing materials.

### For Simulation & Training

Generate realistic wave behavior for maritime training, coastal engineering, and scientific visualization applications.

---

## Roadmap

| Feature | Status |
|---------|--------|
| Core spline editor | ✅ Available |
| 16-bit HDR export | ✅ Available |
| Real-time 3D preview | ✅ Available |
| Preset library | 🔄 Expanding |
| Team collaboration | 📋 Planned |
| Version history | 📋 Planned |
| API access | 📋 Planned |

---

## Start Creating Today

Wave Forge Studio represents our commitment to providing professional-grade tools for the game development and visualization community. Whether you're an indie developer or a AAA studio, create the perfect breaking waves for your projects.

<div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem'}}>
  <a href="https://waveforgestudio.galidarreset.workers.dev" target="_blank" rel="noopener" className="btn btn-primary btn-lg">
    🚀 Launch Wave Forge Studio
  </a>
  <a href="/oceanology-nextgen/NextGenShoreWaves" className="btn btn-secondary">
    📖 NextGen Breaking Waves Docs
  </a>
</div>

---

## Questions?

Join our [Discord community](https://discord.gg/VHJGBDR2as) for support, feature requests, and to share your wave creations with fellow developers.

