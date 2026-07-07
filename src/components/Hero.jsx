'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const leavesRef = useRef([]);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate leaves
      leavesRef.current.forEach((leaf, i) => {
        gsap.to(leaf, {
          y: 'random(-50, 50)',
          x: 'random(-50, 50)',
          rotation: 'random(-45, 45)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Hero Content Entrance
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Product Image Entrance
      gsap.from(imageRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToLeaves = (el) => {
    if (el && !leavesRef.current.includes(el)) {
      leavesRef.current.push(el);
    }
  };

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="parallax-leaves">
        {[
          { top: '15%', left: '10%', size: 50 },
          { top: '60%', left: '80%', size: 60 },
          { top: '25%', left: '85%', size: 40 },
          { top: '75%', left: '15%', size: 45 },
          { top: '40%', left: '50%', size: 35 }
        ].map((pos, i) => (
          <svg key={i} ref={addToLeaves} className="leaf" style={{ top: pos.top, left: pos.left, width: pos.size, height: pos.size }} viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C8.38,19.9 10.28,19.34 11.64,18.09C15,15 16,8.69 16.5,5C15.5,7.5 13.5,9 11.5,9C10.5,9 8.5,8.5 7.5,7.5C6.5,6.5 6,4.5 6,3.5C6,1.5 7.5,0.5 9,0.5C12.69,0.5 19,1.5 22,4.84C20,6 18.5,7 17,8Z" />
          </svg>
        ))}
      </div>
      
      <div className="hero-content-box" ref={textRef}>
        <h1 className="hero-greeting-text">
          <span className="line1">Awaken Your</span>
          <span className="line2">Senses</span>
        </h1>
        <div className="divider"></div>
        <p className="hero-intro-description">Experience Plantivinia — a premium plant-based calcium crafted sustainably from eggshells and nature's finest botanicals.</p>
        <button className="cta-button" onClick={() => document.getElementById('productDetailSection')?.scrollIntoView({ behavior: 'smooth' })}>Explore the Ritual</button>
      </div>
      
      <img 
        ref={imageRef}
        src="/images/product-front.png" 
        alt="Plantivinia Product Front View" 
        className="hero-product-image" 
      />
    </section>
  );
}
