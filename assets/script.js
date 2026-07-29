mermaid.initialize({ startOnLoad: true, theme: 'default' });

// UI CONTROLS JAVASCRIPT
  function hideAllViews() {
    document.querySelectorAll('[id^="view-"]').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('animate-fade');
    });
  }

  function showView(viewId) {
    hideAllViews();
    const view = document.getElementById(viewId);
    if(view) {
      view.classList.remove('hidden');
      void view.offsetWidth;
      view.classList.add('animate-fade');
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  function showSession(sNum) {
    showView('view-session-' + sNum);
    showLessonTab(sNum, 1);
  }

  function showLessonTab(sNum, lNum) {
    const parent = document.getElementById('view-session-' + sNum);
    if(!parent) return;
    
    parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    parent.querySelectorAll('.lesson-panel').forEach(panel => {
      panel.classList.add('hidden');
      panel.classList.remove('animate-fade');
    });
    
    const btnId = 'btn-s' + sNum + '-l' + lNum;
    const panelId = 'panel-s' + sNum + '-l' + lNum;
    
    const btn = document.getElementById(btnId);
    if(btn) btn.classList.add('active');
    
    const panel = document.getElementById(panelId);
    if(panel) {
      panel.classList.remove('hidden');
      void panel.offsetWidth;
      panel.classList.add('animate-fade');
      setTimeout(() => mermaid.init(undefined, panel.querySelectorAll('.mermaid')), 100);
    }
  }

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
  }
  function closeSidebar() {
    if(window.innerWidth < 1024) {
      document.getElementById('sidebar').classList.add('-translate-x-full');
    }
  }
  document.getElementById('sidebarTrigger').addEventListener('click', toggleSidebar);

  // THEME TOGGLE
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.getElementById('themeToggleIcon');
    if(document.body.classList.contains('dark-theme')) {
      icon.classList.replace('ph-moon-stars', 'ph-sun');
      icon.classList.replace('ph-moon', 'ph-sun');
    } else {
      icon.classList.replace('ph-sun', 'ph-moon-stars');
    }
  }

  // PET TOGGLE
  function togglePetVisibility() {
    alert('🐷 Web Pet is active! (Tính năng mô phỏng)');
  }

  // BACK TO TOP
  function renderMarkmaps() {
      const { Markmap, loadCSS, loadJS, Transformer } = window.markmap;
      const transformer = new Transformer();
      
      document.querySelectorAll('.markmap-container').forEach(container => {
        const svg = container.querySelector('svg');
        const scriptEl = container.querySelector('script[type="text/template"]');
        if (!svg || !scriptEl) return;
        
        const markdown = scriptEl.textContent.trim();
        const { root, features } = transformer.transform(markdown);
        const { styles, scripts } = transformer.getUsedAssets(features);
        
        if (styles) loadCSS(styles);
        if (scripts) loadJS(scripts, { getMarkmap: () => window.markmap });
        
        Markmap.create(svg, {
          color: (node) => {
            const colors = ['#C00000', '#3C2F6A', '#059669', '#D97706', '#2563EB', '#9333EA'];
            return colors[node.depth % colors.length];
          },
          style: id => id + " * { font-family: 'Inter', sans-serif; font-weight: 600; }",
          autoFit: true
        }, root);
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      showView('view-overview');
      if (typeof initGlossary === 'function') initGlossary();
    });

  window.addEventListener('scroll', () => {
    const b2t = document.getElementById('backToTop');
    if(window.scrollY > 300) {
      b2t.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      b2t.classList.add('opacity-100', 'translate-y-0');
    } else {
      b2t.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      b2t.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  // INITIALIZATION
  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
  showView('view-overview');