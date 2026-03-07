---
title: "Choosing the Right Plugin: Oceanology Pro vs Lite vs Riverology"
slug: choosing-right-plugin
date: 2025-11-20
tags:
  - guide
  - comparison
  - oceanology
  - riverology
description: "Not sure which water plugin is right for your project? This comprehensive guide helps you make the perfect choice."
image: /img/landing/oceanology-nextgen.png
authors: [galidar]
---

Choosing the right water simulation plugin can make or break your project. Let's find the perfect match for your needs.

<!-- truncate -->

:::note Coming with Oceanology Pro 2.0 (Q3 2026)
Our product lineup is being restructured with the **Oceanology Pro 2.0** release. Current products are **Oceanology NextGen** (becoming **Pro**) and **Oceanology Legacy** (becoming **Lite**). No re-purchase needed — all existing customers receive updates automatically.
[Read the full announcement →](/roadmap/product-rebranding-announcement)
:::

---

## 🤔 The Big Question

We often get asked: *"Which plugin should I buy?"*

The answer depends on three factors:
1. **Water type** — Ocean, river, or both?
2. **Target hardware** — What GPUs will your players have?
3. **Visual requirements** — Maximum quality or optimized performance?

---

## 📊 Quick Decision Chart

```
START HERE
    │
    ▼
┌──────────────────────────────┐
│  Do you ONLY need rivers?    │
│  (no open ocean)             │
└──────────────────────────────┘
    │ YES              │ NO
    ▼                  ▼
┌──────────┐    ┌──────────────────────────────┐
│RIVEROLOGY│    │ Do you need rivers + ocean,  │
│(exclusive│    │ or max wave quality?         │
│  river   │    └──────────────────────────────┘
│ features)│         │ YES           │ NO
└──────────┘         ▼               ▼
               ┌───────────┐   ┌──────────────┐
               │ OCEANOLOGY│   │  OCEANOLOGY  │
               │    PRO    │   │     LITE     │
               │(NextGen)  │   │  (Legacy)    │
               └───────────┘   └──────────────┘
```

---

## 🌊 Oceanology Pro (NextGen → Pro)

**Best for:** AAA projects, cinematics, high-end PC games, projects needing rivers + ocean

### ✅ Choose Pro If:

- You need **rivers AND ocean** in the same project
- You're targeting **RTX 3080 / RTX 4070+ or better** GPUs
- You need **Breaking Waves** — surf simulation with coastal waves
- You want **Spectral Gerstner or FFT waves** for maximum realism
- You're building **cinematic experiences**
- You want the **complete package** — ocean, lakes, rivers, all wave types

### ❌ Don't Choose Pro If:

- You only need performance-friendly ocean/lakes (use Lite — it shares the same codebase)
- You need maximum support for low-end hardware and mobile

### Key Features:

| Feature | Oceanology Pro |
|---------|---------------|
| Ocean Wave System | Gerstner + Spectral Gerstner + FFT |
| Lake System | ✅ Full features |
| River System | ✅ Included |
| Breaking Waves | ✅ Surf profiles |
| GPU Requirement | RTX 3080 / RTX 4070+ recommended |
| Visual Quality | ⭐⭐⭐⭐⭐ |

**Documentation:** [Oceanology Pro Docs](/oceanology-nextgen)

**FAB Store:** [Buy Oceanology Pro (NextGen)](https://www.fab.com/listings/87c9af41-62b7-4e70-98e3-fc72eff016ab)

---

## 🌅 Oceanology Lite (Legacy → Lite)

**Best for:** Wide hardware compatibility, indie games, performance-critical projects

### ✅ Choose Lite If:

- You need to support **GTX 1080 / RTX 3060+** GPUs
- **Performance is critical** (VR, mobile, streaming, console)
- You want **broad audience reach**
- You need **ocean and lakes** without rivers or advanced wave systems
- You're making a **stylized** water look (not photorealism)
- You want **synchronized updates** with Pro (shared codebase)

### ❌ Don't Choose Lite If:

- You need rivers (rivers are exclusive to Pro and Riverology)
- You need Breaking Waves or Spectral/FFT wave systems
- You need maximum visual quality on high-end hardware

### Key Features:

| Feature | Oceanology Lite |
|---------|----------------|
| Ocean Wave System | Gerstner (4 layers) |
| Lake System | ✅ Full features |
| River System | ❌ Not included |
| Breaking Waves | ❌ (basic shoreline only) |
| GPU Requirement | GTX 1080 / RTX 3060+ |
| Performance | ⭐⭐⭐⭐⭐ |

**Documentation:** [Oceanology Lite Docs](/oceanology-legacy)

**FAB Store:** [Buy Oceanology Lite (Legacy)](https://www.fab.com/listings/1cd1f62e-0fa3-48bf-bc60-f0e06010fce3)

---

## 🏞️ Riverology

**Best for:** Rivers, streams, lakes, inland water environments

### ✅ Choose Riverology If:

- You need **flowing rivers** with current physics
- Your game has **spline-based water paths**
- You want **objects to flow downstream**
- You need **terrain-integrated riverbeds** with auto-carving
- You're building **nature environments** with streams, waterfalls, or rapids
- You want **exclusive river features** not available in Oceanology Pro

### ❌ Don't Choose Riverology If:

- You need open ocean simulation (Riverology has no ocean)
- You need rivers AND ocean → use Oceanology Pro instead (includes both)

### Key Features:

| Feature | Riverology |
|---------|------------|
| Water Type | Rivers, streams, lakes |
| Ocean System | ❌ Not included |
| Flow Physics | ✅ Directional current |
| Terrain Integration | ✅ Auto riverbed carving |
| Spline-Based | ✅ Flexible paths |
| Exclusive River Features | ✅ Not available elsewhere |

**Documentation:** [Riverology Docs](/riverology)

**FAB Store:** [Buy Riverology](https://www.fab.com/listings/36933ae4-eb48-4395-951b-6357e0ff2c17)

---

## 🔄 Can I Use Multiple Plugins?

**YES!** Our plugins work together:

### Pro + Riverology
- Get ocean AND exclusive Riverology river features in the same project
- Riverology has exclusive river mechanics not available in Pro
- Rivers flowing into the sea, coastal + inland water systems

### Lite + Riverology
- Performance-optimized ocean with Riverology rivers
- Best for projects targeting a wide range of hardware

:::tip
Oceanology Pro already **includes a river system**, so you only need to add Riverology if you specifically need its exclusive river features.
:::

---

## 📈 Feature Comparison

| Feature | Oceanology Pro | Oceanology Lite | Riverology |
|---------|---------------|----------------|------------|
| Ocean | ✅ All wave types | ✅ Gerstner only | ❌ |
| Lakes | ✅ Full | ✅ Full | ✅ Full |
| Rivers | ✅ Included | ❌ | ✅ Exclusive features |
| Breaking Waves | ✅ | ❌ (basic shoreline) | ❌ |
| Spectral Gerstner | ✅ | ❌ | ❌ |
| FFT Waves | ✅ | ❌ | ❌ |
| Min GPU | RTX 3080 / RTX 4070+ | GTX 1080 / RTX 3060+ | GTX 1080 / RTX 3060+ |
| Buoyancy | ✅ | ✅ | ✅ |
| Swimming | ✅ | ✅ | ✅ |

---

## 🎮 Project Type Recommendations

| Project Type | Recommended |
|--------------|-------------|
| AAA Open World (ocean + rivers) | Oceanology Pro |
| Indie Adventure | Oceanology Lite |
| Survival Game (ocean) | Oceanology Lite or Pro |
| Survival Game (rivers + ocean) | Oceanology Pro |
| Racing / Boat Game | Oceanology Pro |
| VR Experience | Oceanology Lite |
| Mobile Game | Oceanology Lite |
| Cinematic Production | Oceanology Pro |
| Forest / Nature Scene | Riverology |
| Fantasy RPG (all water types) | Pro + Riverology |

---

## 💡 Still Not Sure?

### Ask These Questions:

1. **Do I need rivers AND ocean in the same project?**
   - Yes → Oceanology Pro (includes both)

2. **Do I need ONLY rivers (no ocean)?**
   - Yes → Riverology (exclusive river features)

3. **Do I need ocean only?**
   - High-end GPU, best quality → Oceanology Pro
   - Wide hardware support → Oceanology Lite

4. **Is Breaking Waves (surf simulation) essential?**
   - Yes → Oceanology Pro

---

## 🆘 Need Help Deciding?

We're here to help you make the right choice:

- 💬 **Ask in Discord** — [Get community advice](https://discord.gg/VHJGBDR2as)
- 📧 **Contact Support** — [Direct help](/support)

Remember: you can always start with one plugin and add others later. They're designed to work together!
