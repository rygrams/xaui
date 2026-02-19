---
'docs': patch
---

feat(docs): integrate @xaui/hybrid with playground, BrowserPreview, and component Preview tab

- Install `@xaui/hybrid` as workspace dependency and add to `transpilePackages`
- Import `dist/index.css` before tailwindcss in globals.css to preserve shadcn color priority
- Add `HybridProvider` client wrapper and wrap root layout
- Create `BrowserPreview` component (browser chrome with traffic lights + URL bar)
- Add `/playground` page with interactive Alert demo and all-colors grids
- Add "Hybrid (Web)" section to sidebar navigation
- Create `FlatPhonePreview` component (flat phone silhouette) for native component pages
- Add "Preview" tab to component docs pages showing hybrid equivalent inside flat phone
- Create `AlertHybridPreview` with variant toggle as first hybrid preview use case
- Add `HYBRID-SETUP.md` installation guide at project root
