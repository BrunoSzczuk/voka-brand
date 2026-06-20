# VÖKA Brand Kit — design-sync notes

## First sync — 2026-06-19

- This repo has no pre-existing component library. `voka-brand-kit/` was created from scratch,
  deriving tokens and brand rules directly from `brand-identity/guidelines/brand-system.html`.
- Build command: `npm run build` inside `voka-brand-kit/` (tsup, ~1 s). No monorepo complexity.
- Converter entry: `./voka-brand-kit/dist/index.js`
- Node modules: `./voka-brand-kit/node_modules`
- Fonts (Outfit, DM Sans) are served via Google Fonts `@import` in `src/styles/voka.css`.
  `runtimeFontPrefixes` suppresses `[FONT_MISSING]` — no local woff2 files ship with the kit.
  Font rendering in designs requires internet access (Google Fonts CDN).
- Playwright + Chromium was installed globally via `npx playwright install chromium` to pass
  the render check. Re-run `npx playwright install chromium` on a fresh machine.
- All 12 components rendered cleanly on first run.

## Re-sync recipe

```bash
cd voka-brand-kit && npm run build && cd ..
node .ds-sync/package-build.mjs \
  --config design-sync.config.json \
  --node-modules ./voka-brand-kit/node_modules \
  --entry ./voka-brand-kit/dist/index.js \
  --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
# then upload with DesignSync
```

## Re-sync risks

- **Brand token drift**: If colors/fonts change in the HTML source files, `voka-brand-kit/src/tokens.ts`
  and `src/styles/voka.css` must be updated manually — they were hand-copied from brand-system.html.
- **Authored previews**: `BrandLogo.tsx`, `BrandMonogram.tsx`, `BrandPalette.tsx`, `BrandTypography.tsx`
  in `.design-sync/previews/` reference hard-coded hex colors from `tokens.ts`. If tokens change,
  previews may need updating.
- **Google Fonts dependency**: Rendered designs need internet access. If Google Fonts ever changes
  the Outfit or DM Sans URLs, styles.css `@import` may break silently.
- **TypeScript declarations**: The converter skipped `.d.ts` parse check because `typescript` is not in
  `.ds-sync/node_modules`. Props interfaces were emitted from tsup output. Install typescript in
  `.ds-sync/` (`npm i typescript`) to enable stricter prop-type checks on re-sync.
