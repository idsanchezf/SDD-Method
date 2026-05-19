# Data Model: Galería de Plantillas SDD

**Date**: 2026-05-19
**Feature**: Template Gallery (US9 enhancement of US5)

## Entities

### TemplateEntry

Represents a single SDD template in the gallery catalog.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (e.g., `'spec'`, `'plan'`, `'tasks'`, `'checklist'`, `'constitution'`) |
| `name` | `string` | Display name (e.g., `'Spec Template'`) |
| `type` | `string` | Template type, matches `id` |
| `description` | `string` | Brief description shown on gallery card |
| `phase` | `string` | Associated SDD phase: `'Specify'`, `'Plan'`, `'Tasks'`, `'Checklist'`, `'Constitution'` |
| `phaseColor` | `string` | CSS custom property for badge color |
| `content` | `string` | Full Markdown content of the template (embedded from `.specify/templates/`) |
| `annotations` | `Record<string, string>` | Map of section heading → explanatory text for required sections |
| `explored` | `boolean` | Whether user has previewed this template (session-only, not persisted) |

### TemplateCatalog

Collection of all available templates.

| Field | Type | Description |
|-------|------|-------------|
| `templates` | `TemplateEntry[]` | Array of all template entries |
| `speckitVersion` | `string` | Version of speckit these templates come from (from `.specify/integrations/speckit.manifest.json`) |
| `lastUpdated` | `string` | ISO date string of when templates were last synced |

### DrawerState

Runtime state of the preview drawer.

| Field | Type | Description |
|-------|------|-------------|
| `isOpen` | `boolean` | Whether the drawer is currently visible |
| `currentTemplateId` | `string \| null` | ID of the template currently shown in drawer |
| `previousFocus` | `HTMLElement \| null` | Element that had focus before drawer opened (for focus restoration) |

## State Transitions

### Drawer Lifecycle

```
CLOSED → OPENING → OPEN → CLOSING → CLOSED
  ↑                                    |
  |____________________________________|
       (Escape key, close button, overlay click)
```

### Template Exploration Tracking

```
UNEXPLORED → EXPLORED
  (user clicks "Previsualizar")
```

Note: `explored` state is session-only (not persisted to localStorage), consistent with the rest of the site's behavior.

## Validation Rules

| Rule | Description |
|------|-------------|
| Template content must not be empty | `content.length > 0` before rendering |
| Template ID must match a known type | `id ∈ ['spec', 'plan', 'tasks', 'checklist', 'constitution']` |
| Annotations keys must exist in content | Each annotation heading must be found in the template Markdown |
| Drawer must have a current template | `currentTemplateId !== null` when `isOpen === true` |
