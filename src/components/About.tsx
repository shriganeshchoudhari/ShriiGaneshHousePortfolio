import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const { setActiveSection } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setActiveSection('about');
    }
  }, [inView, setActiveSection]);

  return (
    <section ref={ref} id="about" className="py-24 px-6 md:px-12 lg:px-24 border-t relative z-10" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight">
              About <span className="text-accent">Me</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <p>
                I am a Creative Developer and Computer Science student at Bordeaux University.
                My passion lies at the intersection of design and technology, where I build
                immersive, interactive web experiences.
              </p>
              <p>
                With a strong foundation in React, Three.js, and GSAP, I strive to push the
                boundaries of what's possible in the browser. I believe that a website should
                be more than just information—it should be an experience.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Education</h3>
                <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
                  <li>Bordeaux University</li>
                  <li>La Rochelle University</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Skills</h3>
                <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
                  <li>React & Next.js</li>
                  <li>Three.js & WebGL</li>
                  <li>GSAP & Framer Motion</li>
                  <li>Creative Coding</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-accent opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10 mix-blend-overlay" />
            <img 
              src="https://picsum.photos/seed/maxime/800/1000?grayscale" 
              alt="SHRII GANESH" 
              className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-2 border-accent m-6 rounded-xl opacity-50 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
