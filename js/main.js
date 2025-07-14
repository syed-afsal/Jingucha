document.addEventListener("DOMContentLoaded", () => {
  // Get all elements
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const aboutBtn = document.getElementById("aboutBtn");
  const cta = document.getElementById("cta");
  const leafContainer = document.getElementById("leaf-container");
  const chatBtn = document.getElementById("chatBtn");
  const chatBtnWrapper = document.querySelector(".chat-btn-wrapper");
  const contactModal = document.getElementById("contactModal");
  const aboutModal = document.getElementById("aboutModal");
  const closeModal = document.getElementById("closeModal");
  const closeAboutModal = document.getElementById("closeAboutModal");
  const customCursor = document.getElementById("customCursor");
  const footer = document.querySelector("footer");

  // Detect mobile/touch
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.matchMedia("(pointer: coarse)").matches;

  // --- LEAFS ---
  const rows = isMobile ? 2 : 6;
  const cols = isMobile ? 4 : 8;
  const leaves = [];
  for (let i = 0; i < rows * cols; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const top = row * (100 / rows) + Math.random() * 6;
    const left = col * (100 / cols) + Math.random() * 6;
    const leaf = document.createElement("img");
    leaf.src = "images/leaf-texture.webp";
    leaf.classList.add("leaf");
    leaf.style.top = `${top}%`;
    leaf.style.left = `${left}%`;
    leaf.style.width = `${isMobile ? 32 : 80 + Math.random() * 40}px`;
    leaf.style.transform = `rotate(${Math.random() * 360}deg) scale(${isMobile ? 0.9 : 1})`;
    leafContainer.appendChild(leaf);
    leaves.push(leaf);
  }

  // --- DESKTOP: Custom Cursor, Sparkle, Leaf Animations ---
  if (!isMobile) {
    // Show custom cursor
    if (customCursor) {
      customCursor.style.display = "block";
      document.body.style.cursor = "none";
    }
    // Move cursor image and sparkle
    document.addEventListener("mousemove", (e) => {
      if (customCursor) {
        customCursor.style.top = `${e.clientY}px`;
        customCursor.style.left = `${e.clientX}px`;
        // Sparkle effect
        if (Math.random() < 0.24) createCursorSparkle(e.clientX, e.clientY);
      }
      // Leaf proximity scale
      leaves.forEach((leaf) => {
        const rect = leaf.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80;
        if (distance < maxDist) {
          leaf.style.transition = "transform 0.2s cubic-bezier(.22,.61,.36,1)";
          leaf.style.transform = "scale(0.8)";
          clearTimeout(leaf.resetTimer);
          leaf.resetTimer = setTimeout(() => {
            leaf.style.transform = "scale(1)";
          }, 200);
        }
      });
    });
    // Sparkle creation function (premium, subtle)
    function createCursorSparkle(x, y) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("cursor-sparkle");
      sparkle.style.top = `${y - 6}px`;
      sparkle.style.left = `${x - 6}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => {
        sparkle.style.opacity = "0";
        setTimeout(() => sparkle.remove(), 400);
      }, 10);
    }
    // Leaf click burst
    document.addEventListener("click", (e) => {
      const radius = 100;
      leaves.forEach((leaf) => {
        const rect = leaf.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius) {
          leaf.style.transition = "transform 0.2s cubic-bezier(.22,.61,.36,1)";
          leaf.style.transform = "scale(1.3)";
          setTimeout(() => {
            leaf.style.transform = "scale(1)";
            leaf.style.transition = "transform 0.4s cubic-bezier(.22,.61,.36,1)";
          }, 150);
        }
      });
    });
  }

  // --- MOBILE: Leaf Parallax, Hero, CTA, Footer, Explore Button, Animations ---
  if (isMobile) {
    // Animate leaves gently on scroll (parallax effect, transform only)
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      leaves.forEach((leaf, idx) => {
        const base = idx % 2 === 0 ? 1 : -1;
        leaf.style.transform = `rotate(${(idx * 30 + scrollY * 0.1 * base) % 360}deg) translateY(${Math.sin(scrollY * 0.01 + idx) * 8}px) scale(0.9)`;
      });
    });

    // Hero & greeting scroll effect
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (product) {
        if (scrollY > 32) {
          product.classList.add("scrolled", "unblur");
        } else {
          product.classList.remove("scrolled", "unblur");
        }
      }
      if (greetingText) {
        if (scrollY > 32) {
          greetingText.classList.add("hide");
        } else {
          greetingText.classList.remove("hide");
        }
      }
    });

    // CTA, chat, footer animation
    function reveal() {
      const ctaRect = cta.getBoundingClientRect();
      if (ctaRect.top < window.innerHeight * 0.85) {
        cta.classList.add("revealed");
        if (chatBtnWrapper) chatBtnWrapper.classList.add("revealed");
        if (footer) footer.classList.add("revealed");
      } else {
        cta.classList.remove("revealed");
        if (chatBtnWrapper) chatBtnWrapper.classList.remove("revealed");
        if (footer) footer.classList.remove("revealed");
      }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // On load: reveal CTA/Chat/Footer if already in view (mobile only)
    setTimeout(() => {
      if (cta && cta.getBoundingClientRect().top < window.innerHeight * 0.85) {
        cta.classList.add("revealed");
        if (chatBtnWrapper) chatBtnWrapper.classList.add("revealed");
        if (footer) footer.classList.add("revealed");
      }
    }, 400);
  }

  // --- EXPLORE BUTTON OUTLINE FIX ---
  const exploreBtn = document.querySelector(".explore-btn.near-product");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      exploreBtn.classList.add("no-outline");
      setTimeout(() => {
        exploreBtn.classList.remove("no-outline");
      }, 400);
    });
    exploreBtn.addEventListener("blur", () => {
      exploreBtn.classList.remove("no-outline");
    });
  }

  // --- MODALS ---
  function setupModals() {
    if (aboutBtn && aboutModal) {
      aboutBtn.addEventListener("click", () => { aboutModal.style.display = "flex"; });
    }
    if (chatBtn && contactModal) {
      chatBtn.addEventListener("click", () => { contactModal.style.display = "flex"; });
    }
    if (closeModal && contactModal) {
      closeModal.addEventListener("click", () => { contactModal.style.display = "none"; });
    }
    if (closeAboutModal && aboutModal) {
      closeAboutModal.addEventListener("click", () => { aboutModal.style.display = "none"; });
    }
    window.addEventListener("click", (e) => {
      if (e.target === contactModal) contactModal.style.display = "none";
      if (e.target === aboutModal) aboutModal.style.display = "none";
    });
  }
  setupModals();
});