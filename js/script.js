document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.getElementById('main-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 8) {
        header.classList.add('border-border', 'bg-background/70', 'backdrop-blur-xl');
        header.classList.remove('border-transparent');
      } else {
        header.classList.add('border-transparent');
        header.classList.remove('border-border', 'bg-background/70', 'backdrop-blur-xl');
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // --- Mobile Navigation Menu Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } else {
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // --- Project Accordion Animation ---
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    const button = item.querySelector('.project-header');
    const content = item.querySelector('.project-content');
    const folderClosed = item.querySelector('.folder-closed');
    const folderOpen = item.querySelector('.folder-open');
    const chevron = item.querySelector('.chevron-icon');

    if (button && content) {
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        // Close all other projects
        projectItems.forEach(otherItem => {
          const otherButton = otherItem.querySelector('.project-header');
          const otherContent = otherItem.querySelector('.project-content');
          const otherFolderClosed = otherItem.querySelector('.folder-closed');
          const otherFolderOpen = otherItem.querySelector('.folder-open');
          const otherChevron = otherItem.querySelector('.chevron-icon');

          if (otherButton && otherContent && otherItem !== item) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherContent.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
            otherContent.classList.replace('opacity-100', 'opacity-0');
            if (otherFolderClosed) otherFolderClosed.classList.remove('hidden');
            if (otherFolderOpen) otherFolderOpen.classList.add('hidden');
            if (otherChevron) otherChevron.classList.remove('rotate-90');
            otherItem.classList.remove('border-border-hover', 'bg-surface-2');
            otherItem.classList.add('border-border', 'bg-surface-2/40');
          }
        });

        // Toggle current project
        if (isOpen) {
          button.setAttribute('aria-expanded', 'false');
          content.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
          content.classList.replace('opacity-100', 'opacity-0');
          if (folderClosed) folderClosed.classList.remove('hidden');
          if (folderOpen) folderOpen.classList.add('hidden');
          if (chevron) chevron.classList.remove('rotate-90');
          item.classList.remove('border-border-hover', 'bg-surface-2');
          item.classList.add('border-border', 'bg-surface-2/40');
        } else {
          button.setAttribute('aria-expanded', 'true');
          content.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
          content.classList.replace('opacity-0', 'opacity-100');
          if (folderClosed) folderClosed.classList.add('hidden');
          if (folderOpen) folderOpen.classList.remove('hidden');
          if (chevron) chevron.classList.add('rotate-90');
          item.classList.remove('border-border', 'bg-surface-2/40');
          item.classList.add('border-border-hover', 'bg-surface-2');
        }
      });
    }
  });

  // --- GitHub Metrics Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400; // 1.4 seconds
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(easeOut * target);
      el.textContent = value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const observerOptions = {
    rootMargin: '-40px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(el => observer.observe(el));
});
