'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Massive text entrance on load
      gsap.from([textRef1.current, textRef2.current], {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
      });

      // Pinned scroll animation for the bottle and content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200", // 1200px of scrolling to complete the animation
          scrub: 1,
          pin: true,
        }
      });

      tl.fromTo(imageRef.current,
        { y: "100vh", opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background oversized typography */}
      <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center', zIndex: 0, whiteSpace: 'nowrap' }}>
        <div ref={textRef1} className="huge-text" style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>AWAKEN YOUR</div>
        <div ref={textRef2} className="huge-text" style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>SENSES</div>
      </div>

      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', marginTop: '5rem' }}>
        <div ref={imageRef} style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto', zIndex: 10, opacity: 0 }}>
          <img 
            src="/images/product-front.png" 
            alt="Plantivinia Premium Calcium" 
            style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.9))' }}
          />
        </div>
        
        <div ref={contentRef} style={{ textAlign: 'center', opacity: 0 }}>
          <p className="subtitle-text" style={{ marginBottom: '2rem', marginTop: 0 }}>
            Experience Plantivinia — an ultra-premium calcium elixir derived from upcycled eggshells, meticulously crafted for your plants.
          </p>
          <a href="/#productDetailSection" className="btn-outline">Discover the Ritual</a>
        </div>
      </div>
    </section>
  );
}
