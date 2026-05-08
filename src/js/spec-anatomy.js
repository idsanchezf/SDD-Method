// ============================================
// Spec Anatomy — Data & Interactive Elements
// ============================================

// --- Phase 2: Data Structures ---

const specSections = [
  {
    id: 'frontmatter',
    name: 'Frontmatter',
    purpose: 'Metadatos del feature: identificador, autor, fecha, versión de la spec.',
    fields: ['feature: nombre del feature', 'author: autor de la spec', 'created: fecha de creación', 'status: Draft / Clarified / Approved'],
    example: '---\nfeature: user-login\nauthor: Juan Pérez\ncreated: 2026-05-01\nstatus: Draft\n---',
    commonMistakes: ['Olvidar actualizar el status cuando la spec avanza de fase', 'Poner fechas inconsistentes con el historial de cambios'],
    order: 1
  },
  {
    id: 'goal-context',
    name: 'Goal / Contexto',
    purpose: 'Describe el problema a resolver, el usuario objetivo y el valor de negocio.',
    fields: ['goal: qué se espera lograr', 'target user: quién usará esta feature', 'business value: por qué es importante'],
    example: '## Goal\nPermitir a los usuarios iniciar sesión con email y contraseña.\n\n## Target User\nUsuarios registrados del sistema.\n\n## Business Value\nReducir fricción en el acceso a la plataforma.',
    commonMistakes: ['Confundir goal con implementación ("usar JWT") en lugar de comportamiento ("el usuario puede autenticarse")', 'No definir el usuario objetivo claramente'],
    order: 2
  },
  {
    id: 'user-stories',
    name: 'User Stories',
    purpose: 'Historias de usuario priorizadas que describen el feature desde la perspectiva del usuario.',
    fields: ['US-###: título de la historia', 'Priority: P1/P2/P3', 'Description: Como... quiero... para...'],
    example: '### US-001: Inicio de sesión\n**Priority**: P1\nComo usuario registrado, quiero iniciar sesión con mi email y contraseña para acceder al sistema.',
    commonMistakes: ['Escribir historias demasiado técnicas ("como desarrollador...")', 'No priorizar las historias (todo P1)'],
    order: 3
  },
  {
    id: 'acceptance-criteria',
    name: 'Acceptance Criteria',
    purpose: 'Criterios en formato Given/When/Then que definen cuándo la historia está completa y correcta.',
    fields: ['Scenario: nombre del escenario', 'Given: precondiciones', 'When: acción', 'Then: resultado esperado'],
    example: '#### Scenario: Login exitoso\n**Given** un usuario registrado con email "test@example.com" y contraseña "123456"\n**When** el usuario ingresa credenciales correctas\n**Then** el sistema redirige al dashboard',
    commonMistakes: ['Escribir criterios no medibles ("debe funcionar rápido")', 'Mezclar implementación en los criterios ("el endpoint POST /login devuelve 200")'],
    order: 4
  },
  {
    id: 'edge-cases',
    name: 'Edge Cases',
    purpose: 'Escenarios límite, errores y condiciones especiales que la spec debe contemplar.',
    fields: ['Escenario: descripción del edge case', 'Impacto: alto/medio/bajo', 'Probabilidad: alta/media/baja'],
    example: '#### Edge Case: Intento de login con email no verificado\n**Impacto**: Alto\n**Probabilidad**: Media\n**Comportamiento esperado**: El sistema rechaza el acceso y muestra mensaje "Verifica tu email antes de iniciar sesión"',
    commonMistakes: ['Solo documentar happy paths', 'No priorizar edge cases por impacto y probabilidad'],
    order: 5
  },
  {
    id: 'open-questions',
    name: 'Open Questions',
    purpose: 'Preguntas sin resolver que necesitan clarificación antes de pasar a la siguiente fase.',
    fields: ['Pregunta: qué necesita clarificación', 'Responsable: quién debe responder', 'Estado: pendiente/resuelta'],
    example: '#### Open Question\n**Pregunta**: ¿Debemos soportar inicio de sesión con Google?\n**Responsable**: Product Owner\n**Estado**: Pendiente',
    commonMistakes: ['No resolverlas antes de pasar a implementación', 'No asignar un responsable claro'],
    order: 6
  }
];

const gwtExamples = [
  {
    id: 'login-success',
    description: 'Login exitoso',
    given: 'un usuario registrado con email "test@example.com" y contraseña válida',
    when: 'el usuario ingresa email y contraseña correctos',
    then: 'el sistema lo redirige al dashboard',
    tags: ['happy-path'],
    quality: 'good'
  },
  {
    id: 'login-success-bad',
    description: 'Login exitoso',
    given: 'the user is in the database',
    when: 'they log in',
    then: 'it works',
    tags: ['happy-path'],
    quality: 'bad'
  },
  {
    id: 'login-wrong-password',
    description: 'Login con contraseña incorrecta',
    given: 'un usuario registrado con email "test@example.com"',
    when: 'el usuario ingresa una contraseña incorrecta 3 veces consecutivas',
    then: 'el sistema bloquea la cuenta por 15 minutos y notifica al usuario por email',
    tags: ['edge-case', 'security'],
    quality: 'good'
  },
  {
    id: 'login-wrong-password-bad',
    description: 'Login con contraseña incorrecta',
    given: 'un usuario existe',
    when: 'pone mal la contraseña',
    then: 'el sistema muestra error',
    tags: ['edge-case', 'security'],
    quality: 'bad'
  },
  {
    id: 'login-empty-fields',
    description: 'Login con campos vacíos',
    given: 'un usuario en la página de login',
    when: 'el usuario hace clic en "Iniciar sesión" sin completar email ni contraseña',
    then: 'el sistema muestra mensajes de validación: "El email es requerido" y "La contraseña es requerida"',
    tags: ['edge-case'],
    quality: 'good'
  },
  {
    id: 'login-empty-fields-bad',
    description: 'Login con campos vacios',
    given: 'usuario en login',
    when: 'da click sin llenar',
    then: 'no pasa nada',
    tags: ['edge-case'],
    quality: 'bad'
  }
];

const edgeCaseTechniques = [
  {
    id: 'boundary',
    name: 'Límites (Boundary Values)',
    description: 'Identificar valores en los bordes del dominio permitido: mínimo, máximo, justo antes del límite, justo después.',
    guideQuestions: ['¿Cuál es el valor mínimo permitido? ¿Qué pasa si usamos ese valor?', '¿Cuál es el valor máximo permitido? ¿Qué pasa si lo excedemos?', '¿Hay campos de texto con longitud máxima? ¿Qué pasa si enviamos exactamente ese límite, un carácter más, uno menos?'],
    example: 'Si un campo acepta entre 1 y 100 caracteres, probar: 0, 1, 50, 100, 101 caracteres.',
    category: 'boundary'
  },
  {
    id: 'negation',
    name: 'Negaciones (Qué NO debería pasar)',
    description: 'Preguntarse qué acciones no debería poder realizar el usuario y verificar que el sistema las impide.',
    guideQuestions: ['¿Qué acciones deberían estar prohibidas para este tipo de usuario?', '¿Qué pasa si un usuario no autenticado intenta acceder?', '¿Qué pasa si se envía un ID que no pertenece al usuario autenticado?'],
    example: 'Para un endpoint de eliminar cuenta: verificar que un usuario no pueda eliminar la cuenta de otro usuario.',
    category: 'negation'
  },
  {
    id: 'empty',
    name: 'Estados Vacíos (Null / Empty)',
    description: 'Probar qué sucede cuando los datos están vacíos, son nulos o no existen.',
    guideQuestions: ['¿Qué muestra el sistema cuando una lista está vacía?', '¿Qué pasa si no hay resultados en una búsqueda?', '¿Qué ocurre si un campo opcional no se envía?'],
    example: 'Para un dashboard: ver que muestre "No hay datos disponibles" en lugar de romperse o quedar en blanco.',
    category: 'empty'
  },
  {
    id: 'error',
    name: 'Errores (Timeout, Caídas, Red)',
    description: 'Simular fallos externos: timeout de red, servicio caído, respuesta inválida.',
    guideQuestions: ['¿Qué pasa si el servicio de email no responde?', '¿Cómo se comporta la UI si una API tarda más de 30 segundos?', '¿Qué mensaje ve el usuario si hay un error interno del servidor?'],
    example: 'Para un formulario de registro: verificar que si el servicio de verificación de email falla, el usuario ve "Error al verificar email. Intenta más tarde" y no pierde los datos ingresados.',
    category: 'error'
  },
  {
    id: 'concurrency',
    name: 'Concurrencia (Datos Compartidos)',
    description: 'Probar qué sucede cuando múltiples usuarios o procesos acceden al mismo dato simultáneamente.',
    guideQuestions: ['¿Qué pasa si dos usuarios intentan editar el mismo recurso al mismo tiempo?', '¿Qué ocurre si se envía la misma solicitud dos veces (idempotencia)?', '¿Hay condiciones de carrera al crear/actualizar registros?'],
    example: 'Para un carrito de compras: verificar que si dos usuarios administradores intentan asignar el mismo ticket, solo uno lo obtiene y el otro recibe un mensaje "Ya fue asignado por otro agente".',
    category: 'concurrency'
  }
];

const specExamples = [
  {
    id: 'good-spec',
    type: 'good',
    title: 'Spec Bien Escrita',
    content: `---
feature: user-registration
author: Ana López
created: 2026-05-01
status: Draft
---

## Goal
Permitir a nuevos usuarios registrarse en el sistema con email y contraseña.

## Target User
Visitantes del sitio web sin cuenta registrada.

## Business Value
Aumentar la base de usuarios del sistema.

### US-001: Registro exitoso
**Priority**: P1
Como visitante del sitio, quiero registrarme con email y contraseña para acceder al sistema.

#### Scenario: Registro exitoso
**Given** un visitante en la página de registro
**When** completa email válido, contraseña de 8+ caracteres y acepta términos
**Then** el sistema crea la cuenta, envía email de verificación y redirige al dashboard

#### Scenario: Email duplicado
**Given** un email ya registrado en el sistema
**When** un visitante intenta registrarse con ese email
**Then** el sistema muestra "Este email ya está registrado. ¿Quieres iniciar sesión?"

### Edge Cases
- **Escenario**: Contraseña demasiado corta
  **Impacto**: Alto | **Probabilidad**: Alta
  **Comportamiento**: El sistema valida en cliente y servidor: "La contraseña debe tener al menos 8 caracteres"

- **Escenario**: Timeout en servicio de email de verificación
  **Impacto**: Medio | **Probabilidad**: Baja
  **Comportamiento**: La cuenta se crea pero se marca "email no verificado". El sistema reintenta el envío 3 veces.

### Open Questions
- **Pregunta**: ¿Debemos enviar email de bienvenida además del de verificación?
  **Responsable**: Product Owner | **Estado**: Pendiente`,
    annotations: [
      { lineStart: 1, lineEnd: 6, type: 'positive', text: 'Frontmatter completo con todos los metadatos necesarios' },
      { lineStart: 8, lineEnd: 8, type: 'positive', text: 'Goal claro: qué hace la feature, no cómo' },
      { lineStart: 13, lineEnd: 13, type: 'positive', text: 'Business Value: explica el porqué del feature' },
      { lineStart: 17, lineEnd: 18, type: 'positive', text: 'User Story con prioridad clara y descripción usuario-céntrica' },
      { lineStart: 21, lineEnd: 24, type: 'positive', text: 'Given/When/Then correcto: precondición específica, acción concreta, resultado verificable' },
      { lineStart: 26, lineEnd: 29, type: 'positive', text: 'Edge case documentado: qué pasa con email duplicado' },
      { lineStart: 34, lineEnd: 34, type: 'positive', text: 'Comportamiento exacto, no genérico ("muestra mensaje específico")' },
      { lineStart: 38, lineEnd: 41, type: 'positive', text: 'Edge case con impacto, probabilidad y comportamiento definido' }
    ]
  },
  {
    id: 'bad-spec',
    type: 'bad',
    title: 'Spec Mal Escrita',
    content: `---
feature: registro
author: 
created: 
---

## Goal
Hacer un registro de usuarios.

## Lo que necesita
- Pantalla de registro
- Que guarde en BD
- Validar datos

## Requisitos
- El usuario se puede registrar
- Manda correo
- Validar que no esté duplicado

### Escenarios
**Given** usuario en pagina
**When** se registra
**Then** se crea la cuenta

**Given** usuario existe
**When** trata de registrarse
**Then** error`,
    annotations: [
      { lineStart: 1, lineEnd: 4, type: 'negative', text: 'Frontmatter incompleto: falta autor, fecha y status. No trazable' },
      { lineStart: 6, lineEnd: 6, type: 'negative', text: 'Goal vago: "Hacer un registro" no describe comportamiento ni valor' },
      { lineStart: 8, lineEnd: 11, type: 'negative', text: 'Se mezcla implementación ("que guarde en BD") con comportamiento. También es demasiado vago' },
      { lineStart: 14, lineEnd: 16, type: 'negative', text: '"Validar datos" no dice qué validar. Sin criterios medibles' },
      { lineStart: 18, lineEnd: 21, type: 'negative', text: 'Given sin precondición específica, When sin acción concreta, Then sin resultado verificable. Falta contexto de la página, datos específicos y comportamiento exacto' },
      { lineStart: 23, lineEnd: 26, type: 'negative', text: '"Error" no es un resultado verificable. ¿Qué error? ¿Qué mensaje? ¿Qué color?' }
    ]
  }
];

// --- Phase 3-6: Rendering & Interactivity ---

function init() {
  renderAnatomyDiagram();
  initAnatomy();
  renderGWTExamples();
  renderComplexPatterns();
  renderEdgeCaseTechniques();
  renderSpecExamples();
}

function renderAnatomyDiagram() {
  const container = document.getElementById('anatomy-diagram');
  if (!container) return;

  container.innerHTML = specSections.map(section => `
    <div class="spec-diagram__item" data-section="${section.id}">
      <button class="spec-diagram__toggle" type="button" aria-expanded="false" aria-controls="detail-${section.id}">
        <span class="spec-diagram__order">${section.order}</span>
        <span class="spec-diagram__name">${section.name}</span>
        <svg class="spec-diagram__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="spec-diagram__detail" id="detail-${section.id}" role="region" aria-labelledby="${section.id}-toggle">
        <div class="spec-diagram__detail-inner">
          <h4>Propósito</h4>
          <p>${section.purpose}</p>
          <h4>Campos</h4>
          <ul>${section.fields.map(f => `<li><code>${f}</code></li>`).join('')}</ul>
          <h4>Ejemplo</h4>
          <pre><code>${escapeHtml(section.example)}</code></pre>
          ${section.commonMistakes.length > 0 ? `
            <div class="spec-diagram__mistake">
              <strong>Error común:</strong> ${section.commonMistakes[0]}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function initAnatomy() {
  const container = document.getElementById('anatomy-diagram');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const toggle = e.target.closest('.spec-diagram__toggle');
    if (!toggle) return;

    const item = toggle.closest('.spec-diagram__item');
    if (!item) return;

    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    item.classList.toggle('spec-diagram__item--expanded', !isExpanded);
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const toggle = e.target.closest('.spec-diagram__toggle');
      if (toggle) {
        e.preventDefault();
        toggle.click();
      }
    }
  });
}

function renderGWTExamples() {
  const container = document.getElementById('gwt-examples');
  if (!container) return;

  const good = gwtExamples.filter(e => e.quality === 'good');
  const bad = gwtExamples.filter(e => e.quality === 'bad');

  container.innerHTML = `
    <div class="gwt-comparison">
      <div class="gwt-card gwt-card--good">
        <h5>Bien escrito</h5>
        ${good.map(sc => `
          <div class="gwt-card__item">
            <strong>${sc.description}</strong>
            <p><b>Given</b> ${sc.given}</p>
            <p><b>When</b> ${sc.when}</p>
            <p><b>Then</b> ${sc.then}</p>
            <div class="gwt-card__explanation">Tags: ${sc.tags.join(', ')}</div>
          </div>
        `).join('')}
      </div>
      <div class="gwt-card gwt-card--bad">
        <h5>Mal escrito</h5>
        ${bad.map(sc => `
          <div class="gwt-card__item">
            <strong>${sc.description}</strong>
            <p><b>Given</b> ${sc.given}</p>
            <p><b>When</b> ${sc.when}</p>
            <p><b>Then</b> ${sc.then}</p>
            <div class="gwt-card__explanation">Tags: ${sc.tags.join(', ')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderComplexPatterns() {
  const container = document.getElementById('gwt-patterns');
  if (!container) return;

  const patterns = [
    {
      title: 'Tablas de Ejemplos',
      description: 'Cuando un escenario aplica con múltiples variaciones de datos, usa tablas de ejemplos en lugar de repetir escenarios.',
      code: 'Scenario Outline: Validación de email\nGiven un visitante en la página de registro\nWhen ingresa el email "<email>"\nThen el sistema muestra "<mensaje>"\n\nExamples:\n| email | mensaje |\n| usuario@empresa.com | Formato válido |\n| usuario@ | Email inválido: falta dominio |\n| @empresa.com | Email inválido: falta usuario |'
    },
    {
      title: 'AND / OR en Given/When/Then',
      description: 'Múltiples condiciones se separan con And/But para mantener legibilidad. Evita conditions con "y" concatenados.',
      code: 'Given un usuario autenticado\nAnd el usuario tiene un carrito con productos\nWhen el usuario procede al checkout\nAnd el usuario ingresa una dirección de envío\nThen el sistema calcula el total\nAnd el sistema muestra el resumen del pedido'
    },
    {
      title: 'Manejo de Excepciones',
      description: 'Para escenarios de error captura la excepción y describe el comportamiento esperado, no el error técnico.',
      code: 'Given un servicio de pagos no disponible\nWhen el usuario intenta pagar\nThen el sistema muestra "El servicio de pagos no está disponible. Intenta más tarde"\nAnd el sistema no cobra al usuario'
    }
  ];

  container.innerHTML = patterns.map(p => `
    <div class="pattern-card">
      <h5>${p.title}</h5>
      <p>${p.description}</p>
      <pre><code>${escapeHtml(p.code)}</code></pre>
    </div>
  `).join('');
}

function renderEdgeCaseTechniques() {
  const container = document.getElementById('edgecase-techniques');
  if (!container) return;

  container.innerHTML = edgeCaseTechniques.map(tech => `
    <details class="technique-card">
      <summary>${tech.name}</summary>
      <div class="technique-card__body">
        <p>${tech.description}</p>
        <h5>Preguntas guía</h5>
        <ul>${tech.guideQuestions.map(q => `<li>${q}</li>`).join('')}</ul>
        <h5>Ejemplo</h5>
        <div class="technique-card__example">${tech.example}</div>
      </div>
    </details>
  `).join('');
}

function renderSpecExamples() {
  const container = document.getElementById('examples-content');
  const tabs = document.querySelectorAll('.examples-tab');
  if (!container) return;

  function showExample(type) {
    tabs.forEach(t => t.classList.remove('examples-tab--active'));
    const activeTab = Array.from(tabs).find(t => t.dataset.type === type);
    if (activeTab) activeTab.classList.add('examples-tab--active');

    const bothContainers = container.querySelectorAll('.example-container');
    bothContainers.forEach(c => c.classList.remove('example-container--active'));
    container.classList.remove('examples-content--both');

    if (type === 'both') {
      container.classList.add('examples-content--both');
      const goodEl = document.getElementById('example-good');
      const badEl = document.getElementById('example-bad');
      if (goodEl) goodEl.classList.add('example-container--active');
      if (badEl) badEl.classList.add('example-container--active');
    } else {
      const el = document.getElementById(`example-${type}`);
      if (el) el.classList.add('example-container--active');
    }
  }

  container.innerHTML = specExamples.map(ex => `
    <div class="example-container${ex.type === 'good' ? ' example-container--active' : ''}" id="example-${ex.type}">
      <div class="example-view">
        <div class="example-view__header example-view__header--${ex.type}">
          ${ex.title}
        </div>
        <div class="example-view__body">
          ${escapeHtml(ex.content)}
          ${ex.annotations.map(a => `
            <span class="annotation annotation--${a.type}">${escapeHtml(a.text)}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => showExample(tab.dataset.type));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') showExample(tab.dataset.type);
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', init);
