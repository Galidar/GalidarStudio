# Migration Checklist: Product Rename Day

> **When:** When Oceanology Pro 2.0 launches (~Q3 2026)
> **What:** NextGen → Pro, Legacy → Lite, Riverology 2.3 → Riverology 3.0
> **Prerequisite:** Version snapshots already created (NextGen 1.2.5, Legacy 5.9.0, Riverology 2.3.0)

---

## Step 1: Update `docusaurus.config.ts` — Plugins

Replace lines 55-67 (the `plugins` array) with:

```typescript
plugins: [
  // --- Oceanology Lite (was Legacy) ---
  ['@docusaurus/plugin-content-docs', {
    id: 'legacy',
    path: 'oceanology-legacy',
    routeBasePath: 'oceanology-lite',
    sidebarPath: './sidebarsLegacy.ts',
    lastVersion: 'current',
    versions: {
      current: {
        label: 'Oceanology Lite',
        path: '',
      },
      '5.9.0': {
        label: 'Legacy 5.9.0',
        path: '5.9.0',
        banner: 'unmaintained',
      },
    },
  }],

  // --- Oceanology Pro (was NextGen) ---
  ['@docusaurus/plugin-content-docs', {
    id: 'default',
    path: 'oceanology-nextgen',
    routeBasePath: 'oceanology-pro',
    sidebarPath: './sidebarsNextGen.ts',
    lastVersion: 'current',
    versions: {
      current: {
        label: 'Oceanology Pro 2.0',
        path: '',
      },
      '1.2.5': {
        label: 'NextGen 1.2.5',
        path: '1.2.5',
        banner: 'unmaintained',
      },
    },
  }],

  // --- Riverology ---
  ['@docusaurus/plugin-content-docs', {
    id: 'riverology',
    path: 'riverology',
    routeBasePath: 'riverology',
    sidebarPath: './sidebarsRiverology.ts',
    lastVersion: 'current',
    versions: {
      current: {
        label: 'Riverology 3.0',
        path: '',
      },
      '2.3.0': {
        label: 'Riverology 2.3.0',
        path: '2.3.0',
        banner: 'unmaintained',
      },
    },
  }],

  // Blog (no changes)
  ['@docusaurus/plugin-content-blog', {
    id: 'roadmap',
    path: 'roadmap',
    routeBasePath: 'roadmap',
    showReadingTime: true,
    blogTitle: 'Roadmap',
    blogDescription: 'Upcoming features and release notes for Oceanology and Riverology'
  }],

  // --- Redirects (old URLs → new URLs) ---
  ['@docusaurus/plugin-client-redirects', {
    createRedirects(existingPath) {
      if (existingPath.includes('/oceanology-pro')) {
        return [existingPath.replace('/oceanology-pro', '/oceanology-nextgen')];
      }
      if (existingPath.includes('/oceanology-lite')) {
        return [existingPath.replace('/oceanology-lite', '/oceanology-legacy')];
      }
      return undefined;
    },
  }],
],
```

---

## Step 2: Update `docusaurus.config.ts` — Search Plugin

Replace line 29:

```typescript
// BEFORE:
docsRouteBasePath: ['oceanology-legacy', 'oceanology-nextgen', 'riverology'],

// AFTER:
docsRouteBasePath: ['oceanology-lite', 'oceanology-pro', 'riverology'],
```

---

## Step 3: Update `docusaurus.config.ts` — Navbar

Replace lines 83-94 with:

```typescript
items: [
  { type: 'docSidebar', sidebarId: 'legacySidebar', docsPluginId: 'legacy', position: 'left', label: 'Oceanology Lite' },
  { type: 'docsVersionDropdown', docsPluginId: 'legacy', position: 'left' },
  { type: 'docSidebar', sidebarId: 'nextgenSidebar', docsPluginId: 'default', position: 'left', label: 'Oceanology Pro' },
  { type: 'docsVersionDropdown', docsPluginId: 'default', position: 'left' },
  { type: 'docSidebar', sidebarId: 'riverologySidebar', docsPluginId: 'riverology', position: 'left', label: 'Riverology' },
  { type: 'docsVersionDropdown', docsPluginId: 'riverology', position: 'left' },
  { to: '/roadmap', label: 'Roadmap', position: 'left' },
  { to: '/community', label: 'Community', position: 'left' },
  { to: '/showcase', label: 'Showcase', position: 'left' },
  { to: '/linked-roles', label: 'Linked Roles', position: 'right' },
  { to: '/faq', label: 'FAQ', position: 'right' },
  { to: '/support', label: 'Support', position: 'right' },
  { href: 'https://discord.gg/VHJGBDR2as', label: 'Discord', position: 'right' },
],
```

---

## Step 4: Update `docusaurus.config.ts` — Footer

Replace lines 100-105:

```typescript
{
  title: 'Docs',
  items: [
    {label: 'Oceanology Lite', to: '/oceanology-lite/'},
    {label: 'Oceanology Pro', to: '/oceanology-pro/'},
    {label: 'Riverology', to: '/riverology/'},
  ],
},
```

---

## Step 5: Update Custom Pages

### `src/pages/index.tsx`
- Replace all `/oceanology-nextgen/` → `/oceanology-pro/`
- Replace all `/oceanology-legacy/` → `/oceanology-lite/`
- Update product card labels: "Oceanology NextGen" → "Oceanology Pro", "Oceanology Legacy" → "Oceanology Lite"
- Update/remove the "Big Announcement" section (it's now live, not "coming soon")

### `src/pages/community.tsx`
- Replace `/oceanology-nextgen/` → `/oceanology-pro/`
- Replace `/oceanology-legacy/` → `/oceanology-lite/`

### `src/pages/faq.tsx`
- Replace `/oceanology-nextgen/` → `/oceanology-pro/`

### `src/pages/support.tsx`
- Replace `/oceanology-nextgen/` → `/oceanology-pro/`

### `src/data/showcase.ts`
- Update titles and `docsPath` values

---

## Step 6: Update Doc Content (current versions)

### `oceanology-nextgen/` (becomes Oceanology Pro docs)
- `intro.md` → Change title to "Oceanology Pro"
- All files: Replace "NextGen" references with "Pro" where it refers to the product name
- Add new 2.0 features documentation

### `oceanology-legacy/` (becomes Oceanology Lite docs)
- `intro_legacy.md` → Change title to "Oceanology Lite"
- All files: Replace "Legacy" references with "Lite" where it refers to the product name

### `riverology/` (becomes Riverology 3.0 docs)
- `intro_riverology.md` → Update version references
- Add new features documentation

---

## Step 7: Update Roadmap Articles

- Remove "(NextGen)" / "(Legacy)" parentheticals from articles (no longer "upcoming")
- Update the announcement article to say "now available" instead of "coming soon"
- Remove :::note admonitions about "Coming with Oceanology Pro 2.0"

---

## Step 8: Build & Verify

```bash
npx docusaurus build
npx docusaurus serve
```

### Verify:
- [ ] `/oceanology-pro/` shows Pro 2.0 docs (new content)
- [ ] `/oceanology-pro/1.2.5/` shows archived NextGen 1.2.5 docs with "unmaintained" banner
- [ ] `/oceanology-lite/` shows Lite docs (new content)
- [ ] `/oceanology-lite/5.9.0/` shows archived Legacy 5.9.0 docs with "unmaintained" banner
- [ ] `/riverology/` shows Riverology 3.0 docs (new content)
- [ ] `/riverology/2.3.0/` shows archived Riverology 2.3.0 docs with "unmaintained" banner
- [ ] `/oceanology-nextgen/setup` redirects to `/oceanology-pro/setup`
- [ ] `/oceanology-legacy/setup` redirects to `/oceanology-lite/setup`
- [ ] Version dropdowns work in navbar
- [ ] Search returns results with new product names
- [ ] All internal links work (no broken links)

---

## Rollback

If anything goes wrong:

```bash
git revert HEAD
```

Or manually:
1. Restore the old `plugins` array in `docusaurus.config.ts`
2. Restore old navbar/footer labels and URLs
3. Remove the `plugin-client-redirects` from plugins array
4. Revert content changes in doc files
5. `npx docusaurus build` to verify

The versioned snapshot directories are safe — they're independent copies that don't affect anything if versioning is not configured.
