# Quickstart: Anatomía y escritura de Specs SDD

## Archivos a crear

| Archivo | Propósito |
|---------|-----------|
| `src/index.html` | Agregar `<section class="spec-anatomy-section" id="spec-anatomy">` después de la sección de prerrequisitos |
| `src/css/spec-anatomy.css` | Estilos de la sección (card, expandible, side-by-side, responsive) |
| `src/js/spec-anatomy.js` | Datos de anatomía, lógica de expand/colapsar, tabs y vista comparativa |

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/index.html` | Agregar `<link rel="stylesheet" href="css/spec-anatomy.css">` en `<head>` y `<script src="js/spec-anatomy.js" defer></script>` antes del `</body>` |
| `src/index.html` | Agregar entrada en el sidebar (`<li class="sidebar__section">`) para la nueva sección |
| `src/css/spec-anatomy.css` | Importar variables globales (`var(--bg-primary)`, `var(--color-*)`, etc.) |

## Convenciones

- **Card style**: `max-width: 900px; margin: 2rem auto; padding: 1.5rem; background: var(--bg-primary, #ffffff); border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);`
- **Animaciones**: `transition: max-height 0.3s ease, opacity 0.3s ease;`
- **Responsive**: Mobile-first. Side-by-side → vertical en <768px.
- **Accesibilidad**: `aria-expanded`, `aria-controls`, `role="tablist"`, `role="tabpanel"`, `tabindex`, keyboard navigation.

## Integración con sidebar

Agregar en `src/index.html` dentro del `<ul class="sidebar__menu">`:

```html
<li class="sidebar__section" data-section-target="spec-anatomy">
  <button class="sidebar__section-btn" type="button" aria-expanded="false">
    <span>Anatomía de Specs</span>
    <svg class="sidebar__arrow" ...><polyline points="9 18 15 12 9 6"/></svg>
  </button>
  <ul class="sidebar__submenu">
    <li><a href="#spec-anatomy-overview" class="sidebar__link">Anatomía</a></li>
    <li><a href="#spec-anatomy-gwt" class="sidebar__link">Given/When/Then</a></li>
    <li><a href="#spec-anatomy-edgecases" class="sidebar__link">Edge Cases</a></li>
    <li><a href="#spec-anatomy-examples" class="sidebar__link">Ejemplos</a></li>
  </ul>
</li>
```
