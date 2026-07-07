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
      <section style={{ background: 'transparent', padding: '10rem 5vw', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', color: 'var(--text)', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>Ready to elevate your ritual?</h2>
        <Link href="/preorder" className="btn-outline">Begin Your Journey</Link>
      </section>
      <Footer />
    </main>
  );
}
