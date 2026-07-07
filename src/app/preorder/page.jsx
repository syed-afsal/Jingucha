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

  return (
    <main>
      <Navbar />
      <section style={{ padding: '12rem 5vw 5rem', minHeight: '80vh', background: 'var(--bg)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glassmorphic" style={{ padding: '4rem', borderRadius: '20px', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: '1rem' }}>Pre-Order</h1>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Secure your first batch of Plantivinia.</p>
          
          {status === 'success' ? (
            <div style={{ padding: '2rem', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--accent)', borderRadius: '10px' }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Thank you!</h3>
              <p>Your pre-order has been received. We will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input required name="name" type="text" placeholder="Full Name" style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text)' }} />
              <input required name="email" type="email" placeholder="Email Address" style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text)' }} />
              <input required name="quantity" type="number" min="1" placeholder="Quantity" style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text)' }} />
              <button type="submit" className="cta-button" disabled={status === 'loading'} style={{ width: '100%' }}>
                {status === 'loading' ? 'Processing...' : 'Submit Pre-Order'}
              </button>
              {status === 'error' && <p style={{ color: '#ef4444' }}>Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
