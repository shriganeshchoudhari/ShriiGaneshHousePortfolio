import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'gothic' | 'cyberpunk' | 'minimal';
export type AccentColor = 'crimson' | 'gold' | 'neon-blue' | 'neon-pink' | 'monochrome';
export type Section = 'hero' | 'about' | 'projects' | 'contact';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('gothic');
  const [accentColor, setAccentColor] = useState<AccentColor>('crimson');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('hero');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accentColor);
  }, [theme, accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor, isMenuOpen, setIsMenuOpen, activeSection, setActiveSection }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
