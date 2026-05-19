# Quickstart: Galería de Plantillas SDD

**Date**: 2026-05-19
**Feature**: Template Gallery (US9 enhancement of US5)

## What This Feature Does

Replaces the existing single-button "Plantillas Descargables" section with a full visual gallery where users can:
1. **Browse** template cards with name, description, and phase badge
2. **Preview** any template in a sidebar drawer with Markdown rendering and section annotations
3. **Copy** template content to clipboard with one click
4. **Download** individual templates as .md or all templates as .zip

## Files Modified

| File | Change |
|------|--------|
| `src/index.html` (lines 1057-1067) | Replace single button with gallery container + drawer markup |
| `src/js/download-manager.js` | Extend DownloadManager class with gallery rendering, drawer, clipboard, real template content |
| `src/css/guide.css` | Add gallery grid, card styles, drawer styles, copy button styles |

## Development Workflow

1. **Start**: Open `src/index.html` in browser
2. **Test gallery**: Navigate to "Plantillas Descargables" section
3. **Test preview**: Click "Previsualizar" on any card → drawer slides in from right
4. **Test copy**: Click "Copiar" → verify clipboard content matches template
5. **Test download**: Click "Descargar" → verify .md file downloads with correct content
6. **Test responsive**: Resize to mobile width (<768px) → gallery stacks vertically, drawer goes full-screen
7. **Test keyboard**: Tab through cards, Enter to preview, Escape to close drawer

## Key Implementation Notes

- Template content is **embedded** in `download-manager.js` as `TEMPLATE_CONTENT` object (not fetched at runtime)
- Markdown rendering uses **regex-based tokenizer** (~50 lines), no external library
- JSZip is **retained** for zip generation (approved utility library exception)
- Drawer uses `role="dialog"`, `aria-modal="true"`, focus trap, Escape to close
- All new CSS classes use `.template-gallery-*` and `.template-drawer-*` namespaces

## Syncing Templates

When `.specify/templates/` files are updated by speckit:

1. Open each `.specify/templates/*.md` file
2. Copy its content into the corresponding entry in `TEMPLATE_CONTENT` in `download-manager.js`
3. Update `speckitVersion` and `lastUpdated` in the gallery footer
4. Test that all templates render correctly in the gallery
