const COLLAB_PHASES = [
  { id: 'specify', name: 'Specify', order: 1, humanRole: 'Spec Writer', aiRole: 'AI Spec Assistant',
    artifact: 'spec.md', supervisionSummary: 'Revisar que los criterios de aceptación reflejen necesidades reales del negocio',
    accentColor: '#4A90E2' },
  { id: 'clarify', name: 'Clarify', order: 2, humanRole: 'Spec Writer + Reviewer', aiRole: 'AI Spec Assistant',
    artifact: 'spec.md (clarified)', supervisionSummary: 'Validar que cada respuesta aclaratoria tenga sentido de negocio',
    accentColor: '#50E3C2' },
  { id: 'plan', name: 'Plan', order: 3, humanRole: 'Developer', aiRole: 'AI Code Generator',
    artifact: 'plan.md, data-model.md', supervisionSummary: 'Verificar que el diseño cumpla con la constitución SDD',
    accentColor: '#F5A623' },
  { id: 'tasks', name: 'Tasks', order: 4, humanRole: 'Developer', aiRole: 'AI Code Generator',
    artifact: 'tasks.md', supervisionSummary: 'Revisar granularidad y completitud de cada tarea',
    accentColor: '#D0021B' },
  { id: 'implement', name: 'Implement', order: 5, humanRole: 'Developer', aiRole: 'AI Code Generator + AI Reviewer',
    artifact: 'Código funcional, tests pasando', supervisionSummary: 'Verificar cada tarea contra los criterios de aceptación de la spec',
    accentColor: '#7ED321' },
];

const COLLAB_PROMPTS = [
  {
    id: 'gen-spec-draft',
    name: 'Generar draft de spec',
    phaseId: 'specify',
    aiRole: 'AI Spec Assistant',
    prompt: 'Escribe una especificación funcional para {{feature}} con historias de usuario en formato Given/When/Then. Incluye: objetivo, alcance, criterios de aceptación para el happy path y al menos 2 edge cases.',
    exampleOutput: '### User Story 1 - Login\n\n**Given** un usuario registrado\n**When** ingresa email y contraseña válidos\n**Then** accede al dashboard',
  },
  {
    id: 'suggest-acceptance',
    name: 'Sugerir criterios de aceptación',
    phaseId: 'specify',
    aiRole: 'AI Spec Assistant',
    prompt: 'Para la historia de usuario "{{story}}", genera 5 criterios de aceptación en formato Given/When/Then que cubran: happy path, validación de datos, error handling, edge case y seguridad.',
    exampleOutput: '1. **Given** datos válidos **When** se envía el formulario **Then** se guarda el registro\n2. **Given** email inválido **When** se envía **Then** muestra error de validación',
  },
  {
    id: 'identify-ambiguities',
    name: 'Identificar ambigüedades',
    phaseId: 'clarify',
    aiRole: 'AI Spec Assistant',
    prompt: 'Revisa esta spec y lista ambigüedades: {{specText}}. Para cada ambigüedad, sugiere una pregunta de clarificación específica.',
    exampleOutput: '1. No se especifica qué pasa si el usuario ya existe → ¿Se debe rechazar el registro o actualizar el existente?',
  },
  {
    id: 'suggest-questions',
    name: 'Generar preguntas de clarificación',
    phaseId: 'clarify',
    aiRole: 'AI Spec Assistant',
    prompt: 'Para la siguiente spec, genera 3 preguntas estructuradas de clarificación priorizadas por impacto: scope > seguridad > UX. {{specText}}',
    exampleOutput: '1. **Scope**: ¿El sistema debe soportar usuarios anónimos o solo registrados?\n2. **Seguridad**: ¿Hay límite de intentos de login?',
  },
  {
    id: 'design-architecture',
    name: 'Diseñar arquitectura',
    phaseId: 'plan',
    aiRole: 'AI Code Generator',
    prompt: 'Para la siguiente spec, diseña una arquitectura técnica: estructura de archivos, modelos de datos, contratos de interfaces y decisiones tecnológicas. {{specText}}',
    exampleOutput: '### Estructura de Archivos\n```\nsrc/\n├── models/\n│   └── user.js\n├── services/\n│   └── auth.js\n```',
  },
  {
    id: 'evaluate-constitution',
    name: 'Evaluar constitución',
    phaseId: 'plan',
    aiRole: 'AI Code Generator',
    prompt: 'Revisa el siguiente plan contra la constitución del proyecto ({{constitution}}). Identifica violaciones y sugiere alternativas que cumplan.',
    exampleOutput: '### Gate Check\n- Vanilla-First: ✅ PASS\n- Semantic HTML: ⚠️ El plan incluye un div sin semántica clara → Sugiero reemplazar con <section>',
  },
  {
    id: 'decompose-tasks',
    name: 'Descomponer en tareas',
    phaseId: 'tasks',
    aiRole: 'AI Code Generator',
    prompt: 'Descompón el siguiente plan en tareas implementables. Cada tarea debe: tener un ID único, incluir la ruta exacta del archivo, y ser completable en 1-4 horas. {{planText}}',
    exampleOutput: '- [ ] T001 Crear modelo User en src/models/user.js\n- [ ] T002 Implementar AuthService en src/services/auth.js',
  },
  {
    id: 'identify-parallelism',
    name: 'Identificar paralelismo',
    phaseId: 'tasks',
    aiRole: 'AI Code Generator',
    prompt: 'Revisa la siguiente lista de tareas e identifica cuáles pueden ejecutarse en paralelo. Marca con [P] las que no compartan archivos ni dependencias. {{tasksList}}',
    exampleOutput: '- [ ] T001 [P] Crear modelo User (no comparte archivos con otras tareas)\n- [ ] T002 [P] Crear modelo Product (independiente de T001)',
  },
  {
    id: 'generate-code',
    name: 'Generar código de tarea',
    phaseId: 'implement',
    aiRole: 'AI Code Generator',
    prompt: 'Implementa la tarea {{taskDescription}}. Sigue el plan de arquitectura: {{planRef}}. Incluye solo el código necesario, sin comentarios salvo para secciones complejas.',
    exampleOutput: '```javascript\nfunction validateEmail(email) {\n  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return re.test(email);\n}\n```',
  },
  {
    id: 'review-code',
    name: 'Revisar código',
    phaseId: 'implement',
    aiRole: 'AI Reviewer',
    prompt: 'Revisa el siguiente código por: bugs, vulnerabilidades, adherencia a la spec, y estilo. {{codeBlock}}',
    exampleOutput: '### Revisión\n1. ⚠️ Posible XSS: la variable name se renderiza sin escape en línea 23\n2. ✅ La lógica de negocio coincide con la spec',
  },
  {
    id: 'verify-acceptance',
    name: 'Verificar contra spec',
    phaseId: 'implement',
    aiRole: 'AI Reviewer',
    prompt: 'Verifica que la siguiente implementación cumple todos los criterios de aceptación de la spec. {{codeBlock}} vs {{specText}}',
    exampleOutput: '### Verificación\n- AC1 Login exitoso: ✅ PASS\n- AC2 Email inválido: ✅ PASS\n- AC3 Cuenta bloqueada: ❌ FAIL — No se implementó el límite de intentos',
  },
];

const COLLAB_SUPERVISION_POINTS = [
  { id: 'spec-acceptance', phaseId: 'specify', description: 'Los criterios de aceptación cubren todos los escenarios clave (happy path + errores)', order: 1 },
  { id: 'spec-edge-cases', phaseId: 'specify', description: 'Los edge cases están identificados y documentados en la spec', order: 2 },
  { id: 'spec-business', phaseId: 'specify', description: 'La spec refleja necesidades reales del negocio, no solo deseos técnicos', order: 3 },
  { id: 'clarify-answers', phaseId: 'clarify', description: 'Cada respuesta de clarificación tiene sentido de negocio y es accionable', order: 1 },
  { id: 'clarify-decisions', phaseId: 'clarify', description: 'Las decisiones tomadas están documentadas con contexto y alternativas', order: 2 },
  { id: 'plan-constitution', phaseId: 'plan', description: 'El plan cumple con todos los principios constitucionales del proyecto', order: 1 },
  { id: 'plan-architecture', phaseId: 'plan', description: 'La arquitectura propuesta es la mínima necesaria para resolver el problema', order: 2 },
  { id: 'tasks-granularity', phaseId: 'tasks', description: 'Cada tarea es granular (1-4 horas) y tiene una ruta de archivo exacta', order: 1 },
  { id: 'tasks-completeness', phaseId: 'tasks', description: 'No hay tareas faltantes ni duplicadas — la descomposición es completa', order: 2 },
  { id: 'impl-vs-spec', phaseId: 'implement', description: 'Cada tarea implementada se verifica contra los criterios de aceptación de la spec', order: 1 },
  { id: 'impl-quality', phaseId: 'implement', description: 'El código generado por IA se revisa por bugs, vulnerabilidades y estilo', order: 2 },
  { id: 'impl-tests', phaseId: 'implement', description: 'Las pruebas unitarias pasan antes de marcar la tarea como completada', order: 3 },
];

const COLLAB_PHASE_NAMES = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
const COLLAB_AI_ROLES = ['AI Spec Assistant', 'AI Code Generator', 'AI Reviewer'];
const COLLAB_STORAGE_KEY = 'sdd-collab-progress';

class CollaborationFlow {
  constructor() {
    this.state = this.load();
    this.activeTab = 'collaboration';
    this.promptFilterPhase = 'all';
    this.promptFilterRole = 'all';
    this.storageNoticeShown = false;
  }

  init() {
    this.renderDiagram();
    this.setupPhaseClick();
    this.selectPhase(this.state.activePhase || 'specify');
    this.setupStorageNotice();
  }

  renderDiagram() {
    const container = document.getElementById('collab-flow-diagram');
    if (!container) return;

    container.innerHTML = '';
    const completedPhases = this.getCompletedPhases();

    COLLAB_PHASES.forEach((phase, index) => {
      const card = document.createElement('div');
      card.className = 'collab-flow__phase-card';
      card.dataset.phase = phase.id;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${phase.name} - Fase ${phase.order}`);

      const isActive = this.state.activePhase === phase.id;
      const isCompleted = completedPhases.includes(phase.id);

      if (isActive) card.classList.add('collab-flow__phase-card--active');
      if (isCompleted) card.classList.add('collab-flow__phase-card--completed');

      const statusText = isCompleted ? 'Completado' : (isActive ? 'Activo' : 'Pendiente');
      const statusClass = isCompleted ? 'completed' : (isActive ? 'active' : 'pending');

      card.innerHTML = `
        <span class="collab-flow__phase-number">Fase ${phase.order}</span>
        <span class="collab-flow__phase-name">${phase.name}</span>
        <span class="collab-flow__phase-status collab-flow__phase-status--${statusClass}">${statusText}</span>
      `;

      container.appendChild(card);

      if (index < COLLAB_PHASES.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'collab-flow__arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        container.appendChild(arrow);
      }
    });
  }

  getCompletedPhases() {
    return COLLAB_PHASES.filter((phase) => {
      const points = COLLAB_SUPERVISION_POINTS.filter((p) => p.phaseId === phase.id);
      if (points.length === 0) return false;
      const phaseState = this.state.supervision[phase.id] || {};
      return points.every((p) => phaseState[p.id] === true);
    }).map((p) => p.id);
  }

  setupPhaseClick() {
    const container = document.getElementById('collab-flow-diagram');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.collab-flow__phase-card');
      if (card) this.selectPhase(card.dataset.phase);
    });

    container.addEventListener('keydown', (e) => {
      const card = e.target.closest('.collab-flow__phase-card');
      if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.selectPhase(card.dataset.phase);
      }
    });
  }

  selectPhase(phaseId) {
    this.state.activePhase = phaseId;
    this.activeTab = 'collaboration';
    this.save();

    document.querySelectorAll('.collab-flow__phase-card').forEach((card) => {
      card.classList.toggle('collab-flow__phase-card--active', card.dataset.phase === phaseId);
    });

    this.renderPanel(phaseId);
  }

  renderPanel(phaseId) {
    const panel = document.getElementById('collab-flow-panel');
    if (!panel) return;

    const phase = COLLAB_PHASES.find((p) => p.id === phaseId);
    if (!phase) {
      panel.innerHTML = '<p class="collab-flow__empty-phase">Selecciona una fase para ver los detalles de colaboración.</p>';
      return;
    }

    panel.innerHTML = `
      <div class="collab-flow__panel-header">
        <h3 class="collab-flow__panel-title">Fase ${phase.order}: ${phase.name}</h3>
        <p class="collab-flow__panel-subtitle">Colaboración Humano-IA en esta fase del proceso SDD</p>
      </div>
      <div class="collab-flow__tabs" role="tablist">
        <button class="collab-flow__tab collab-flow__tab--active" role="tab" aria-selected="true" data-tab="collaboration">Colaboración</button>
        <button class="collab-flow__tab" role="tab" aria-selected="false" data-tab="prompts">Prompts</button>
        <button class="collab-flow__tab" role="tab" aria-selected="false" data-tab="supervision">Supervisión</button>
      </div>
      <div class="collab-flow__tab-content collab-flow__tab-content--visible" data-tab-content="collaboration">
        ${this.renderCollaborationTab(phaseId)}
      </div>
      <div class="collab-flow__tab-content" data-tab-content="prompts">
        ${this.renderPromptsTab(phaseId)}
      </div>
      <div class="collab-flow__tab-content" data-tab-content="supervision">
        ${this.renderSupervisionTab(phaseId)}
      </div>
    `;

    this.setupTabListeners(panel);
    this.setupSupervisionCheckboxes(panel, phaseId);
    this.setupPromptDetails(panel);
  }

  renderCollaborationTab(phaseId) {
    const phase = COLLAB_PHASES.find((p) => p.id === phaseId);
    if (!phase) return '';

    return `
      <div class="collab-flow__info-grid">
        <div class="collab-flow__info-item">
          <span class="collab-flow__info-label">Rol Humano</span>
          <span class="collab-flow__info-value">${phase.humanRole}</span>
          <span class="collab-flow__info-desc">Responsable principal de esta fase</span>
        </div>
        <div class="collab-flow__info-item">
          <span class="collab-flow__info-label">Rol IA</span>
          <span class="collab-flow__info-value">${phase.aiRole}</span>
          <span class="collab-flow__info-desc">Asistente inteligente que apoya la fase</span>
        </div>
        <div class="collab-flow__info-item">
          <span class="collab-flow__info-label">Artefacto Producido</span>
          <span class="collab-flow__info-value">${phase.artifact}</span>
          <span class="collab-flow__info-desc">Entregable generado en esta fase</span>
        </div>
        <div class="collab-flow__info-item">
          <span class="collab-flow__info-label">Supervisión</span>
          <span class="collab-flow__info-value">Revisión requerida</span>
          <span class="collab-flow__info-desc">${phase.supervisionSummary}</span>
        </div>
      </div>
    `;
  }

  renderPromptsTab(phaseId) {
    const phasePrompts = COLLAB_PROMPTS.filter((p) => p.phaseId === phaseId);
    if (phasePrompts.length === 0) {
      return '<p class="collab-flow__empty-phase">No hay prompts definidos para esta fase.</p>';
    }

    return `
      <div class="collab-flow__prompt-list">
        ${phasePrompts.map((prompt) => `
          <div class="collab-flow__prompt-item">
            <details class="collab-flow__prompt-details">
              <summary class="collab-flow__prompt-summary">
                <span>${prompt.name}</span>
                <span class="collab-flow__prompt-badge">${prompt.aiRole}</span>
              </summary>
              <div class="collab-flow__prompt-detail">
                <p><span class="collab-flow__prompt-label">Rol IA:</span> ${prompt.aiRole}</p>
                <p><span class="collab-flow__prompt-label">Fase:</span> ${COLLAB_PHASES.find((p) => p.id === prompt.phaseId)?.name || prompt.phaseId}</p>
                <p><span class="collab-flow__prompt-label">Prompt:</span></p>
                <pre>${prompt.prompt}</pre>
                <p><span class="collab-flow__prompt-label">Ejemplo de salida:</span></p>
                <pre>${prompt.exampleOutput}</pre>
              </div>
            </details>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderSupervisionTab(phaseId) {
    const points = COLLAB_SUPERVISION_POINTS.filter((p) => p.phaseId === phaseId);
    if (points.length === 0) {
      return '<p class="collab-flow__empty-phase">No hay puntos de supervisión definidos para esta fase.</p>';
    }

    const phaseState = this.state.supervision[phaseId] || {};
    const checked = points.filter((p) => phaseState[p.id] === true).length;
    const pct = Math.round((checked / points.length) * 100);

    let statusClass = 'pending';
    let statusLabel = 'Pendiente';
    if (checked === points.length) {
      statusClass = 'complete';
      statusLabel = '✓ Supervisado';
    } else if (checked > 0) {
      statusClass = 'partial';
      statusLabel = '⚠ Supervisado parcialmente';
    }

    return `
      <span class="collab-flow__supervision-status collab-flow__supervision-status--${statusClass}">${statusLabel}</span>
      <div class="collab-flow__supervision-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de supervisión">
        <div class="collab-flow__supervision-progress-fill" style="width: ${pct}%"></div>
      </div>
      <ul class="collab-flow__supervision-list">
        ${points.map((point) => {
          const isChecked = phaseState[point.id] === true;
          return `
            <li class="collab-flow__supervision-item">
              <input type="checkbox" class="collab-flow__supervision-checkbox" id="sp-${point.id}" data-point-id="${point.id}" ${isChecked ? 'checked' : ''}>
              <label for="sp-${point.id}" class="collab-flow__supervision-label ${isChecked ? 'collab-flow__supervision-label--checked' : ''}">${point.description}</label>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  setupTabListeners(panel) {
    const tabs = panel.querySelectorAll('.collab-flow__tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        this.activeTab = tabName;

        tabs.forEach((t) => {
          t.classList.toggle('collab-flow__tab--active', t.dataset.tab === tabName);
          t.setAttribute('aria-selected', t.dataset.tab === tabName ? 'true' : 'false');
        });

        const contents = panel.querySelectorAll('.collab-flow__tab-content');
        contents.forEach((c) => {
          c.classList.toggle('collab-flow__tab-content--visible', c.dataset.tabContent === tabName);
        });
      });
    });
  }

  setupSupervisionCheckboxes(panel, phaseId) {
    const checkboxes = panel.querySelectorAll('.collab-flow__supervision-checkbox');
    checkboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        this.toggleSupervision(phaseId, cb.dataset.pointId, cb.checked);
      });
    });
  }

  toggleSupervision(phaseId, pointId, checked) {
    if (!this.state.supervision[phaseId]) {
      this.state.supervision[phaseId] = {};
    }
    this.state.supervision[phaseId][pointId] = checked;
    this.save();
    this.renderPanel(phaseId);
    this.renderDiagram();
  }

  setupPromptDetails(panel) {
    const details = panel.querySelectorAll('.collab-flow__prompt-details');
    details.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (d.open) {
          this.state.exploredPrompts = this.state.exploredPrompts || [];
          const summary = d.querySelector('.collab-flow__prompt-summary');
          const name = summary?.querySelector('span')?.textContent || '';
          if (!this.state.exploredPrompts.includes(name)) {
            this.state.exploredPrompts.push(name);
            this.save();
          }
        }
      });
    });
  }

  setupStorageNotice() {
    const notice = document.getElementById('collab-flow-storage-notice');
    if (!notice) return;

    const available = this.checkStorage();
    if (!available && !this.storageNoticeShown) {
      notice.classList.add('collab-flow__storage-notice--visible');
      this.storageNoticeShown = true;
    }
  }

  checkStorage() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  save() {
    try {
      this.state.lastUpdated = Date.now();
      localStorage.setItem(COLLAB_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save collaboration progress:', e);
    }
  }

  load() {
    try {
      const saved = localStorage.getItem(COLLAB_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load collaboration progress:', e);
    }
    return this.getDefaultState();
  }

  getDefaultState() {
    return {
      activePhase: 'specify',
      supervision: {},
      exploredPrompts: [],
      lastUpdated: Date.now(),
    };
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const flow = new CollaborationFlow();
    flow.init();
  });
} else {
  const flow = new CollaborationFlow();
  flow.init();
}
