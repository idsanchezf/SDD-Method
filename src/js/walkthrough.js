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

    this.uiContainer = null;
    this.progressBar = null;
    this.stepContent = null;
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

    // Setup UI
    this.setupUI();

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

    // Case title
    const title = document.createElement('h4');
    title.textContent = this.caseData.title;
    this.uiContainer.appendChild(title);

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

    // Step content area
    this.stepContent = document.createElement('div');
    this.stepContent.className = 'walkthrough-step-content';
    this.uiContainer.appendChild(this.stepContent);

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

    // Render step content
    this.renderStepContent(phaseData);

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
    const percentage = (this.currentPhaseIndex / 5) * 100;

    progressFill.style.width = `${percentage}%`;
    this.progressBar.setAttribute('aria-valuenow', this.currentPhaseIndex.toString());

    // Update button states
    this.prevButton.disabled = this.currentPhaseIndex === 0;
    this.nextButton.disabled = this.currentPhaseIndex >= 4;
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

    // Get feedback
    const isCorrect = selectedOption === allOptions[0].match(/^([A-C])\)/)?.[1]; // Correct answer is A
    const feedback = isCorrect
      ? phaseData.feedback.correct
      : phaseData.feedback.incorrect[parseInt(selectedOption) - 2] || 'Respuesta incorrecta.';

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
const startGreenfield = document.getElementById('walkthrough-start-greenfield');
const startBrownfield = document.getElementById('walkthrough-start-brownfield');

if (startGreenfield) {
  startGreenfield.addEventListener('click', () => {
    if (window.walkthrough) {
      window.walkthrough.start('greenfield');
    }
  });
}

if (startBrownfield) {
  startBrownfield.addEventListener('click', () => {
    if (window.walkthrough) {
      window.walkthrough.start('brownfield');
    }
  });
}
