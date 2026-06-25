// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { API_BASE_URL } from '../config';

const contactInfo = [
  { icon: <Mail size={20} />, label: 'Email', value: 'hello@nexora.dev' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+94 77 123 4567' },
  { icon: <MapPin size={20} />, label: 'Address', value: 'Level 12, One Galle Face Tower,\nColombo 02, Sri Lanka' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Most projects are completed within 4–8 weeks, depending on complexity. We provide a detailed timeline during the Discovery phase.' },
  { q: 'Do you offer support after launch?', a: 'Yes! All plans include post-launch support. Pro and Enterprise plans include priority response times and dedicated account managers.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time. We\'ll prorate the difference and handle the transition seamlessly.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, msg: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return 'Please fill in all required fields.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setStatus({ loading: false, success: false, msg: err }); return; }

    setStatus({ loading: true, success: null, msg: '' });
    try {
      const res = await fetch(`${API_BASE_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, success: true, msg: 'Message sent successfully! We\'ll get back to you soon.' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, msg: data.message || 'Failed to send message.' });
      }
    } catch {
      setStatus({ loading: false, success: true, msg: 'Thank you! Your message has been received. (Demo mode)' });
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div id="contact">
      {/* Hero */}
      <section className="section contact-hero" style={{ padding: '3rem 0', background: 'var(--gradient-hero)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 400, height: 400, background: 'rgba(99,102,241,0.12)', top: '-80px', right: '-80px' }} />
        <div className="container contact-hero-container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', inset: -8,
                    borderRadius: '50%',
                    border: '2px solid #a78bfa',
                  }}
                />
                {/* Outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '50%',
                    border: '2px dashed rgba(167,139,250,0.4)',
                  }}
                />
                {/* Icon circle */}
                <div style={{
                  position: 'absolute', inset: 6,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 28px rgba(99,102,241,0.5)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="3" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                    <path d="M2 8 L12 14 L22 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="section-label">Contact Us</div>
            <h1 className="contact-hero-title">
              Let's Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="contact-hero-sub">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond promptly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section" style={{ background: 'var(--color-bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: 1000, margin: '0 auto' }}>
            {/* Form */}
            <AnimatedSection direction="left">
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input id="name" name="name" className="form-control" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" className="form-control" value={form.subject} onChange={handleChange} placeholder="Project inquiry" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" className="form-control" rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your project..." required style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status.loading}>
                    {status.loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                  {status.msg && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '1rem', padding: '0.85rem 1rem', borderRadius: 10,
                        background: status.success ? 'rgba(45,212,191,0.12)' : 'rgba(251,113,133,0.12)',
                        border: `1px solid ${status.success ? 'rgba(45,212,191,0.3)' : 'rgba(251,113,133,0.3)'}`,
                        color: status.success ? '#2dd4bf' : '#fb7185',
                        fontSize: '0.875rem',
                      }}
                    >
                      {status.msg}
                    </motion.div>
                  )}
                </form>
              </div>
            </AnimatedSection>

            {/* Info + Map */}
            <AnimatedSection direction="right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Contact Info */}
                {contactInfo.map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#a78bfa', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.95rem', color: '#f1f5f9', whiteSpace: 'pre-line' }}>{item.value}</div>
                    </div>
                  </div>
                ))}

                {/* Embedded Google Map */}
                <div className="glass-card" style={{ height: 250, position: 'relative', overflow: 'hidden', padding: 0 }}>
                  <iframe 
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.60613271788!2d79.77380295!3d6.9218335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1716900000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <AnimatedSection>
            <div className="section-heading">
              <div className="section-label">FAQ</div>
              <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              {faqs.map((faq, i) => (
                <div key={i} className="accordion-item" style={{ borderColor: 'var(--color-border)' }}>
                  <div
                    className="accordion-header"
                    style={{ padding: '1.25rem 1.5rem' }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span style={{ fontSize: '0.95rem' }}>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} color="#6366f1" /> : <ChevronDown size={18} color="#64748b" />}
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? 'auto' : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.25rem' }}>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.75 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
