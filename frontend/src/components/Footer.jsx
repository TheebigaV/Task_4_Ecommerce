// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  Company:  [
    { name: 'About Us',     path: '#about' },
    { name: 'Services',     path: '#services' },
    { name: 'Pricing',      path: '#pricing' },
  ],
  Support: [
    { name: 'Contact Us', path: '#contact' },
    { name: 'FAQ',         path: '#contact' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#050810', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '4rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
              }}>
                <img src="/logo.png" alt="Nexora logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: 'Sora,Inter,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#f1f5f9' }}>
                Nexora<span style={{ color: '#6366f1' }}>.</span>
              </span>
            </a>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: 240 }}>
              Empowering businesses with cutting-edge digital solutions and seamless technology experiences.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: <Mail size={14} />, text: 'hello@nexora.dev' },
                { icon: <Phone size={14} />, text: '+94 77 123 4567' },
                { icon: <MapPin size={14} />, text: 'Colombo, Sri Lanka' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
                  <span style={{ color: '#6366f1' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      onMouseEnter={e => e.target.style.color = '#a78bfa'}
                      onMouseLeave={e => e.target.style.color = '#64748b'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Stay updated with our latest features and releases.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-control"
                style={{ flex: 1, fontSize: '0.875rem', padding: '0.6rem 0.9rem' }}
              />
              <button className="btn btn-primary" style={{ padding: '0.6rem 0.9rem', flexShrink: 0 }}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#374151' }}>
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#374151' }}>
            Built with React · PHP · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
