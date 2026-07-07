import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';
import Philosophy from '@/components/Philosophy';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductSection />
      <Philosophy />
      <Benefits />
      <section style={{ background: 'var(--bg)', padding: '10rem 5vw', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '400', color: 'var(--text)', marginBottom: '2rem' }}>Ready to elevate your ritual?</h2>
        <Link href="/preorder" className="cta-button">Begin Your Journey</Link>
      </section>
      <Footer />
    </main>
  );
}
