'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const images = [
  '/images/product-front.png',
  '/images/product-back.png',
  '/images/product-side.png'
];

export default function ProductSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const bgTextRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      gsap.to(bgTextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: -150
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="productDetailSection" ref={sectionRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'transparent', padding: '5rem 5%', position: 'relative', overflow: 'hidden' }}>
      
      <div ref={bgTextRef} style={{ position: 'absolute', right: '-5%', top: '20%', fontSize: '20vw', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.03)', zIndex: 0, whiteSpace: 'nowrap' }}>
        PLANTIVINIA
      </div>

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', alignItems: 'center', gap: '3rem', zIndex: 2, position: 'relative' }}>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <img 
            ref={imageRef}
            src={images[currentImage]} 
            alt="Plantivinia Product Details" 
            style={{ width: '100%', maxWidth: '300px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))', transition: 'all 0.3s ease' }}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
             <button onClick={prevImage} style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <ChevronLeft size={20} />
             </button>
             <button onClick={nextImage} style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
        
        <div ref={contentRef} className="glass-card">
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '1rem' }}>
            Our Signature Blend
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', color: '#fff', fontStyle: 'italic', fontWeight: 400 }}>
            More Than Just Calcium.
          </h2>
          <div style={{ width: '50px', height: '2px', background: 'var(--accent)', marginBottom: '2rem' }}></div>
          <p className="subtitle-text" style={{ marginBottom: '3rem' }}>
            A premium calcium elixir derived from upcycled eggshells, enhanced with nature's finest elements. Designed as a direct foliar spray, it nourishes leaves instantly, delivering visible vitality and lush growth in just two weeks.
          </p>
          <Link href="/preorder" className="btn-outline">Own the Ritual</Link>
        </div>

      </div>
    </section>
  );
}
