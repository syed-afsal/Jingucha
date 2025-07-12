document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const contactBtn = document.getElementById("contactBtn");
  const cta = document.getElementById("cta");

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Shrink product + hide greeting + style contact button
        if (scrollY > 100) {
          product.classList.add("shrink");
          greetingText.classList.add("hide");
          contactBtn.classList.add("scrolled");
        } else {
          product.classList.remove("shrink");
          greetingText.classList.remove("hide");
          contactBtn.classList.remove("scrolled");
        }

        // Reveal CTA when product is mostly out of view
        const productBottom = product.getBoundingClientRect().bottom;
        const revealThreshold = window.innerHeight * 0.4;

        if (productBottom < revealThreshold) {
          cta.classList.add("revealed");
        } else {
          cta.classList.remove("revealed");
        }

        ticking = false;
      });

      ticking = true;
    }
  });
});