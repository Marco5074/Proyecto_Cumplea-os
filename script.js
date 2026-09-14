"use strict";

const sections = Array.from(document.querySelectorAll(".section"));
const progressText = document.getElementById("page-progress");
let current = 0;

function showSection(index) {
  current = Math.max(0, Math.min(sections.length - 1, index));
  sections.forEach((section, i) => {
    section.classList.toggle("active", i === current);
  });
  progressText.textContent = `♡ ${current + 1} de ${sections.length} ♡`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showSection(current + 1));
});

document.querySelectorAll("[data-prev]").forEach(button => {
  button.addEventListener("click", () => showSection(current - 1));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showSection(Number(button.dataset.go)));
});

// Búsqueda predeterminada de Mulan.
const searchButton = document.getElementById("search-btn");
const progressFill = document.getElementById("progress-fill");
const searchStatus = document.getElementById("search-status");
const princessResult = document.getElementById("princess-result");

let searching = false;

searchButton.addEventListener("click", () => {
  if (searching) return;

  searching = true;
  searchButton.disabled = true;
  princessResult.style.display = "none";
  progressFill.style.width = "0%";

  const messages = [
    "Analizando tu personalidad...",
    "Buscando coincidencias...",
    "Comparando cualidades...",
    "¡Princesa encontrada!"
  ];

  let step = 0;

  function tick() {
    step++;
    progressFill.style.width = `${step * 25}%`;
    searchStatus.textContent = messages[Math.min(step - 1, messages.length - 1)];

    if (step < messages.length) {
      setTimeout(tick, 650);
    } else {
      setTimeout(() => {
        princessResult.style.display = "block";
        searchButton.textContent = "Volver a buscar ✨";
        searchButton.disabled = false;
        searching = false;
      }, 500);
    }
  }

  tick();
});
