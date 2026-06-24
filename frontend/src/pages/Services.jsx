// src/pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Palette, BarChart3, ShieldCheck, ArrowRight, CheckCircle2, Layers, Workflow } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const services = [
  {
    icon: <Code size={28} />,
    title: 'Web Development',
    desc: 'Full-stack web applications built with React, PHP, and MySQL for scalable performance.',
    features: ['Custom React frontends', 'RESTful PHP APIs', 'MySQL database design', 'Performance optimization'],
    color: '#6366f1',
  },
  {
    icon: <Palette size={28} />,
    title: 'UI/UX Design',
    desc: 'Stunning, user-centered interfaces that convert visitors into loyal customers.',
    features: ['Glassmorphism & modern trends', 'Responsive mobile-first', 'Micro-animations', 'Brand identity systems'],
    color: '#a78bfa',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Digital Marketing',
    desc: 'Data-driven strategies that increase visibility, traffic, and revenue.',
    features: ['SEO optimization', 'Content marketing', 'Social media campaigns', 'Analytics & reporting'],
    color: '#2dd4bf',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'E-Commerce Solutions',
    desc: 'End-to-end online stores with secure payment gateways and order management.',
    features: ['PayHere integration', 'Firebase authentication', 'Order tracking systems', 'Inventory management'],
    color: '#fb7185',
  },
];


export default function Services() {
  return (
    <div id="services">
      {/* ── Merged Header + Cards ── */}
      <section className="section" style={{ background: 'var(--color-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 450, height: 450, background: 'rgba(99,102,241,0.12)', top: '-80px', right: '-60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Merged heading */}
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">Service Overview</div>
              <h2>Solutions That <span className="gradient-text">Drive Results</span></h2>
              <p style={{ maxWidth: 560, margin: '0 auto 0.75rem', fontSize: '1.05rem' }}>
                We combine technical expertise with creative thinking to deliver digital experiences that stand out.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6366f1', fontWeight: 500 }}>
                Explore each card to see what's included in every service.
              </p>
            </div>
          </AnimatedSection>

          {/* Service Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} type="scale">
                <div className="glass-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', borderTop: `3px solid ${s.color}` }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: '1.25rem', boxShadow: `0 0 18px ${s.color}20` }}>
                    {s.icon}
                  </div>
                  <h3 style={{ marginBottom: '0.6rem', fontSize: '1.1rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem', flex: 1, color: '#94a3b8' }}>{s.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    {s.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                        <CheckCircle2 size={13} color={s.color} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', borderRadius: 10, background: `${s.color}18`, border: `1px solid ${s.color}35`, color: s.color, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start', transition: 'background 0.2s' }}>
                    Learn More <ArrowRight size={13} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
