// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { name: 'Home',         id: 'home',         path: '#' },
  { name: 'About',        id: 'about',        path: '#about' },
  { name: 'Services',     id: 'services',     path: '#services' },
  { name: 'Pricing',      id: 'pricing',      path: '#pricing' },
  { name: 'Contact',      id: 'contact',      path: '#contact' },
];

/* ── Animated nav item ── */
function NavItem({ link, active, pathname }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={pathname === '/' ? link.path : `/${link.path}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        position: 'relative',
        padding: '0.5rem 1.1rem',
        borderRadius: 10,
        fontSize: '0.9rem',
        fontWeight: active ? 700 : 500,
        color: active ? '#f1f5f9' : hovered ? '#e2e8f0' : '#94a3b8',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'color 0.2s ease',
        outline: 'none',
      }}
    >
      {/* sliding pill background for active */}
      {active && (
        <motion.span
          layoutId="activePill"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(167,139,250,0.15))',
            border: '1px solid rgba(99,102,241,0.45)',
            boxShadow: '0 0 18px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* hover highlight (non-active) */}
      {!active && hovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        />
      )}

      {/* text */}
      <span style={{ position: 'relative', zIndex: 1 }}>{link.name}</span>

      {/* animated underline dot for active */}
      {active && (
        <motion.span
          layoutId="activeDot"
          style={{
            position: 'absolute',
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#818cf8',
            boxShadow: '0 0 6px #818cf8',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

/* ── Main Header ── */
export default function Header() {
  const [isOpen, setIsOpen]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('home');
  const { pathname }                = useLocation();

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (pathname !== '/') return;

      const ids = navLinks.map(l => l.id);
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 130 && bottom >= 130) { current = id; }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #6366f1, #a78bfa, #2dd4bf)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 1100,
          boxShadow: '0 0 10px rgba(99,102,241,0.7)',
        }}
      />

      {/* ── Header bar ── */}
      <motion.header
        initial={false}
        animate={{
          background: scrolled ? 'rgba(8,12,24,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.07)' : 'transparent',
          boxShadow: scrolled ? '0 6px 40px rgba(0,0,0,0.45)' : 'none',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          borderBottom: '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <motion.div
              animate={{ boxShadow: scrolled ? '0 0 28px rgba(99,102,241,0.55)' : '0 0 16px rgba(99,102,241,0.3)' }}
              style={{
                width: 36, height: 36, borderRadius: 10,
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <img src="/logo.png" alt="Nexora logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <span style={{ fontFamily: 'Sora,Inter,sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#f1f5f9', letterSpacing: '-0.01em' }}>
              Nexora<span style={{ color: '#6366f1' }}>.</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(link => (
              <NavItem
                key={link.id}
                link={link}
                active={pathname === '/' && activeSection === link.id}
                pathname={pathname}
              />
            ))}

            <motion.a
              href={pathname === '/' ? '#pricing' : '/#pricing'}
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{ marginLeft: '1rem', padding: '0.5rem 1.4rem', fontSize: '0.875rem' }}
            >
              Get Started
            </motion.a>
          </nav>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsOpen(o => !o)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '0.5rem',
              color: '#f1f5f9',
              cursor: 'pointer',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'flex' }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(8,12,24,0.97)',
                backdropFilter: 'blur(24px)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                overflow: 'hidden',
              }}
            >
              <div className="container" style={{ padding: '0.75rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {navLinks.map((link, i) => {
                  const active = pathname === '/' && activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={pathname === '/' ? link.path : `/${link.path}`}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}
                      whileHover={{ x: 6, color: '#f1f5f9' }}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 10,
                        fontSize: '0.95rem',
                        fontWeight: active ? 700 : 500,
                        color: active ? '#818cf8' : '#94a3b8',
                        background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                        borderLeft: active ? '3px solid #6366f1' : '3px solid transparent',
                        textDecoration: 'none',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.a
                  href={pathname === '/' ? '#pricing' : '/#pricing'}
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  style={{ marginTop: '0.75rem', justifyContent: 'center' }}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
