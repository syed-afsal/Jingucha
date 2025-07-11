document.addEventListener("DOMContentLoaded", () => {
  const product = document.getElementById("productContainer");
  const greetingText = document.querySelector(".greeting-text");
  const contactBtn = document.getElementById("contactBtn");
  const cta = document.getElementById("cta");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Scroll-based shrink + hide
    if (scrollY > 100) {
      product.classList.add("shrink");
      greetingText.classList.add("hide");
      contactBtn.classList.add("scrolled");
    } else {
      product.classList.remove("shrink");
      greetingText.classList.remove("hide");
      contactBtn.classList.remove("scrolled");
    }

    // Reveal CTA when product container is scrolled mostly out
    const productBottom = product.getBoundingClientRect().bottom;

    if (productBottom < window.innerHeight * 0.4) {
      cta.classList.add("revealed");
    } else {
      cta.classList.remove("revealed");
    }
  });
});