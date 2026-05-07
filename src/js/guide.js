/**
 * InteractiveGuide Class - US5 Step-by-Step Guide
 * Vanilla JS (ES6+) - Constitution Principle I
 */

class InteractiveGuide {
  constructor(caseStudies = []) {
    this.caseStudies = caseStudies;
    this.currentPhase = 'specify';
    this.currentCaseStudyIndex = 0;
    this.progress = 0;
    this.checklists = this.initializeChecklists();
    this.isComplete = false;
    this.lastVisit = null;
    
    this.loadProgress();
    // Don't render immediately - wait for start button
    this.attachStartButton();
  }
  
  attachStartButton() {
    const startBtn = document.getElementById('start-guide');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.render();
        startBtn.style.display = 'none';
      });
      startBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.render();
          startBtn.style.display = 'none';
        }
      });
    }
  }

  initializeChecklists() {
    return [
      {
        phaseId: 'specify',
        phaseName: 'Specify',
        completed: false,
        items: [
          { id: 'spec-complete', text: 'Spec completada', checked: false },
          { id: 'spec-testable', text: 'Criterios testeables', checked: false }
        ]
      },
      {
        phaseId: 'clarify',
        phaseName: 'Clarify',
        completed: false,
        items: [
          { id: 'clarify-ambiguities', text: 'Ambigüedades resueltas', checked: false },
          { id: 'clarify-scope', text: 'Alcance definido', checked: false }
        ]
      },
      {
        phaseId: 'plan',
        phaseName: 'Plan',
        completed: false,
        items: [
          { id: 'plan-tasks', text: 'Tareas identificadas', checked: false },
          { id: 'plan-dependencies', text: 'Dependencias mapeadas', checked: false }
        ]
      },
      {
        phaseId: 'tasks',
        phaseName: 'Tasks',
        completed: false,
        items: [
          { id: 'tasks-code-quality', text: 'Código cumple estándares', checked: false },
          { id: 'tasks-tested', text: 'Pruebas asociadas', checked: false }
        ]
      },
      {
        phaseId: 'implement',
        phaseName: 'Implement',
        completed: false,
        items: [
          { id: 'impl-acceptance', text: 'Pruebas de aceptación pasan', checked: false },
          { id: 'impl-reviewed', text: 'Revisión de código completada', checked: false }
        ]
      }
    ];
  }

  loadProgress() {
    const saved = localStorage.getItem('sdd-guide-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.currentPhase = data.currentPhase || 'specify';
        this.progress = data.progress || 0;
        this.isComplete = data.isComplete || false;
        this.lastVisit = data.lastVisit;
        
        // Load checklist states
        if (data.checklists) {
          data.checklists.forEach(savedPhase => {
            const phase = this.checklists.find(p => p.phaseId === savedPhase.phaseId);
            if (phase && savedPhase.items) {
              savedPhase.items.forEach(savedItem => {
                const item = phase.items.find(i => i.id === savedItem.id);
                if (item) item.checked = savedItem.checked;
              });
              phase.completed = savedPhase.completed;
            }
          });
        }
        
        this.updateProgressFromChecklists();
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
  }

  saveProgress() {
    try {
      const data = {
        currentPhase: this.currentPhase,
        progress: this.progress,
        checklists: this.checklists,
        isComplete: this.isComplete,
        lastVisit: new Date().toISOString()
      };
      localStorage.setItem('sdd-guide-progress', JSON.stringify(data));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
      }
    }
  }

  updateProgressFromChecklists() {
    const totalItems = this.checklists.reduce((sum, phase) => sum + phase.items.length, 0);
    const checkedItems = this.checklists.reduce((sum, phase) => 
      sum + phase.items.filter(item => item.checked).length, 0);
    this.progress = Math.round((checkedItems / totalItems) * 100);
    
    const allPhases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    const currentIndex = allPhases.indexOf(this.currentPhase);
    if (currentIndex > 0) {
      for (let i = 0; i < currentIndex; i++) {
        const phase = this.checklists.find(p => p.phaseId === allPhases[i]);
        if (phase) {
          phase.completed = true;
          phase.items.forEach(item => item.checked = true);
        }
      }
    }
  }

  render() {
    const container = document.getElementById('guide-container');
    if (!container) return;

    container.innerHTML = `
      <div class="guide-header">
        <h3>Guía Paso a Paso: Metodología SDD</h3>
        
        ${this.caseStudies.length > 1 ? `
          <div class="case-study-selector">
            <label for="case-study-select">Caso de Estudio:</label>
            <select id="case-study-select" aria-label="Seleccionar caso de estudio">
              ${this.caseStudies.map((cs, index) => `
                <option value="${index}" ${index === this.currentCaseStudyIndex ? 'selected' : ''}>
                  ${cs.name}
                </option>
              `).join('')}
            </select>
          </div>
        ` : ''}
        
        <div class="guide-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${this.progress}%"></div>
          </div>
          <span class="progress-text">${this.progress}% completado</span>
        </div>
      </div>

      <div class="guide-phases">
        ${this.renderPhaseNavigation()}
      </div>

      <div class="guide-content" aria-live="polite">
        ${this.renderCurrentPhase()}
      </div>

      <div class="guide-controls">
        <button id="guide-back" ${this.currentPhase === 'specify' ? 'disabled' : ''}>Atrás</button>
        <button id="guide-next">${this.currentPhase === 'implement' ? 'Finalizar' : 'Siguiente'}</button>
      </div>

      ${this.isComplete ? '<div class="guide-complete"><h4>¡Metodología Completada!</h4><p>' + this.getCompletionSummary() + '</p></div>' : ''}
    `;

    this.updatePhaseVisuals();
    this.attachGuideEvents();
  }

  renderPhaseNavigation() {
    const phases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    return phases.map((phaseId, index) => {
      const phase = this.checklists.find(p => p.phaseId === phaseId);
      const isActive = phaseId === this.currentPhase;
      const isCompleted = phase ? phase.completed : false;
      
      return `
        <div class="phase-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
             data-phase="${phaseId}"
             role="button"
             tabindex="0"
             aria-label="Fase ${phaseId}"
             aria-pressed="${isActive}">
          <span class="phase-nav-marker">${isCompleted ? '✓' : ''}</span>
          <span class="phase-nav-name">${phaseId.charAt(0).toUpperCase() + phaseId.slice(1)}</span>
        </div>
      `;
    }).join('');
  }

  renderCurrentPhase() {
    const phase = this.checklists.find(p => p.phaseId === this.currentPhase);
    if (!phase) return '';

    // Get case study data for this phase if available
    const caseStudy = this.caseStudies.length > 0 ? this.caseStudies[this.currentCaseStudyIndex] : null;
    const phaseData = caseStudy ? caseStudy.phases.find(p => p.phaseId === this.currentPhase) : null;

    return `
      <h4>Phase: ${phase.phaseName}</h4>
      <p>${this.getPhaseDescription(phase.phaseId)}</p>
      
      ${phaseData ? `
        <div class="phase-detail">
          <h5>Situation:</h5>
          <p>${phaseData.situation || 'Apply SDD methodology step.'}</p>
          ${phaseData.artifactExample ? `
            <div class="artifact-review">
              <h6>Artifact: ${phaseData.artifactExample.name}</h6>
              <pre><code>${phaseData.artifactExample.content.substring(0, 200)}...</code></pre>
              <button class="download-artifact" data-artifact="${phaseData.artifactExample.name}" aria-label="Descargar ${phaseData.artifactExample.name}">
                Ver artefacto generado
              </button>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="checklist">
        ${phase.items.map(item => `
          <div class="checklist-item">
            <input type="checkbox" 
                   id="${item.id}" 
                   ${item.checked ? 'checked' : ''}
                   aria-label="${item.text}">
            <label for="${item.id}">${item.text}</label>
          </div>
        `).join('')}
      </div>
    `;
  }

  getPhaseDescription(phaseId) {
    const descriptions = {
      'specify': 'Definir qué se va a construir mediante especificaciones claras y detalladas.',
      'clarify': 'Refinar y validar la especificación eliminando ambigüedades antes del planeamiento.',
      'plan': 'Crear un plan de implementación detallado con tareas, dependencias y estimaciones.',
      'tasks': 'Descomponer el plan en tareas ejecutables y generar código (con asistencia de IA).',
      'implement': 'Finalizar la implementación, realizar pruebas de aceptación y entregar el producto terminado.'
    };
    return descriptions[phaseId] || '';
  }

  getCompletionSummary() {
    return 'Has completado el ciclo SDD. Resumen: Especificación clara, ambigüedades resueltas, plan detallado, tareas ejecutadas y producto entregado con pruebas.';
  }

  goNext() {
    const allPhases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    const currentIndex = allPhases.indexOf(this.currentPhase);
    
    if (currentIndex < allPhases.length - 1) {
      this.currentPhase = allPhases[currentIndex + 1];
      this.saveProgress();
      this.render();
    } else {
      this.completeGuide();
    }
  }

  goBack() {
    const allPhases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    const currentIndex = allPhases.indexOf(this.currentPhase);
    
    if (currentIndex > 0) {
      this.currentPhase = allPhases[currentIndex - 1];
      this.saveProgress();
      this.render();
    }
  }

  goToPhase(phaseId) {
    const allPhases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    const targetIndex = allPhases.indexOf(phaseId);
    const currentIndex = allPhases.indexOf(this.currentPhase);
    
    // Can only go to completed phases or next sequential phase
    if (targetIndex <= currentIndex + 1) {
      this.currentPhase = phaseId;
      this.saveProgress();
      this.render();
    }
  }

  updatePhaseCompletion() {
    const phase = this.checklists.find(p => p.phaseId === this.currentPhase);
    if (phase) {
      // Auto-check items when certain conditions are met
      if (this.currentPhase === 'specify') {
        const item = phase.items.find(i => i.id === 'spec-complete');
        if (item) item.checked = true;
      }
      if (this.currentPhase === 'clarify') {
        const item = phase.items.find(i => i.id === 'clarify-ambiguities');
        if (item) item.checked = true;
      }
      if (this.currentPhase === 'plan') {
        const item = phase.items.find(i => i.id === 'plan-tasks');
        if (item) item.checked = true;
      }
      if (this.currentPhase === 'tasks') {
        const item = phase.items.find(i => i.id === 'tasks-code-quality');
        if (item) item.checked = true;
      }
      if (this.currentPhase === 'implement') {
        const item = phase.items.find(i => i.id === 'impl-acceptance');
        if (item) item.checked = true;
      }
      
      phase.completed = phase.items.every(item => item.checked);
      this.updateProgressFromChecklists();
      this.saveProgress();
      this.render();
    }
  }

  updatePhaseVisuals() {
    const allPhases = ['specify', 'clarify', 'plan', 'tasks', 'implement'];
    const currentIndex = allPhases.indexOf(this.currentPhase);
    
    document.querySelectorAll('.phase-nav-item').forEach((item, index) => {
      const phaseId = allPhases[index];
      const isActive = phaseId === this.currentPhase;
      const phaseData = this.checklists.find(p => p.phaseId === phaseId);
      const isCompleted = phaseData ? phaseData.completed : false;
      
      item.classList.toggle('active', isActive);
      item.classList.toggle('completed', isCompleted);
      item.setAttribute('aria-pressed', isActive.toString());
    });
  }

  completeGuide() {
    this.isComplete = true;
    this.progress = 100;
    this.checklists.forEach(phase => {
      phase.completed = true;
      phase.items.forEach(item => item.checked = true);
    });
    this.saveProgress();
    this.render();
  }

  attachGuideEvents() {
    const backBtn = document.getElementById('guide-back');
    const nextBtn = document.getElementById('guide-next');
    const phaseNavItems = document.querySelectorAll('.phase-nav-item');
    const caseStudySelect = document.getElementById('case-study-select');

    // Case study selector
    if (caseStudySelect) {
      caseStudySelect.addEventListener('change', (e) => {
        this.currentCaseStudyIndex = parseInt(e.target.value);
        this.saveProgress();
        this.render();
      });
      
      // Keyboard support for select
      caseStudySelect.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          caseStudySelect.focus();
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBack());
      backBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goBack();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goNext());
      nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goNext();
        }
      });
    }

    phaseNavItems.forEach(item => {
      const phaseId = item.getAttribute('data-phase');
      
      item.addEventListener('click', () => this.goToPhase(phaseId));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goToPhase(phaseId);
        }
      });
    });

    // Checklist items
    this.checklists.find(p => p.phaseId === this.currentPhase)?.items.forEach(item => {
      const checkbox = document.getElementById(item.id);
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          item.checked = checkbox.checked;
          this.updatePhaseCompletion();
          this.saveProgress();
          this.render();
        });
        
        // Announce state changes to screen readers
        checkbox.addEventListener('change', () => {
          const announcement = checkbox.checked ? 'Completado' : 'No completado';
          this.announceToScreenReader(announcement);
        });
      }
    });
    
    // Artifact download buttons
    document.querySelectorAll('.download-artifact').forEach(button => {
      button.addEventListener('click', (e) => {
        const artifactName = e.target.getAttribute('data-artifact');
        this.downloadArtifact(artifactName);
      });
      
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const artifactName = e.target.getAttribute('data-artifact');
          this.downloadArtifact(artifactName);
        }
      });
    });
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }
  
  downloadArtifact(artifactName) {
    const caseStudy = this.caseStudies.length > 0 ? this.caseStudies[this.currentCaseStudyIndex] : null;
    const phaseData = caseStudy ? caseStudy.phases.find(p => p.phaseId === this.currentPhase) : null;
    
    if (phaseData && phaseData.artifactExample && phaseData.artifactExample.name === artifactName) {
      const content = phaseData.artifactExample.content;
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = artifactName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.announceToScreenReader(`Descargando ${artifactName}`);
    }
  }
}

// Initialize guide when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('guide-container')) {
    // Import US4 caseStudies data
    const caseStudies = window.caseStudies || [];
    
    window.interactiveGuide = new InteractiveGuide(caseStudies);
  }
});
