# US5: Uso Práctico de SDD - Interactive Guide

## 📋 Resumen
Implementación de la guía paso a paso interactiva para aplicar la metodología SDD en proyectos reales.

## ✅ Funcionalidades Implementadas
- **Guía interactiva** - 5 fases (Specify → Clarify → Plan → Tasks → Implement)
- **Selector de caso de estudio** - Greenfield/Brownfield con persistencia localStorage
- **Descarga de artefactos** - Blob API para .md y .zip (JSZip)
- **Plantillas descargables** - spec-template.md, plan-template.md, tasks-template.md
- **Accesibilidad WCAG AA** - Navegación por teclado, etiquetas ARIA, soporte lectores de pantalla
- **Diseño responsive** - Reutiliza variables CSS de US2/US4

## 📁 Archivos Modificados/Creados
- `src/js/guide.js` - InteractiveGuide class (16.8KB)
- `src/js/download-manager.js` - DownloadManager class para plantillas
- `src/css/guide.css` - Estilos WCAG AA (5.2KB)
- `src/spec-template.md` - Plantilla de especificación
- `src/plan-template.md` - Plantilla de plan
- `src/tasks-template.md` - Plantilla de tareas
- `src/index.html` - Sección guide, enlaces CSS/JS, botón descarga
- `specs/005-us5-uso-practico/tasks.md` - 27/33 tareas completadas

## 🧪 Pruebas
- ✅ Sintaxis JS verificada (`node --check`)
- ✅ Persistencia localStorage implementada (`sdd-guide-progress`)
- ⚠️ **Pendientes (pruebas manuales)**:
  - T028: Navegación por teclado (Tab/Enter/Space)
  - T029: Compatibilidad con lector de pantalla (NVDA/JAWS)
  - T030: Diseño responsive (Chrome DevTools)
  - T032: Rendimiento (<2s carga, <100ms localStorage)

## 📊 Estado de Tareas
- **Completadas**: 27/33 (81.8%)
- **Pendientes**: 6 (pruebas manuales)
- **Prioridad P1**: ✅ Completada (MVP)
- **Prioridad P2**: ✅ Completada (Enhancement)
- **Prioridad P3**: ✅ Completada (Templates)

## 🔗 Commits
- `d0e7209` - Implement US5 Interactive Guide
- `d980c29` - Fix CSS styles for Uso Práctico guide
- `db4def1` - Fix script loading order for guide.js
- `6595c0e` - Fix guide initialization - wait for start button

## 📝 Notas
- No existe `package.json` en el proyecto - T031 (`npm run lint`) no aplicable
- Los botones "Comenzar Guía" y "Descargar Plantillas SDD" requieren interacción del usuario
- La carga de scripts se corrigió para que `case-studies.js` cargue antes de `guide.js`
