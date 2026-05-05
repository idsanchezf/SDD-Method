(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initChecklist();
    initProgressBar();
  });

  /**
   * Checklist Accordion
   * Toggles aria-expanded and hidden attributes on checklist items.
   */
  function initChecklist() {
    var checklist = document.getElementById('comprehension-checklist');
    if (!checklist) return;

    var toggles = checklist.querySelectorAll('.checklist__toggle');

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        toggleAccordion(this);
      });

      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAccordion(this);
        }
      });
    });
  }

  function toggleAccordion(button) {
    var isExpanded = button.getAttribute('aria-expanded') === 'true';
    var targetId = button.getAttribute('aria-controls');
    var answer = document.getElementById(targetId);

    if (!answer) return;

    button.setAttribute('aria-expanded', String(!isExpanded));

    if (isExpanded) {
      answer.setAttribute('hidden', '');
    } else {
      answer.removeAttribute('hidden');
    }
  }

  /**
   * Reading Progress Indicator
   * Uses IntersectionObserver to track sections with [data-trackable].
   */
  function initProgressBar() {
    var trackableSections = document.querySelectorAll('[data-trackable]');
    if (trackableSections.length === 0) return;

    var progressBar = document.querySelector('.progress-bar');
    var progressFill = document.querySelector('.progress-bar__fill');
    if (!progressBar || !progressFill) return;

    var totalSections = trackableSections.length;
    var viewedSections = new Set();

    function updateProgress() {
      var count = viewedSections.size;
      var percentage = Math.round((count / totalSections) * 100);

      progressFill.style.width = percentage + '%';
      progressBar.setAttribute('aria-valuenow', String(percentage));
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            var id = entry.target.getAttribute('id') || entry.target.className;
            viewedSections.add(id);
            updateProgress();
          }
        });
      },
      { threshold: 0.5 }
    );

    trackableSections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
