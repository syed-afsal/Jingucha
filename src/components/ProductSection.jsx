'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

export default function ProductSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="product-detail-section" id="productDetailSection" ref={sectionRef}>
      <div className="product-detail-container">
        <img 
          ref={imageRef}
          src="/images/product-all.png" 
          alt="Plantivinia Product Details" 
          className="product-detail-image" 
        />
        <div className="product-detail-content" ref={contentRef}>
          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '600' }}>
            Our Signature Blend
          </p>
          <h2 className="product-detail-title">Plantivinia</h2>
          <p className="product-detail-subtitle">"More Than Just Calcium"</p>
          <div className="divider"></div>
          <p className="product-detail-desc">
            A premium plant-based calcium powder crafted sustainably from eggshells, enhanced with nature's finest botanicals for holistic nourishment.
          </p>
          <Link href="/preorder" className="cta-button">Own the Ritual</Link>
        </div>
      </div>
    </section>
  );
}
