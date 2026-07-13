'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'var(--text)', zIndex: 1001 }}>
          <img src="/images/logo.png" alt="Jingucha Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
          <span style={{ marginLeft: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Jingucha</span>
        </Link>
        
        <div className="nav-links">
          <Link href="/#philosophy">Philosophy</Link>
          <Link href="/#benefits">Benefits</Link>
          <Link href="/preorder" style={{ color: 'var(--accent)' }}>Pre-Order</Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link href="/#philosophy" onClick={closeMenu}>Philosophy</Link>
        <Link href="/#benefits" onClick={closeMenu}>Benefits</Link>
        <Link href="/preorder" className="accent" onClick={closeMenu}>Pre-Order</Link>
      </div>
    </>
  );
}
