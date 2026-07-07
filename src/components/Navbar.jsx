'use client';
import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo">
        <Image src="/images/logo.png" alt="Jingucha Logo" width={120} height={45} style={{ objectFit: 'contain' }} />
      </Link>
      <div className="nav-right">
        <button style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text)', padding: '0.5rem 1.2rem', borderRadius: '25px', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.3s' }}>Philosophy</button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          <Leaf size={20} />
        </button>
        <Link href="/preorder" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.5rem 1.2rem', borderRadius: '25px', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', letterSpacing: '1px', transition: 'all 0.3s' }}>Pre-Order</Link>
      </div>
    </nav>
  );
}
