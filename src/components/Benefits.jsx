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
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
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
    <section className="benefits" id="benefits" ref={sectionRef} style={{ background: 'var(--secondary)', padding: '8rem 5vw' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>The Benefits</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: '400', color: 'var(--text)' }}>Why Choose Plantivinia</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }}></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="benefit-card" ref={addToCards}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 2rem auto', color: 'var(--accent)' }}>
              <Bone size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '400' }}>Holistic Bone Health</h3>
            <p style={{ color: 'var(--text)', opacity: 0.6, fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.7 }}>Highly bioavailable calcium sourced naturally to fortify your skeletal foundation with maximum absorption.</p>
          </div>
          
          <div className="benefit-card" ref={addToCards}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 2rem auto', color: 'var(--accent)' }}>
              <Leaf size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '400' }}>100% Sustainable</h3>
            <p style={{ color: 'var(--text)', opacity: 0.6, fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.7 }}>Upcycled from premium eggshells, reducing waste and leaving a minimal footprint on our precious earth.</p>
          </div>
          
          <div className="benefit-card" ref={addToCards}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 2rem auto', color: 'var(--accent)' }}>
              <Star size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)', fontWeight: '400' }}>Botanical Synergy</h3>
            <p style={{ color: 'var(--text)', opacity: 0.6, fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', lineHeight: 1.7 }}>Infused with carefully selected plant extracts that work in harmony with your body's natural rhythms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
