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
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy" id="philosophy" ref={sectionRef} style={{ background: 'var(--bg)', padding: '8rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div ref={textRef} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>Our Philosophy</p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: '400', color: 'var(--text)', lineHeight: 1.2, marginBottom: '2rem' }}>Harmony with nature is not just an ideal — it is our foundation.</h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1.15rem', color: 'var(--text)', opacity: 0.7, lineHeight: 1.8 }}>
          We believe that true wellness comes from the earth. By sustainably sourcing our calcium from eggshells and enriching it with time-honored botanicals, we create products that are as pure as they are potent. Jingucha is a tribute to the delicate balance of the natural world.
        </p>
      </div>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', zIndex: 1 }}></div>
    </section>
  );
}
