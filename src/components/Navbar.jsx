'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'var(--text)' }}>
        <img src="/images/logo.png" alt="Jingucha Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
        <span style={{ marginLeft: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Jingucha</span>
      </Link>
      
      <div className="nav-links">
        <Link href="/#philosophy">Philosophy</Link>
        <Link href="/#benefits">Benefits</Link>
        <Link href="/preorder" style={{ color: 'var(--accent)' }}>Pre-Order</Link>
      </div>
    </nav>
  );
}
