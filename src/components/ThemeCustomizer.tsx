import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import { useTheme, Theme, AccentColor } from '../context/ThemeContext';

export const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();

  const themes: { id: Theme; label: string }[] = [
    { id: 'gothic', label: 'Gothic (Dark)' },
    { id: 'cyberpunk', label: 'Cyberpunk (Neon)' },
    { id: 'minimal', label: 'Minimal (Light)' },
  ];

  const colors: { id: AccentColor; label: string; hex: string }[] = [
    { id: 'crimson', label: 'Crimson', hex: '#8b0000' },
    { id: 'gold', label: 'Gold', hex: '#d4af37' },
    { id: 'neon-blue', label: 'Neon Blue', hex: '#00f3ff' },
    { id: 'neon-pink', label: 'Neon Pink', hex: '#ff00ff' },
    { id: 'monochrome', label: 'Monochrome', hex: '#888888' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-accent text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Customize Theme"
      >
        <Settings size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] z-50 p-6 shadow-2xl overflow-y-auto"
              style={{ backgroundColor: 'var(--bg-color)', borderLeft: '1px solid var(--border-color)' }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Customize</h2>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:text-accent transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Theme</h3>
                  <div className="space-y-2">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          theme === t.id ? 'border-accent text-accent' : 'border-transparent hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: theme === t.id ? 'transparent' : 'rgba(128,128,128,0.1)' }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setAccentColor(c.id)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${
                          accentColor === c.id ? 'scale-110 border-white' : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.label}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
