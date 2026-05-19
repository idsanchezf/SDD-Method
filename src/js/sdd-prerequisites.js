const prerequisitesData = [
  {
    id: 'tecnicos',
    title: 'Técnicos',
    icon: '1',
    items: [
      {
        id: 'git',
        name: 'Git',
        description: 'Control de versiones con branches, PRs y commits',
        level: 'basico',
        why: 'SDD versiona specs tanto como código. Necesitas Git para trackear cambios en specs, hacer code review de specs en PRs y mantener trazabilidad entre specs y código.',
        relatedSection: { name: 'Proceso E2E', href: '#process-end-to-end' },
        resources: [
          { title: 'Git - Tutorial Interactivo', type: 'tutorial', url: 'https://learngitbranching.js.org/', duration: '2 horas' },
          { title: 'GitHub Docs - About branches', type: 'documentacion', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches', duration: '30 min' },
          { title: 'Ejemplo: PR con spec SDD', type: 'ejemplo', url: '#process-end-to-end', duration: 'Lectura rápida' }
        ]
      },
      {
        id: 'markdown',
        name: 'Markdown',
        description: 'Formato de documentación con encabezados, listas, tablas y code blocks',
        level: 'basico',
        why: 'Las specs SDD se escriben en Markdown. Necesitas dominar encabezados, listas, tablas, code blocks y enlaces para escribir specs claras y estructuradas.',
        relatedSection: { name: 'Anatomía de Specs', href: '#spec-anatomy' },
        resources: [
          { title: 'Markdown Guide', type: 'tutorial', url: 'https://www.markdownguide.org/', duration: '1 hora' },
          { title: 'MDN - Markdown básico', type: 'documentacion', url: 'https://developer.mozilla.org/es/docs/MDN/Writing_guidelines/Howto/Markdown_in_MDN', duration: '20 min' },
          { title: 'Ejemplo: spec.md en SDD', type: 'ejemplo', url: '#spec-anatomy', duration: 'Lectura rápida' }
        ]
      },
      {
        id: 'testing',
        name: 'Testing',
        description: 'Pruebas unitarias, de integración y formato Given/When/Then',
        level: 'intermedio',
        why: 'Los criterios de aceptación en SDD se escriben en formato Given/When/Then, el mismo usado en BDD. Necesitas entender testing para traducir specs a pruebas verificables.',
        relatedSection: { name: 'Anatomía de Specs - GWT', href: '#spec-anatomy-gwt' },
        resources: [
          { title: 'Given/When/Then - Cucumber Docs', type: 'documentacion', url: 'https://cucumber.io/docs/bdd/better-gherkin/', duration: '1 hora' },
          { title: 'Testing Unitario 101', type: 'tutorial', url: 'https://jestjs.io/docs/getting-started', duration: '2 horas' },
          { title: 'Ejemplo: Acceptance Scenarios en spec', type: 'ejemplo', url: '#spec-anatomy-gwt', duration: 'Lectura rápida' }
        ]
      },
      {
        id: 'cli',
        name: 'CLI Básico',
        description: 'Navegación en terminal, ejecución de scripts y comandos básicos',
        level: 'basico',
        why: 'SDD usa herramientas CLI (Speckit) para automatizar partes del workflow. Necesitas comfort básico con terminal para ejecutar comandos, scripts y tareas automatizadas.',
        relatedSection: { name: 'Constitución SDD', href: '#constitution' },
        resources: [
          { title: 'Terminal interactivo (The Linux Command Line)', type: 'tutorial', url: 'https://linuxcommand.org/', duration: '3 horas' },
          { title: 'PowerShell Basics - Microsoft Learn', type: 'documentacion', url: 'https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/01-getting-started', duration: '2 horas' },
          { title: 'Ejemplo: Comandos Speckit', type: 'ejemplo', url: '#constitution', duration: 'Lectura rápida' }
        ]
      }
    ]
  },
  {
    id: 'metodologicos',
    title: 'Metodológicos',
    icon: '2',
    items: [
      {
        id: 'agile',
        name: 'Experiencia con Agile',
        description: 'Trabajo iterativo, sprints o ciclos de entrega',
        level: 'intermedio',
        why: 'SDD se basa en ciclos iterativos (Specify → Clarify → Plan → Tasks → Implement). Sin experiencia en entregas iterativas, el equipo puede sentirse abrumado por la estructura.',
        relatedSection: { name: 'Las 5 Fases', href: '#phases-grid' },
        resources: [
          { title: 'Agile Manifesto', type: 'documentacion', url: 'https://agilemanifesto.org/', duration: '15 min' },
          { title: 'Scrum en 5 minutos', type: 'tutorial', url: 'https://www.scrum.org/resources/what-is-scrum', duration: '30 min' },
          { title: 'Ejemplo: Ciclo SDD en proyecto real', type: 'ejemplo', url: '#phases-grid', duration: 'Lectura rápida' }
        ]
      },
      {
        id: 'code-review',
        name: 'Familiaridad con Code Review',
        description: 'Revisión de código mediante Pull Requests',
        level: 'intermedio',
        why: 'En SDD, tanto specs como código pasan por revisión. Si el equipo no tiene cultura de code review, la calidad de las specs se resiente y se pierde el beneficio de la revisión colaborativa.',
        relatedSection: { name: 'Roles - Reviewer', href: '#roles' },
        resources: [
          { title: 'Code Review Best Practices', type: 'documentacion', url: 'https://google.github.io/eng-practices/review/', duration: '1 hora' },
          { title: 'Cómo empezar con PRs pequeños', type: 'tutorial', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models', duration: '45 min' },
          { title: 'Ejemplo: Revisión de spec en PR', type: 'ejemplo', url: '#roles', duration: 'Lectura rápida' }
        ]
      },
      {
        id: 'ia',
        name: 'Apertura a trabajo asistido por IA',
        description: 'Disposición a usar IA como asistente de desarrollo',
        level: 'basico',
        why: 'SDD integra IA como parte del workflow (AI Spec Assistant, AI Code Generator, AI Reviewer). Sin apertura a la IA, el equipo pierde gran parte del valor de la metodología.',
        relatedSection: { name: 'Colaboración Humano-IA', href: '#collab-flow' },
        resources: [
          { title: 'IA asistida por specs: estudios', type: 'documentacion', url: 'https://arxiv.org/search/?query=specification-driven+development+AI&searchtype=all', duration: 'Lectura variable' },
          { title: 'Cómo la IA mejora con contexto (specs)', type: 'tutorial', url: '#collab-flow', duration: '30 min' },
          { title: 'Ejemplo: Spec asistida por IA', type: 'ejemplo', url: '#collab-flow', duration: 'Lectura rápida' }
        ]
      }
    ]
  },
  {
    id: 'herramientas',
    title: 'Herramientas',
    icon: '3',
    items: [
      {
        id: 'editor',
        name: 'Editor de Código',
        description: 'IDE o editor con soporte para Markdown y Git',
        level: 'basico',
        why: 'Necesitas un editor que soporte Markdown con preview, resaltado de sintaxis e integración con Git. VS Code, WebStorm o cualquier editor moderno funciona.',
        relatedSection: { name: 'Guía de inicio', href: '#guide-templates' },
        resources: [
          { title: 'VS Code - Markdown editing', type: 'tutorial', url: 'https://code.visualstudio.com/docs/languages/markdown', duration: '20 min' },
          { title: 'VS Code - Git integration', type: 'tutorial', url: 'https://code.visualstudio.com/docs/sourcecontrol/overview', duration: '30 min' }
        ]
      },
      {
        id: 'linter',
        name: 'Linter / Formateador',
        description: 'Herramienta de análisis estático de código',
        level: 'basico',
        why: 'Los linters aseguran que las specs y el código sigan convenciones consistentes. SDD se beneficia de tener reglas claras desde el inicio.',
        relatedSection: { name: 'Quality Gates', href: '#quality-gates' },
        resources: [
          { title: 'ESLint - Getting Started', type: 'tutorial', url: 'https://eslint.org/docs/latest/use/getting-started', duration: '1 hora' },
          { title: 'Prettier - Why Prettier?', type: 'documentacion', url: 'https://prettier.io/docs/en/why-prettier.html', duration: '15 min' }
        ]
      },
      {
        id: 'cicd',
        name: 'CI/CD',
        description: 'Integración y despliegue continuo automatizado',
        level: 'intermedio',
        why: 'SDD se beneficia de pipelines CI/CD que validen specs automáticamente (checklists de calidad, linting de specs, verificación de criterios).',
        relatedSection: { name: 'Quality Gates', href: '#quality-gates' },
        resources: [
          { title: 'GitHub Actions - Quickstart', type: 'tutorial', url: 'https://docs.github.com/en/actions/quickstart', duration: '2 horas' },
          { title: 'CI/CD para proyectos Markdown', type: 'ejemplo', url: '#quality-gates', duration: 'Lectura rápida' }
        ]
      }
    ]
  }
];

const verdictConfig = {
  thresholds: {
    all: { count: 0, verdict: 'ready', label: 'Ready para SDD', icon: '✅', color: 'green' },
    almost: { min: 1, max: 2, verdict: 'almost', label: 'Casi listo', icon: '🟡', color: 'yellow' },
    missing: { min: 3, verdict: 'missing', label: 'Faltan bases', icon: '🔴', color: 'red' }
  },
  storageKey: 'sdd-prereqs-progress'
};

function getProgress() {
  try {
    const saved = localStorage.getItem(verdictConfig.storageKey);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(checked) {
  try {
    localStorage.setItem(verdictConfig.storageKey, JSON.stringify(checked));
    document.getElementById('prereq-storage-notice').classList.remove('prereq-storage-notice--visible');
  } catch {
    document.getElementById('prereq-storage-notice').classList.add('prereq-storage-notice--visible');
  }
}

function renderChecklist() {
  const container = document.getElementById('prereq-checklist');
  if (!container) return;

  const saved = getProgress();

  container.innerHTML = prerequisitesData.map(category => {
    const checkedCount = category.items.filter(item => saved[item.id]).length;
    const totalCount = category.items.length;

    return `
      <div class="prereq-category prereq-category--expanded" data-category="${category.id}">
        <div class="prereq-category__header" role="button" tabindex="0" aria-expanded="true" aria-controls="category-body-${category.id}">
          <span class="prereq-category__icon" aria-hidden="true">▸</span>
          <span class="prereq-category__title">${category.title}</span>
          <span class="prereq-category__count">${checkedCount}/${totalCount}</span>
        </div>
        <div class="prereq-category__body" id="category-body-${category.id}">
          ${category.items.map(item => {
            const isChecked = !!saved[item.id];
            return `
              <div class="prereq-item ${isChecked ? 'prereq-item--checked' : ''}" data-item="${item.id}">
                <input type="checkbox" class="prereq-item__checkbox" id="prereq-${item.id}" ${isChecked ? 'checked' : ''} aria-label="${item.name}">
                <div class="prereq-item__content">
                  <div class="prereq-item__name ${isChecked ? 'prereq-item__name--checked' : ''}">${item.name}</div>
                  <div class="prereq-item__desc">${item.description}</div>
                  <span class="prereq-item__level prereq-item__level--${item.level}">${item.level}</span>
                  <button class="prereq-item__toggle" type="button" aria-expanded="false" aria-controls="detail-${item.id}">
                    Ver detalle ▸
                  </button>
                  <div class="prereq-item__detail" id="detail-${item.id}">
                    <div class="prereq-item__detail-inner">
                      <div class="prereq-item__why">
                        <strong>Por qué es necesario:</strong> ${item.why}
                      </div>
                      <h5>Recursos recomendados</h5>
                      <div class="prereq-resources">
                        ${item.resources.map(r => `
                          <a href="${r.url}" class="prereq-resource" target="_blank" rel="noopener">
                            <span class="prereq-resource__type prereq-resource__type--${r.type}">${r.type}</span>
                            <span class="prereq-resource__info">
                              <span class="prereq-resource__title">${r.title}</span>
                              <span class="prereq-resource__duration">${r.duration}</span>
                            </span>
                          </a>
                        `).join('')}
                      </div>
                      ${item.relatedSection ? `
                        <div class="prereq-item__related">
                          <a href="${item.relatedSection.href}">Ver en sección relacionada: ${item.relatedSection.name} →</a>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  updateCategoryCounts();
}

function updateCategoryCounts() {
  const checked = getCheckedItems();
  prerequisitesData.forEach(category => {
    const header = document.querySelector(`.prereq-category[data-category="${category.id}"] .prereq-category__count`);
    if (header) {
      const checkedCount = category.items.filter(item => checked.has(item.id)).length;
      header.textContent = `${checkedCount}/${category.items.length}`;
    }
  });
}

function getCheckedItems() {
  const checkboxes = document.querySelectorAll('.prereq-item__checkbox:checked');
  return new Set(Array.from(checkboxes).map(cb => cb.id.replace('prereq-', '')));
}

function calculateVerdict(checked) {
  const allItems = prerequisitesData.flatMap(cat => cat.items);
  const total = allItems.length;
  const checkedCount = checked.size;
  const gaps = allItems.filter(item => !checked.has(item.id));

  if (checkedCount === total) {
    return {
      verdict: 'ready',
      label: verdictConfig.thresholds.all.label,
      icon: verdictConfig.thresholds.all.icon,
      gaps: [],
      suggestion: '¡Tu equipo está listo para adoptar SDD! Comienza con la sección ¿Qué es SDD? para entender la metodología y luego explora las 5 fases.',
      nextStep: { text: 'Comenzar con ¿Qué es SDD?', href: '#hero-definition' }
    };
  }

  if (gaps.length <= 2) {
    const route = generateSuggestedRoute(gaps);
    return {
      verdict: 'almost',
      label: `${verdictConfig.thresholds.almost.label} (${gaps.length} brecha${gaps.length > 1 ? 's' : ''})`,
      icon: verdictConfig.thresholds.almost.icon,
      gaps,
      suggestion: `Identificamos ${gaps.length} brecha${gaps.length > 1 ? 's' : ''} que cerrar antes de adoptar SDD. Revisa los recursos recomendados para cada una.`,
      route
    };
  }

  const route = generateSuggestedRoute(gaps);
  return {
    verdict: 'missing',
    label: `${verdictConfig.thresholds.missing.label} (revisar ${gaps.length} recursos)`,
    icon: verdictConfig.thresholds.missing.icon,
    gaps,
    suggestion: `Tu equipo necesita cerrar ${gaps.length} brechas antes de adoptar SDD. Sigue la ruta sugerida de preparación para construir las bases necesarias.`,
    route
  };
}

function generateSuggestedRoute(gaps) {
  const dependencyOrder = ['git', 'markdown', 'editor', 'cli', 'testing', 'linter', 'cicd', 'agile', 'code-review', 'ia'];
  const findItem = (id) => {
    for (const cat of prerequisitesData) {
      const found = cat.items.find(i => i.id === id);
      if (found) return found;
    }
    return null;
  };

  const sorted = [...gaps].sort((a, b) => dependencyOrder.indexOf(a.id) - dependencyOrder.indexOf(b.id));

  return sorted.map((item, index) => {
    const reasons = {
      git: 'Base para versionar y trackear cambios en specs',
      markdown: 'Formato principal de escritura de specs',
      editor: 'Herramienta fundamental para crear y editar specs',
      cli: 'Necesario para ejecutar herramientas SDD',
      testing: 'Los criterios de aceptación se escriben en formato de pruebas',
      linter: 'Asegura consistencia en specs y código',
      cicd: 'Automatiza la validación de calidad de specs',
      agile: 'SDD es inherentemente iterativo',
      'code-review': 'Tanto specs como código requieren revisión',
      ia: 'La IA es parte integral del workflow SDD'
    };

    return {
      id: item.id,
      name: item.name,
      reason: reasons[item.id] || 'Prerrequisito necesario para SDD'
    };
  });
}

function renderVerdict(checked) {
  const container = document.getElementById('prereq-verdict');
  if (!container) return;

  const result = calculateVerdict(checked);

  if (result.verdict === 'ready') {
    container.innerHTML = `
      <div class="prereq-verdict prereq-verdict--ready">
        <div class="prereq-verdict__title">${result.icon} ${result.label}</div>
        <p class="prereq-verdict__desc">${result.suggestion}</p>
        <div class="prereq-actions" style="margin-top: 0.75rem;">
          <a href="${result.nextStep.href}" class="prereq-evaluate-btn" style="display: inline-block; text-decoration: none; font-size: 0.875rem; padding: 0.5rem 1.5rem;">${result.nextStep.text}</a>
        </div>
      </div>
    `;
    return;
  }

  const gapsHtml = result.gaps.map(gap => {
    const cat = prerequisitesData.find(c => c.items.some(i => i.id === gap.id));
    const item = cat ? cat.items.find(i => i.id === gap.id) : null;

    return `
      <li class="prereq-verdict__gap">
        <span class="prereq-verdict__gap-icon">${result.verdict === 'almost' ? '!' : '✕'}</span>
        <span class="prereq-verdict__gap-name">${gap.name}</span>
        <button class="prereq-verdict__gap-expand" type="button" data-gap-id="${gap.id}" aria-expanded="false">Recursos ▸</button>
        <div class="prereq-verdict__gap-resources" id="gap-resources-${gap.id}">
          <div class="prereq-verdict__gap-resources-inner">
            ${item ? `
              <p style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; line-height: 1.6;"><strong>Por qué es necesario:</strong> ${item.why}</p>
              <div class="prereq-resources">
                ${item.resources.map(r => `
                  <a href="${r.url}" class="prereq-resource" target="_blank" rel="noopener">
                    <span class="prereq-resource__type prereq-resource__type--${r.type}">${r.type}</span>
                    <span class="prereq-resource__info">
                      <span class="prereq-resource__title">${r.title}</span>
                      <span class="prereq-resource__duration">${r.duration}</span>
                    </span>
                  </a>
                `).join('')}
              </div>
              ${item.relatedSection ? `
                <div style="margin-top: 0.5rem; font-size: 0.75rem;">
                  <a href="${item.relatedSection.href}" style="color: #2563eb; text-decoration: none; font-weight: 600;">Ver en: ${item.relatedSection.name} →</a>
                </div>
              ` : ''}
            ` : ''}
          </div>
        </div>
      </li>
    `;
  }).join('');

  const routeHtml = result.route ? `
    <div class="prereq-route">
      <div class="prereq-route__title">Ruta sugerida de preparación</div>
      <div class="prereq-route__steps">
        ${result.route.map((step, i) => `
          <div class="prereq-route__step">
            <span class="prereq-route__step-number">${i + 1}</span>
            <span class="prereq-route__step-name">${step.name}</span>
            <span class="prereq-route__step-reason">${step.reason}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="prereq-verdict prereq-verdict--${result.verdict}">
      <div class="prereq-verdict__title">${result.icon} ${result.label}</div>
      <p class="prereq-verdict__desc">${result.suggestion}</p>
      ${result.gaps.length > 0 ? `
        <div class="prereq-verdict__gaps-title">Brechas identificadas:</div>
        <ul class="prereq-verdict__gaps">${gapsHtml}</ul>
      ` : ''}
      ${routeHtml}
    </div>
  `;
}

function initChecklist() {
  const container = document.getElementById('prereq-checklist');
  if (!container) return;

  container.addEventListener('change', (e) => {
    const checkbox = e.target.closest('.prereq-item__checkbox');
    if (!checkbox) return;

    const item = checkbox.closest('.prereq-item');
    if (!item) return;

    const isChecked = checkbox.checked;
    item.classList.toggle('prereq-item--checked', isChecked);

    const nameEl = item.querySelector('.prereq-item__name');
    if (nameEl) {
      nameEl.classList.toggle('prereq-item__name--checked', isChecked);
    }

    updateCategoryCounts();
    const checked = getCheckedItems();
    saveProgress(Array.from(checked));
  });

  container.addEventListener('click', (e) => {
    const toggle = e.target.closest('.prereq-item__toggle');
    if (!toggle) return;

    const detailId = toggle.getAttribute('aria-controls');
    const detail = document.getElementById(detailId);
    if (!detail) return;

    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    detail.classList.toggle('prereq-item__detail--open', !isOpen);
    toggle.textContent = isOpen ? 'Ver detalle ▸' : 'Ocultar detalle ▾';
  });

  container.addEventListener('click', (e) => {
    const header = e.target.closest('.prereq-category__header');
    if (!header) return;

    const category = header.closest('.prereq-category');
    if (!category) return;

    category.classList.toggle('prereq-category--expanded');
    const isExpanded = category.classList.contains('prereq-category--expanded');
    header.setAttribute('aria-expanded', isExpanded);
  });
}

function initVerdict() {
  const evaluateBtn = document.getElementById('prereq-evaluate');
  if (!evaluateBtn) return;

  evaluateBtn.addEventListener('click', () => {
    const checked = getCheckedItems();
    renderVerdict(checked);

    document.getElementById('prereq-verdict').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initGapResources() {
  const verdictContainer = document.getElementById('prereq-verdict');
  if (!verdictContainer) return;

  verdictContainer.addEventListener('click', (e) => {
    const expandBtn = e.target.closest('.prereq-verdict__gap-expand');
    if (!expandBtn) return;

    const resourcesId = `gap-resources-${expandBtn.dataset.gapId}`;
    const resources = document.getElementById(resourcesId);
    if (!resources) return;

    const isOpen = expandBtn.getAttribute('aria-expanded') === 'true';
    expandBtn.setAttribute('aria-expanded', !isOpen);
    resources.classList.toggle('prereq-verdict__gap-resources--open', !isOpen);
    expandBtn.textContent = isOpen ? 'Recursos ▸' : 'Recursos ▾';
  });
}

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const toggle = e.target.closest('.prereq-item__toggle, .prereq-verdict__gap-expand, .prereq-category__header');
      if (toggle) {
        e.preventDefault();
        toggle.click();
      }
    }
  });
}

function init() {
  renderChecklist();
  initChecklist();
  initVerdict();
  initGapResources();
  initKeyboard();
}

document.addEventListener('DOMContentLoaded', init);
