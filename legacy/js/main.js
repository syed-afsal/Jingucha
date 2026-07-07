document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const isDesktop = window.innerWidth > 768; // Simple check for desktop vs mobile

    // --- Custom Cursor (Desktop Only) ---
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (isDesktop) {
        gsap.set([cursor, cursorFollower], { opacity: 1 }); // Make visible on desktop

        let mouseX = 0, mouseY = 0;
        let lastX = 0, lastY = 0; // For smoother follow effect
        const easeFactor = 0.15; // Controls smoothness, smaller is smoother

        function animateCursor() {
            lastX += (mouseX - lastX) * easeFactor;
            lastY += (mouseY - lastY) * easeFactor;

            // Using GSAP for setting position as it handles hardware acceleration
            gsap.set(cursor, { x: lastX, y: lastY });
            gsap.set(cursorFollower, { x: lastX, y: lastY });
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Interactive elements cursor effect
        // Batching effects for performance
        gsap.utils.toArray('button, a, .logo, .product-detail-content, .hero-content-box').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.2, ease: "power2.out" });
                gsap.to(cursorFollower, { scale: 1.5, borderColor: 'transparent', backgroundColor: 'rgba(212, 175, 55, 0.4)', duration: 0.2, ease: "power2.out" });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
                gsap.to(cursorFollower, { scale: 1, borderColor: 'var(--accent)', backgroundColor: 'transparent', duration: 0.2, ease: "power2.out" });
            });
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    let isLightMode = false; // Default: Dark Elegance

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isLightMode = !isLightMode;
            document.body.classList.toggle('light-theme');
            if (themeIcon) {
                themeIcon.innerHTML = isLightMode 
                    ? '<i class="fa-solid fa-leaf"></i>' 
                    : '<i class="fa-solid fa-seedling"></i>';
                
                gsap.fromTo(themeIcon,
                    { rotation: 0, scale: 0.5 },
                    { rotation: 360, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
                );
            }

            // Animate theme transition for body background/color
            gsap.fromTo(document.body,
                { opacity: 0.98 },
                { opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }
            );
            // Force re-render of SVG fills for leaves to pick up new --accent color
            document.querySelectorAll('.parallax-leaves .leaf path').forEach(path => {
                path.style.fill = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            });
        });
    }

    // --- Navbar Shrink on Scroll ---
    const navbar = document.querySelector('.navbar');
    ScrollTrigger.create({
        trigger: "body",
        start: "top -=50", // When scrolled 50px down
        end: "bottom top",
        toggleClass: { targets: navbar, className: "scrolled" },
        fastScrollEnd: true,
        ease: "power2.out"
    });

    // --- Hero Section Initial Load Animations (Optimized for performance) ---
    const heroProductImage = document.getElementById('heroProductImage');
    const heroContentBox = document.getElementById('heroContentBox');
    const heroGreetingLine1 = document.querySelector('.hero-greeting-text .line1');
    const heroGreetingLine2 = document.querySelector('.hero-greeting-text .line2');
    const heroIntroDesc = document.querySelector('.hero-intro-description');
    const heroCtaBtn = document.getElementById('revealBtn');

    // Set initial states using GSAP for precise control
    if (isDesktop) {
        // Desktop: Product starts lower and hidden, content box slightly hidden
        gsap.set(heroProductImage, { opacity: 0, scale: 0.8, y: '15vh' });
        gsap.set(heroContentBox, { opacity: 0, y: '20px' });
    } else {
        // Mobile: Product and content start visible, simple fade-in
        gsap.set(heroProductImage, { opacity: 0 }); // Fade in from 0 on mobile
        gsap.set(heroContentBox, { opacity: 0 }); // Fade in from 0 on mobile
    }
    gsap.set([heroGreetingLine1, heroGreetingLine2, heroIntroDesc, heroCtaBtn], { opacity: 0, y: 20 });

    // Main Hero Entrance Timeline
    const heroEntranceTL = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.3 }); // Small initial delay

    heroEntranceTL
        .add("start")
        .to(heroContentBox, { opacity: 1, y: 0, duration: 1.0 }, "start")
        .to(heroGreetingLine1, { opacity: 1, y: 0, duration: 1.0 }, "start+=0.3")
        .to(heroGreetingLine2, { opacity: 1, y: 0, duration: 1.0 }, "start+=0.5")
        .to(heroIntroDesc, { opacity: 1, y: 0, duration: 0.9 }, "start+=0.7")
        .to(heroCtaBtn, { opacity: 1, y: 0, duration: 0.8 }, "start+=0.9")
        .to(heroProductImage, { opacity: 1, y: '0vh', scale: 1, duration: 1.5, ease: "power3.out" }, "start+=0.6") // Product image reveal
        .to(heroCtaBtn, { // Subtle pulse for the CTA button
            scale: 1.03,
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "power1.inOut"
        }, ">-0.4"); // Starts pulsing slightly before the end of other animations


    // --- Product Detail Section Reveal ---
    const productSection = document.getElementById('productDetailSection');
    const productImage = document.getElementById('productDetailImage');
    const productContent = document.getElementById('productDetailContent');

    if (productSection && productImage && productContent) {
        gsap.set([productImage, productContent], { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: productSection,
            start: "top 80%",
            onEnter: () => {
                gsap.to(productImage, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
                gsap.to(productContent, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
            },
            once: true
        });

        // Parallax zoom scroll effect
        gsap.fromTo(productImage, 
            { scale: 0.9, y: 30 },
            { 
                scale: 1.05, 
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: productSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    }


    // --- Parallax Leaves Background Animation (Highly Optimized) ---
    const leafElements = document.querySelectorAll('.parallax-leaves .leaf');

    // Gentle continuous floating animation for all leaves
    leafElements.forEach((leaf, index) => {
        gsap.to(leaf, {
            y: `+=${20 + index * 3}`, // Float up and down
            x: `+=${(index % 2 === 0 ? 1 : -1) * (15 + index * 2)}`, // Float left and right
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 8 + (index * 1.5), // Varied durations for organic feel
            delay: index * 0.2 // Stagger initial start
        });
    });

    // Mousemove parallax for desktop only
    if (isDesktop) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            leafElements.forEach((leaf, index) => {
                const speed = (index + 1) * 25; // Control sensitivity
                gsap.to(leaf, {
                    x: mouseX * speed,
                    y: mouseY * speed,
                    rotation: mouseX * (10 + index * 5), // Subtle rotation
                    ease: "power1.out",
                    duration: 1.0, // Smooth transition
                    overwrite: true // Prevent animation conflicts
                });
            });
        });
    }

    // --- Smooth Scroll from CTA Button ---
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: productSection,
                    offsetY: navbar.offsetHeight + 10
                },
                ease: "power2.inOut"
            });
        });
    }

    // --- General Button Hover Effects ---
    const allButtons = document.querySelectorAll('.cta-button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Exclude the hero CTA from the general hover if it's currently pulsing
            if (button.id !== 'revealBtn' || !heroEntranceTL.isActive() || !heroEntranceTL.reversed()) {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
                    ease: "power2.out"
                });
            }
        });

        button.addEventListener('mouseleave', () => {
             // Exclude the hero CTA if it's currently pulsing
            if (button.id !== 'revealBtn' || !heroEntranceTL.isActive() || !heroEntranceTL.reversed()) {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                    ease: "power2.out"
                });
            }
        });
    });

    // --- Philosophy Section Animations ---
    const philosophySection = document.getElementById('philosophy');
    if (philosophySection) {
        gsap.from(philosophySection.children[0].children, {
            scrollTrigger: {
                trigger: philosophySection,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out"
        });
    }

    // --- Benefits Section Animations ---
    const benefitsSection = document.getElementById('benefits');
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitsSection && benefitCards.length > 0) {
        gsap.from(benefitsSection.children[0].children[0].children, { // Headers
            scrollTrigger: {
                trigger: benefitsSection,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out"
        });

        gsap.from(benefitCards, {
            scrollTrigger: {
                trigger: benefitsSection,
                start: "top 75%",
            },
            y: 60,
            rotationX: 12,
            transformPerspective: 1200,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out"
        });
    }
});