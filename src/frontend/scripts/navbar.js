// Alternancia simple de barra de navegación para móvil
function initNavbar() {
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Marcar enlace activo
  const links = document.querySelectorAll('.navbar-link');
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initNavbar);
