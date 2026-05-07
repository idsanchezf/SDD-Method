class SectionNav {
  constructor(sectionEl) {
    this.section = sectionEl;
    this.items = [];
    this.currentActive = null;
    this.observer = null;
    this.container = null;
  }

  detectSubsections() {
    const subs = this.section.querySelectorAll('[data-section-nav]');
    this.items = [];
    subs.forEach((el) => {
      const id = el.getAttribute('data-section-nav');
      const title = el.getAttribute('data-section-title') || id;
      if (id && title) {
        this.items.push({ id, title, element: el });
      }
    });
    return this.items.length > 1;
  }

  render() {
    if (this.items.length < 2) return;

    this.container = document.createElement('nav');
    this.container.className = 'section-nav';
    this.container.setAttribute('aria-label', 'Navegación interna de sección');

    this.renderList();
    this.renderSelect();

    const sectionContainer = this.section.querySelector('.hero__container, .phases-container, .roles-container, .process__container, .guide__container');
    const insertTarget = sectionContainer || this.section.querySelector('div:first-child') || this.section;
    if (insertTarget) {
      insertTarget.insertBefore(this.container, insertTarget.firstChild);
    }
  }

  renderList() {
    const list = document.createElement('ul');
    list.className = 'section-nav__list';
    list.setAttribute('role', 'list');

    this.items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'section-nav__item';

      const btn = document.createElement('button');
      btn.className = 'section-nav__link';
      btn.textContent = item.title;
      btn.setAttribute('type', 'button');
      btn.setAttribute('data-nav-id', item.id);
      btn.addEventListener('click', () => this.handleClick(item.id));

      li.appendChild(btn);
      list.appendChild(li);
    });

    this.listEl = list;
    this.container.appendChild(list);
  }

  renderSelect() {
    const select = document.createElement('select');
    select.className = 'section-nav__select';
    select.setAttribute('aria-label', 'Navegar a sub-sección');

    this.items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.title;
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      this.handleClick(e.target.value);
      select.blur();
    });

    this.selectEl = select;
    this.container.appendChild(select);
  }

  handleClick(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;

    item.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.setActive(id);
  }

  setActive(id) {
    this.currentActive = id;

    if (this.listEl) {
      const links = this.listEl.querySelectorAll('.section-nav__link');
      links.forEach((btn) => {
        btn.classList.toggle('section-nav__link--active', btn.getAttribute('data-nav-id') === id);
      });
    }

    if (this.selectEl) {
      this.selectEl.value = id;
    }
  }

  initScrollSpy() {
    const elements = this.items.map((i) => i.element).filter(Boolean);
    if (elements.length === 0) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const id = entry.target.getAttribute('data-section-nav');
            if (id) best = id;
          }
        });

        if (best && best !== this.currentActive) {
          this.setActive(best);
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => this.observer.observe(el));
  }

  init() {
    if (!this.detectSubsections()) return;
    this.render();
    this.initScrollSpy();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    this.items = [];
    this.currentActive = null;
  }
}

function initSectionNavs() {
  const sections = document.querySelectorAll('.hero, #phases, #roles, #process-end-to-end, #guide');
  const navs = [];

  sections.forEach((section) => {
    if (section) {
      const nav = new SectionNav(section);
      nav.init();
      navs.push(nav);
    }
  });

  return navs;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSectionNavs);
} else {
  initSectionNavs();
}
