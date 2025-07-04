// ACCORDION
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const content = item.querySelector(".accordion-content");
    const isOpen = header.classList.contains("active");

    // fecha tudo
    document
      .querySelectorAll(".accordion-header")
      .forEach((h) => h.classList.remove("active"));
    document
      .querySelectorAll(".accordion-content")
      .forEach((c) => (c.style.maxHeight = null));

    // abre o clicado (se estava fechado)
    if (!isOpen) {
      header.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// HERO fade‑in (já existia)
const heroObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      entries[0].target.querySelector(".content").style.opacity = 1;
      heroObserver.disconnect();
    }
  },
  { threshold: 0.4 }
);
heroObserver.observe(document.querySelector(".hero"));

document.querySelectorAll(".info-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const info = btn.nextElementSibling;
    const isCurrentlyHidden = info.style.display === "none" || info.style.display === ""; // Verifica se está oculto ou não definido

    info.style.display = isCurrentlyHidden ? "block" : "none";

    // Verifica se a info-box está dentro de um accordion-content
    let currentParent = btn.parentElement;
    while (currentParent) {
      if (currentParent.classList.contains("accordion-content")) {
        // Encontrou o accordion-content, ajusta seu maxHeight
        currentParent.style.maxHeight = currentParent.scrollHeight + "px";
        break; // Para de procurar
      }
      currentParent = currentParent.parentElement;
    }
  });
});