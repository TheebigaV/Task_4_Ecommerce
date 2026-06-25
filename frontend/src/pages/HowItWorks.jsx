// src/pages/HowItWorks.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Rocket, BarChart3 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const steps = [
  {
    title: 'Discover & Define',
    desc: 'A guided discovery session that clarifies goals, users, and success metrics before we start building.',
    color: '#6366f1',
    icon: <Lightbulb size={24} />,
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
    imgLabel: 'Discovery diagram',
  },
  {
    title: 'Design & Prototype',
    desc: 'Interactive mockups and wireframes that bring the concept to life and validate the experience early.',
    color: '#a78bfa',
    icon: <PenTool size={24} />,
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    imgLabel: 'Prototype preview',
  },
  {
    title: 'Build & Launch',
    desc: 'Fast, reliable implementation using modern tooling and launch support for every release.',
    color: '#2dd4bf',
    icon: <Rocket size={24} />,
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    imgLabel: 'Launch flow',
  },
  {
    title: 'Measure & Grow',
    desc: 'Ongoing optimization using real metrics so your product grows stronger after launch.',
    color: '#fb7185',
    icon: <BarChart3 size={24} />,
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    imgLabel: 'Growth metrics',
  },
];

function StepGraphic({ color, image, label, index, activeIndex }) {
  const isActive = index === activeIndex;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      animate={{ opacity: 1, scale: isActive ? 1.02 : 0.96, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 220,
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.65) 100%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        gap: 10,
      }}>
        <div style={{
          flex: 1,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 14,
          padding: '0.8rem 1rem',
          fontSize: '0.95rem',
          lineHeight: 1.4,
          boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
        }}>
          {label}
        </div>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: color,
          display: 'grid',
          placeItems: 'center',
          boxShadow: `0 0 18px ${color}60`,
        }} />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const autoplayRef = useRef(null);

  const moveToIndex = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= steps.length) return;
    setActiveIndex(nextIndex);
  };

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = `${window.location.origin}${window.location.pathname}#${id.replace('#', '')}`;
    }
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((current) => {
        const next = current + direction;
        if (next >= steps.length) {
          setDirection(-1);
          return current - 1;
        }
        if (next < 0) {
          setDirection(1);
          return current + 1;
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(autoplayRef.current);
  }, [direction]);

  const handlePrevious = () => {
    setDirection(-1);
    moveToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    setDirection(1);
    moveToIndex(activeIndex + 1);
  };

  return (
    <div id="how-it-works">
      <section className="section" style={{ background: 'var(--color-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 420, height: 420, background: 'rgba(45,212,191,0.12)', top: '-100px', left: '-40px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">How It Works</div>
              <h2>4-step process that guides every project from idea to launch</h2>
              <p>
                A clean workflow with clear deliverables and animated visual cues. Each step is designed to work in harmony with your product goals.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div style={{ position: 'relative', marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={handlePrevious}
                  disabled={activeIndex === 0}
                  className="btn btn-secondary"
                  style={{ opacity: activeIndex === 0 ? 0.45 : 1 }}
                >
                  Previous
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => moveToIndex(index)}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        background: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.25)',
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === steps.length - 1}
                  className="btn btn-secondary"
                  style={{ opacity: activeIndex === steps.length - 1 ? 0.45 : 1 }}
                >
                  Next
                </button>
              </div>

              <div style={{ overflow: 'hidden', padding: '1rem 0' }}>
                <div className="how-it-works-cards" style={{ paddingBottom: 24 }}>
                  {(() => {
                    const visibleIndexes = activeIndex === 0 ? [0, 1, 2] : activeIndex === steps.length - 1 ? [steps.length - 3, steps.length - 2, steps.length - 1] : [activeIndex - 1, activeIndex, activeIndex + 1];
                    return visibleIndexes.map((index) => {
                      const step = steps[index];
                      const isActive = index === activeIndex;
                      return (
                        <motion.div
                          key={step.title}
                          animate={{ scale: isActive ? 1.08 : 0.95, opacity: isActive ? 1 : 0.7 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className={`how-it-works-card ${isActive ? 'active' : ''}`}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            className="glass-card"
                            style={{
                              width: '100%',
                              padding: '2rem',
                              borderTop: `3px solid ${step.color}`,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1.5rem',
                              minHeight: 520,
                              boxShadow: isActive ? '0 24px 80px rgba(0,0,0,0.35)' : '0 16px 40px rgba(0,0,0,0.18)',
                              transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{
                                width: 52,
                                height: 52,
                                borderRadius: 18,
                                display: 'grid',
                                placeItems: 'center',
                                background: `${step.color}16`,
                                color: step.color,
                                border: `1px solid ${step.color}30`,
                              }}>
                                {step.icon}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: step.color, letterSpacing: '0.08em' }}>Step {index + 1}</div>
                                <h3 style={{ margin: '0.35rem 0', fontSize: isActive ? '1.7rem' : '1.45rem' }}>{step.title}</h3>
                              </div>
                            </div>

                            <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: isActive ? '1rem' : '0.96rem' }}>{step.desc}</p>

                            <StepGraphic
                              color={step.color}
                              image={step.img}
                              label={step.imgLabel}
                              index={index}
                              activeIndex={activeIndex}
                            />
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 500, height: 500, background: 'rgba(99,102,241,0.16)', top: '-100px', right: '-80px' }} />
        <div className="glow-blob" style={{ width: 360, height: 360, background: 'rgba(45,212,191,0.12)', bottom: '-90px', left: '-60px' }} />
        <div className="container" style={{ maxWidth: 920, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">Final CTA</div>
              <h2 style={{ color: '#f8fafc' }}>Ready to bring your vision to life?</h2>
              <p style={{ color: '#cbd5e1' }}>
                Connect with us for a plan tailored to your business, or explore pricing for the right package.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => handleScrollTo('#contact')}
                className="btn btn-primary"
                style={{
                  minWidth: 180,
                  letterSpacing: '0.02em',
                  padding: '0.9rem 2rem',
                }}
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo('#pricing')}
                className="btn btn-secondary"
                style={{
                  minWidth: 180,
                  color: '#a78bfa',
                  background: 'rgba(99,102,241,0.08)',
                  borderColor: 'rgba(99,102,241,0.22)',
                  padding: '0.9rem 2rem',
                }}
              >
                View Pricing
              </button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
