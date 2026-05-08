const GATES_STORAGE_KEY = 'sdd-gates-progress';

class GateProgress {
  constructor() {
    this.state = this.load();
  }

  getDefaultState() {
    return { exploredGates: {}, lastUpdated: null };
  }

  getGateState(gateId) {
    if (!this.state.exploredGates[gateId]) {
      this.state.exploredGates[gateId] = {
        gateId,
        explored: false,
        simulationActive: false,
        lastAccessed: null
      };
    }
    return this.state.exploredGates[gateId];
  }

  markExplored(gateId) {
    const gs = this.getGateState(gateId);
    gs.explored = true;
    gs.lastAccessed = Date.now();
    this.save();
  }

  setSimulation(gateId, active) {
    const gs = this.getGateState(gateId);
    gs.simulationActive = active;
    gs.lastAccessed = Date.now();
    this.save();
  }

  isExplored(gateId) {
    const gs = this.getGateState(gateId);
    return gs.explored;
  }

  isSimulating(gateId) {
    const gs = this.getGateState(gateId);
    return gs.simulationActive;
  }

  save() {
    try {
      this.state.lastUpdated = Date.now();
      localStorage.setItem(GATES_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save gate progress:', e);
    }
  }

  load() {
    try {
      const saved = localStorage.getItem(GATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load gate progress:', e);
    }
    return this.getDefaultState();
  }
}

class GatePanel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.progress = new GateProgress();
    this.currentGateId = null;
    this.bodyEl = this.container.querySelector('.gate-panel__body');
    this.closeBtn = this.container.querySelector('.gate-panel__close');
    this.overlay = this.container.querySelector('.gate-panel__overlay');
    this.gateData = null;
    this.rolesData = [];

    this.init();
  }

  init() {
    if (typeof rolesIntegration !== 'undefined') {
      this.rolesData = rolesIntegration;
    }

    this.closeBtn.addEventListener('click', () => this.close());

    this.overlay.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    document.addEventListener('gate:select', (e) => {
      this.openGate(e.detail.gateId);
    });

    document.addEventListener('gate:simulation', (e) => {
      const { gateId, active } = e.detail;
      const gateEl = document.querySelector(`[data-gate-id="${gateId}"]`);
      if (gateEl) {
        gateEl.classList.toggle('diagram-gate--failed', active);
      }
    });

    document.addEventListener('gate:explored', (e) => {
      const { gateId } = e.detail;
      const gateEl = document.querySelector(`[data-gate-id="${gateId}"]`);
      if (gateEl) {
        gateEl.classList.add('diagram-gate--explored');
      }
    });
  }

  isOpen() {
    return this.container.classList.contains('gate-panel--open');
  }

  getGateData(gateId) {
    if (typeof qualityPoints !== 'undefined') {
      return qualityPoints.find(g => g.id === gateId) || null;
    }
    return null;
  }

  getRoleName(roleSlug) {
    const role = this.rolesData.find(r => r.roleSlug === roleSlug);
    return role ? role.roleName : roleSlug;
  }

  openGate(gateId) {
    const data = this.getGateData(gateId);
    if (!data) return;

    this.currentGateId = gateId;
    this.gateData = data;

    const gateEl = document.querySelector(`[data-gate-id="${gateId}"]`);
    if (gateEl) {
      gateEl.classList.add('diagram-gate--selected');
    }

    this.renderPanel(data);
    this.container.classList.add('gate-panel--open');
    this.container.setAttribute('aria-hidden', 'false');

    this.closeBtn.focus();

    this.announce(`Panel abierto: ${data.name}`);

    this.dispatchEvent('gate:open', { gateId });
  }

  renderPanel(data) {
    const gateState = this.progress.getGateState(data.id);
    const isSimulating = gateState.simulationActive;

    const roleNames = (data.roles || []).map(slug => this.getRoleName(slug));
    const mandatoryLabel = data.mandatory ? 'Obligatorio' : 'Recomendado';
    const phaseName = this.getPhaseName(data.phaseId);

    this.bodyEl.innerHTML = `
      <header class="gate-panel__header">
        <span class="gate-panel__badge" data-mandatory="${data.mandatory}">${mandatoryLabel}</span>
        <h3 id="gate-panel-title">${this.escapeHtml(data.name)}</h3>
        <span class="gate-panel__phase">Fase: ${phaseName}</span>
      </header>

      <section class="gate-panel__info">
        <h4>Descripción</h4>
        <p>${this.escapeHtml(data.description)}</p>
      </section>

      <section class="gate-panel__criteria">
        <h4>Criterios de Verificación</h4>
        <ul>
          <li>${this.escapeHtml(data.verificationCriteria)}</li>
        </ul>
      </section>

      <section class="gate-panel__roles">
        <h4>Roles Responsables</h4>
        <ul>
          ${roleNames.map(name => `<li>${this.escapeHtml(name)}</li>`).join('')}
        </ul>
      </section>

      <section class="gate-panel__simulation">
        <button id="gate-simulate-toggle" type="button" aria-pressed="${isSimulating}" class="gate-panel__sim-toggle">
          ${isSimulating ? 'Desactivar Simular fallo' : 'Simular fallo'}
        </button>
        <div class="gate-panel__simulation-content" ${isSimulating ? '' : 'hidden'}>
          <div class="gate-panel__failed-criteria">
            <h4>Criterios no cumplidos</h4>
            <ul>
              <li>${this.escapeHtml(data.verificationCriteria)}</li>
            </ul>
          </div>
          <div class="gate-panel__remediation">
            <h4>Acciones de remediación</h4>
            <ol>
              ${(data.remediationSteps || []).map(step => `<li>${this.escapeHtml(step)}</li>`).join('')}
            </ol>
          </div>
          <div class="gate-panel__doc-links">
            <h4>Más información</h4>
            ${this.renderDocLinks(data.docLinks)}
          </div>
        </div>
      </section>
    `;

    const toggleBtn = this.bodyEl.querySelector('#gate-simulate-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleSimulation());
    }

    // Restore simulation state from localStorage
    this.container.classList.toggle('gate-panel--simulating', isSimulating);
  }

  renderDocLinks(links) {
    if (!links || links.length === 0) {
      return '<p>No hay documentación adicional disponible para este gate.</p>';
    }
    return `<ul>${links.map(l => `<li><a href="${this.escapeHtml(l.url)}">${this.escapeHtml(l.label)}</a></li>`).join('')}</ul>`;
  }

  getPhaseName(phaseId) {
    const names = {
      specify: 'Specify',
      clarify: 'Clarify',
      plan: 'Plan',
      tasks: 'Tasks',
      implement: 'Implement'
    };
    return names[phaseId] || phaseId;
  }

  toggleSimulation() {
    if (!this.currentGateId) return;

    const gateState = this.progress.getGateState(this.currentGateId);
    const newState = !gateState.simulationActive;

    this.progress.setSimulation(this.currentGateId, newState);

    const toggleBtn = this.bodyEl.querySelector('#gate-simulate-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = newState ? 'Desactivar Simular fallo' : 'Simular fallo';
      toggleBtn.setAttribute('aria-pressed', newState.toString());
    }

    const simContent = this.bodyEl.querySelector('.gate-panel__simulation-content');
    if (simContent) {
      simContent.hidden = !newState;
    }

    this.container.classList.toggle('gate-panel--simulating', newState);

    this.dispatchEvent('gate:simulation', {
      gateId: this.currentGateId,
      active: newState
    });

    this.announce(newState ? 'Simulación de fallo activada' : 'Simulación de fallo desactivada');
  }

  close() {
    if (!this.currentGateId) return;

    const gateState = this.progress.getGateState(this.currentGateId);

    if (!gateState.explored) {
      this.progress.markExplored(this.currentGateId);
      this.dispatchEvent('gate:explored', { gateId: this.currentGateId });
    }

    const gateEl = document.querySelector(`[data-gate-id="${this.currentGateId}"]`);
    if (gateEl) {
      gateEl.classList.remove('diagram-gate--selected');
    }

    this.container.classList.remove('gate-panel--open');
    this.container.setAttribute('aria-hidden', 'true');

    const diagram = document.getElementById('process-diagram-container');
    if (diagram) {
      const gate = diagram.querySelector(`[data-gate-id="${this.currentGateId}"]`);
      if (gate) gate.focus();
    }

    this.announce('Panel cerrado');
    this.dispatchEvent('gate:close', { gateId: this.currentGateId });
  }

  announce(message) {
    let announcer = document.getElementById('gate-panel-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'gate-panel-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      this.container.appendChild(announcer);
    }
    announcer.textContent = message;
  }

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  destroy() {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('gate-panel')) {
    window.gatePanel = new GatePanel('gate-panel');
  }
});
