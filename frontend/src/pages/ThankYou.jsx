import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Copy } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function ThankYou() {
  const location = useLocation();
  const {
    orderId = 'ORD-DEMO1234',
    plan = 'Pro',
    price = 79,
    billing = 'monthly',
  } = location.state || {};

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
  };

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--gradient-hero)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <AnimatedSection>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,rgba(45,212,191,0.2),rgba(45,212,191,0.08))',
                border: '2px solid rgba(45,212,191,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}>
                <CheckCircle size={48} color="#2dd4bf" />
              </div>
            </div>

            <h1 style={{ marginBottom: '0.75rem' }}>Payment <span className="gradient-text-teal">Successful!</span></h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Thank you for your order. Your payment has been received and your plan is now active.
            </p>

            <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Order ID</span>
                <button onClick={handleCopy} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem' }}>
                  <Copy size={14} /> Copy
                </button>
              </div>
              <code style={{ display: 'block', width: '100%', background: 'rgba(99,102,241,0.15)', padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1rem', fontWeight: 600 }}>
                {orderId}
              </code>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Plan</span>
                  <strong>{plan}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Amount</span>
                  <strong>${price}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Billing</span>
                  <strong style={{ textTransform: 'capitalize' }}>{billing}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-primary">
                Back to Home <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
