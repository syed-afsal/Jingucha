'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bone, Leaf, Star } from 'lucide-react';

export default function Benefits() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="benefits" ref={sectionRef} style={{ background: 'transparent', padding: 'clamp(5rem, 15vw, 10rem) 5vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem' }}>
            Unrivaled Quality
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            Why Choose Plantivinia
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" ref={addToCards} style={{ transition: 'transform 0.4s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}>
              <Bone size={40} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '600', textTransform: 'uppercase' }}>Rapid Vitality</h3>
            <p className="subtitle-text" style={{ fontSize: '1rem', marginTop: 0 }}>Highly bioavailable calcium elixir designed for direct foliar application, delivering visible, lush results to your leaves in just two weeks.</p>
          </div>
          
          <div className="glass-card" ref={addToCards} style={{ transition: 'transform 0.4s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}>
              <Leaf size={40} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '600', textTransform: 'uppercase' }}>Sustainable</h3>
            <p className="subtitle-text" style={{ fontSize: '1rem', marginTop: 0 }}>Upcycled from premium eggshells, reducing waste and leaving a minimal footprint on our precious earth.</p>
          </div>
          
          <div className="glass-card" ref={addToCards} style={{ transition: 'transform 0.4s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}>
              <Star size={40} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '600', textTransform: 'uppercase' }}>Synergy</h3>
            <p className="subtitle-text" style={{ fontSize: '1rem', marginTop: 0 }}>Infused with essential nutrients that work in harmony with the soil's natural microbiome to elevate your plants.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
