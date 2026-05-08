const Sidebar = {
  sidebar: null,
  toggleBtn: null,
  overlay: null,
  body: null,
  isOpen: false,
  desktopBreakpoint: 1024,
  activeSection: null,

  init() {
    this.sidebar = document.getElementById('sidebar');
    this.toggleBtn = document.getElementById('sidebar-toggle');
    this.overlay = document.getElementById('sidebar-overlay');
    this.body = document.body;

    if (!this.sidebar || !this.toggleBtn) return;

    this.setupToggle();
    this.setupSectionToggles();
    this.setupOverlayClose();
    this.setupLinkClicks();
    this.setupScrollSpy();
    this.handleResize();

    // Desktop sidebar starts closed (open via toggle button)
  },

  setupToggle() {
    this.toggleBtn.addEventListener('click', () => {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    });

    const closeBtn = this.sidebar.querySelector('.sidebar__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  },

  setupSectionToggles() {
    const btns = this.sidebar.querySelectorAll('.sidebar__section-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const section = btn.closest('.sidebar__section');
        if (!section) return;

        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isExpanded));
        section.classList.toggle('sidebar__section--expanded', !isExpanded);
      });
    });
  },

  setupOverlayClose() {
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
  },

  setupLinkClicks() {
    const links = this.sidebar.querySelectorAll('.sidebar__link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        this.close();
      });
    });
  },

  setupScrollSpy() {
    const sections = document.querySelectorAll('[data-trackable]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry.target;
          }
        });

        if (best) {
          const sectionId = best.id || best.getAttribute('id');
          if (sectionId) {
            this.setActiveSection(sectionId);
          }

          const sectionTarget = best.getAttribute('data-trackable')
            ? this.getSectionTarget(best)
            : null;
          if (sectionTarget) {
            this.highlightSection(sectionTarget);
          }
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
  },

  getSectionTarget(el) {
    if (el.classList.contains('hero')) return 'hero';
    if (el.id === 'phases') return 'phases';
    if (el.id === 'roles') return 'roles';
    if (el.id === 'process-end-to-end') return 'process-end-to-end';
    if (el.id === 'templates') return 'templates';
    if (el.id === 'constitution') return 'constitution';
    if (el.id === 'collab-flow') return 'collab-flow';
    if (el.id === 'spec-anatomy') return 'spec-anatomy';
    return null;
  },

  highlightSection(target) {
    const items = this.sidebar.querySelectorAll('.sidebar__section');
    items.forEach((item) => {
      const isActive = item.getAttribute('data-section-target') === target;
      item.classList.toggle('sidebar__section--active', isActive);

      if (isActive) {
        const btn = item.querySelector('.sidebar__section-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'true');
          item.classList.add('sidebar__section--expanded');
        }
      }
    });
  },

  setActiveSection(id) {
    const links = this.sidebar.querySelectorAll('.sidebar__link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('sidebar__link--active', href === `#${id}`);
    });
  },

  open() {
    this.isOpen = true;
    this.sidebar.classList.add('sidebar--open');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('sidebar-visible');
  },

  close() {
    this.isOpen = false;
    this.sidebar.classList.remove('sidebar--open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sidebar-visible');
  },

  handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isDesktop = window.innerWidth >= this.desktopBreakpoint;
        if (isDesktop) {
          if (this.overlay) this.overlay.style.display = 'none';
        } else {
          if (this.overlay) this.overlay.style.display = '';
          this.close();
        }
      }, 150);
    });
  },
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Sidebar.init());
} else {
  Sidebar.init();
}
