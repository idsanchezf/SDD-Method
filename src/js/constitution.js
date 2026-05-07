const PRINCIPLES = [
  {
    id: 'tech-stack',
    name: 'Stack Tecnológico & Restricciones',
    shortName: 'Stack Tecnológico',
    description: 'Define tecnologías, lenguajes y frameworks permitidos o prohibidos en el proyecto.',
    purpose: 'Elimina la incertidumbre sobre qué herramientas usar, reduce la deuda técnica por adopción no coordinada y facilita la incorporación de nuevos miembros al equipo.',
    appliesTo: ['specify', 'clarify', 'plan'],
    violationConsequences: 'Cada desarrollador usa herramientas distintas, el proyecto acumula dependencias incompatibles y el mantenimiento se vuelve insostenible.',
    complianceExamples: [
      'Documentar lenguajes, frameworks y versiones mínimas en la constitución',
      'Incluir justificación de por qué se eligió cada tecnología',
      'Definir qué tecnologías están explícitamente prohibidas y por qué',
    ],
    icon: 'T',
    accentColor: '#2563eb',
  },
  {
    id: 'architecture-design',
    name: 'Arquitectura & Diseño',
    shortName: 'Arquitectura',
    description: 'Patrones arquitectónicos, organización de código y convenciones de diseño.',
    purpose: 'Asegura consistencia estructural en todo el códigobase, facilita la navegación y permite que múltiples desarrolladores trabajen sin pisarse.',
    appliesTo: ['specify', 'clarify', 'plan', 'tasks'],
    violationConsequences: 'El códigobase se vuelve caótico, cada módulo sigue convenciones distintas y la complejidad crece sin control.',
    complianceExamples: [
      'Definir estructura de directorios y propósito de cada carpeta',
      'Documentar patrones de diseño aceptados (MVC, componentes, etc.)',
      'Establecer convenciones de naming y organización de archivos',
    ],
    icon: 'A',
    accentColor: '#0ea5e9',
  },
  {
    id: 'workflow-governance',
    name: 'Workflow & Gobernanza',
    shortName: 'Workflow',
    description: 'Flujo de trabajo, branching strategy, revisión y aprobación de cambios.',
    purpose: 'Garantiza que todo cambio pase por un proceso predecible y controlado, manteniendo la calidad y la trazabilidad.',
    appliesTo: ['plan', 'tasks', 'implement'],
    violationConsequences: 'Cambios sin revisión llegan a producción, el historial de git se vuelve ilegible y no hay accountability.',
    complianceExamples: [
      'Definir estrategia de branching (feature branches, trunk-based, etc.)',
      'Establecer política de revisiones: número mínimo de aprobadores, criterios de merge',
      'Documentar el ciclo de vida de un cambio: desde la idea hasta el deploy',
    ],
    icon: 'W',
    accentColor: '#22c55e',
  },
  {
    id: 'quality-standards',
    name: 'Estándares de Calidad',
    shortName: 'Calidad',
    description: 'Testing, linting, accesibilidad, rendimiento y seguridad como parte del proceso.',
    purpose: 'Define la línea de calidad mínima que todo código debe cumplir antes de integrarse, automatizando la detección de regresiones.',
    appliesTo: ['plan', 'tasks', 'implement'],
    violationConsequences: 'La calidad depende del criterio individual de cada desarrollador, los bugs aumentan y la deuda técnica se acumula.',
    complianceExamples: [
      'Definir cobertura de tests mínima y tipos de testing requeridos',
      'Establecer herramientas de linting y formato automático',
      'Documentar requisitos de accesibilidad y rendimiento',
    ],
    icon: 'Q',
    accentColor: '#8b5cf6',
  },
  {
    id: 'documentation-communication',
    name: 'Documentación & Comunicación',
    shortName: 'Documentación',
    description: 'Especificaciones, documentación técnica y canales de comunicación del equipo.',
    purpose: 'Asegura que el conocimiento del proyecto sea explícito, accesible y no dependa de la memoria individual de cada miembro.',
    appliesTo: ['specify', 'clarify', 'plan'],
    violationConsequences: 'El conocimiento queda en la cabeza de unos pocos, el onboarding es lento y las decisiones no quedan registradas.',
    complianceExamples: [
      'Toda feature comienza con una spec documentada antes de implementar',
      'Las decisiones técnicas se registran con contexto y alternativas consideradas',
      'Los canales de comunicación y frecuencia de syncs están definidos',
    ],
    icon: 'D',
    accentColor: '#f59e0b',
  },
];

const PHASES = [
  { id: 'specify', name: 'Specify' },
  { id: 'clarify', name: 'Clarify' },
  { id: 'plan', name: 'Plan' },
  { id: 'tasks', name: 'Tasks' },
  { id: 'implement', name: 'Implement' },
];

const STORAGE_KEY = 'sdd-constitution-progress';

class ConstitutionChecker {
  constructor() {
    this.state = this.load();
    this.currentPhase = this.state.activePhase || 'specify';
    this.principleElements = new Map();
  }

  init() {
    this.renderPrinciples();
    this.renderPhaseSelector();
    this.renderChecklist();
    this.setupVerifyButton();
    this.setupResetButton();
    this.renderSummary();
    this.selectPhase(this.currentPhase);
  }

  renderPrinciples() {
    const grid = document.getElementById('principles-grid');
    if (!grid) return;

    grid.innerHTML = '';
    PRINCIPLES.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'principle-card';
      card.id = `principle-${p.id}`;

      const phasesStr = p.appliesTo
        .map((ph) => PHASES.find((ph2) => ph2.id === ph)?.name || ph)
        .join(', ');

      card.innerHTML = `
        <div class="principle-card__header">
          <div class="principle-card__icon" style="background-color: ${p.accentColor}" aria-hidden="true">${p.icon}</div>
          <div class="principle-card__info">
            <h3 class="principle-card__title">${p.name}</h3>
            <p class="principle-card__desc">${p.description}</p>
          </div>
        </div>
        <div class="principle-card__detail">
          <details>
            <summary>Ver detalle</summary>
            <div class="principle-card__detail-content">
              <p><strong>Propósito:</strong> ${p.purpose}</p>
              <p><strong>Aplica en fases:</strong> ${phasesStr}</p>
              <p><strong>Consecuencias de violación:</strong> ${p.violationConsequences}</p>
              <p><strong>Ejemplos de cumplimiento:</strong></p>
              <ul>
                ${p.complianceExamples.map((ex) => `<li>${ex}</li>`).join('')}
              </ul>
            </div>
          </details>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderPhaseSelector() {
    const container = document.getElementById('checker-phase-selector');
    if (!container) return;

    container.innerHTML = '';
    PHASES.forEach((phase) => {
      const btn = document.createElement('button');
      btn.className = 'checker__phase-pill';
      btn.textContent = phase.name;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('data-phase', phase.id);
      btn.addEventListener('click', () => this.selectPhase(phase.id));
      container.appendChild(btn);
    });
  }

  selectPhase(phaseId) {
    this.currentPhase = phaseId;
    this.state.activePhase = phaseId;

    const pills = document.querySelectorAll('.checker__phase-pill');
    pills.forEach((pill) => {
      const isActive = pill.getAttribute('data-phase') === phaseId;
      pill.classList.toggle('checker__phase-pill--active', isActive);
      pill.setAttribute('aria-selected', String(isActive));

      const phaseState = this.state.phases[phaseId];
      const allChecked = phaseState && Object.values(phaseState).every(Boolean);
      const someChecked = phaseState && Object.values(phaseState).some(Boolean);
      pill.classList.toggle('checker__phase-pill--complete', allChecked === true);
    });

    this.renderChecklist();
    this.hideVerdict();
  }

  getPrinciplesForPhase(phaseId) {
    return PRINCIPLES.filter((p) => p.appliesTo.includes(phaseId));
  }

  renderChecklist() {
    const container = document.getElementById('checker-phase-content');
    if (!container) return;

    const applicable = this.getPrinciplesForPhase(this.currentPhase);
    if (applicable.length === 0) {
      container.innerHTML = '<p class="checker__intro">No hay principios aplicables para esta fase.</p>';
      return;
    }

    const list = document.createElement('ul');
    list.className = 'checker__checklist';

    applicable.forEach((p) => {
      const checked = this.state.phases[this.currentPhase]?.[p.id] === true;
      const li = document.createElement('li');
      li.className = 'checker__checklist-item';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'checker__checkbox';
      cb.checked = checked;
      cb.id = `check-${this.currentPhase}-${p.id}`;
      cb.addEventListener('change', () => this.togglePrinciple(p.id));

      const label = document.createElement('label');
      label.className = `checker__label${checked ? ' checker__label--checked' : ''}`;
      label.htmlFor = cb.id;
      label.innerHTML = `<strong>${p.name}:</strong> ${p.description} <span class="checker__label-desc">${p.purpose.substring(0, 80)}…</span>`;

      li.appendChild(cb);
      li.appendChild(label);
      list.appendChild(li);

      this.principleElements.set(p.id, { checkbox: cb, label });
    });

    container.innerHTML = '';
    container.appendChild(list);
  }

  togglePrinciple(principleId) {
    if (!this.state.phases[this.currentPhase]) {
      this.state.phases[this.currentPhase] = {};
    }
    const current = this.state.phases[this.currentPhase][principleId] === true;
    this.state.phases[this.currentPhase][principleId] = !current;

    const el = this.principleElements.get(principleId);
    if (el) {
      el.checkbox.checked = !current;
      el.label.classList.toggle('checker__label--checked', !current);
    }

    this.hideVerdict();
    this.updatePhasePillState();
    this.save();
    this.renderSummary();
  }

  hideVerdict() {
    const verdict = document.getElementById('checker-verdict');
    if (verdict) {
      verdict.classList.remove('checker__verdict--visible');
      verdict.innerHTML = '';
    }
  }

  setupVerifyButton() {
    const btn = document.getElementById('checker-verify-btn');
    if (!btn) return;
    btn.addEventListener('click', () => this.verify());
  }

  verify() {
    const applicable = this.getPrinciplesForPhase(this.currentPhase);
    const phaseState = this.state.phases[this.currentPhase] || {};
    const allChecked = applicable.every((p) => phaseState[p.id] === true);
    const missing = applicable.filter((p) => phaseState[p.id] !== true);

    const verdict = document.getElementById('checker-verdict');
    if (!verdict) return;

    verdict.classList.add('checker__verdict--visible');

    if (allChecked) {
      verdict.className = 'checker__verdict checker__verdict--visible checker__verdict--pass';
      verdict.innerHTML = 'PASS ✓ — Todos los aspectos constitucionales aplicables están cubiertos para esta fase.';
    } else {
      verdict.className = 'checker__verdict checker__verdict--visible checker__verdict--fail';
      const list = missing
        .map(
          (p) =>
            `<a href="#principle-${p.id}" class="checker__verdict-link">${p.name}</a>`
        )
        .join(', ');
      verdict.innerHTML = `FAIL ✗ — Aspectos pendientes: ${list}`;
    }

    this.updatePhasePillState();
    this.save();
    this.renderSummary();
  }

  updatePhasePillState() {
    const pills = document.querySelectorAll('.checker__phase-pill');
    pills.forEach((pill) => {
      const phaseId = pill.getAttribute('data-phase');
      const phaseState = this.state.phases[phaseId];
      const applicable = this.getPrinciplesForPhase(phaseId);
      const allChecked = phaseState && applicable.every((p) => phaseState[p.id] === true);
      pill.classList.toggle('checker__phase-pill--complete', allChecked === true);
    });
  }

  setupResetButton() {
    const btn = document.getElementById('summary-reset-btn');
    if (!btn) return;
    btn.addEventListener('click', () => this.reset());
  }

  reset() {
    if (!confirm('¿Estás seguro de reiniciar todo el progreso?')) return;
    this.state = this.getDefaultState();
    this.currentPhase = 'specify';
    this.state.activePhase = 'specify';
    this.save();
    this.selectPhase('specify');
    this.renderSummary();
    this.updatePhasePillState();
  }

  renderSummary() {
    const container = document.getElementById('summary-phases');
    const fill = document.getElementById('summary-progress-fill');
    const text = document.getElementById('summary-progress-text');
    if (!container) return;

    const { total, checked, applicablePerPhase } = this.computeSummary();

    if (fill && text) {
      const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
      fill.style.width = `${pct}%`;
      text.textContent = `${pct}%`;
      const bar = fill.closest('.summary__progress-bar');
      if (bar) {
        bar.setAttribute('aria-valuenow', pct);
      }
    }

    container.innerHTML = '';
    PHASES.forEach((phase) => {
      const applicable = this.getPrinciplesForPhase(phase.id);
      const phaseState = this.state.phases[phase.id] || {};
      const allChecked = applicable.length > 0 && applicable.every((p) => phaseState[p.id] === true);
      const anyChecked = applicable.some((p) => phaseState[p.id] === true);

      let status = 'pending';
      let label = 'Pendiente';
      if (allChecked) {
        status = 'pass';
        label = '✓ PASS';
      } else if (anyChecked) {
        status = 'fail';
        label = '✗ FAIL';
      }

      const card = document.createElement('div');
      card.className = 'summary__phase-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-phase', phase.id);
      card.setAttribute('aria-label', `${phase.name}: ${label}`);

      if (status === 'fail') {
        card.addEventListener('click', () => this.selectPhase(phase.id));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectPhase(phase.id);
          }
        });
      }

      card.innerHTML = `
        <span class="summary__phase-name">${phase.name}</span>
        <span class="summary__phase-status summary__phase-status--${status}">${label}</span>
      `;
      container.appendChild(card);
    });
  }

  computeSummary() {
    let total = 0;
    let checked = 0;
    const applicablePerPhase = {};

    PHASES.forEach((phase) => {
      const applicable = this.getPrinciplesForPhase(phase.id);
      applicablePerPhase[phase.id] = applicable.length;
      total += applicable.length;
      const phaseState = this.state.phases[phase.id] || {};
      applicable.forEach((p) => {
        if (phaseState[p.id] === true) checked++;
      });
    });

    return { total, checked, applicablePerPhase };
  }

  getDefaultState() {
    return {
      phases: {},
      activePhase: 'specify',
      lastUpdated: Date.now(),
    };
  }

  save() {
    this.state.lastUpdated = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save constitution progress:', e);
    }
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load constitution progress:', e);
    }
    return this.getDefaultState();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const checker = new ConstitutionChecker();
    checker.init();
  });
} else {
  const checker = new ConstitutionChecker();
  checker.init();
}
