import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HeroScene } from './HeroScene';
import { useTheme } from '../context/ThemeContext';

export const Hero: React.FC = () => {
  const { isMenuOpen } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ filter: isMenuOpen ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <HeroScene />
        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* A subtle background pattern or gradient could go here */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-color)_0%,transparent_50%)] opacity-30 mix-blend-screen" />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 tracking-tighter uppercase mix-blend-difference text-white">
            Maxime <span className="text-accent">Guillon</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto mix-blend-difference text-gray-300">
            Creative Developer & Computer Science Student
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center"
        >
          <a
            href="#about"
            className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={24} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

