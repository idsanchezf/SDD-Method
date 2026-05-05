(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initPhaseCards();
    initFlowDiagram();
    initPrintButton();
    animateDetails();
  });

  /**
   * Shared state for bidirectional linking between cards and diagram.
   */
  var activePhase = -1;

  /**
   * Phase Card Selection
   */
  function initPhaseCards() {
    var cards = document.querySelectorAll('.phase-card');
    if (cards.length === 0) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        selectPhase(parseInt(this.getAttribute('data-phase'), 10));
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectPhase(parseInt(this.getAttribute('data-phase'), 10));
        }
      });
    });
  }

  /**
   * Select a phase by number, highlighting card and diagram node.
   */
  function selectPhase(phaseNum) {
    activePhase = phaseNum;

    // Update cards
    var cards = document.querySelectorAll('.phase-card');
    cards.forEach(function (card) {
      var num = parseInt(card.getAttribute('data-phase'), 10);
      if (num === phaseNum) {
        card.classList.add('is-active');
        card.setAttribute('aria-expanded', 'true');
      } else {
        card.classList.remove('is-active');
        card.setAttribute('aria-expanded', 'false');
      }
    });

    // Update diagram nodes (desktop SVG)
    var nodes = document.querySelectorAll('.flow-diagram__node');
    nodes.forEach(function (node) {
      var num = parseInt(node.getAttribute('data-diagram-node'), 10);
      if (num === phaseNum) {
        node.classList.add('is-active');
      } else {
        node.classList.remove('is-active');
      }
    });

    // Update mobile diagram
    var mobileSteps = document.querySelectorAll('.flow-mobile__step');
    mobileSteps.forEach(function (step) {
      var num = parseInt(step.getAttribute('data-diagram-node'), 10);
      if (num === phaseNum) {
        step.classList.add('is-active');
      } else {
        step.classList.remove('is-active');
      }
    });
  }

  /**
   * Flow Diagram Interaction (bidirectional)
   */
  function initFlowDiagram() {
    var diagramNodes = document.querySelectorAll('.flow-diagram__node');
    var mobileSteps = document.querySelectorAll('.flow-mobile__step');

    diagramNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        var phase = parseInt(this.getAttribute('data-diagram-node'), 10);
        selectPhase(phase);
        scrollToPhase(phase);
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var phase = parseInt(this.getAttribute('data-diagram-node'), 10);
          selectPhase(phase);
          scrollToPhase(phase);
        }
      });
    });

    mobileSteps.forEach(function (step) {
      step.addEventListener('click', function () {
        var phase = parseInt(this.getAttribute('data-diagram-node'), 10);
        selectPhase(phase);
        scrollToPhase(phase);
      });
    });
  }

  function scrollToPhase(phaseNum) {
    var card = document.querySelector('.phase-card[data-phase="' + phaseNum + '"]');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Print Button
   */
  function initPrintButton() {
    var printBtn = document.querySelector('.print-button');
    if (!printBtn) return;

    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  /**
   * Smooth animation for <details> open/close
   */
  function animateDetails() {
    var details = document.querySelectorAll('.phase-detail');

    details.forEach(function (detail) {
      var content = detail.querySelector('.phase-detail__content');
      if (!content) return;

      detail.addEventListener('toggle', function () {
        if (detail.open) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.overflow = 'hidden';
          content.style.transition = 'max-height 250ms ease';
        } else {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          content.style.transition = 'max-height 250ms ease';
        }
      });
    });
  }
})();
