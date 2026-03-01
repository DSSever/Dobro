// Загрузить меню с отдельного файла
document.addEventListener('DOMContentLoaded', function() {
  // Добавить стили меню
  const linkMenu = document.createElement('link');
  linkMenu.rel = 'stylesheet';
  linkMenu.href = 'menu.css';
  document.head.appendChild(linkMenu);
  
  // Загрузить HTML меню
  fetch('menu.html')
    .then(response => response.text())
    .then(html => {
      // Вставить меню в начало body (перед остальным контентом)
      const menuContainer = document.createElement('div');
      menuContainer.id = 'menu-container';
      menuContainer.innerHTML = html;
      document.body.insertBefore(menuContainer, document.body.firstChild);
      
      // Инициализировать функциональность меню после загрузки
      initMenuFunctionality();
    })
    .catch(error => console.error('Ошибка загрузки меню:', error));
});

// Функция инициализации функциональности меню
function initMenuFunctionality() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (!menuToggle || !mainNav) return;
  
  // Гамбургер меню
  menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Закрыть меню при клике на ссылку
  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Закрыть меню при клике на select
  const citySelect = document.querySelector('#citySelect');
  if (citySelect) {
    citySelect.addEventListener('change', function() {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
      // Вызвать функцию фильтрации, если она существует
      if (typeof filterCards === 'function') {
        filterCards();
      }
    });
  }
  
  // Закрыть меню при клике вне его
  document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('menuToggle');
    if (nav && toggle && !nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    }
  });
  
  // Адаптивность меню при изменении размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mainNav.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}
