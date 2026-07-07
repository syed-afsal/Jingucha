'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Preorder() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      quantity: e.target.quantity.value
    };

    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const inputStyle = {
    padding: '1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'var(--transition)',
    width: '100%'
  };

  return (
    <main style={{ background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 5vw' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            Pre-Order
          </h1>
          <p className="subtitle-text" style={{ marginTop: 0, marginBottom: '3rem' }}>
            Secure your access to the exclusive first batch of Plantivinia.
          </p>
          
          {status === 'success' ? (
            <div style={{ padding: '2rem', background: 'rgba(62, 155, 150, 0.1)', border: '1px solid var(--accent)', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Access Granted</h3>
              <p>Your pre-order is confirmed. We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input required name="name" type="text" placeholder="FULL NAME" style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'} />
              <input required name="email" type="email" placeholder="EMAIL ADDRESS" style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'} />
              <input required name="quantity" type="number" min="1" placeholder="QUANTITY" style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'} />
              <button type="submit" className="btn-outline" disabled={status === 'loading'} style={{ marginTop: '1rem', width: '100%' }}>
                {status === 'loading' ? 'PROCESSING...' : 'CONFIRM PRE-ORDER'}
              </button>
              {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem' }}>System error. Please attempt again.</p>}
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
