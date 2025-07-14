document.addEventListener("DOMContentLoaded", () => {
  // Get all elements
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const aboutBtn = document.getElementById("aboutBtn");
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");
  const chatBtn = document.getElementById("chatBtn");
  const contactModal = document.getElementById("contactModal");
  const aboutModal = document.getElementById("aboutModal");
  const closeModal = document.getElementById("closeModal");
  const closeAboutModal = document.getElementById("closeAboutModal");
  const customCursor = document.getElementById("customCursor");

  // Determine if it's a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Leaf grid configuration
  const rows = isMobile ? 4 : 6;
  const cols = isMobile ? 5 : 8;
  const usedCells = new Set();
  const leaves = [];

  // Create leaf elements
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
    leaf.style.width = `${(isMobile ? 40 : 80) + Math.random() * 40}px`;
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    leaf.style.filter = "brightness(0.85) saturate(0.5) hue-rotate(90deg)";

    leafContainer.appendChild(leaf);
    leaves.push(leaf);
  }

  // Leaf interactions
  function setupLeafInteractions() {
    // Leaf proximity scale effect (desktop only)
    if (!isMobile) {
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
    }

    // Leaf click animation (both desktop and mobile)
    document.addEventListener("click", (e) => {
      const radius = isMobile ? 50 : 100;
      
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

  // Cursor effects (desktop only)
  function setupCursorEffects() {
    if (isMobile) return;
    
    document.body.style.cursor = "none";
    customCursor.style.display = "block";
    
    document.addEventListener("mousemove", (e) => {
      customCursor.style.top = `${e.clientY}px`;
      customCursor.style.left = `${e.clientX}px`;

      if (Math.random() < 0.3) {
        createCursorSparkle(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5));
      }
    });
  }

  // Create cursor sparkle effect
  function createCursorSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-sparkle");
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }

  // Scroll effects with reliable CTA reveal
  function setupScrollEffects() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const triggerPoint = isMobile ? 50 : 100;

      if (scrollY > triggerPoint) {
        if (product) product.classList.add("shrink");
        if (greetingText) greetingText.classList.add("hide");
        if (aboutBtn) aboutBtn.classList.add("scrolled");
      } else {
        if (product) product.classList.remove("shrink");
        if (greetingText) greetingText.classList.remove("hide");
        if (aboutBtn) aboutBtn.classList.remove("scrolled");
      }

      // Reliable CTA reveal
      if (cta) {
        const ctaPosition = cta.getBoundingClientRect().top;
        if (ctaPosition < window.innerHeight * 0.8) {
          cta.classList.add("revealed");
        } else {
          cta.classList.remove("revealed");
        }
      }
    });
  }

  // Modal handling
  function setupModals() {
    // About button opens modal
    aboutBtn.addEventListener("click", () => {
      aboutModal.style.display = "flex";
    });

    // Chat button opens contact modal
    chatBtn.addEventListener("click", () => {
      contactModal.style.display = "flex";
    });

    // Close modals
    closeModal.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    closeAboutModal.addEventListener("click", () => {
      aboutModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = "none";
      }
      if (e.target === aboutModal) {
        aboutModal.style.display = "none";
      }
    });
  }

  // Initialize all functionality
  function init() {
    setupLeafInteractions();
    setupCursorEffects();
    setupScrollEffects();
    setupModals();
    
    // Force CTA to show on mobile if not visible
    if (isMobile && cta) {
      setTimeout(() => {
        cta.classList.add("revealed");
      }, 500);
    }
  }

  // Start the application
  init();
});