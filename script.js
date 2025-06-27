// ACCORDION
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item     = header.parentElement;
    const content  = item.querySelector('.accordion-content');
    const isOpen   = header.classList.contains('active');

    // fecha tudo
    document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
    document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);

    // abre o clicado (se estava fechado)
    if (!isOpen) {
      header.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// HERO fade‑in (já existia)
const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    entries[0].target.querySelector('.content').style.opacity = 1;
    heroObserver.disconnect();
  }
},{threshold:0.4});
heroObserver.observe(document.querySelector('.hero'));
 