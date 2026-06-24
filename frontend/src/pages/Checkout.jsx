import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan = 'Pro', price = 79, billing = 'monthly' } = location.state || {};

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    navigate('/thank-you', {
      state: {
        orderId: `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        plan,
        price,
        billing,
      },
    });
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="section" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="section-label">Checkout</div>
              <h1>Complete Your <span className="gradient-text">Order</span></h1>
            </div>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            <AnimatedSection direction="left">
              <div className="glass-card" style={{ padding: '2.25rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={20} color="#6366f1" /> Billing Details
                </h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input id="firstName" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input id="lastName" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" className="form-control" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input id="address" name="address" className="form-control" value={form.address} onChange={handleChange} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input id="city" name="city" className="form-control" value={form.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zip">Zip Code</label>
                      <input id="zip" name="zip" className="form-control" value={form.zip} onChange={handleChange} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem' }} disabled={processing}>
                    {processing ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Processing...
                      </span>
                    ) : (
                      <><Lock size={16} /> Pay ${price} / {billing}</>
                    )}
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="glass-card" style={{ padding: '2.25rem', position: 'sticky', top: 100 }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                <div style={{
                  background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(167,139,250,0.06))',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: 16,
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Selected Plan</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Sora,sans-serif', color: '#f1f5f9', marginBottom: '0.25rem' }}>{plan}</div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Billed {billing}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#94a3b8' }}>{plan} Plan</span>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>${price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#94a3b8' }}>Tax</span>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>$0.00</span>
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: 700, color: '#f1f5f9' }}>Total</span>
                    <span style={{ fontWeight: 800, fontFamily: 'Sora,sans-serif' }} className="gradient-text">${price}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', opacity: 0.7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                    <span style={{ color: '#2dd4bf' }}><ShieldCheck size={14} /></span>
                    SSL Encrypted Payment
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
