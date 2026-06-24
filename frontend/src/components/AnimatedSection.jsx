// src/components/AnimatedSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedSection({ children, delay = 0, direction = 'up', type = 'slide', className = '', style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: type === 'slide' ? (direction === 'up' ? 50 : direction === 'down' ? -50 : 0) : 0,
      x: type === 'slide' ? (direction === 'left' ? 50 : direction === 'right' ? -50 : 0) : 0,
      scale: type === 'scale' ? 0.8 : type === 'pop' ? 0.5 : 1,
      rotateX: type === 'flip' ? 45 : 0,
      rotateY: type === 'flip-y' ? 45 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
  };

  const getTransition = () => {
    if (type === 'pop') return { type: 'spring', stiffness: 400, damping: 15, delay };
    if (type === 'scale' || type === 'flip' || type === 'flip-y') return { duration: 0.8, delay, ease: [0.17, 0.55, 0.55, 1] };
    return { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
}
