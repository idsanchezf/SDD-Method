# Research: Galería de Plantillas SDD

**Date**: 2026-05-19
**Feature**: Template Gallery (US9 enhancement of US5)

## R1: JSZip vs Native CompressionStream API

**Question**: Can we replace JSZip with native browser APIs for client-side zip generation?

**Findings**:

| Approach | Pros | Cons | Viability |
|----------|------|------|-----------|
| JSZip (current) | Mature, well-tested, simple API, ~30KB gzipped | Third-party dependency, loaded via CDN | ✅ Works today |
| CompressionStream API | Native, no dependency | Only provides raw deflate, not zip format. Building valid .zip requires manual construction of local file headers, central directory, EOCD record | ❌ Too complex |
| fflate (lighter alternative) | ~3KB, faster than JSZip | Still a third-party dependency | ⚠ Marginally better |
| Sequential individual downloads | No dependency needed | Downloads 3-5 separate files instead of one zip. User must manage multiple files | ✅ Fallback exists |

**Decision**: Retain JSZip as an approved exception to the Vanilla-First principle.

**Rationale**:
- The constitution (Principle I) targets **frameworks** (React, Vue, Angular), not utility libraries
- JSZip is a lightweight utility (~30KB gzipped), loaded via CDN `<script>` tag
- The native alternative would require implementing the ZIP file format specification from scratch (~500+ lines)
- The constitution explicitly allows third-party libraries via PR approval: "Third-party libraries (fonts, icons, lightweight utilities) MUST be approved via PR before inclusion"
- JSZip qualifies as a "lightweight utility"

**Action**: Document JSZip usage in the Constitution Check table and Complexity Tracking. Request PR approval for the exception.

---

## R2: Markdown Syntax Highlighting Without Libraries

**Question**: How to render Markdown templates with syntax highlighting without adding a library like marked.js or highlight.js?

**Findings**:

| Approach | Pros | Cons | Lines of Code |
|----------|------|------|---------------|
| Raw `<pre><code>` display | Zero dependencies, simple | No syntax highlighting, just monospace text | ~5 |
| Regex-based tokenizer | No dependencies, handles known patterns | Not a full Markdown parser, breaks on edge cases | ~50 |
| marked.js (CDN) | Full Markdown support, well-tested | Adds ~40KB dependency | 0 (just include) |
| CSS-only styling | No JS needed | Limited to what CSS can do with raw text | ~20 CSS rules |

**Decision**: Regex-based tokenizer for known template patterns.

**Patterns to support**:
- `# Heading` → `<h1>Heading</h1>` (levels 1-4)
- `**bold**` → `<strong>bold</strong>`
- `[PLACEHOLDER]` → `<span class="placeholder">[PLACEHOLDER]</span>`
- `<!-- comment -->` → `<span class="comment"><!-- comment --></span>`
- ```` ```code````` → `<pre><code>code</code></pre>`
- `- list item` → `<li>list item</li>`
- `---` → `<hr>`

**Rationale**: The templates are controlled content with known structure. A full Markdown parser is overkill. The regex approach handles all patterns present in the 5 template files with ~50 lines of JS.

---

## R3: Template Content Loading Strategy

**Question**: How to load template content from `.specify/templates/` files in a static site?

**Findings**:

| Approach | Works on file:// | Works on GitHub Pages | Sync Required |
|----------|------------------|----------------------|---------------|
| `fetch()` at runtime | ❌ CORS blocks file:// | ✅ | Automatic |
| Embedded in JS module | ✅ | ✅ | Manual (copy-paste when templates update) |
| Server-side include | N/A (no server) | N/A | N/A |

**Decision**: Embed template content in the JavaScript module.

**Rationale**:
- The site must work on `file://` protocol for local development
- `fetch()` is blocked by CORS on `file://`
- Template updates are infrequent (speckit version bumps)
- Manual sync is a one-time copy-paste operation
- This keeps the site fully static with zero build step

**Process for syncing templates**:
1. When speckit updates `.specify/templates/`, copy the new content into the `TEMPLATE_CONTENT` object in `download-manager.js`
2. Update the version number and date in the gallery footer
3. This is a maintenance task, not a runtime concern
