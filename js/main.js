document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const contactBtn = document.getElementById("contactBtn");
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");

  // 🍃 Smart scattered leaf generator
  const rows = 6;
  const cols = 9;
  const usedCells = new Set();
  const leaves = [];

  for (let i = 0; i < rows * cols; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const top = row * (100 / rows) + Math.random() * (100 / rows - 15);
    const left = col * (100 / cols) + Math.random() * (100 / cols - 15);
    const key = `${Math.floor(top)}-${Math.floor(left)}`;

    if (usedCells.has(key)) continue;
    usedCells.add(key);

    const leaf = document.createElement("img");
    leaf.src = "images/leaf-texture.webp";
    leaf.classList.add("leaf");
    leaf.style.top = `${top}%`;
    leaf.style.left = `${left}%`;
    leaf.style.width = `${80 + Math.random() * 40}px`;
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    leafContainer.appendChild(leaf);
    leaves.push(leaf);
  }

  // 🌿 Scroll-based effects
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // FIRST scroll threshold: reveal product image
    if (scrollY > window.innerHeight * 0.2) {
      product.classList.add("shrink");
      greetingText.classList.add("hide");
      contactBtn.classList.add("scrolled");
    } else {
      product.classList.remove("shrink");
      greetingText.classList.remove("hide");
      contactBtn.classList.remove("scrolled");
    }

    // SECOND scroll threshold: reveal CTA
    const productBottom = product.getBoundingClientRect().bottom;
    if (productBottom < window.innerHeight * 0.45) {
      cta.classList.add("revealed");
    } else {
      cta.classList.remove("revealed");
    }
  });

  // 🌀 Cursor proximity animation with auto-reset
  document.addEventListener("mousemove", (e) => {
    leaves.forEach((leaf) => {
      const rect = leaf.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 80;
      if (distance < maxDist) {
        leaf.style.transition = "transform 0.2s ease";
        leaf.style.transform = "scale(0.8)";
        clearTimeout(leaf.resetTimer);
        leaf.resetTimer = setTimeout(() => {
          leaf.style.transform = "scale(1)";
        }, 200);
      }
    });
  });

  // ✨ Ripple pulse on click
  document.addEventListener("click", (e) => {
    leaves.forEach((leaf) => {
      const rect = leaf.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const radius = 100;
      if (distance < radius) {
        leaf.style.transition = "transform 0.2s ease";
        leaf.style.transform = "scale(1.3)";
        setTimeout(() => {
          leaf.style.transform = "scale(1)";
          leaf.style.transition = "transform 0.4s ease";
        }, 150);
      }
    });
  });
});