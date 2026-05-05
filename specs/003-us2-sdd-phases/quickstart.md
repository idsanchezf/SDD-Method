# Quickstart: SDD Phases - Interactive Phase Explorer

## Prerequisites

- US1 must be implemented first (`src/index.html`, `src/css/variables.css`, `src/css/reset.css` must exist)
- A modern web browser (Chrome, Firefox, Safari, or Edge — last 2 versions)

## Running Locally

### Option 1: Direct file open

```bash
cd C:\@idsanchezf\test
start src\index.html
```

### Option 2: Local HTTP server (recommended)

```powershell
python -m http.server 8080
# Then open http://localhost:8080/src/index.html
```

### Option 3: VS Code Live Server

- Right-click `src/index.html` → "Open with Live Server"

## Verifying the Implementation

1. **Content**: Confirm all 5 phase cards are present with name, description, duration, inputs, outputs
2. **Detail panels**: Click "Ver detalle" on each card — panel should expand with extended content
3. **Flow diagram**: Desktop — SVG with 5 connected nodes. Mobile — vertical list with arrows
4. **Bidirectional linking**: Click a diagram node → corresponding card highlights and scrolls into view. Click a card → corresponding diagram node highlights
5. **Progress bar**: Scroll through the section — the shared progress bar from US1 should update
6. **Print**: Click the print button — all details should expand, diagram should hide
7. **Performance**: DevTools → Network → verify added weight < 50 KB

## File Map (US2 additions)

```
src/
├── css/
│   └── phases.css        ← Phase section styles (NEW)
├── js/
│   └── phases.js         ← Phase cards + flow diagram logic (NEW)
└── index.html            ← Phases section appended after hero (MODIFIED)
```
