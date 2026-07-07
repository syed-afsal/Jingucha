import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '5rem 5%', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase' }}>Jingucha</h3>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
          <Link href="/#philosophy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Philosophy</Link>
          <Link href="/#benefits" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Benefits</Link>
          <Link href="/preorder" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Pre-order</Link>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2rem' }}>
          © {new Date().getFullYear()} Jingucha.
        </p>
      </div>
    </footer>
  );
}
