// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe, TrendingUp, Users, CheckCircle, Star, ChevronRight, Heart, Lightbulb, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { createAnimatable } from 'animejs';

import About from './About';
import Services from './Services';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Contact from './Contact';

const aboutTeam = [
  { name: 'John Doe', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { name: 'Jane Smith', role: 'CTO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Alex Johnson', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Emily Davis', role: 'Developer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
];

const features = [
  { img: '/images/feature_fast.png', title: 'Innovation First', desc: 'We constantly push the boundaries of what is possible in digital design.', para: 'Our team leverages the latest technologies and creative strategies to deliver forward-thinking solutions that keep your business ahead of the curve.' },
  { img: '/images/feature_secure.png', title: 'Uncompromising Quality', desc: 'Excellence is built into every line of code and every pixel we design.', para: 'We implement rigorous testing and quality assurance processes to ensure that our deliverables not only meet but exceed industry standards.' },
  { img: '/images/feature_global.png', title: 'Client-Centric Approach', desc: 'Your success is our success. We build true partnerships with our clients.', para: 'We believe in transparent communication, agile collaboration, and tailoring our strategies to perfectly align with your unique business goals and vision.' },
];

const stats = [
  { value: '500+', label: 'Happy Clients' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50ms', label: 'Avg. Response' },
  { value: '4.9★', label: 'Customer Rating' },
];

const testimonials = [
  { quote: 'Nexora transformed our online presence completely. The team delivered beyond expectations!', author: 'Sarah Chen', role: 'CEO, TechVenture', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { quote: 'The checkout flow is seamless. Our conversion rate went up 40% after switching to their platform.', author: 'Ravi Kumar', role: 'CTO, RetailPro', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Outstanding support and a beautiful UI. We are proud to show off our new website!', author: 'Priya Nair', role: 'Marketing Director', rating: 5, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Their design system boosted our brand identity dramatically.', author: 'Liam Patel', role: 'Creative Lead', rating: 5, img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Performance optimization cut our load times by half.', author: 'Maya Singh', role: 'Performance Engineer', rating: 5, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face' },
  { quote: 'The secure authentication flow gave us peace of mind.', author: 'Carlos Gomez', role: 'Security Architect', rating: 5, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Our sales pipeline has never been smoother thanks to Nexora.', author: 'Emily Zhang', role: 'CFO, FinTechCo', rating: 5, img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
  { quote: 'The platform scales effortlessly with our growing user base.', author: 'David Lee', role: 'Product Manager, AppSphere', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Design tools integrated seamlessly, boosting our creative workflow.', author: 'Sofia Martinez', role: 'UX Designer, CreativeLab', rating: 5, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' },
  { quote: 'Security monitoring is proactive and automated, catching threats early.', author: 'Lukas Novak', role: 'Security Analyst, Guardify', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' }
];

function Counter({ from, to, duration = 2, decimals = 0 }) {
  const nodeRef = React.useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: '0px 0px -100px 0px' });
  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        if (nodeRef.current) nodeRef.current.textContent = value.toFixed(decimals);
      }
    });
    return () => controls.stop();
  }, [from, to, duration, decimals, inView]);
  return <span ref={nodeRef}>{from}</span>;
}

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  const [errorInfo, setErrorInfo] = React.useState(null);

  const reset = () => {
    setHasError(false);
    setErrorInfo(null);
  };

  class Boundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorInfo: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    componentDidCatch(error, info) {
      this.setState({ errorInfo: info });
      console.error('ErrorBoundary caught an error', error, info);
    }
    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>
            <h3>Something went wrong.</h3>
            <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 4 }}>
              Reload Page
            </button>
          </div>
        );
      }
      return this.props.children;
    }
  }
  return <Boundary>{children}</Boundary>;
}

function FanTestimonials({ testimonials }) {
  const baseColors = ['#a78bfa', '#6366f1', '#2dd4bf'];
  const [hovered, setHovered] = React.useState(null);

  // Compute fan position for each index based on total count
  const getFan = (i, total) => {
    const center = (total - 1) / 2;
    const offset = i - center;
    return {
      rotate: offset * 10,
      x: offset * 120,
      y: Math.abs(offset) * Math.abs(offset) * 8,
    };
  };

  return (
    <div className="flex justify-center items-center w-full" style={{ marginTop: '2rem', marginBottom: '2rem', position: 'relative', height: 480 }}>
      {testimonials.map((t, i) => {
        const fan = getFan(i, testimonials.length);
        const isHovered = hovered === i;
        const othersHovered = hovered !== null && !isHovered;
        const color = baseColors[i % baseColors.length];

        // Z-index based on distance from center so middle cards are on top
        const center = (testimonials.length - 1) / 2;
        const offset = i - center;
        const baseZ = Math.floor(30 - Math.abs(offset));

        return (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: `linear-gradient(160deg, ${color}22, rgba(255,255,255,0.04))`,
              borderRadius: 24,
              padding: '1.75rem 1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'absolute',
              bottom: 40,
              left: '50%',
              width: 250,
              height: 380,
              marginLeft: -125,
              transformOrigin: 'bottom center',
              transform: isHovered
                ? `translateX(${fan.x}px) translateY(-40px) rotate(0deg) scale(1.15)`
                : `translateX(${fan.x}px) translateY(${fan.y}px) rotate(${fan.rotate}deg) scale(${othersHovered ? 0.95 : 1})`,
              transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s, opacity 0.3s, z-index 0s',
              zIndex: isHovered ? 50 : baseZ,
              opacity: othersHovered ? 0.4 : 1,
              border: `1px solid ${isHovered ? color + '88' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: isHovered
                ? `0 40px 100px rgba(0,0,0,0.6), 0 0 50px ${color}40`
                : `0 10px 40px rgba(0,0,0,0.4)`,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${color}`,
                boxShadow: `0 0 20px ${color}50`,
                marginBottom: '1rem',
              }}
            >
              <img src={t.img} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
              {Array(t.rating)
                .fill(0)
                .map((_, s) => (
                  <Star key={s} size={13} fill="#fbbf24" color="#fbbf24" />
                ))}
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                fontStyle: 'italic',
                color: '#cbd5e1',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
                opacity: isHovered ? 1 : 0.5,
                transition: 'opacity 0.4s',
              }}
            >
              "{t.quote}"
            </p>
            <div style={{ opacity: 1, transition: 'opacity 0.4s' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f1f5f9' }}>{t.author}</div>
              <div style={{ fontSize: '0.75rem', color: color, fontWeight: 500, marginTop: '0.15rem' }}>{t.role}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Hero3DScene() {
  // ── Isometric Pipeline Path Nodes ──────────────────────────────
  // Coordinates in the 2D plane (X, Y) which will be rotated into isometric 3D
  const nodes = [
    { x: 120, y: -200 },
    { x: 120, y: -40 },
    { x: -40, y: -40 },
    { x: -40, y: 120 },
    { x: -200, y: 120 },
    { x: -200, y: 280 },
  ];

  // Derive the animation path for particles
  const particleX = nodes.map(n => n.x);
  const particleY = nodes.map(n => n.y);

  // Track segments
  const segments = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const n1 = nodes[i];
    const n2 = nodes[i + 1];

    const isVertical = n1.x === n2.x; // Vertical in the 2D plane (Y-axis)
    const length = isVertical ? Math.abs(n2.y - n1.y) : Math.abs(n2.x - n1.x);
    const thickness = 64; // width of the track

    // Calculate left/top depending on direction
    const left = isVertical ? n1.x - thickness / 2 : Math.min(n1.x, n2.x);
    const top = isVertical ? Math.min(n1.y, n2.y) : n1.y - thickness / 2;
    const width = isVertical ? thickness : length + thickness;
    const height = isVertical ? length + thickness : thickness;

    segments.push({ left, top, width, height, isVertical });
  }

  // Create an array of glowing particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.8, // stagger the particles
  }));

  return (
    <div style={{
      perspective: '1400px', perspectiveOrigin: '50% 50%',
      width: '100%', height: 600, // Increased height so the scaled 3D scene fits
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'visible'
    }}>
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', width: 450, height: 450, background: 'rgba(99,102,241,0.15)', filter: 'blur(100px)', borderRadius: '50%' }} />

      {/* 3D Isometric Wrapper */}
      <div style={{
        transformStyle: 'preserve-3d',
        // Classic isometric: rotateX(60deg) rotateZ(-45deg). We adjust slightly for aesthetics.
        // Scaled up by 1.35 as requested to increase everything proportionally.
        transform: 'rotateX(55deg) rotateZ(-45deg) scale(1.35)',
        position: 'relative', width: 0, height: 0,
        marginLeft: 150, // Offset to visually center
        marginTop: -80, // Moved up so it doesn't clip at the bottom
      }}>

        {/* ── TRACK SEGMENTS ── */}
        {segments.map((seg, i) => (
          <div key={`seg-${i}`} style={{
            position: 'absolute',
            left: seg.left, top: seg.top, width: seg.width, height: seg.height,
            background: '#0f172a', // dark track base
            border: '2px solid rgba(56,189,248,0.4)', // cyan border
            borderRadius: 32, // rounded corners
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0px)',
          }}>
            {/* Inner track glow/groove */}
            <div style={{
              position: 'absolute', inset: 12,
              background: '#1e293b',
              borderRadius: 20,
              boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Optional: subtle dashed line inside track */}
              <div style={{
                position: 'absolute',
                width: seg.isVertical ? 2 : '100%', height: seg.isVertical ? '100%' : 2,
                background: 'linear-gradient(90deg, transparent 50%, rgba(99,102,241,0.3) 50%)',
                backgroundSize: seg.isVertical ? '100% 20px' : '20px 100%',
              }} />
            </div>
          </div>
        ))}

        {/* ── CORNER HUBS / CYLINDERS ── */}
        {nodes.map((node, i) => (
          <div key={`node-${i}`} style={{
            position: 'absolute', left: node.x, top: node.y,
            width: 0, height: 0,
            transformStyle: 'preserve-3d',
          }}>
            {/* Cylinder formed by stacked circles */}
            {Array.from({ length: 8 }).map((_, j) => (
              <div key={j} style={{
                position: 'absolute',
                // Increased the blue cylinder size to 100x100
                width: 100, height: 100, marginLeft: -50, marginTop: -50,
                borderRadius: '50%',
                background: j === 7
                  ? 'radial-gradient(circle at 30% 30%, #38bdf8 0%, #0ea5e9 40%, #0284c7 100%)' // Top cap
                  : '#0369a1', // Body
                border: j === 7 ? '2px solid #bae6fd' : 'none',
                transform: `translateZ(${j * 4}px)`,
                boxShadow: j === 7 ? '0 0 20px rgba(56,189,248,0.5)' : 'none',
              }} />
            ))}

            {/* Pulsing inner ring on the top cap */}
            <motion.div
              animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{
                position: 'absolute',
                width: 48, height: 48, marginLeft: -24, marginTop: -24,
                borderRadius: '50%', border: '4px solid #fff',
                transform: 'translateZ(30px)',
              }}
            />
          </div>
        ))}

        {/* ── ROTATING GLASS GLOBE AT CENTER HUB ── */}
        <div style={{
          position: 'absolute', left: nodes[2].x, top: nodes[2].y,
          width: 0, height: 0,
          transformStyle: 'preserve-3d',
        }}>
          {/* Base pedestal for the globe */}
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} style={{
              position: 'absolute', width: 90, height: 90, marginLeft: -45, marginTop: -45,
              borderRadius: '50%', background: '#1e1b4b',
              border: j === 4 ? '2px solid #818cf8' : 'none',
              transform: `translateZ(${j * 3}px)`,
            }} />
          ))}

          {/* 3D Rotating Globe Structure */}
          <motion.div
            animate={{ rotateZ: 360, rotateY: 360, rotateX: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', width: 0, height: 0,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(70px)', // Elevate above pedestal
            }}
          >
            {/* Globe rings */}
            {[0, 45, 90, 135].map((angle, i) => (
              <div key={i} style={{
                position: 'absolute', width: 140, height: 140, marginLeft: -70, marginTop: -70,
                borderRadius: '50%',
                border: '1px solid rgba(167,139,250,0.5)',
                boxShadow: 'inset 0 0 15px rgba(167,139,250,0.2)',
                transform: `rotateY(${angle}deg)`,
                transformStyle: 'preserve-3d',
              }}>
                {/* Internal nodes on the rings */}
                <div style={{ position: 'absolute', top: 0, left: 66, width: 8, height: 8, borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 10px #c084fc', transform: 'rotateX(90deg)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 66, width: 8, height: 8, borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 10px #c084fc', transform: 'rotateX(90deg)' }} />
              </div>
            ))}
            {/* Glass core bubble */}
            <div style={{
              position: 'absolute', width: 120, height: 120, marginLeft: -60, marginTop: -60,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(99,102,241,0.05) 100%)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 40px rgba(99,102,241,0.3)',
            }} />
          </motion.div>
        </div>

        {/* ── MOVING PARTICLES ALONG TRACK ── */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{ x: particleX, y: particleY }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              delay: p.delay,
            }}
            style={{
              position: 'absolute', width: 0, height: 0,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The particle orb */}
            <div style={{
              position: 'absolute', width: 24, height: 24, marginLeft: -12, marginTop: -12,
              borderRadius: '50%',
              background: '#f8fafc',
              boxShadow: '0 0 20px #818cf8, 0 0 40px #6366f1, inset 0 0 8px rgba(0,0,0,0.5)',
              border: '2px solid #c7d2fe',
              // Keep particle slightly elevated above the track
              transform: 'translateZ(18px)',
            }} />
          </motion.div>
        ))}

      </div>
    </div>
  );
}


export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      const animatableSquare = createAnimatable('.anime-cursor-glow', {
        x: 500, // 500ms duration
        y: 500, // 500ms duration
        ease: 'out(3)',
      });

      const onMouseMove = e => {
        // Offset by 100 to center the 200x200 glow on the cursor
        animatableSquare.x(e.clientX - 100);
        animatableSquare.y(e.clientY - 100);
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    } catch (err) {
      console.warn('Anime.js animatable error', err);
    }
  }, []);

  return (
    <div>
      {/* AnimeJS tracking cursor */}
      <div
        className="anime-cursor-glow"
        style={{
          position: 'fixed', top: 0, left: 0, width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 60%)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-999px, -999px)' // Hide initially
        }}
      />

      {/* ── Hero ── */}
      <section id="home" className="section home-hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'flex-start', background: 'var(--gradient-hero)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.15)', top: '-10%', left: '-10%' }} />
        <div className="glow-blob" style={{ width: 500, height: 500, background: 'rgba(167,139,250,0.1)', bottom: '0', right: '-10%' }} />

        <div className="container home-hero-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 480px) minmax(520px, 760px)', gap: '2rem', alignItems: 'flex-start' }}>

            {/* Text Content (Left) */}
            <div className="home-hero-text" style={{ textAlign: 'left' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '0.4rem 1rem', borderRadius: 50, marginBottom: '1rem' }}
              >
                <span role="img" aria-label="rocket">🚀</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#a78bfa' }}>Next-Gen Digital Solutions</span>
              </motion.div>

              <motion.h1 className="home-hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ lineHeight: 1.05, marginBottom: '1.2rem', letterSpacing: '-0.02em' }}
              >
                <span className="hero-title-line">Power Your Business</span>
                <span className="hero-title-line">with <span className="gradient-text">Simple</span></span>
              </motion.h1>

              <motion.p className="home-hero-sub"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ color: '#94a3b8', marginBottom: '1.8rem', lineHeight: 1.7 }}
              >
                From professional marketing websites to seamless e-commerce flows — we deliver high-conversion, pixel-perfect digital experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <a href="#pricing" className="btn btn-primary hero-cta" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
                  Get Started <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>

            {/* Image Content (Right) */}
            <motion.div className="home-hero-media"
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <Hero3DScene />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── About ── */}
      <section id="about" className="section" style={{ background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 400, height: 400, background: 'rgba(99,102,241,0.1)', top: '-100px', right: '-80px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Heading */}
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">About Us</div>
              <h2>Building the <span className="gradient-text">Future</span> of Digital Business</h2>
              <p style={{ maxWidth: 580, margin: '0 auto' }}>We are a team of passionate technologists, designers, and strategists dedicated to crafting digital experiences that drive real business results.</p>
            </div>
          </AnimatedSection>

          {/* ── Live Metrics Stream ── */}
          <div style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '2rem 0', marginBottom: '3rem' }}>
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
                  style={{ padding: '2rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.03)', position: 'relative', borderRadius: 16, minWidth: 280 }}
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
                    <span style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 700, letterSpacing: '0.12em' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <AnimatedSection delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem', gap: '1rem', opacity: 0.6 }}>
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

          {/* ── 3 Feature Cards ── */}
          <AnimatedSection>
            <div className="section-heading" style={{ marginBottom: '2.5rem' }}>
              <div className="section-label">Our Core Values</div>
              <h3 style={{ fontSize: '1.8rem' }}>What Drives Us Forward</h3>
              <p>The fundamental principles that guide our work and shape our culture.</p>
            </div>
          </AnimatedSection>
          <div className="grid-3" style={{ marginBottom: '4rem', position: 'relative' }}>
            {/* Animated background */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(40px)' }}
              />
              {[...Array(18)].map((_, idx) => {
                const isCircle = idx % 4 !== 0;
                const content = isCircle ? '' : (idx % 2 === 0 ? '✦' : '+');
                const size = isCircle ? (4 + (idx * 7) % 8) : 16;
                const x1 = (idx % 2 === 0 ? 1 : -1) * (100 + (idx * 23) % 200);
                const y1 = (idx % 3 === 0 ? 1 : -1) * (100 + (idx * 31) % 200);
                const x2 = (idx % 4 === 0 ? -1 : 1) * (100 + (idx * 17) % 200);
                const y2 = (idx % 5 === 0 ? -1 : 1) * (100 + (idx * 13) % 200);
                return (
                  <motion.div key={idx}
                    animate={{ x: [0, x1, x2, 0], y: [0, y1, y2, 0], opacity: [0, 0.35 + ((idx * 3) % 4) * 0.1, 0], rotate: isCircle ? 0 : [0, 180, 360] }}
                    transition={{ duration: 15 + (idx % 10), repeat: Infinity, ease: 'linear', delay: (idx % 5) * -2 }}
                    style={{ position: 'absolute', width: isCircle ? size : 'auto', height: isCircle ? size : 'auto', borderRadius: isCircle ? '50%' : 0, background: isCircle ? (idx % 3 === 0 ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.3)') : 'transparent', boxShadow: isCircle ? '0 0 20px rgba(167,139,250,0.5)' : 'none', color: idx % 2 === 0 ? 'rgba(167,139,250,0.8)' : 'rgba(99,102,241,0.8)', fontSize: size * 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 1 }}
                  >{content}</motion.div>
                );
              })}
            </div>
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1} type="slideUp">
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}>
                  <motion.div
                    className="glass-card"
                    initial="rest" whileHover="hover" animate="rest"
                    style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: '380px', justifyContent: 'center', zIndex: 1 }}
                    variants={{
                      rest: { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.05)' },
                      hover: { y: -12, boxShadow: '0 25px 50px rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.4)' }
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)', zIndex: 0 }} variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} />
                    <motion.div
                      style={{ width: 80, height: 80, borderRadius: '20px', background: 'rgba(255,255,255,0.03)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(99,102,241,0.2)', position: 'relative', zIndex: 1 }}
                      variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 5 } }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                    <motion.h4 style={{ marginBottom: '0.75rem', fontSize: '1.15rem', position: 'relative', zIndex: 1 }} variants={{ rest: { color: '#ffffff' }, hover: { color: '#a78bfa' } }}>{f.title}</motion.h4>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, position: 'relative', zIndex: 1, marginBottom: '0.5rem' }}>{f.desc}</p>
                    <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{f.para}</p>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>




          {/* Team */}
          <AnimatedSection>
            <div className="section-heading" style={{ marginBottom: '2rem' }}>
              <div className="section-label">The Team</div>
              <h3 style={{ fontSize: '1.5rem' }}>Meet the <span className="gradient-text">Minds</span> Behind Us</h3>
            </div>
          </AnimatedSection>
          <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
            {/* Connecting Dashed Line Background */}
            <svg style={{ position: 'absolute', top: '120px', left: '10%', width: '80%', height: '2px', overflow: 'visible', zIndex: 0 }}>
              <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(99,102,241,0.3)" strokeWidth="2" strokeDasharray="6 6" />
              <motion.circle
                r="4" fill="#a78bfa"
                animate={{ cx: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 8px #a78bfa)' }}
              />
            </svg>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
              {aboutTeam.map((member, i) => (
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

      {/* Embedded SPA Sections */}
      <Services />



      {/* ── Testimonials Fan Deck ── */}
      <section className="section" style={{ background: 'var(--color-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 500, height: 500, background: 'rgba(99,102,241,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">Testimonials</div>
              <h2>Loved by <span className="gradient-text">Thousands</span></h2>
              <p>Hover a card to read what our clients say.</p>
            </div>
          </AnimatedSection>
          <FanTestimonials testimonials={testimonials} />
        </div>
      </section>

      <HowItWorks />
      <Pricing />
      <Contact />
    </div>
  );
}
