# Devlog: Design Renovation to Match TANK-CAL Suite Standards

**Date:** 2026-02-28
**Commit:** `3fce40c` — Design renovation: viewport lock, bottom nav, flex-fill layouts
**Deploy:** https://gdd-tracker-delta.vercel.app

## What Changed

Brought the GDD Tracker into full alignment with the Lawn Lab suite design standards established in TANK-CAL. The app now feels like a native mobile app with no page scroll, persistent bottom navigation, and flex-fill layouts.

### Changes (20 files)

| Category | Files | Changes |
|----------|-------|---------|
| **Viewport Lock** | `index.css` | `100dvh` + `overflow: hidden` on html/body/#root |
| **Bottom Nav** | `BottomNav.tsx` (NEW) | 3-tab bar: Dashboard, Products, Settings. `bg-white/95 backdrop-blur-sm`, active green-600, safe-bottom |
| **Layout** | `Layout.tsx` | Removed header nav icons (replaced by BottomNav), added `showHeader`/`showBottomNav` props, `overflow-hidden flex flex-col min-h-0` on main, fixed back button styling |
| **Navigation** | `useNavigationStore.ts` | Added `navigateTab()` — resets backStack for tab switching |
| **Main Screens** | SplashScreen, HomeDashboard, SettingsScreen, ProductListScreen, ProductDetailScreen, HistoricalGDDScreen | All converted to `flex-1 flex flex-col min-h-0` with `overflow-y-auto` for internal scroll |
| **Wizards** | OnboardingShell, LogAppShell + all steps | Flex-fill wizard pattern: ProgressBar + flex content + shrink-0 nav buttons, `showBottomNav={false}` |
| **Input Fix** | `StepRate.tsx` | Rate input: `type="number"` → `type="text" inputMode="decimal" pattern="[0-9.]*"` |
| **Dialog** | `ConfirmDialog.tsx` | Backdrop: `bg-black/40` → `bg-gray-900/35 backdrop-blur-[2px]` |

### Architecture Pattern

```
Layout
├── header (shrink-0, safe-top) — hidden on splash
├── main (flex-1, overflow-hidden, flex-col, min-h-0)
│   └── screen content (flex-1, overflow-y-auto where needed)
└── BottomNav (shrink-0, safe-bottom) — hidden on wizards
```

### What Was Already Matching (No Changes)
- Color palette (lawn greens, warm grays, terracotta reds, cream)
- Fonts (Bricolage Grotesque + Figtree)
- Active-only states (no hover)
- Safe area classes
- SVG viewBox on all icons

## Build
- `npm run build` — zero errors
- 80 modules, 374KB JS (gzip: 114KB), 30KB CSS (gzip: 6KB)
