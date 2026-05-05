// US3: Roles & Responsibilities - Interactive Behavior
(function() {
  'use strict';

  // DOM Elements
  const rolesSection = document.querySelector('.roles-section');
  if (!rolesSection) return;

  const roleCards = rolesSection.querySelectorAll('.role-card');
  const roleDetail = rolesSection.querySelector('.role-detail');
  const matrixTable = rolesSection.querySelector('.matrix-table');
  const compareView = rolesSection.querySelector('.compare-view');
  const compareGrid = compareView?.querySelector('.compare-view__grid');

  // State
  let selectedCard = null;
  let compareSlots = [null, null];

  // Role Data
  const roleData = {};
  roleCards.forEach(card => {
    const slug = card.dataset.role;
    roleData[slug] = {
      element: card,
      name: card.querySelector('.role-card__name').textContent,
      type: card.dataset.type,
      description: card.querySelector('.role-card__desc').textContent,
      responsibilities: card.dataset.responsibilities?.split('|') || [],
      skills: card.dataset.skills?.split('|') || [],
      experience: card.dataset.experience || '',
      phases: card.dataset.phases?.split('|') || [],
      capabilities: card.dataset.capabilities?.split('|') || [],
      limitations: card.dataset.limitations?.split('|') || [],
      prompts: card.dataset.prompts?.split('|') || [],
      supervision: card.dataset.supervision || '',
    };
  });

  // Event Listeners
  roleCards.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(card);
      }
    });
  });

  const closeBtn = roleDetail?.querySelector('.role-detail__close');
  closeBtn?.addEventListener('click', closeDetail);

  const compareCloseBtn = compareView?.querySelector('.compare-view__close');
  compareCloseBtn?.addEventListener('click', closeCompare);

  // Matrix highlighting
  if (matrixTable) {
    const roleHeaders = matrixTable.querySelectorAll('thead th:not(:first-child)');
    const rows = matrixTable.querySelectorAll('tbody tr');

    // Role header clicks (columns)
    roleHeaders.forEach((header, colIdx) => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightMatrixColumn(colIdx + 1);
      });
    });

    // Phase header clicks (rows)
    rows.forEach((row, rowIdx) => {
      const phaseHeader = row.querySelector('th');
      if (phaseHeader) {
        phaseHeader.style.cursor = 'pointer';
        phaseHeader.addEventListener('click', (e) => {
          e.stopPropagation();
          highlightMatrixRow(rowIdx);
        });
      }
    });

    // Clear highlighting on click outside matrix
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.matrix-table-wrapper')) {
        clearMatrixHighlight();
      }
    });
  }

  // Functions
  function handleCardClick(card) {
    const slug = card.dataset.role;
    const data = roleData[slug];

    // If already selected, add to compare
    if (card.classList.contains('role-card--selected') && selectedCard === card) {
      addToCompare(slug);
      return;
    }

    // Deselect previous
    roleCards.forEach(c => c.classList.remove('role-card--selected'));
    card.classList.add('role-card--selected');
    selectedCard = card;

    // Show detail
    showDetail(data);

    // Announce to screen readers
    announceToSR(`${data.name} - ${data.description}`);
  }

  function showDetail(data) {
    if (!roleDetail) return;

    const isAI = data.type === 'ia';
    roleDetail.className = `role-detail is-visible${isAI ? ' role-detail--ai' : ''}`;

    const iconSvg = isAI
      ? '<path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/><circle cx="18" cy="6" r="2"/>'
      : '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';

    let html = `
      <div class="role-detail__header">
        <svg class="role-detail__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconSvg}</svg>
        <div>
          <h3 class="role-detail__title">${data.name}</h3>
          <p class="role-detail__subtitle">${data.description}</p>
        </div>
        <button class="role-detail__close" aria-label="Cerrar detalle" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="role-detail__grid">
        <div class="role-detail__column">
          <h4>${isAI ? 'Capacidades' : 'Responsabilidades'}</h4>
          <ul>
            ${(isAI ? data.capabilities : data.responsibilities).map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="role-detail__column">
          <h4>${isAI ? 'Limitaciones' : 'Habilidades requeridas'}</h4>
          <ul>
            ${(isAI ? data.limitations : data.skills).map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="role-detail__column">
          <h4>Nivel de experiencia</h4>
          <p>${data.experience}</p>
          <h4 style="margin-top: var(--space-md);">Fases de participación</h4>
          <div class="role-card__meta">
            ${data.phases.map(phase => `<span class="role-card__tag">${phase}</span>`).join('')}
          </div>
        </div>
    `;

    if (isAI) {
      html += `
        <div class="role-detail__column role-detail__column--prompts">
          <h4>Ejemplos de prompts efectivos</h4>
          ${data.prompts.map(prompt => `<div class="role-detail__prompt">${prompt}</div>`).join('')}
        </div>
        <div class="role-detail__supervision">
          <h4>Supervisión humana requerida</h4>
          <p>${data.supervision}</p>
        </div>
      `;
    }

    html += '</div>';
    roleDetail.innerHTML = html;

    // Re-bind close button
    roleDetail.querySelector('.role-detail__close')?.addEventListener('click', closeDetail);

    // Scroll detail into view
    roleDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closeDetail() {
    if (roleDetail) {
      roleDetail.classList.remove('is-visible');
      roleCards.forEach(c => c.classList.remove('role-card--selected'));
      selectedCard = null;
    }
  }

  function highlightMatrixColumn(colIdx) {
    if (!matrixTable) return;

    clearMatrixHighlight();
    matrixTable.classList.add('is-highlighting');

    // Highlight all cells in the clicked column (skip first column which is row header)
    const rows = matrixTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells[colIdx - 1]) {
        cells[colIdx - 1].classList.add('cell--active');
      }
    });
  }

  function highlightMatrixRow(rowIdx) {
    if (!matrixTable) return;

    clearMatrixHighlight();
    matrixTable.classList.add('is-highlighting');

    // Highlight all cells in the clicked row
    const rows = matrixTable.querySelectorAll('tbody tr');
    if (rows[rowIdx]) {
      const cells = rows[rowIdx].querySelectorAll('td');
      cells.forEach(cell => cell.classList.add('cell--active'));
    }
  }

  function clearMatrixHighlight() {
    if (!matrixTable) return;
    matrixTable.classList.remove('is-highlighting');
    matrixTable.querySelectorAll('.cell--active').forEach(cell => {
      cell.classList.remove('cell--active');
    });
  }

  function addToCompare(slug) {
    const emptyIndex = compareSlots.indexOf(null);
    if (emptyIndex !== -1) {
      compareSlots[emptyIndex] = slug;
    } else {
      compareSlots[0] = slug;
    }

    if (compareSlots[0] && compareSlots[1]) {
      showCompare();
    }
  }

  function showCompare() {
    if (!compareView || !compareGrid) return;

    const data1 = roleData[compareSlots[0]];
    const data2 = roleData[compareSlots[1]];

    compareGrid.innerHTML = `
      ${renderCompareColumn(data1)}
      ${renderCompareColumn(data2)}
    `;

    compareView.classList.add('is-visible');
    compareView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderCompareColumn(data) {
    const isAI = data.type === 'ia';
    return `
      <div class="compare-view__column">
        <h3 class="compare-view__role-name">${data.name}</h3>
        <div class="compare-view__section">
          <h4>${isAI ? 'Capacidades' : 'Responsabilidades'}</h4>
          <ul>
            ${(isAI ? data.capabilities : data.responsibilities).map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="compare-view__section">
          <h4>${isAI ? 'Limitaciones' : 'Habilidades'}</h4>
          <ul>
            ${(isAI ? data.limitations : data.skills).map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="compare-view__section">
          <h4>Fases</h4>
          <p>${data.phases.join(', ')}</p>
        </div>
      </div>
    `;
  }

  function closeCompare() {
    if (compareView) {
      compareView.classList.remove('is-visible');
      compareSlots = [null, null];
      roleCards.forEach(c => c.classList.remove('role-card--selected'));
      selectedCard = null;
    }
  }

  function announceToSR(message) {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = message; }, 100);
  }

})();
