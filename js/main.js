document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const contactBtn = document.getElementById("contactBtn");
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");
  const customCursor = document.getElementById("customCursor");

  const rows = 6;
  const cols = 8;
  const usedCells = new Set();
  const leaves = [];

  // 🌿 Create scattered leaves
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

  // ✨ Glitter sparkle inside leaf
  function createGlitter(leaf) {
    const glitter = document.createElement("div");
    glitter.classList.add("glitter");

    const leafRect = leaf.getBoundingClientRect();
    const containerRect = leafContainer.getBoundingClientRect();

    const top = leafRect.top - containerRect.top + Math.random() * leafRect.height;
    const left = leafRect.left - containerRect.left + Math.random() * leafRect.width;

    glitter.style.top = `${top}px`;
    glitter.style.left = `${left}px`;

    leafContainer.appendChild(glitter);

    setTimeout(() => glitter.remove(), 600);
  }

  // 🌟 Cursor sparkle animation
  function createCursorSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-sparkle");
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }

  // 🖱 Custom cursor + leaf hover
  document.addEventListener("mousemove", (e) => {
    customCursor.style.display = "block";
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.left = `${e.clientX}px`;

    if (Math.random() < 0.3) {
      createCursorSparkle(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5));
    }

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

  // 🌀 Scroll effect
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
    if (productBottom < window.innerHeight * 0.4) {
      cta.classList.add("revealed");
    } else {
      cta.classList.remove("revealed");
    }
  });

  // 💥 Ripple pulse on click
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

  // ✨ Continuous sparkles
  setInterval(() => {
    if (leaves.length === 0) return;
    const sparkleCount = 3;
    for (let i = 0; i < sparkleCount; i++) {
      const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)];
      createGlitter(randomLeaf);
    }
  }, 600);
});