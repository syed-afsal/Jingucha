document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const aboutBtn = document.getElementById("aboutBtn"); // Changed from contactBtn
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");
  const chatBtn = document.getElementById("chatBtn");
  const contactModal = document.getElementById("contactModal");
  const closeModal = document.getElementById("closeModal");

  // Determine if it's a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Leaf grid configuration - fewer leaves on mobile
  const rows = isMobile ? 4 : 6;
  const cols = isMobile ? 5 : 8;
  const usedCells = new Set();
  const leaves = [];

  // Create leaf elements scattered with light green + ash mix filter
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
    leaf.style.width = `${(isMobile ? 60 : 80) + Math.random() * 40}px`;
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    leaf.style.filter = "brightness(0.85) saturate(0.5) hue-rotate(90deg)";

    leafContainer.appendChild(leaf);
    leaves.push(leaf);
  }

  // Scroll effects
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      product.classList.add("shrink");
      greetingText.classList.add("hide");
      aboutBtn.classList.add("scrolled");
    } else {
      product.classList.remove("shrink");
      greetingText.classList.remove("hide");
      aboutBtn.classList.remove("scrolled");
    }

    // Reveal CTA when product is 40% scrolled
    const productBottom = product.getBoundingClientRect().bottom;
    if (productBottom < window.innerHeight * 0.4) {
      cta.classList.add("revealed");
    } else {
      cta.classList.remove("revealed");
    }
  });

  // Leaf interactions only on desktop
  if (!isMobile) {
    // Ripple pulse on click - smaller radius on mobile
    document.addEventListener("click", (e) => {
      const radius = isMobile ? 50 : 100; // Smaller radius on mobile
      
      leaves.forEach((leaf) => {
        const rect = leaf.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

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
  }

  // Chat button opens modal
  chatBtn.addEventListener("click", () => {
    contactModal.style.display = "block";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });
});