// src/pages/About.jsx
import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Lightbulb, Shield, Globe, Users, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

function Counter({ from, to, duration = 2, decimals = 0 }) {
  const nodeRef = React.useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: '0px 0px -100px 0px' });

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = value.toFixed(decimals);
        }
      }
    });
    return () => controls.stop();
  }, [from, to, duration, decimals, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

const features = [
  { img: '/images/feature_fast.png', title: 'Innovation First', desc: 'We constantly push the boundaries of what is possible in digital design.', para: 'Our team leverages the latest technologies and creative strategies to deliver forward-thinking solutions that keep your business ahead of the curve.' },
  { img: '/images/feature_secure.png', title: 'Uncompromising Quality', desc: 'Excellence is built into every line of code and every pixel we design.', para: 'We implement rigorous testing and quality assurance processes to ensure that our deliverables not only meet but exceed industry standards.' },
  { img: '/images/feature_global.png', title: 'Client-Centric Approach', desc: 'Your success is our success. We build true partnerships with our clients.', para: 'We believe in transparent communication, agile collaboration, and tailoring our strategies to perfectly align with your unique business goals and vision.' },
];

const team = [
  { name: 'John Doe', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { name: 'Jane Smith', role: 'CTO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Alex Johnson', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Emily Davis', role: 'Developer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  { name: 'Michael Brown', role: 'Product Manager', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop' },
  { name: 'Sarah Wilson', role: 'Marketing', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
];

export default function About() {
  return (
    <div id="about">
      {/* Hero */}
      <section className="section" style={{ background: 'var(--gradient-hero)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 400, height: 400, background: 'rgba(99,102,241,0.15)', top: '-50px', left: '-80px' }} />
        <div className="glow-blob" style={{ width: 350, height: 350, background: 'rgba(45,212,191,0.1)', bottom: 0, right: '-60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-label">About Us</div>
            <h1 style={{ margin: '1rem auto', maxWidth: 700 }}>
              Building the <span className="gradient-text">Future</span> of Digital Business
            </h1>
            <p style={{ maxWidth: 580, margin: '0 auto 2rem', fontSize: '1.1rem' }}>
              We are a team of passionate technologists, designers, and strategists dedicated to crafting digital experiences that drive real business results.
            </p>
            <a href="#contact" className="btn btn-primary" style={{ marginBottom: '3rem' }}>Work With Us</a>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', maxWidth: 900, margin: '0 auto' }}>
              <img src="/images/about_office.png" alt="Modern tech office" style={{ width: '100%', display: 'block' }} />
            </div>
          </AnimatedSection>
        </div>
      </section>



      {/* ── Live Metrics Stream ── */}
      <section style={{ background: 'var(--color-bg)', padding: '5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />
        <div className="container" style={{ maxWidth: 1200 }}>
          <div style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '1rem 0' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'linear-gradient(90deg, var(--color-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, background: 'linear-gradient(-90deg, var(--color-bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              style={{ display: 'flex', width: 'max-content', gap: '2rem' }}
            >
              {[
                { value: 35, suffix: '%', label: 'EFFORT REDUCED', sub: 'MANUAL AUTOMATION', decimals: 0 },
                { value: 100, suffix: '%', label: 'TRANSITIONED', sub: 'SIGNAL SOURCES', decimals: 0 },
                { value: 16, suffix: '', label: 'WEEKS TO VALUE', sub: 'RAPID DEPLOYMENT', decimals: 0 },
                { value: 4.8, suffix: '/5', label: 'USER RATING', sub: 'CLIENT SATISFACTION', decimals: 1 },
                { value: 35, suffix: '%', label: 'EFFORT REDUCED', sub: 'MANUAL AUTOMATION', decimals: 0 },
                { value: 100, suffix: '%', label: 'TRANSITIONED', sub: 'SIGNAL SOURCES', decimals: 0 },
                { value: 16, suffix: '', label: 'WEEKS TO VALUE', sub: 'RAPID DEPLOYMENT', decimals: 0 },
                { value: 4.8, suffix: '/5', label: 'USER RATING', sub: 'CLIENT SATISFACTION', decimals: 1 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.03)',
                    position: 'relative',
                    borderRadius: 16,
                    minWidth: 280
                  }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)', scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '3.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    <Counter from={0} to={item.value} duration={2.5} decimals={item.decimals} />
                    <span style={{ fontSize: '1.5rem', color: '#64748b' }}>{item.suffix}</span>
                  </motion.div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: (i % 4) * 0.2 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff' }}
                    />
                    <span style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 700, letterSpacing: '0.12em' }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {item.sub}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <AnimatedSection delay={0.6}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4rem', gap: '1rem', opacity: 0.6 }}>
              <div style={{ height: 1, width: '60px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5))' }} />
              <motion.span
                animate={{ color: ['#94a3b8', '#c7d2fe', '#94a3b8'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}
              >
                Live Metric Stream
              </motion.span>
              <div style={{ height: 1, width: '60px', background: 'linear-gradient(90deg, rgba(99,102,241,0.5), transparent)' }} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" style={{ background: 'var(--color-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(40px)' }}
          />
          {[...Array(24)].map((_, idx) => {
            const isCircle = idx % 4 !== 0;
            const content = isCircle ? '' : (idx % 2 === 0 ? '✦' : '+');
            const size = isCircle ? (4 + (idx * 7) % 8) : 16;
            const x1 = (idx % 2 === 0 ? 1 : -1) * (150 + (idx * 23) % 250);
            const y1 = (idx % 3 === 0 ? 1 : -1) * (150 + (idx * 31) % 250);
            const x2 = (idx % 4 === 0 ? -1 : 1) * (150 + (idx * 17) % 250);
            const y2 = (idx % 5 === 0 ? -1 : 1) * (150 + (idx * 13) % 250);
            return (
              <motion.div
                key={idx}
                animate={{ x: [0, x1, x2, 0], y: [0, y1, y2, 0], opacity: [0, 0.4 + ((idx * 3) % 4) * 0.1, 0], rotate: isCircle ? 0 : [0, 180, 360] }}
                transition={{ duration: 15 + (idx % 10), repeat: Infinity, ease: 'linear', delay: (idx % 5) * -2 }}
                style={{ position: 'absolute', width: isCircle ? size : 'auto', height: isCircle ? size : 'auto', borderRadius: isCircle ? '50%' : 0, background: isCircle ? (idx % 3 === 0 ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.3)') : 'transparent', boxShadow: isCircle ? '0 0 20px rgba(167,139,250,0.5)' : 'none', color: idx % 2 === 0 ? 'rgba(167,139,250,0.8)' : 'rgba(99,102,241,0.8)', fontSize: size * 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 1 }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">Our Core Values</div>
              <h2>What Drives Us Forward</h2>
              <p>The fundamental principles that guide our work and shape our culture.</p>
            </div>
          </AnimatedSection>
          <div className="grid-3">
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1} type="slideUp">
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}>
                  <motion.div
                    className="glass-card"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    style={{ padding: '4rem 3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: '400px', justifyContent: 'center' }}
                    variants={{
                      rest: { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.05)' },
                      hover: { y: -12, boxShadow: '0 25px 50px rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.4)' }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)', zIndex: 0 }} variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} />
                    <motion.div
                      style={{ width: 90, height: 90, borderRadius: '24px', background: 'rgba(255,255,255,0.03)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(99,102,241,0.2)', position: 'relative', zIndex: 1 }}
                      variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 5, borderColor: 'rgba(99,102,241,0.6)' } }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                    <motion.h4 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', position: 'relative', zIndex: 1 }} variants={{ rest: { color: '#ffffff' }, hover: { color: '#a78bfa' } }}>{f.title}</motion.h4>
                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, position: 'relative', zIndex: 1, marginBottom: '0.75rem' }}>{f.desc}</p>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{f.para}</p>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



      {/* Team */}
      <section className="section" style={{ background: 'var(--color-bg-2)' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">The Team</div>
              <h2>Meet the <span className="gradient-text">Minds</span> Behind Nexora</h2>
            </div>
          </AnimatedSection>
          <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
            {/* Connecting Dashed Line Background */}
            <svg style={{ position: 'absolute', top: '120px', left: '8%', width: '84%', height: '2px', overflow: 'visible', zIndex: 0 }}>
              <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(99,102,241,0.3)" strokeWidth="2" strokeDasharray="6 6" />
              <motion.circle 
                r="4" fill="#a78bfa"
                animate={{ cx: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 8px #a78bfa)' }}
              />
            </svg>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
              {team.map((member, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                    style={{ textAlign: 'center', cursor: 'pointer' }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      style={{ 
                        width: '180px', height: '240px', 
                        borderRadius: '100px', 
                        overflow: 'hidden', 
                        border: '3px solid rgba(255,255,255,0.05)', 
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }}
                    >
                      <motion.img 
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.4 }}
                        src={member.img} alt={member.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </motion.div>
                    <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem', fontWeight: 700 }}>{member.name}</h4>
                    <div style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 500 }}>{member.role}</div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
