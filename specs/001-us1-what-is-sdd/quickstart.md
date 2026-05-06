# Quickstart: What is SDD - Hero Section

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge — last 2 versions)
- A local HTTP server (optional but recommended for accurate testing)

## Running Locally

### Option 1: Direct file open

```bash
# Navigate to the project root
cd C:\@idsanchezf\test

# Open index.html directly in browser
start src\index.html
```

### Option 2: Local HTTP server (recommended)

```powershell
# Using Python (if available)
python -m http.server 8080

# Or using Node.js npx
npx serve .

# Then open http://localhost:8080/src/index.html
```

### Option 3: VS Code Live Server

- Install "Live Server" extension
- Right-click `src/index.html` → "Open with Live Server"

## Verifying the Implementation

1. **Content**: Confirm all sections are present — definition, principles (5), benefits (4), comparison table, checklist
2. **Responsive**: Resize browser to 320px, 768px, and 1024px — layout should adapt correctly
3. **Accessibility**: Tab through all interactive elements — focus should be visible and logical
4. **Progress bar**: Scroll through the page — the progress bar at the top should update
5. **Checklist**: Click each checklist item — the answer should expand/collapse smoothly
6. **Performance**: Open browser DevTools → Network → verify total transfer size < 150 KB

## File Map

```
src/
├── css/
│   ├── variables.css   ← Design system tokens
│   ├── reset.css       ← Browser normalization
│   └── hero.css        ← Section styles
├── js/
│   └── hero.js         ← Checklist + progress logic
├── assets/
│   └── icons/          ← SVG icons
└── index.html          ← Page entry point
```
