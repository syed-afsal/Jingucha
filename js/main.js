document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const contactBtn = document.getElementById("contactBtn");
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");
  const customCursor = document.getElementById("customCursor");

  const isMobile = window.innerWidth < 769;
  const rows = isMobile ? 2 : 5;
  const cols = isMobile ? 3 : 6;
  const usedCells = new Set();
  const leaves = [];

  // 🍃 Create scattered leaves
  for (let i = 0; i < rows * cols; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const top = row * (100 / rows) + Math.random() * (100 / rows - 10);
    const left = col * (100 / cols) + Math.random() * (100 / cols - 10);
    const key = `${Math.floor(top)}-${Math.floor(left)}`;
    if (usedCells.has(key)) continue;
    usedCells.add(key);

    const leaf = document.createElement("img");
    leaf.src = "images/leaf-texture.webp";
    leaf.classList.add("leaf");
    leaf.style.top = `${top}%`;
    leaf.style.left = `${left}%`;
    leaf.style.width = `${60 + Math.random() * 30}px`;
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

    leafContainer.appendChild(leaf);
    leaves.push(leaf);
  }

  // ✨ Custom cursor sparkle (PC only)
  function createCursorSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-sparkle");
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }

  // 🖱️ Cursor & leaf interactions (PC only)
  if (!isMobile) {
    document.addEventListener("mousemove", (e) => {
      customCursor.style.display = "block";
      customCursor.style.top = `${e.clientY}px`;
      customCursor.style.left = `${e.clientX}px`;

      if (Math.random() < 0.25) {
        createCursorSparkle(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5));
      }

      leaves.forEach((leaf) => {
        const rect = leaf.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          leaf.style.transition = "transform 0.2s ease";
          leaf.style.transform = "scale(0.8)";
          clearTimeout(leaf.resetTimer);
          leaf.resetTimer = setTimeout(() => {
            leaf.style.transform = "scale(1)";
          }, 200);
        }
      });
    });
  }

  // 🪄 Scroll reveal effects
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      product.classList.add("shrink");
      greetingText.classList.add("hide");
      contactBtn.classList.add("scrolled");
    } else {
      product.classList.remove("shrink");
      greetingText.classList.remove("hide");
      contactBtn.classList.remove("scrolled");
    }

    const productBottom = product.getBoundingClientRect().bottom;
    if (productBottom < window.innerHeight * 0.75) {
      cta.classList.add("revealed");
    } else {
      cta.classList.remove("revealed");
    }
  });

  // 🖱️ Click pulse effect on leaves (lightweight)
  document.addEventListener("click", (e) => {
    if (isMobile) return;

    leaves.forEach((leaf) => {
      const rect = leaf.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        leaf.style.transition = "transform 0.2s ease";
        leaf.style.transform = "scale(1.3)";
        setTimeout(() => {
          leaf.style.transform = "scale(1)";
          leaf.style.transition = "transform 0.4s ease";
        }, 150);
      }
    });
  });

  // ✨ Random sparkle on leaves (optional, safe for mobile)
  setInterval(() => {
    if (leaves.length === 0) return;
    const sparkleCount = isMobile ? 1 : 3;
    for (let i = 0; i < sparkleCount; i++) {
      const leaf = leaves[Math.floor(Math.random() * leaves.length)];
      const sparkle = document.createElement("div");
      sparkle.classList.add("cursor-sparkle");

      const rect = leaf.getBoundingClientRect();
      sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
      sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  }, 1000);
});