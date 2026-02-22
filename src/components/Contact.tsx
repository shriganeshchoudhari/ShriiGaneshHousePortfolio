import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

export const Contact: React.FC = () => {
  const { setActiveSection } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setActiveSection('contact');
    }
  }, [inView, setActiveSection]);

  return (
    <section ref={ref} id="contact" className="py-24 px-6 md:px-12 lg:px-24 border-t relative z-10" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-sm bg-black/30 p-12 rounded-3xl inline-block"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 uppercase tracking-tighter">
            Let's <span className="text-accent">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-16" style={{ color: 'var(--text-muted)' }}>
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <a 
            href="mailto:hello@shriiganesh.com"
            className="inline-block text-2xl md:text-4xl font-serif italic hover:text-accent transition-colors mb-24 relative group"
          >
            hello@shriiganesh.com
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>

          <div className="flex justify-center gap-8">
            <a href="https://www.linkedin.com/in/shriiganesh" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border hover:border-accent hover:text-accent transition-all hover:-translate-y-2" style={{ borderColor: 'var(--border-color)' }}>
              <Linkedin size={28} />
            </a>
            <a href="https://github.com/shriiganesh" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border hover:border-accent hover:text-accent transition-all hover:-translate-y-2" style={{ borderColor: 'var(--border-color)' }}>
              <Github size={28} />
            </a>
            <a href="https://x.com/shriiganesh" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border hover:border-accent hover:text-accent transition-all hover:-translate-y-2" style={{ borderColor: 'var(--border-color)' }}>
              <Twitter size={28} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
