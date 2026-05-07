/**
 * InteractiveWalkthrough Class - Guided step-by-step tour
 * for greenfield and brownfield case studies
 */

class InteractiveWalkthrough {
  constructor(diagram) {
    this.diagram = diagram;
    this.currentCase = null;
    this.currentPhaseIndex = 0;
    this.userDecisions = {};
    this.visitedPhases = [];
    this.isComplete = false;
    this.caseData = null;

    this.checklists = [];
    this.progress = 0;

    this.uiContainer = null;
    this.progressBar = null;
    this.stepContent = null;
    this.checklistContainer = null;
    this.decisionButtons = null;
  }

  start(caseType) {
    // Load case study data
    this.caseData = caseStudies.find(c => c.id === caseType);
    if (!this.caseData) {
      console.error(`Case study "${caseType}" not found.`);
      return;
    }

    this.currentCase = caseType;
    this.currentPhaseIndex = 0;
    this.userDecisions = {};
    this.visitedPhases = [];
    this.isComplete = false;
    this.checklists = this.initializeChecklists();

    // Setup UI
    this.setupUI();

    // Restore saved progress
    this.loadProgress();

    // Show first step
    this.showCurrentStep();
  }

  setupUI() {
    // Create or get walkthrough container
    this.uiContainer = document.getElementById('walkthrough-container');
    if (!this.uiContainer) {
      console.error('Walkthrough container not found.');
      return;
    }

    // Clear previous content
    this.uiContainer.innerHTML = '';

    // Header with case selector
    this.renderHeader();

    // Progress bar
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'walkthrough-progress';
    this.progressBar.setAttribute('role', 'progressbar');
    this.progressBar.setAttribute('aria-valuemin', '0');
    this.progressBar.setAttribute('aria-valuemax', '5');
    this.progressBar.setAttribute('aria-valuenow', '0');
    this.progressBar.setAttribute('aria-label', 'Walkthrough progress');

    const progressFill = document.createElement('div');
    progressFill.className = 'walkthrough-progress-fill';
    this.progressBar.appendChild(progressFill);
    this.uiContainer.appendChild(this.progressBar);

    // Phase navigation pills
    const phaseNav = this.renderPhaseNavigation();
    this.uiContainer.appendChild(phaseNav);

    // Step content area
    this.stepContent = document.createElement('div');
    this.stepContent.className = 'walkthrough-step-content';
    this.uiContainer.appendChild(this.stepContent);

    // Checklist container
    this.checklistContainer = document.createElement('div');
    this.checklistContainer.className = 'walkthrough-checklist';
    this.uiContainer.appendChild(this.checklistContainer);

    // Navigation buttons
    const navDiv = document.createElement('div');
    navDiv.className = 'walkthrough-navigation';

    this.prevButton = document.createElement('button');
    this.prevButton.textContent = '← Anterior';
    this.prevButton.className = 'walkthrough-btn walkthrough-btn-prev';
    this.prevButton.addEventListener('click', () => this.previous());
    navDiv.appendChild(this.prevButton);

    this.nextButton = document.createElement('button');
    this.nextButton.textContent = 'Siguiente →';
    this.nextButton.className = 'walkthrough-btn walkthrough-btn-next';
    this.nextButton.addEventListener('click', () => this.next());
    navDiv.appendChild(this.nextButton);

    this.uiContainer.appendChild(navDiv);

    // Decision buttons container (initially hidden)
    this.decisionButtons = document.createElement('div');
    this.decisionButtons.className = 'walkthrough-decisions';
    this.decisionButtons.style.display = 'none';
    this.uiContainer.appendChild(this.decisionButtons);
  }

  renderHeader() {
    // Header container
    const header = document.createElement('div');
    header.className = 'walkthrough-header';

    // Title
    const title = document.createElement('h4');
    title.textContent = 'Recorrido Interactivo SDD';
    header.appendChild(title);

    // Case selector
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'case-study-selector';

    const label = document.createElement('label');
    label.setAttribute('for', 'walkthrough-case-select');
    label.textContent = 'Caso de Estudio:';

    const select = document.createElement('select');
    select.id = 'walkthrough-case-select';
    select.setAttribute('aria-label', 'Seleccionar caso de estudio');

    const cases = [
      { id: 'greenfield', name: 'Greenfield (Proyecto Nuevo)' },
      { id: 'brownfield', name: 'Brownfield (Proyecto Legado)' }
    ];

    cases.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.name;
      if (c.id === this.currentCase) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      this.switchCase(e.target.value);
    });

    selectorContainer.appendChild(label);
    selectorContainer.appendChild(select);
    header.appendChild(selectorContainer);

    this.uiContainer.appendChild(header);
  }

  switchCase(caseType) {
    this.start(caseType);
  }

  showCurrentStep() {
    if (!this.caseData || this.isComplete) return;

    const phaseData = this.caseData.phases[this.currentPhaseIndex];
    if (!phaseData) {
      this.complete();
      return;
    }

    // Mark phase as visited
    if (!this.visitedPhases.includes(phaseData.phaseId)) {
      this.visitedPhases.push(phaseData.phaseId);
      this.saveProgress();
    }

    // Update diagram
    if (this.diagram) {
      this.diagram.selectNode(phaseData.phaseId);

      // Highlight handoff for this phase
      const handoffId = phaseData.handoffDemo
        ? phaseData.handoffDemo.fromRole + '-to-' + phaseData.handoffDemo.toRole
        : null;
      if (handoffId) {
        // Highlight the specific handoff arrow
        const handoffArrow = document.querySelector(`[data-handoff-id="${handoffId}"]`);
        if (handoffArrow) {
          handoffArrow.classList.add('diagram-handoff--active');
        }
      }
    }

    // Update progress bar
    this.updateProgress();

    // Update phase navigation visuals
    this.updatePhaseVisuals();

    // Render step content
    this.renderStepContent(phaseData);

    // Render checklist for current phase
    this.renderChecklistForPhase(phaseData.phaseId);

    // Show decision prompt
    this.showDecisionPrompt(phaseData);

    // Announce step
    const phase = phasesEnhanced.find(p => p.id === phaseData.phaseId);
    if (phase) {
      this.announce(`Step ${this.currentPhaseIndex + 1} of 5: ${phase.name} phase`);
    }
  }

  updateProgress() {
    if (!this.progressBar) return;

    const progressFill = this.progressBar.querySelector('.walkthrough-progress-fill');
    const checklistProgress = this.checklists.length > 0 ? this.updateProgressFromChecklists() : 0;
    const phaseProgress = Math.round((this.currentPhaseIndex / 5) * 100);
    const percentage = Math.max(checklistProgress, phaseProgress);

    progressFill.style.width = `${percentage}%`;
    this.progressBar.setAttribute('aria-valuenow', this.currentPhaseIndex.toString());

    // Update or create percentage text
    let progressText = this.progressBar.parentElement.querySelector('.progress-text');
    if (!progressText) {
      progressText = document.createElement('div');
      progressText.className = 'progress-text';
      this.progressBar.parentElement.appendChild(progressText);
    }
    progressText.textContent = `${percentage}% completado`;

    // Update button states
    this.prevButton.disabled = this.currentPhaseIndex === 0;
    this.nextButton.disabled = this.currentPhaseIndex >= 4;
  }

  renderPhaseNavigation() {
    const nav = document.createElement('div');
    nav.className = 'phase-nav';
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', 'Navegación de fases');

    const phases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];

    phases.forEach((phaseId) => {
      const phase = phasesEnhanced.find(p => p.id === phaseId);
      if (!phase) return;

      const isActive = phaseId === this.caseData.phases[this.currentPhaseIndex]?.phaseId;
      const isCompleted = this.visitedPhases.includes(phaseId);

      const pill = document.createElement('div');
      pill.className = 'phase-nav-item';
      if (isActive) pill.classList.add('active');
      if (isCompleted) pill.classList.add('completed');
      pill.dataset.phase = phaseId;
      pill.setAttribute('role', 'tab');
      pill.setAttribute('tabindex', '0');
      pill.setAttribute('aria-label', `Fase ${phase.name}`);
      pill.setAttribute('aria-selected', isActive.toString());

      const marker = document.createElement('span');
      marker.className = 'phase-nav-marker';
      marker.textContent = isCompleted ? '✓' : phase.order;

      const name = document.createElement('span');
      name.className = 'phase-nav-name';
      name.textContent = phase.name;

      pill.appendChild(marker);
      pill.appendChild(name);

      pill.addEventListener('click', () => this.goToPhase(phaseId));
      pill.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goToPhase(phaseId);
        }
      });

      nav.appendChild(pill);
    });

    return nav;
  }

  goToPhase(phaseId) {
    const phaseIndex = this.caseData.phases.findIndex(p => p.phaseId === phaseId);
    if (phaseIndex === -1) return;

    const maxAccessible = Math.max(...this.visitedPhases.map(
      id => this.caseData.phases.findIndex(p => p.phaseId === id)
    ), 0) + 1;

    if (phaseIndex <= maxAccessible) {
      this.currentPhaseIndex = phaseIndex;
      this.showCurrentStep();
    }
  }

  updatePhaseVisuals() {
    const nav = this.uiContainer.querySelector('.phase-nav');
    if (!nav) return;

    const pills = nav.querySelectorAll('.phase-nav-item');
    const currentPhaseId = this.caseData.phases[this.currentPhaseIndex]?.phaseId;

    pills.forEach(pill => {
      const phaseId = pill.dataset.phase;
      const isActive = phaseId === currentPhaseId;
      const isCompleted = this.visitedPhases.includes(phaseId);

      pill.classList.toggle('active', isActive);
      pill.classList.toggle('completed', isCompleted);
      pill.setAttribute('aria-selected', isActive.toString());

      const marker = pill.querySelector('.phase-nav-marker');
      if (marker) {
        marker.textContent = isCompleted ? '✓' : (phasesEnhanced.find(p => p.id === phaseId)?.order || '');
      }
    });
  }

  initializeChecklists() {
    return [
      {
        phaseId: 'specify',
        phaseName: 'Specify',
        completed: false,
        items: [
          { id: 'wt-spec-reviewed', text: 'Especificación revisada y aprobada', checked: false },
          { id: 'wt-spec-criteria', text: 'Criterios de aceptación definidos', checked: false }
        ]
      },
      {
        phaseId: 'clarify',
        phaseName: 'Clarify',
        completed: false,
        items: [
          { id: 'wt-clarify-ambiguities', text: 'Ambigüedades resueltas', checked: false },
          { id: 'wt-clarify-scope', text: 'Alcance confirmado', checked: false }
        ]
      },
      {
        phaseId: 'plan',
        phaseName: 'Plan',
        completed: false,
        items: [
          { id: 'wt-plan-tasks', text: 'Tareas identificadas', checked: false },
          { id: 'wt-plan-estimate', text: 'Estimación realizada', checked: false }
        ]
      },
      {
        phaseId: 'tasks',
        phaseName: 'Tasks',
        completed: false,
        items: [
          { id: 'wt-tasks-code', text: 'Código generado según plan', checked: false },
          { id: 'wt-tasks-tests', text: 'Pruebas unitarias pasan', checked: false }
        ]
      },
      {
        phaseId: 'implement',
        phaseName: 'Implement',
        completed: false,
        items: [
          { id: 'wt-impl-acceptance', text: 'Pruebas de aceptación superadas', checked: false },
          { id: 'wt-impl-reviewed', text: 'Código revisado y aprobado', checked: false }
        ]
      }
    ];
  }

  renderChecklistForPhase(phaseId) {
    if (!this.checklistContainer) return;

    const phase = this.checklists.find(p => p.phaseId === phaseId);
    if (!phase) {
      this.checklistContainer.innerHTML = '';
      return;
    }

    this.checklistContainer.innerHTML = '';

    const title = document.createElement('h5');
    title.textContent = 'Checklist de Verificación';
    this.checklistContainer.appendChild(title);

    const list = document.createElement('div');
    list.className = 'checklist';

    phase.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'checklist-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item.id;
      checkbox.checked = item.checked;
      checkbox.setAttribute('aria-label', item.text);

      const label = document.createElement('label');
      label.htmlFor = item.id;
      label.textContent = item.text;

      checkbox.addEventListener('change', () => {
        item.checked = checkbox.checked;
        phase.completed = phase.items.every(i => i.checked);
        this.saveProgress();
        this.updateProgress();
      });

      checkbox.addEventListener('change', () => {
        const announcement = checkbox.checked ? 'Completado' : 'No completado';
        this.announce(announcement);
      });

      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);
      list.appendChild(itemDiv);
    });

    this.checklistContainer.appendChild(list);
  }

  loadProgress() {
    const saved = localStorage.getItem('sdd-walkthrough-progress');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      if (data.currentCase !== this.currentCase) return;

      this.currentPhaseIndex = data.currentPhaseIndex || 0;
      this.visitedPhases = data.visitedPhases || [];
      this.userDecisions = data.userDecisions || {};
      this.isComplete = data.isComplete || false;

      if (data.checklists) {
        data.checklists.forEach(savedPhase => {
          const phase = this.checklists.find(p => p.phaseId === savedPhase.phaseId);
          if (phase && savedPhase.items) {
            savedPhase.items.forEach(savedItem => {
              const item = phase.items.find(i => i.id === savedItem.id);
              if (item) item.checked = savedItem.checked;
            });
            phase.completed = savedPhase.completed || false;
          }
        });
      }

      this.updateProgress();
    } catch (e) {
      console.warn('Error loading walkthrough progress:', e);
    }
  }

  saveProgress() {
    try {
      const data = {
        currentCase: this.currentCase,
        currentPhaseIndex: this.currentPhaseIndex,
        visitedPhases: this.visitedPhases,
        userDecisions: this.userDecisions,
        isComplete: this.isComplete,
        checklists: this.checklists,
        lastVisit: new Date().toISOString()
      };
      localStorage.setItem('sdd-walkthrough-progress', JSON.stringify(data));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
      }
    }
  }

  updateProgressFromChecklists() {
    const totalItems = this.checklists.reduce((sum, phase) => sum + phase.items.length, 0);
    const checkedItems = this.checklists.reduce((sum, phase) => sum + phase.items.filter(i => i.checked).length, 0);
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  }

  renderStepContent(phaseData) {
    if (!this.stepContent) return;

    const phase = phasesEnhanced.find(p => p.id === phaseData.phaseId);
    if (!phase) return;

    this.stepContent.innerHTML = '';

    // Phase header
    const header = document.createElement('h5');
    header.textContent = `Fase ${phase.order}: ${phase.name}`;
    this.stepContent.appendChild(header);

    // Situation
    const situation = document.createElement('p');
    situation.className = 'walkthrough-situation';
    situation.textContent = phaseData.situation;
    this.stepContent.appendChild(situation);

    // Artifact example (collapsible)
    if (phaseData.artifactExample) {
      const artifactDiv = document.createElement('div');
      artifactDiv.className = 'walkthrough-artifact';

      const artifactHeader = document.createElement('button');
      artifactHeader.className = 'artifact-toggle';
      artifactHeader.textContent = `Ver artefacto: ${phaseData.artifactExample.name}`;
      artifactHeader.setAttribute('aria-expanded', 'false');

      const artifactContent = document.createElement('pre');
      artifactContent.className = 'artifact-content';
      artifactContent.style.display = 'none';
      artifactContent.textContent = phaseData.artifactExample.content;

      artifactHeader.addEventListener('click', () => {
        const isExpanded = artifactHeader.getAttribute('aria-expanded') === 'true';
        artifactHeader.setAttribute('aria-expanded', (!isExpanded).toString());
        artifactContent.style.display = isExpanded ? 'none' : 'block';
      });

      artifactDiv.appendChild(artifactHeader);
      artifactDiv.appendChild(artifactContent);
      this.stepContent.appendChild(artifactDiv);
    }

    // Handoff demo
    if (phaseData.handoffDemo) {
      const handoffDiv = document.createElement('div');
      handoffDiv.className = 'walkthrough-handoff-demo';

      const handoffText = document.createElement('p');
      handoffText.innerHTML = `<strong>Handoff:</strong> ${phaseData.handoffDemo.fromRole} → ${phaseData.handoffDemo.toRole} | Artefacto: ${phaseData.handoffDemo.artifact}`;
      handoffDiv.appendChild(handoffText);

      this.stepContent.appendChild(handoffDiv);
    }
  }

  showDecisionPrompt(phaseData) {
    if (!this.decisionButtons) return;

    this.decisionButtons.innerHTML = '';
    this.decisionButtons.style.display = 'block';

    if (!phaseData.decisions || phaseData.decisions.length === 0) return;

    const promptText = document.createElement('p');
    promptText.className = 'decision-prompt';
    promptText.textContent = phaseData.decisions[0]; // First item is the question
    this.decisionButtons.appendChild(promptText);

    // Create buttons for each decision option
    for (let i = 1; i < phaseData.decisions.length; i++) {
      const option = phaseData.decisions[i];
      const match = option.match(/^([A-C])\)\s(.+)$/);

      if (match) {
        const optionLetter = match[1];
        const optionText = match[2];

        const btn = document.createElement('button');
        btn.className = 'decision-btn';
        btn.setAttribute('data-option', optionLetter);
        btn.textContent = `${optionLetter}) ${optionText}`;

        btn.addEventListener('click', () => {
          this.handleDecision(phaseData, optionLetter, phaseData.decisions);
        });

        this.decisionButtons.appendChild(btn);
      }
    }
  }

  handleDecision(phaseData, selectedOption, allOptions) {
    // Store decision
    this.userDecisions[phaseData.phaseId] = selectedOption;

    // Get feedback - CORREGIDO: usar correctAnswer del data
    const isCorrect = selectedOption === phaseData.correctAnswer;
    const feedback = isCorrect
      ? phaseData.feedback.correct
      : (phaseData.feedback.incorrect[parseInt(selectedOption) - 1] || 'Respuesta incorrecta.');

    // Show feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
    feedbackDiv.textContent = feedback;

    // Replace decision buttons with feedback
    if (this.decisionButtons) {
      this.decisionButtons.innerHTML = '';
      this.decisionButtons.appendChild(feedbackDiv);

      // Add continue button
      const continueBtn = document.createElement('button');
      continueBtn.textContent = 'Continuar →';
      continueBtn.className = 'walkthrough-btn walkthrough-btn-continue';
      continueBtn.addEventListener('click', () => {
        this.next();
      });
      this.decisionButtons.appendChild(continueBtn);
    }

    // Announce feedback
    this.announce(feedback);
  }

  next() {
    if (this.currentPhaseIndex < 4) {
      this.currentPhaseIndex++;
      this.showCurrentStep();
    } else {
      this.complete();
    }
  }

  previous() {
    if (this.currentPhaseIndex > 0) {
      this.currentPhaseIndex--;
      this.showCurrentStep();
    }
  }

  complete() {
    this.isComplete = true;

    // Mark all checklists complete
    this.checklists.forEach(phase => {
      phase.completed = true;
      phase.items.forEach(item => item.checked = true);
    });

    if (this.stepContent) {
      this.stepContent.innerHTML = '<h5>¡Recorrido completado!</h5><p>Has terminado el caso de estudio.</p>';
    }

    if (this.decisionButtons) {
      this.decisionButtons.style.display = 'none';
    }

    if (this.progressBar) {
      const progressFill = this.progressBar.querySelector('.walkthrough-progress-fill');
      progressFill.style.width = '100%';
      this.progressBar.setAttribute('aria-valuenow', '5');
    }

    this.saveProgress();
    this.announce('Walkthrough completed!');
  }

  announce(message) {
    const announcer = document.getElementById('walkthrough-announcements');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}

// Initialize walkthrough when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for diagram to be ready
  setTimeout(() => {
    if (window.processDiagram) {
      window.walkthrough = new InteractiveWalkthrough(window.processDiagram);
    }
  }, 100);
});

// T044-T045: Handle walkthrough start buttons
const startGreenfieldBtn = document.getElementById('walkthrough-start-greenfield');
const startBrownfieldBtn = document.getElementById('walkthrough-start-brownfield');

if (startGreenfieldBtn) {
  startGreenfieldBtn.addEventListener('click', () => {
    if (window.walkthrough) {
      window.walkthrough.start('greenfield');
    }
  });
}

if (startBrownfieldBtn) {
  startBrownfieldBtn.addEventListener('click', () => {
    if (window.walkthrough) {
      window.walkthrough.start('brownfield');
    }
  });
}
