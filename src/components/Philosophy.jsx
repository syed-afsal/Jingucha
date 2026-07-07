'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} style={{ background: 'transparent', padding: '10rem 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dark luxury background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(29, 58, 54, 0.4) 0%, transparent 60%)', zIndex: 0 }}></div>

      <div ref={textRef} style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '2rem' }}>
          Our Philosophy
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--text)', lineHeight: 1.1, marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          Harmony with nature is not an ideal.<br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>It is our foundation.</span>
        </h2>
        <p className="subtitle-text" style={{ margin: '0 auto', fontSize: '1.2rem' }}>
          We believe true vitality is cultivated from the earth. By upcycling eggshells into a nutrient-rich calcium elixir, we deliver uncompromising nourishment directly to your plants.
        </p>
      </div>
    </section>
  );
}
