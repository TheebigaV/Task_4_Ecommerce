// src/pages/Pricing.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Crown, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const plans = [
  {
    name: 'Basic',
    icon: <Zap size={24} />,
    monthly: 29,
    yearly: 290,
    desc: 'Perfect for individuals and small projects getting started.',
    features: [
      { text: '5 Pages Website', included: true },
      { text: 'Responsive Design', included: true },
      { text: 'Contact Form', included: true },
      { text: 'Basic SEO', included: true },
      { text: 'E-Commerce', included: false },
      { text: 'Payment Gateway', included: false },
      { text: 'Priority Support', included: false },
      { text: 'Custom Analytics', included: false },
    ],
    color: '#6366f1',
    featured: false,
  },
  {
    name: 'Pro',
    icon: <Crown size={24} />,
    monthly: 79,
    yearly: 790,
    desc: 'Best for growing businesses that need a competitive edge.',
    features: [
      { text: '15 Pages Website', included: true },
      { text: 'Responsive Design', included: true },
      { text: 'Contact Form + Email', included: true },
      { text: 'Advanced SEO', included: true },
      { text: 'E-Commerce Store', included: true },
      { text: 'PayHere Integration', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Analytics', included: false },
    ],
    color: '#a78bfa',
    featured: true,
  },
  {
    name: 'Enterprise',
    icon: <Building2 size={24} />,
    monthly: 199,
    yearly: 1990,
    desc: 'For large-scale operations needing custom solutions.',
    features: [
      { text: 'Unlimited Pages', included: true },
      { text: 'Responsive Design', included: true },
      { text: 'Advanced Forms + CRM', included: true },
      { text: 'Enterprise SEO', included: true },
      { text: 'Full E-Commerce Suite', included: true },
      { text: 'Multiple Payment Gateways', included: true },
      { text: '24/7 Dedicated Support', included: true },
      { text: 'Custom Analytics Dashboard', included: true },
    ],
    color: '#2dd4bf',
    featured: false,
  },
];

const trustBrands = [
  { name: 'TechNova',   color: '#6366f1', shape: 'hexagon' },
  { name: 'GlobalBank', color: '#2dd4bf', shape: 'shield' },
  { name: 'CloudSync',  color: '#a78bfa', shape: 'cloud' },
  { name: 'Nexus',      color: '#f59e0b', shape: 'diamond' },
  { name: 'DataVault',  color: '#10b981', shape: 'lock' },
  { name: 'Vertex',     color: '#38bdf8', shape: 'triangle' },
];

const BrandIcon = ({ shape, color }) => {
  const s = { width: 32, height: 32 };
  switch (shape) {
    case 'hexagon': return (
      <svg {...s} viewBox="0 0 32 32"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill={color} opacity="0.9"/><polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="white" opacity="0.25"/></svg>
    );
    case 'shield': return (
      <svg {...s} viewBox="0 0 32 32"><path d="M16 2 L28 7 L28 18 Q28 26 16 30 Q4 26 4 18 L4 7 Z" fill={color} opacity="0.9"/><path d="M12 16 L15 19 L20 13" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
    );
    case 'cloud': return (
      <svg {...s} viewBox="0 0 32 32"><ellipse cx="16" cy="18" rx="12" ry="7" fill={color} opacity="0.9"/><circle cx="11" cy="15" r="5" fill={color} opacity="0.9"/><circle cx="19" cy="13" r="6" fill={color} opacity="0.9"/><ellipse cx="16" cy="18" rx="10" ry="4" fill="white" opacity="0.15"/></svg>
    );
    case 'diamond': return (
      <svg {...s} viewBox="0 0 32 32"><polygon points="16,2 30,16 16,30 2,16" fill={color} opacity="0.9"/><polygon points="16,8 24,16 16,24 8,16" fill="white" opacity="0.2"/></svg>
    );
    case 'lock': return (
      <svg {...s} viewBox="0 0 32 32"><rect x="7" y="14" width="18" height="14" rx="3" fill={color} opacity="0.9"/><path d="M11 14 L11 10 Q11 4 16 4 Q21 4 21 10 L21 14" stroke={color} strokeWidth="3" fill="none" opacity="0.9"/><circle cx="16" cy="21" r="2.5" fill="white" opacity="0.8"/></svg>
    );
    case 'wave': return (
      <svg {...s} viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill={color} opacity="0.9"/><path d="M4 20 Q8 14 12 20 Q16 26 20 20 Q24 14 28 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M4 14 Q8 8 12 14 Q16 20 20 14 Q24 8 28 14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/></svg>
    );
    case 'triangle': return (
      <svg {...s} viewBox="0 0 32 32"><polygon points="16,3 30,29 2,29" fill={color} opacity="0.9"/><polygon points="16,11 24,27 8,27" fill="white" opacity="0.2"/></svg>
    );
    default: return (
      <svg {...s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill={color} opacity="0.9"/><circle cx="16" cy="16" r="8" fill="white" opacity="0.2"/></svg>
    );
  }
};

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div id="pricing">
      {/* Hero */}
      <section className="section" style={{ padding: '3rem 0', background: 'var(--gradient-hero)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 500, height: 500, background: 'rgba(99,102,241,0.12)', top: '-100px', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-label">Pricing</div>
            <h1 style={{ margin: '0.5rem auto', maxWidth: 700 }}>
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p style={{ maxWidth: 540, margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
              Start free, upgrade when you're ready. No hidden fees. Cancel anytime.
            </p>

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: !yearly ? '#f1f5f9' : '#64748b', fontWeight: !yearly ? 600 : 400 }}>Monthly</span>
              <button
                onClick={() => setYearly(!yearly)}
                style={{
                  width: 56, height: 30, borderRadius: 15,
                  background: yearly ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer', position: 'relative',
                  transition: 'background 0.3s',
                }}
              >
                <motion.div
                  animate={{ x: yearly ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute', top: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                />
              </button>
              <span style={{ fontSize: '0.9rem', color: yearly ? '#f1f5f9' : '#64748b', fontWeight: yearly ? 600 : 400 }}>
                Yearly <span className="badge badge-teal" style={{ marginLeft: 4 }}>Save 17%</span>
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Plans */}
      <section className="section" style={{ paddingTop: '2rem', background: 'var(--color-bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', maxWidth: 1050, margin: '0 auto' }}>
            {plans.map((plan, i) => (
              <AnimatedSection key={i} delay={i * 0.12} type="scale">
                <div
                  className={`glass-card ${plan.featured ? 'pricing-card-featured' : ''}`}
                  style={{
                    padding: '2.5rem 2rem',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    transform: plan.featured ? 'scale(1.04)' : 'none',
                  }}
                >
                  {plan.featured && <div className="pricing-badge-best">✨ Best Value</div>}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${plan.color}18`,
                      border: `1px solid ${plan.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: plan.color,
                    }}>
                      {plan.icon}
                    </div>
                    <h3 style={{ margin: 0 }}>{plan.name}</h3>
                  </div>

                  <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', minHeight: 40 }}>{plan.desc}</p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'Sora,sans-serif', color: '#f1f5f9' }}>
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>/{yearly ? 'year' : 'month'}</span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flex: 1 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: f.included ? '#cbd5e1' : '#374151' }}>
                        {f.included
                          ? <Check size={16} color="#2dd4bf" />
                          : <X size={16} color="#374151" />
                        }
                        <span style={{ textDecoration: f.included ? 'none' : 'line-through' }}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/checkout"
                    state={{ plan: plan.name, price: yearly ? plan.yearly : plan.monthly, billing: yearly ? 'yearly' : 'monthly' }}
                    className={plan.featured ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ justifyContent: 'center', width: '100%', display: 'flex' }}
                  >
                    Buy Now
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands Marquee */}
      <section style={{ padding: '3rem 0', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <AnimatedSection>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Trusted by Innovative Companies Worldwide
          </p>
        </AnimatedSection>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #09090f, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #09090f, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .brand-ticker {
              display: flex;
              gap: 2rem;
              animation: marquee 36s linear infinite;
              width: max-content;
            }
            .brand-ticker:hover { animation-play-state: paused; }
            .brand-item {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1rem;
              padding: 1rem 2.5rem;
              min-width: 240px;
              border-radius: 50px;
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.07);
              backdrop-filter: blur(6px);
              transition: background 0.3s, border-color 0.3s;
              cursor: default;
              white-space: nowrap;
            }
            .brand-item:hover {
              background: rgba(255,255,255,0.09);
              border-color: rgba(255,255,255,0.15);
            }
          `}</style>
          <div className="brand-ticker">
            {/* Doubled for seamless loop */}
            {[...trustBrands, ...trustBrands].map((brand, i) => (
              <div key={i} className="brand-item">
                <BrandIcon shape={brand.shape} color={brand.color} />
                <span style={{ fontSize: '1.05rem', fontWeight: 800, fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em', color: '#e2e8f0' }}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
