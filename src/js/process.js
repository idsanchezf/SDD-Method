/**
 * Process Diagram - US4: End-to-End SDD Process Visualization
 * Interactive SVG diagram showing the 5 SDD phases with quality gates and handoffs
 */
(function () {
  'use strict';

  // ==========================================
  // T014: ProcessDiagram Class Skeleton
  // ==========================================

  class ProcessDiagram {
    constructor(svgId) {
      this.svg = document.getElementById(svgId);
      if (!this.svg) {
        throw new Error(`SVG element with id "${svgId}" not found`);
      }

      this.currentPhase = null;
      this.showQualityGates = false;
      this.showHandoffs = true;
      this.phases = window.SDD_PHASES || [];
      this.qualityGates = window.QUALITY_GATES || [];
      this.handoffs = window.HANDOFFS || [];
      this.caseStudies = window.CASE_STUDIES || {};

      this.svgNS = 'http://www.w3.org/2000/svg';
      this.init();
    }

    init() {
      this.setupDefs();
      this.renderPhases();
      this.renderConnectors();
      this.renderQualityGates();
      this.renderHandoffs();
      this.renderCaseStudies();
      this.bindEvents();
    }

    // ==========================================
    // T015: renderPhases() Method
    // ==========================================

    renderPhases() {
      // T045: Use DocumentFragment for performance
      const fragment = document.createDocumentFragment();
      const group = this.createElement('g', { class: 'phases-group' });
      fragment.appendChild(group);

      this.phases.forEach((phase, index) => {
        const x = 50 + (index * 220);
        const y = 200;
        const width = 180;
        const height = 100;

        // Phase node group - position using x/y on rect instead of transform
        const node = this.createElement('g', {
          class: 'diagram-node',
          'data-phase-id': phase.id,
          tabindex: '0',
          role: 'button',
          'aria-label': `${phase.displayName} - ${phase.description}`
        });

        // Background rectangle - positioned directly with x/y
        const rect = this.createElement('rect', {
          x: x,
          y: y,
          width: width,
          height: height,
          rx: '8',
          ry: '8',
          fill: phase.color,
          stroke: phase.color,
          'stroke-width': '2',
          class: 'phase-rect',
          'data-phase-id': phase.id
        });

        // Phase name
        const nameText = this.createElement('text', {
          x: x + width / 2,
          y: y + 35,
          'text-anchor': 'middle',
          class: 'diagram-node__text',
          'font-weight': '600',
          'font-size': '16px',
          fill: '#fff'
        });
        nameText.textContent = phase.displayName;

        // Duration
        const durationText = this.createElement('text', {
          x: x + width / 2,
          y: y + 55,
          'text-anchor': 'middle',
          class: 'diagram-node__subtext',
          'font-size': '11px',
          fill: '#fff'
        });
        durationText.textContent = phase.duration;

        // Roles
        const rolesText = this.createElement('text', {
          x: x + width / 2,
          y: y + 75,
          'text-anchor': 'middle',
          class: 'diagram-node__subtext',
          'font-size': '10px',
          fill: '#fff'
        });
        rolesText.textContent = phase.roles.slice(0, 2).join(', ');

        node.appendChild(rect);
        node.appendChild(nameText);
        node.appendChild(durationText);
        node.appendChild(rolesText);
        group.appendChild(node);
      });

      this.svg.appendChild(fragment);
    }

    // ==========================================
    // T016: renderConnectors() Method
    // ==========================================

    renderConnectors() {
      const defs = this.svg.querySelector('defs');

      // Arrow marker
      const marker = this.createElement('marker', {
        id: 'arrowhead',
        markerWidth: '10',
        markerHeight: '10',
        refX: '9',
        refY: '3',
        orient: 'auto',
        markerUnits: 'strokeWidth'
      });

      const markerPath = this.createElement('path', {
        d: 'M 0 0 L 10 3 L 0 6 z',
        fill: '#999'
      });

      marker.appendChild(markerPath);
      defs.appendChild(marker);

      const group = this.createElement('g', { class: 'connectors-group' });

      for (let i = 0; i < this.phases.length - 1; i++) {
        const fromX = 50 + (i * 220) + 180;
        const fromY = 250;
        const toX = 50 + ((i + 1) * 220);
        const toY = 250;

        const path = this.createElement('path', {
          d: `M ${fromX} ${fromY} L ${toX} ${toY}`,
          fill: 'none',
          stroke: '#999',
          'stroke-width': '2',
          class: 'handoff-arrow',
          'marker-end': 'url(#arrowhead)'
        });

        group.appendChild(path);
      }

      this.svg.appendChild(group);
    }

    // ==========================================
    // T017: renderQualityGates() Method
    // ==========================================

    renderQualityGates() {
      const group = this.createElement('g', {
        class: 'quality-gates-group',
        'aria-hidden': 'true'
      });

      this.qualityGates.forEach((gate) => {
        const gateGroup = this.createElement('g', {
          class: `quality-gate quality-gate--${gate.type}`,
          'data-gate-id': gate.id
        });

        // Gate marker (diamond shape)
        const diamond = this.createElement('path', {
          d: 'M 0,-10 L 15,0 L 0,10 L -15,0 Z',
          fill: this.getGateColor(gate.type),
          stroke: this.getGateColor(gate.type, true),
          'stroke-width': '2',
          class: 'quality-gate__marker',
          transform: `translate(${gate.position.x}, ${gate.position.y})`
        });

        // Gate label
        const label = this.createElement('text', {
          x: gate.position.x,
          y: gate.position.y + 25,
          'text-anchor': 'middle',
          class: 'quality-gate__label'
        });
        label.textContent = gate.name;

        gateGroup.appendChild(diamond);
        gateGroup.appendChild(label);
        group.appendChild(gateGroup);
      });

      this.svg.appendChild(group);
    }

    getGateColor(type, stroke = false) {
      const colors = {
        'review': stroke ? '#D97706' : '#F59E0B',
        'code-review': stroke ? '#2563EB' : '#3B82F6',
        'uat': stroke ? '#059669' : '#10B981'
      };
      return colors[type] || (stroke ? '#666' : '#999');
    }

    // ==========================================
    // T018: renderHandoffs() Method
    // ==========================================

    renderHandoffs() {
      const group = this.createElement('g', { class: 'handoffs-group' });

      this.handoffs.forEach((handoff, index) => {
        // Find phase position for this handoff
        const phaseIndex = this.phases.findIndex(p => p.id === handoff.phaseId);
        if (phaseIndex === -1) return;

        const x = 50 + (phaseIndex * 220) + 90;
        const y = 320;

        const handoffGroup = this.createElement('g', {
          class: 'handoff-annotation',
          'data-handoff-from': handoff.fromRole,
          'data-handoff-to': handoff.toRole
        });

        // Handoff label
        const label = this.createElement('text', {
          x: x,
          y: y + (index % 2) * 15,
          'text-anchor': 'middle',
          class: 'handoff-arrow__label',
          'font-size': '9px'
        });
        label.textContent = `${handoff.fromRole} → ${handoff.toRole}`;

        handoffGroup.appendChild(label);
        group.appendChild(handoffGroup);
      });

      this.svg.appendChild(group);
    }

    // ==========================================
    // Utility Methods
    // ==========================================

    createElement(tag, attrs = {}) {
      const el = document.createElementNS(this.svgNS, tag);
      Object.entries(attrs).forEach(([key, val]) => {
        if (key === 'class') {
          el.setAttribute('class', val);
        } else {
          el.setAttribute(key, val);
        }
      });
      return el;
    }

    setupDefs() {
      let defs = this.svg.querySelector('defs');
      if (!defs) {
        defs = this.createElement('defs');
        this.svg.insertBefore(defs, this.svg.firstChild);
      }
    }

    // ==========================================
    // T019: bindEvents() Method - Event Delegation
    // ==========================================

    bindEvents() {
      const self = this;

      // Click delegation on diagram nodes - target rect elements
      this.svg.addEventListener('click', function (e) {
        const rect = e.target.closest('.phase-rect');
        if (rect) {
          const phaseId = rect.getAttribute('data-phase-id');
          if (phaseId) {
            self.selectPhase(phaseId);
          }
        }
      });

      // T023: Keyboard navigation for diagram nodes
      this.svg.addEventListener('keydown', function (e) {
        const rect = e.target.closest('.phase-rect');
        if (rect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          const phaseId = rect.getAttribute('data-phase-id');
          if (phaseId) {
            self.selectPhase(phaseId);
          }
        }
      });

      // T024: Toggle quality gates button
      const toggleBtn = document.getElementById('toggle-quality-gates');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
          self.toggleQualityGates();
        });
      }

      // Close detail panel button (if exists)
      const closeDetailBtn = document.getElementById('close-detail');
      if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', function () {
          self.closeDetail();
        });
      }

      // T043: Close error message button
      const closeErrorBtn = document.getElementById('close-spec-error');
      if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', function () {
          self.closeSpecError();
        });
      }
    }

    // T043: Show spec error message
    showSpecError(reason, roles) {
      const errorMsg = document.getElementById('spec-error-message');
      const reasonSpan = document.getElementById('spec-error-reason');
      const rolesSpan = document.getElementById('spec-error-roles');

      if (!errorMsg) return;

      if (reasonSpan) reasonSpan.textContent = reason || 'No especificada';
      if (rolesSpan) rolesSpan.textContent = roles || 'Spec Writer o Reviewer';

      errorMsg.hidden = false;
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.announceToSR(`Error: La spec no pasó la revisión. Razón: ${reason}`);
    }

    // T043: Close spec error message
    closeSpecError() {
      const errorMsg = document.getElementById('spec-error-message');
      if (errorMsg) {
        errorMsg.hidden = true;
        this.announceToSR('Mensaje de error cerrado');
      }
    }

    // ==========================================
    // T020: selectPhase() Method
    // ==========================================

    selectPhase(phaseId) {
      if (!phaseId || phaseId === this.currentPhase) return;

      const phaseData = this.phases.find(p => p.id === phaseId);
      if (!phaseData) {
        console.warn(`Phase with id "${phaseId}" not found`);
        return;
      }

      // Update current phase
      this.currentPhase = phaseId;

      // Update active state on diagram nodes (use rect for highlighting)
      const rects = this.svg.querySelectorAll('.phase-rect');
      rects.forEach(rect => {
        const rectPhaseId = rect.getAttribute('data-phase-id');
        if (rectPhaseId === phaseId) {
          rect.closest('.diagram-node').classList.add('active');
          rect.setAttribute('aria-expanded', 'true');
        } else {
          rect.closest('.diagram-node').classList.remove('active');
          rect.setAttribute('aria-expanded', 'false');
        }
      });

      // Update detail panel
      this.updateDetailPanel(phaseData);

      // Dispatch custom event
      const event = new CustomEvent('phase-selected', {
        detail: { phaseId: phaseId, phaseData: phaseData }
      });
      this.svg.dispatchEvent(event);

      // Announce to screen readers
      this.announceToSR(`${phaseData.displayName} seleccionada. ${phaseData.description}`);
    }

    // ==========================================
    // T021: updateDetailPanel() Method
    // ==========================================

    updateDetailPanel(phaseData) {
      const detailPanel = document.getElementById('phase-detail');
      const detailTitle = document.getElementById('detail-title');
      const detailContent = document.getElementById('detail-content');

      if (!detailPanel || !detailTitle || !detailContent) {
        console.warn('Detail panel elements not found');
        return;
      }

      // T042: Handle missing phase data
      if (!phaseData) {
        detailTitle.textContent = 'Datos no disponibles';
        detailContent.innerHTML = '<p>Los datos de esta fase no están disponibles en este momento. Por favor, intenta más tarde.</p>';
        detailPanel.classList.remove('process__detail--empty');
        detailPanel.classList.add('is-visible');
        return;
      }

      // Update title
      detailTitle.textContent = phaseData.displayName;

      // Build content HTML
      let html = '';

      // Description
      html += `<div class="detail__section">
        <h4 class="detail__section-title">Descripción</h4>
        <p>${phaseData.description}</p>
      </div>`;

      // Inputs
      if (phaseData.inputs && phaseData.inputs.length > 0) {
        html += `<div class="detail__section">
          <h4 class="detail__section-title">Entradas</h4>
          <ul class="detail__list">
            ${phaseData.inputs.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>`;
      }

      // Outputs
      if (phaseData.outputs && phaseData.outputs.length > 0) {
        html += `<div class="detail__section">
          <h4 class="detail__section-title">Salidas</h4>
          <ul class="detail__list">
            ${phaseData.outputs.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>`;
      }

      // Roles
      if (phaseData.roles && phaseData.roles.length > 0) {
        html += `<div class="detail__section">
          <h4 class="detail__section-title">Roles Participantes</h4>
          <div class="detail__artifacts">
            ${phaseData.roles.map(role => `<span class="detail__artifact-tag">${role}</span>`).join('')}
          </div>
        </div>`;
      }

      // Artifacts
      if (phaseData.artifacts && phaseData.artifacts.length > 0) {
        html += `<div class="detail__section">
          <h4 class="detail__section-title">Artefactos Producidos</h4>
          <div class="detail__artifacts">
            ${phaseData.artifacts.map(artifact => `<span class="detail__artifact-tag">${artifact}</span>`).join('')}
          </div>
        </div>`;
      }

      // Duration
      if (phaseData.duration) {
        html += `<div class="detail__section">
          <h4 class="detail__section-title">Duración Estimada</h4>
          <div class="detail__duration">⏱ ${phaseData.duration}</div>
        </div>`;
      }

      detailContent.innerHTML = html;
      detailPanel.classList.remove('process__detail--empty');
      detailPanel.classList.add('is-visible');

      // Scroll into view
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    closeDetail() {
      const detailPanel = document.getElementById('phase-detail');
      if (detailPanel) {
        detailPanel.classList.remove('is-visible');
        detailPanel.classList.add('process__detail--empty');
        document.getElementById('detail-title').textContent = 'Selecciona una fase';
        document.getElementById('detail-content').innerHTML = '<p>Haz clic en cualquier fase del diagrama para ver los detalles.</p>';
      }
      this.currentPhase = null;

      // Remove active state from all nodes
      const nodes = this.svg.querySelectorAll('.diagram-node');
      nodes.forEach(node => {
        node.classList.remove('active');
        node.setAttribute('aria-expanded', 'false');
      });
    }

    // ==========================================
    // T022: toggleQualityGates() Method
    // ==========================================

    toggleQualityGates() {
      this.showQualityGates = !this.showQualityGates;

      const gates = this.svg.querySelectorAll('.quality-gate');
      const toggleBtn = document.getElementById('toggle-quality-gates');

      if (this.showQualityGates) {
        gates.forEach(gate => {
          gate.classList.add('visible');
          gate.setAttribute('aria-hidden', 'false');
        });
        if (toggleBtn) {
          toggleBtn.textContent = 'Ocultar Controles de Calidad';
          toggleBtn.setAttribute('aria-pressed', 'true');
        }
        this.announceToSR('Controles de calidad visibles');
      } else {
        gates.forEach(gate => {
          gate.classList.remove('visible');
          gate.setAttribute('aria-hidden', 'true');
        });
        if (toggleBtn) {
          toggleBtn.textContent = 'Mostrar Controles de Calidad';
          toggleBtn.setAttribute('aria-pressed', 'false');
        }
        this.announceToSR('Controles de calidad ocultos');
      }

      // Dispatch custom event
      const event = new CustomEvent('quality-gates-toggled', {
        detail: { visible: this.showQualityGates }
      });
      this.svg.dispatchEvent(event);
    }

    // ==========================================
    // Accessibility Helper
    // ==========================================

    announceToSR(message) {
      let announcer = document.getElementById('sr-announcer-process');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'sr-announcer-process';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
        document.body.appendChild(announcer);
      }
      announcer.textContent = '';
      setTimeout(() => { announcer.textContent = message; }, 100);
    }

    // ==========================================
    // T031: renderCaseStudies() Method
    // ==========================================

    renderCaseStudies() {
      const grid = document.getElementById('case-studies-grid');
      if (!grid) {
        console.warn('Case studies grid not found');
        return;
      }

      const self = this;

      // T033: Use event delegation on grid (more reliable than individual listeners)
      grid.addEventListener('click', function (e) {
        const card = e.target.closest('.case-study-card');
        if (card) {
          const caseId = card.getAttribute('data-case-id');
          if (caseId) {
            self.expandCaseStudy(caseId);
          }
        }
      });

      // Keyboard event delegation
      grid.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.case-study-card');
          if (card) {
            e.preventDefault();
            const caseId = card.getAttribute('data-case-id');
            if (caseId) {
              self.expandCaseStudy(caseId);
            }
          }
        }
      });

      Object.values(this.caseStudies).forEach(caseStudy => {
        // Use document.createElement for HTML elements (not SVG createElementNS)
        const card = document.createElement('article');
        card.className = 'case-study-card';
        card.setAttribute('data-case-id', caseStudy.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${caseStudy.title} - Haz clic para ver detalles`);

        const typeClass = caseStudy.type === 'greenfield' ? 'case-study-card__type--greenfield' : 'case-study-card__type--brownfield';

        card.innerHTML = `
          <div class="case-study-card__header">
            <h3 class="case-study-card__title">${caseStudy.title}</h3>
            <span class="case-study-card__type ${typeClass}">${caseStudy.type === 'greenfield' ? 'Greenfield' : 'Brownfield'}</span>
          </div>
          <div class="case-study-card__body">
            <p class="case-study-card__context">${caseStudy.context}</p>
            <div class="case-study-card__meta">
              <div class="case-study-card__meta-item">
                <strong>Tecnología:</strong> ${caseStudy.techStack}
              </div>
              <div class="case-study-card__meta-item">
                <strong>Equipo:</strong> ${caseStudy.teamSize}
              </div>
              <div class="case-study-card__meta-item">
                <strong>Duración:</strong> ${caseStudy.duration}
              </div>
            </div>
            <div class="case-study-card__phases" id="phases-${caseStudy.id}">
              <!-- Phases will be rendered on expand -->
            </div>
          </div>
        `;

        grid.appendChild(card);
      });

      console.log('Case studies rendered. Cards found:', grid.querySelectorAll('.case-study-card').length);
    }

    // ==========================================
    // T032: expandCaseStudy() Method
    // ==========================================

    expandCaseStudy(caseId) {
      const caseStudy = this.caseStudies[caseId];
      if (!caseStudy) {
        console.warn(`Case study "${caseId}" not found`);
        return;
      }

      const card = document.querySelector(`[data-case-id="${caseId}"]`);
      if (!card) {
        console.warn(`Card for case study "${caseId}" not found`);
        return;
      }

      const phasesContainer = card.querySelector('.case-study-card__phases');
      if (!phasesContainer) return;

      // Toggle: if already expanded, collapse
      if (phasesContainer.classList.contains('is-expanded')) {
        phasesContainer.innerHTML = '';
        phasesContainer.classList.remove('is-expanded');
        card.classList.remove('is-expanded');
        this.announceToSR(`Caso de estudio ${caseStudy.title} contraido`);
        return;
      }

      // Expand: render phases
      let html = '<h4>Fases Recorridas:</h4>';

      caseStudy.phases.forEach(phaseData => {
        const phaseInfo = this.phases.find(p => p.id === phaseData.phaseId);
        if (!phaseInfo) return;

        html += `
          <div class="case-study-card__phase">
            <h5 class="case-study-card__phase-title">${phaseInfo.displayName}: ${phaseData.summary}</h5>
            <div class="case-study-card__phase-summary">${phaseData.notes || ''}</div>
          </div>
        `;
      });

      // Add challenges section
      if (caseStudy.challenges && caseStudy.challenges.length > 0) {
        html += `
          <div class="case-study-card__challenges">
            <h4>Desafíos Específicos</h4>
            <ul>
              ${caseStudy.challenges.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      // Add lessons learned section
      if (caseStudy.lessons && caseStudy.lessons.length > 0) {
        html += `
          <div class="case-study-card__lessons">
            <h4>Lecciones Aprendidas</h4>
            <ul>
              ${caseStudy.lessons.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      phasesContainer.innerHTML = html;
      phasesContainer.classList.add('is-expanded');
      card.classList.add('is-expanded');

      // Scroll into view
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      this.announceToSR(`Caso de estudio ${caseStudy.title} expandido con ${caseStudy.phases.length} fases`);
    }

    // ==========================================
    // T049: Validate Acceptance Scenarios
    // ==========================================

    validateAcceptanceScenarios() {
      const results = {
        scenario1: this.validateScenario1(),
        scenario2: this.validateScenario2(),
        scenario3: this.validateScenario3()
      };

      console.log('=== US4 Acceptance Scenarios Validation ===');
      console.log('Scenario 1 (Click phases):', results.scenario1 ? '✓ PASS' : '✗ FAIL');
      console.log('Scenario 2 (Quality gates):', results.scenario2 ? '✓ PASS' : '✗ FAIL');
      console.log('Scenario 3 (Case studies):', results.scenario3 ? '✓ PASS' : '✗ FAIL');

      return results;
    }

    validateScenario1() {
      // Given user accesses process section, When interacts with diagram, Then can click each step
      // and see description, roles involved, and artifacts produced
      const phases = this.svg.querySelectorAll('.diagram-node');
      const detailPanel = document.getElementById('phase-detail');

      if (phases.length !== 5) {
        console.warn('Scenario 1: Expected 5 phases, found', phases.length);
        return false;
      }

      if (!detailPanel) {
        console.warn('Scenario 1: Detail panel not found');
        return false;
      }

      // Check each phase has required data
      return this.phases.every(phase => {
        return phase.description && phase.roles.length > 0 && phase.artifacts.length > 0;
      });
    }

    validateScenario2() {
      // Given user is viewing diagram, When activates quality control layer,
      // Then review and approval gates are highlighted
      const toggleBtn = document.getElementById('toggle-quality-gates');
      const gates = this.svg.querySelectorAll('.quality-gate');

      if (!toggleBtn) {
        console.warn('Scenario 2: Toggle button not found');
        return false;
      }

      if (gates.length === 0) {
        console.warn('Scenario 2: No quality gates found');
        return false;
      }

      // Check gate types
      const gateTypes = ['review', 'code-review', 'uat'];
      return gateTypes.every(type => {
        const gate = this.svg.querySelector(`.quality-gate--${type}`);
        if (!gate) {
          console.warn(`Scenario 2: Gate type "${type}" not found`);
          return false;
        }
        return true;
      });
    }

    validateScenario3() {
      // Given user completes reading, When accesses case studies section,
      // Then can choose greenfield or brownfield and see step-by-step
      const caseStudiesGrid = document.getElementById('case-studies-grid');
      if (!caseStudiesGrid) {
        console.warn('Scenario 3: Case studies grid not found');
        return false;
      }

      // Check case studies data
      if (!this.caseStudies.greenfield || !this.caseStudies.brownfield) {
        console.warn('Scenario 3: Missing greenfield or brownfield case study');
        return false;
      }

      // Check each case study has 5 phases
      return ['greenfield', 'brownfield'].every(key => {
        const cs = this.caseStudies[key];
        if (!cs || !cs.phases || cs.phases.length !== 5) {
          console.warn(`Scenario 3: Case study "${key}" should have 5 phases, has ${cs?.phases?.length || 0}`);
          return false;
        }
        return true;
      });
    }

  } // end ProcessDiagram class

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    try {
      window.processDiagram = new ProcessDiagram('sdd-flow-svg');
    } catch (e) {
      console.error('Failed to initialize Process Diagram:', e.message);
    }
  });

})();
