/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-accent selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <ThemeCustomizer />
        
        <footer className="py-8 text-center text-sm border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} Maxime Guillon. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
