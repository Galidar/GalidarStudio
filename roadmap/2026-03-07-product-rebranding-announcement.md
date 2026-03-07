---
slug: product-rebranding-announcement
title: "🚀 Announcing Oceanology Lite & Pro: A New Era for Water Simulation"
authors: [galidar]
tags: [news, announcement, oceanology, lite, pro, architecture, community]
image: /img/landing/oceanology-nextgen.png
---

We have some major news to share with the community. After a lot of development work and community feedback, we are announcing significant changes to how our products are structured, named, and maintained. This is one of the most important announcements we have ever made.

<!-- truncate -->

:::info No Re-Purchase Needed
If you already own Legacy or NextGen, you will automatically receive all updates and changes at no extra cost. Your purchase is safe.
:::

---

## NextGen 2.0: A Completely New Era

We want to be very clear about something: **Oceanology NextGen 2.0 is a completely different product** compared to NextGen 1.2.x currently on the marketplace. This is not just a bug fix update. This is a massive overhaul that changes everything.

The current NextGen 1.x is focused primarily on cinematics due to its high GPU requirements. NextGen 2.0 is our answer to that limitation — rebuilt from the ground up to be ready for **both games and cinematic productions**.

---

## The Multi-Wave System

One of the biggest new features in 2.0 is the **Multi-Wave System**, which lets you choose the wave simulation method that best fits your project:

### 🟢 Gerstner Waves — Low Performance Cost
The most efficient option. Perfect for games where you need good-looking water without heavy GPU usage. Ideal for mobile games, VR projects, or any performance-critical situation. Still looks great, minimal resource usage.

### 🟡 Spectral Gerstner — Medium Performance Cost
A hybrid approach combining the best of both worlds. Takes realistic wave patterns from FFT calculations and applies them using efficient Gerstner rendering. Much more realistic than pure Gerstner waves, but without the heavy FFT cost. Perfect for AAA games that want impressive water visuals while maintaining solid frame rates.

### 🔴 FFT Waves — High Performance Cost
Maximum realism. FFT (Fast Fourier Transform) waves simulate ocean behavior using real oceanographic mathematics. Physically accurate patterns based on real-world ocean data. Designed for cinematic productions, architectural visualization, and simulation projects where visual quality is the priority.

---

## New Unified Architecture

We are completely restructuring how our plugins work. **Oceanology NextGen 2.0** will become the central base containing all water systems. Every Oceanology product will be derived from this single codebase — sharing the same foundation, the same quality, and the same features (where applicable).

Here is how the products will be organized:

### Pro (NextGen) — The Complete Package

| Feature | Included |
|---------|----------|
| Ocean — All wave types (Gerstner, Spectral Gerstner, FFT) | ✅ |
| Lake system with full features | ✅ |
| River system with flow simulation | ✅ |
| Breaking Waves profiles (Surf waves) | ✅ |

The full experience with every feature. Perfect for studios and developers who need maximum flexibility and the highest quality visuals for both games and cinematics.

### Lite (Legacy) — Ocean and Lakes Focus

| Feature | Included |
|---------|----------|
| Ocean — Gerstner Waves only | ✅ |
| Lake system with full features | ✅ |
| Simple shoreline waves | ✅ |
| River system | ❌ |
| Spectral Gerstner & FFT waves | ❌ |
| Breaking Waves profiles | ❌ |

Focused on ocean and lake environments with performance-friendly wave simulation. Perfect for game developers who prioritize performance and don't need advanced wave systems or river functionality.

### Riverology — Rivers and Lakes Focus

| Feature | Included |
|---------|----------|
| Ocean system | ❌ |
| Lake system with full features | ✅ |
| River system with flow simulation | ✅ |
| Exclusive river features not in other products | ✅ |

Focused on inland water bodies. Perfect for forest environments, countryside scenes, or any project centered around rivers and lakes. Riverology includes exclusive advanced features specifically designed for river environments — features that won't be available in Oceanology Pro.

---

## Synchronized Updates for Oceanology Products

The unified architecture brings a huge benefit: **synchronized updates between Lite and Pro**.

In the past, we maintained separate codebases. Sometimes bug fixes or improvements in NextGen wouldn't immediately appear in Legacy, or vice versa. This was frustrating for everyone.

With the new architecture, this problem disappears completely. When we fix a bug in the core water rendering code, that fix automatically applies to both Pro and Lite. When we optimize performance, both products benefit. When we add a new feature to lakes, both versions receive it.

:::note
Riverology remains a separate product with its own development cycle focused specifically on river and lake systems.
:::

---

## Lighter Plugin Size

Many of you requested smaller plugin file sizes. We heard you.

**Technical Demo Maps with Blockout Design** — All maps included in the plugin will use blockout design: simple geometric shapes instead of detailed environmental assets. This:
- Dramatically reduces plugin size (no more gigabytes of trees, rocks, and textures just to test water features)
- Eliminates confusion about performance — you'll see exactly how the water performs without interference from environmental assets

For users who want high-quality environmental content, we'll provide it separately as optional content.

---

## About the Name Change

:::important Timing of the Rename
The rename will **only happen when NextGen 2.0 is ready and released**. We are not changing names right now. We are announcing our plans so the community can prepare.
:::

**Why Lite and Pro instead of Legacy and NextGen?**

- **Legacy** in software often means "old", "outdated", or "no longer actively developed" — that's not what our Lite version is. It will be actively maintained, regularly updated, and fully supported.
- **NextGen** implies the other version is "current gen" or "last gen", suggesting it's inferior. That's not accurate.
- **Lite/Pro** immediately communicates the relationship: Lite is a focused version, Pro is the complete version. Industry-standard naming that customers already understand.

---

## 🎉 New Community Feature: You Choose the Sales!

We are introducing something new: **you have the power to vote for which product goes on sale**.

We will open polls in our Discord server where you can vote for your preferred product. Due to FAB Store terms and conditions, we cannot disclose specific discount percentages or timing in advance. However, the product selected by the community **will be included in a future FAB Store sale event**.

Once a sale ends, we'll run a new poll for the next opportunity. Different products will have their chance based on what the community wants.

This is our way of saying thank you for being part of this community.

---

## Timeline

| Phase | Status |
|-------|--------|
| Alpha Testing | 🔵 Q1 2026 (Current) |
| Beta (all existing customers) | 🟡 Q2 2026 |
| Full Release + Official Rename | 🟢 Q3 2026 |

The 2.0 release is free for all existing NextGen customers.

---

## Questions?

Join the discussion in our [Discord community](https://discord.gg/VHJGBDR2as). Channels to check:
- **#announcements** — Official news
- **#dev-talk** — Technical discussion about 2.0 architecture
- **#migration-help** — Getting ready for the transition
