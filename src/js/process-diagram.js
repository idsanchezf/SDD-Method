/**
 * ProcessDiagram Class - Renders SVG diagram for US4
 * Shows SDD phases with handoffs, quality gates, and role transitions
 */

class ProcessDiagram {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found.`);
      return;
    }

    this.svg = null;
    this.nodes = [];
    this.edges = [];
    this.handoffArrows = [];
    this.gates = [];
    this.activeNode = null;
    this.activeGateLayer = false;

    this.init();
  }

  init() {
    this.createSVG();
    this.loadData();
    this.render();
    this.attachEvents();
  }

  createSVG() {
    // Create SVG element
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('id', 'process-diagram');
    this.svg.setAttribute('aria-label', 'SDD Process Diagram');
    this.svg.setAttribute('role', 'application');
    this.svg.setAttribute('tabindex', '0');

    // Set SVG size from layout
    this.svg.setAttribute('width', diagramLayout.width);
    this.svg.setAttribute('height', diagramLayout.height);
    this.svg.setAttribute('viewBox', `0 0 ${diagramLayout.width} ${diagramLayout.height}`);

    // Create main groups
    this.gEdges = this.createElement('g', { class: 'edges' });
    this.gNodes = this.createElement('g', { class: 'nodes' });
    this.gHandoffs = this.createElement('g', { class: 'handoffs', style: 'display: block;' });
    this.gGates = this.createElement('g', { class: 'gates', style: 'opacity: 0;' });

    this.svg.appendChild(this.gEdges);
    this.svg.appendChild(this.gNodes);
    this.svg.appendChild(this.gHandoffs);
    this.svg.appendChild(this.gGates);

    // Live region for announcements
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('id', 'diagram-announcements');
    this.announcer.style.position = 'absolute';
    this.announcer.style.left = '-9999px';
    this.container.appendChild(this.announcer);

    this.container.appendChild(this.svg);
  }

  createElement(tag, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
    return el;
  }

  loadData() {
    // Data is loaded from global variables (from data files)
    this.phases = phasesEnhanced;
    this.layout = diagramLayout;
    this.handoffsData = handoffs;
    this.rolesData = rolesIntegration;
  }

  render() {
    this.renderEdges();
    this.renderNodes();
    this.renderHandoffs();
    this.renderGates();
  }

  renderEdges() {
    this.gEdges.innerHTML = '';
    this.layout.edges.forEach(edge => {
      const fromNode = this.layout.nodes.find(n => n.phaseId === edge.fromNode);
      const toNode = this.layout.nodes.find(n => n.phaseId === edge.toNode);

      if (!fromNode || !toNode) return;

      // Calculate edge points
      const x1 = fromNode.x + fromNode.width / 2;
      const y1 = fromNode.y + fromNode.height;
      const x2 = toNode.x + toNode.width / 2;
      const y2 = toNode.y;

      // Create arrow line
      const line = this.createElement('line', {
        class: 'diagram-edge',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: 'var(--color-edge-default, #6B7280)',
        'stroke-width': '2',
        'marker-end': 'url(#arrowhead)'
      });

      // Add subtle label
      if (edge.label) {
        const text = this.createElement('text', {
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2 - 5,
          'font-size': '10px',
          fill: 'var(--color-text-secondary, #6B7280)',
          'text-anchor': 'middle'
        });
        text.textContent = edge.label;
        this.gEdges.appendChild(text);
      }

      this.gEdges.appendChild(line);
    });

    // Add arrowhead marker definition
    this.addArrowheadMarker();
  }

  addArrowheadMarker() {
    let defs = this.svg.querySelector('defs');
    if (!defs) {
      defs = this.createElement('defs');
      this.svg.insertBefore(defs, this.svg.firstChild);
    }

    const marker = this.createElement('marker', {
      id: 'arrowhead',
      viewBox: '0 0 10 10',
      refX: '9',
      refY: '5',
      markerWidth: '8',
      markerHeight: '8',
      orient: 'auto-start-reverse'
    });

    const path = this.createElement('path', {
      d: 'M 0 0 L 10 5 L 0 10 z',
      fill: 'var(--color-edge-default, #6B7280)'
    });

    marker.appendChild(path);
    defs.appendChild(marker);
  }

  renderNodes() {
    this.gNodes.innerHTML = '';
    this.layout.nodes.forEach(nodeData => {
      const phase = this.phases.find(p => p.id === nodeData.phaseId);
      if (!phase) return;

      // Create group for node
      const g = this.createElement('g', {
        class: 'diagram-node',
        'data-phase-id': nodeData.phaseId,
        'data-order': phase.order,
        tabindex: '0',
        role: 'button',
        'aria-label': `Phase ${phase.order}: ${phase.name}`
      });

      // Create rounded rectangle
      const rect = this.createElement('rect', {
        x: nodeData.x,
        y: nodeData.y,
        width: nodeData.width,
        height: nodeData.height,
        rx: '8',
        ry: '8',
        fill: 'var(--color-phase-default, #E5E7EB)',
        stroke: 'var(--color-border, #D1D5DB)',
        'stroke-width': '2',
        class: 'diagram-node-rect'
      });

      // Add phase name text
      const text = this.createElement('text', {
        x: nodeData.x + nodeData.width / 2,
        y: nodeData.y + nodeData.height / 2,
        'font-size': '14px',
        'font-weight': 'bold',
        fill: 'var(--color-text-primary, #111827)',
        'text-anchor': 'middle',
        'dominant-baseline': 'central'
      });
      text.textContent = phase.name;

      // Add order number (small)
      const orderText = this.createElement('text', {
        x: nodeData.x + 12,
        y: nodeData.y + 15,
        'font-size': '10px',
        fill: 'var(--color-text-secondary, #6B7280)',
        'font-weight': 'bold'
      });
      orderText.textContent = phase.order;

      g.appendChild(rect);
      g.appendChild(text);
      g.appendChild(orderText);
      this.gNodes.appendChild(g);

      this.nodes.push({ element: g, phaseId: nodeData.phaseId, data: nodeData });
    });
  }

  renderHandoffs() {
    this.gHandoffs.innerHTML = '';
    this.layout.handoffArrows.forEach(arrowData => {
      // Create path for curved arrow
      const path = this.createElement('path', {
        d: arrowData.path,
        fill: 'none',
        stroke: 'var(--color-handoff-default, #8B5CF6)',
        'stroke-width': '2',
        'stroke-dasharray': '5,5',
        class: 'diagram-handoff',
        'data-handoff-id': arrowData.id,
        'data-from-phase': arrowData.fromPhase,
        'data-to-phase': arrowData.toPhase,
        'marker-end': 'url(#arrowhead-handoff)'
      });

      // Add label
      if (arrowData.label) {
        const text = this.createElement('text', {
          'font-size': '9px',
          fill: 'var(--color-handoff-default, #8B5CF6)',
          'text-anchor': 'middle'
        });
        text.textContent = arrowData.label;

        // Position label at midpoint of path (simplified)
        const midMatch = arrowData.path.match(/C\s+([\d.]+)\s+([\d.]+)/);
        if (midMatch) {
          text.setAttribute('x', midMatch[1]);
          text.setAttribute('y', (parseFloat(midMatch[2]) + 15).toString());
        }

        this.gHandoffs.appendChild(text);
      }

      this.gHandoffs.appendChild(path);
    });

    // Add handoff arrowhead marker
    this.addHandoffArrowheadMarker();
  }

  addHandoffArrowheadMarker() {
    let defs = this.svg.querySelector('defs');
    if (!defs) {
      defs = this.createElement('defs');
      this.svg.insertBefore(defs, this.svg.firstChild);
    }

    if (!defs.querySelector('#arrowhead-handoff')) {
      const marker = this.createElement('marker', {
        id: 'arrowhead-handoff',
        viewBox: '0 0 10 10',
        refX: '9',
        refY: '5',
        markerWidth: '6',
        markerHeight: '6',
        orient: 'auto-start-reverse'
      });

      const path = this.createElement('path', {
        d: 'M 0 0 L 10 5 L 0 10 z',
        fill: 'var(--color-handoff-default, #8B5CF6)'
      });

      marker.appendChild(path);
      defs.appendChild(marker);
    }
  }

  renderGates() {
    this.gGates.innerHTML = '';
    this.layout.gates.forEach(gateData => {
      const g = this.createElement('g', {
        class: 'diagram-gate',
        'data-gate-id': gateData.id,
        'data-phase-id': gateData.phaseId,
        tabindex: '0',
        role: 'img',
        'aria-label': `Quality Gate: ${gateData.label}`
      });

      // Diamond shape for gate
      const size = 30;
      const points = `
        ${gateData.x},${gateData.y - size / 2}
        ${gateData.x + size / 2},${gateData.y}
        ${gateData.x},${gateData.y + size / 2}
        ${gateData.x - size / 2},${gateData.y}
      `.trim();

      const diamond = this.createElement('polygon', {
        points: points,
        fill: 'var(--color-gate-default, #F59E0B)',
        stroke: 'var(--color-gate-border, #D97706)',
        'stroke-width': '2',
        class: 'diagram-gate-polygon'
      });

      // Label
      const text = this.createElement('text', {
        x: gateData.x,
        y: gateData.y + size / 2 + 15,
        'font-size': '9px',
        'font-weight': 'bold',
        fill: 'var(--color-text-primary, #111827)',
        'text-anchor': 'middle'
      });
      text.textContent = gateData.label;

      g.appendChild(diamond);
      g.appendChild(text);
      this.gGates.appendChild(g);

      this.gates.push({ element: g, gateId: gateData.id, phaseId: gateData.phaseId });
    });
  }

  attachEvents() {
    // Node click events
    this.nodes.forEach(node => {
      const el = node.element;

      el.addEventListener('click', () => {
        this.selectNode(node.phaseId);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectNode(node.phaseId);
        }
      });

      el.addEventListener('mouseenter', () => {
        this.hoverNode(node.phaseId);
      });

      el.addEventListener('mouseleave', () => {
        this.unhoverNode(node.phaseId);
      });
    });

    // Gate click events (for toggling visibility)
    this.gates.forEach(gate => {
      gate.element.addEventListener('click', () => {
        this.toggleGateHighlight(gate.phaseId);
      });
    });
  }

  selectNode(phaseId) {
    // Deselect previous
    if (this.activeNode) {
      const prevNode = this.nodes.find(n => n.phaseId === this.activeNode);
      if (prevNode) {
        prevNode.element.querySelector('.diagram-node-rect').setAttribute('stroke', 'var(--color-border, #D1D5DB)');
        prevNode.element.querySelector('.diagram-node-rect').setAttribute('stroke-width', '2');
        prevNode.element.classList.remove('diagram-node--active');
      }
    }

    // Select new
    const node = this.nodes.find(n => n.phaseId === phaseId);
    if (node) {
      node.element.querySelector('.diagram-node-rect').setAttribute('stroke', 'var(--color-primary, #3B82F6)');
      node.element.querySelector('.diagram-node-rect').setAttribute('stroke-width', '3');
      node.element.classList.add('diagram-node--active');

      // Update active node
      this.activeNode = phaseId;

      // Announce
      const phase = this.phases.find(p => p.id === phaseId);
      this.announce(`Selected phase ${phase.order}: ${phase.name}`);

      // Dispatch event
      this.dispatchEvent('phase:select', { phaseId, element: node.element });
    }
  }

  hoverNode(phaseId) {
    const node = this.nodes.find(n => n.phaseId === phaseId);
    if (node) {
      node.element.querySelector('.diagram-node-rect').setAttribute('stroke', 'var(--color-primary-light, #60A5FA)');
      const phase = this.phases.find(p => p.id === phaseId);
      this.dispatchEvent('phase:hover', { phaseId, element: node.element });
    }
  }

  unhoverNode(phaseId) {
    const node = this.nodes.find(n => n.phaseId === phaseId);
    if (node && this.activeNode !== phaseId) {
      node.element.querySelector('.diagram-node-rect').setAttribute('stroke', 'var(--color-border, #D1D5DB)');
    }
  }

  toggleGateLayer(visible) {
    this.activeGateLayer = visible;
    if (visible) {
      this.gGates.style.opacity = '1';
      this.gGates.style.transition = 'opacity 0.3s ease';
    } else {
      this.gGates.style.opacity = '0';
    }

    this.dispatchEvent('gate:toggle', { visible });
  }

  toggleGateHighlight(phaseId) {
    const gate = this.gates.find(g => g.phaseId === phaseId);
    if (gate) {
      const polygon = gate.element.querySelector('.diagram-gate-polygon');
      const isHighlighted = polygon.getAttribute('fill') === 'var(--color-gate-active, #10B981)';

      if (isHighlighted) {
        polygon.setAttribute('fill', 'var(--color-gate-default, #F59E0B)');
      } else {
        polygon.setAttribute('fill', 'var(--color-gate-active, #10B981)');
      }
    }
  }

  highlightHandoffsForRole(roleSlug) {
    // Dim all handoff arrows
    const allArrows = this.gHandoffs.querySelectorAll('.diagram-handoff');
    allArrows.forEach(arrow => {
      arrow.style.opacity = '0.3';
    });

    // Highlight arrows for this role
    const role = this.rolesData.find(r => r.roleSlug === roleSlug);
    if (role) {
      const handoffIds = [...role.handoffsAsEmitter, ...role.handoffsAsReceiver];
      handoffIds.forEach(id => {
        const arrow = this.gHandoffs.querySelector(`[data-handoff-id="${id}"]`);
        if (arrow) {
          arrow.style.opacity = '1';
          arrow.style.stroke = role.diagramColor || 'var(--color-handoff-active, #7C3A9D)';
          arrow.style.strokeWidth = '3';
        }
      });
    }

    this.dispatchEvent('handoff:highlight', { roleSlug });
  }

  resetHandoffHighlight() {
    const allArrows = this.gHandoffs.querySelectorAll('.diagram-handoff');
    allArrows.forEach(arrow => {
      arrow.style.opacity = '1';
      arrow.style.stroke = 'var(--color-handoff-default, #8B5CF6)';
      arrow.style.strokeWidth = '2';
    });
  }

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    this.svg.dispatchEvent(event);
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
}

// Initialize diagram when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('process-diagram-container')) {
    window.processDiagram = new ProcessDiagram('process-diagram-container');
  }
});
