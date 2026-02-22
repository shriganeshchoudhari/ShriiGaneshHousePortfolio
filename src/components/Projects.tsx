import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Immersive Portfolio',
    category: 'WebGL / Three.js',
    image: 'https://picsum.photos/seed/proj1/1200/800',
    description: 'A 3D interactive portfolio experience pushing the limits of browser rendering.',
  },
  {
    id: 2,
    title: 'E-Commerce Experience',
    category: 'React / GSAP',
    image: 'https://picsum.photos/seed/proj2/1200/800',
    description: 'A fluid, animation-heavy e-commerce conceptual design.',
  },
  {
    id: 3,
    title: 'Creative Agency',
    category: 'Next.js / Tailwind',
    image: 'https://picsum.photos/seed/proj3/1200/800',
    description: 'A brutalist, high-contrast landing page for a creative agency.',
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Selected <span className="text-accent">Works</span>
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-3/5 relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-video object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="text-sm font-mono tracking-widest text-accent uppercase">
                  {project.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                  {project.description}
                </p>
                <div className="flex gap-4 pt-4">
                  <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <ExternalLink size={20} />
                    <span>Live Site</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Github size={20} />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
